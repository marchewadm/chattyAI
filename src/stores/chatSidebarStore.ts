import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useChatSidebarStore = defineStore('chatSidebar', () => {
  const isChatSidebarVisible = ref(true);

  const toggleChatSidebar = () => {
    isChatSidebarVisible.value = !isChatSidebarVisible.value;
  };

  return {
    isChatSidebarVisible,
    toggleChatSidebar
  };
});
