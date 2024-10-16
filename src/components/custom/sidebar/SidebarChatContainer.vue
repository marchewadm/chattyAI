<script setup lang="ts">
import NavigationChat from '@/components/custom/navigation/NavigationChat.vue';
import SidebarChatOpen from '@/components/custom/sidebar/SidebarChatOpen.vue';
import SidebarChatCustomizeModel from '@/components/custom/sidebar/SidebarChatCustomizeModel.vue';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useChatSidebarStore } from '@/stores/chatSidebarStore';

const chatSidebarStore = useChatSidebarStore();
const { isChatSidebarVisible, isModelSidebarVisible } = storeToRefs(chatSidebarStore);

const isSidebarVisible = computed(() => isChatSidebarVisible.value || isModelSidebarVisible.value);
</script>

<template>
  <aside class="flex h-screen">
    <NavigationChat />
    <div
      class="w-72 p-2 border-r"
      v-show="isSidebarVisible"
    >
      <SidebarChatOpen />
      <SidebarChatCustomizeModel />
    </div>
  </aside>
</template>
