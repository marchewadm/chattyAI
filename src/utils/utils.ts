import { useColorMode } from '@vueuse/core';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import type { AuthFormType } from '@/types/auth';

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const toggleColorMode = () => {
  const mode = useColorMode();

  mode.value = mode.value === 'dark' ? 'light' : 'dark';
};

export const handleAuthFormTypeChange = (newAuthFormType: AuthFormType) => {
  const authStore = useAuthStore();
  const { authFormType } = storeToRefs(authStore);

  authFormType.value = newAuthFormType;
};
