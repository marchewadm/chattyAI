<script setup lang="ts">
import ActiveChat from '@/components/custom/chat/ActiveChat.vue';
import Layout from '@/components/custom/chat/Layout.vue';

import { onBeforeRouteLeave } from 'vue-router';
import { useChatStore } from '@/stores/chatStore';

const { resetChatHistoryData } = useChatStore();

onBeforeRouteLeave(() => {
  resetChatHistoryData();
});
</script>

<template>
  <!-- <Layout> -->
  <ActiveChat />
  <!-- </Layout> -->
</template>
