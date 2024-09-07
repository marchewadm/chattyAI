<script setup lang="ts">
import Layout from '@/components/custom/chat/Layout.vue';
import Textarea from '@/components/custom/chat/Textarea.vue';
import UserMessage from '@/components/custom/chat/UserMessage.vue';
import AssistantMessage from '@/components/custom/chat/AssistantMessage.vue';

import { onBeforeRouteLeave } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';

const chatStore = useChatStore();

const { resetChatHistoryData } = chatStore;
const { chatHistory } = storeToRefs(chatStore);

onBeforeRouteLeave(() => {
  resetChatHistoryData();
});
</script>

<template>
  <Layout>
    <template #chat>
      <div class="w-1/2 mx-auto overflow-y-auto">
        <div class="grid grid-cols-2 auto-rows-min gap-y-4">
          <template v-for="messageObject in chatHistory" :key="messageObject.sentAt">
            <UserMessage v-if="messageObject.role === 'user'" :message="messageObject.message" />
            <AssistantMessage v-else :message="messageObject.message" />
          </template>
        </div>
      </div>
    </template>
    <template #textarea>
      <Textarea />
    </template>
  </Layout>
</template>
