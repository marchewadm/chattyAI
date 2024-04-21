import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const authFormType = ref<'login' | 'register' | 'resetPassword'>('login');

  return { authFormType };
});
