import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', () => {
  const aiModel = ref<string>('GPT-3.5');

  return { aiModel };
});
