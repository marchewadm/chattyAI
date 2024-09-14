<script setup lang="ts">
import Layout from '@/components/custom/chat/Layout.vue';
import Textarea from '@/components/custom/chat/Textarea.vue';
import UserMessage from '@/components/custom/chat/UserMessage.vue';
import AssistantMessage from '@/components/custom/chat/AssistantMessage.vue';

import { useRoute, useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import { useChatRoomStore } from '@/stores/chatRoomStore';

import { getChatHistoryService, postChatHistoryService } from '@/services/chatHistoryService';
import { getUserProfileService } from '@/services/userService';
import { getApiProvidersService } from '@/services/apiProviderService';
import { getChatRoomsService } from '@/services/chatRoomService';

const route = useRoute();
const router = useRouter();

const chatStore = useChatStore();
const { updateChatRoomLastMessage } = useChatRoomStore();

const { resetChatHistoryData } = chatStore;
const { chatHistory } = storeToRefs(chatStore);

const onSendMessage = async (message: string) => {
  // TODO: Add some lock if the message was sent and there is a server response pending
  const roomUuid = route.params.room_uuid as string;
  const response = await postChatHistoryService({ roomUuid, message }, router);

  if (response) {
    chatHistory.value.push({ message, role: 'user' });
    chatHistory.value.push({ message: response.message, role: 'assistant' });
    updateChatRoomLastMessage(roomUuid, response.message);
  }
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
        </div>
      </div>
    </template>
    <template #textarea>
      <Textarea @sendMessage="onSendMessage" />
    </template>
  </Layout>
</template>
