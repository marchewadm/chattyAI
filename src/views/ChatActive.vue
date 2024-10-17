<script setup lang="ts">
import LayoutChat from '@/layouts/LayoutChat.vue';
import TextareaChat from '@/components/custom/textarea/TextareaChat.vue';
import MessageUser from '@/components/custom/message/MessageUser.vue';
import MessageAssistant from '@/components/custom/message/MessageAssistant.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useRoute, useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import { getChatHistoryService, postChatHistoryService } from '@/services/chatHistoryService';
import { getUserProfileService } from '@/services/userService';
import { getApiProvidersService } from '@/services/apiProviderService';
import { getChatRoomsService } from '@/services/chatRoomService';

const route = useRoute();
const router = useRouter();

const chatStore = useChatStore();
const { chatMessages } = storeToRefs(chatStore);
const { resetChatHistory, updateChatRoomLastMessage } = chatStore;

const isPending = ref(false);
const messageToSend = ref('');

const onSendMessage = async (message: string) => {
  if (isPending.value) return;

  messageToSend.value = message;
  isPending.value = true;

  const roomUuid = route.params.room_uuid as string;
  const response = await postChatHistoryService({ roomUuid, message }, router);

  if (response) {
    chatMessages.value.push({ message, role: 'user' });
    chatMessages.value.push({
      message: response.message,
      role: 'assistant',
      isDeliveredRealTime: true,
      apiProviderId: response.apiProviderId
    });

    updateChatRoomLastMessage(roomUuid, response.message);
  }

  isPending.value = false;
  messageToSend.value = '';
};

onBeforeRouteUpdate(async (to) => {
  const roomUuid = to.params.room_uuid as string;

  resetChatHistory();
  await getUserProfileService(router);
  await getApiProvidersService(router);
  await getChatRoomsService(router);
  await getChatHistoryService(roomUuid, router);
});

onBeforeRouteLeave(() => {
  resetChatHistory();
});
</script>

<template>
  <LayoutChat>
    <template #chatContent>
      <div class="w-1/2 mx-auto">
        <div class="grid grid-cols-2 auto-rows-min, gap-y-4">
          <template
            v-for="(messageObject, index) in chatMessages"
            :key="index"
          >
            <MessageUser
              v-if="messageObject.role === 'user'"
              :message="messageObject.message"
            />
            <MessageAssistant
              v-else
              :message="messageObject.message"
              :isAnimated="messageObject.isDeliveredRealTime"
              :apiProviderId="messageObject.apiProviderId!"
            />
          </template>
          <div
            class="relative mb-10 col-start-2 justify-self-end"
            v-show="isPending"
          >
            <div class="w-fit max-w-full bg-secondary py-2 px-4 rounded-2xl break-words">
              <p class="leading-7">
                {{ messageToSend }}
              </p>
            </div>
            <Icon
              icon="tabler:loader-2"
              class="absolute w-4 h-4 my-2 right-0 animate-spin"
            />
          </div>
        </div>
      </div>
    </template>
    <template #textareaContent>
      <TextareaChat @sendMessage="onSendMessage" />
    </template>
  </LayoutChat>
</template>
