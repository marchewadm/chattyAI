import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useChatSidebarStore = defineStore('chatSidebar', () => {
  const isChatSidebarVisible = ref(true);
  const isModelSidebarVisible = ref(false);

  const toggleChatSidebar = () => {
    isChatSidebarVisible.value = !isChatSidebarVisible.value;

    if (isChatSidebarVisible.value) {
      isModelSidebarVisible.value = false;
    }
  };

  const toggleModelSidebar = () => {
    isModelSidebarVisible.value = !isModelSidebarVisible.value;

    if (isModelSidebarVisible.value) {
      isChatSidebarVisible.value = false;
    }
  };

  const isSidebarVisible = computed(
    () => isChatSidebarVisible.value || isModelSidebarVisible.value
  );

  return {
    isChatSidebarVisible,
    isModelSidebarVisible,
    isSidebarVisible,
    toggleChatSidebar,
    toggleModelSidebar
  };
});
