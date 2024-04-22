import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AuthFormType } from '@/types/auth';

export const useAuthStore = defineStore('auth', () => {
  const authFormType = ref<AuthFormType>('login');

  return { authFormType };
});
