<script setup lang="ts">
import Layout from '@/components/custom/chat/Layout.vue';
import Textarea from '@/components/custom/chat/Textarea.vue';
import UserMessage from '@/components/custom/chat/UserMessage.vue';
import AssistantMessage from '@/components/custom/chat/AssistantMessage.vue';

import { Icon } from '@iconify/vue';

import { ref } from 'vue';
import { useRoute, useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
import { useEventBus } from '@vueuse/core';

import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import { useChatRoomStore } from '@/stores/chatRoomStore';

import { getChatHistoryService, postChatHistoryService } from '@/services/chatHistoryService';
import { getUserProfileService } from '@/services/userService';
import { getApiProvidersService } from '@/services/apiProviderService';
import { getChatRoomsService } from '@/services/chatRoomService';

const messageToSend = ref('');
const isWaitingForResponse = ref(false);

const route = useRoute();
const router = useRouter();

const bus = useEventBus<string>('scrollToBottom');

const chatStore = useChatStore();
const { updateChatRoomLastMessage } = useChatRoomStore();

const { resetChatHistoryData } = chatStore;
const { chatHistory } = storeToRefs(chatStore);

const onSendMessage = async (message: string) => {
  messageToSend.value = message;
  isWaitingForResponse.value = true;

  bus.emit();

  // TODO: Add some lock if the message was sent and there is a server response pending
  const roomUuid = route.params.room_uuid as string;
  const response = await postChatHistoryService({ roomUuid, message }, router);

  if (response) {
    chatHistory.value.push({ message, role: 'user' });
    chatHistory.value.push({ message: response.message, role: 'assistant' });
    updateChatRoomLastMessage(roomUuid, response.message);
  }

  isWaitingForResponse.value = false;
  messageToSend.value = '';
};

onBeforeRouteLeave(() => {
  resetChatHistoryData();
});

onBeforeRouteUpdate(async (to) => {
  const roomUuid = to.params.room_uuid as string;

  resetChatHistoryData();
  await getUserProfileService(router);
  await getApiProvidersService(router);
  await getChatRoomsService(router);
  await getChatHistoryService(roomUuid, router);
});
</script>

<template>
  <Layout>
    <template #chat>
      <div class="w-1/2 mx-auto">
        <div class="grid grid-cols-2 auto-rows-min gap-y-4">
          <template v-for="(messageObject, index) in chatHistory" :key="index">
            <UserMessage v-if="messageObject.role === 'user'" :message="messageObject.message" />
            <AssistantMessage v-else :message="messageObject.message" />
          </template>

          <div class="col-start-2 justify-self-end relative mb-10" v-show="isWaitingForResponse">
            <div class="bg-secondary w-fit max-w-full px-4 py-2 rounded-2xl break-words">
              <p class="leading-7">
                {{ messageToSend }}
              </p>
            </div>
            <Icon icon="lucide:loader-circle" class="animate-spin w-4 h-4 absolute right-0 my-2" />
          </div>
        </div>
      </div>
    </template>
    <template #textarea>
      <Textarea @sendMessage="onSendMessage" />
    </template>
  </Layout>
</template>
