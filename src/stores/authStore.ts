import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { AuthFormType } from '@/types/auth';

export const useAuthStore = defineStore('auth', () => {
  const authFormType = ref<AuthFormType>('login');

  return { authFormType };
});
