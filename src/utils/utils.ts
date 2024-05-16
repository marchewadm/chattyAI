import { useColorMode } from '@vueuse/core';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { AxiosError } from 'axios';
import { useToast } from '@/components/ui/toast';
import { useUserStore } from '@/stores/userStore';

import type { AuthFormType } from '@/types/auth';
import type { Router } from 'vue-router';

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

export const handleAxiosError = (err: unknown, router: Router) => {
  if (err instanceof AxiosError) {
    const userStore = useUserStore();
    const { $reset } = userStore;
    const { toast } = useToast();

    toast({
      title: 'Error',
      description: err.response?.data.message,
      variant: 'destructive'
    });

    if (err.response?.status === 401) {
      // If the user is not authenticated, reset the user store and redirect them to the Home route.
      $reset();
      router.push({ name: 'Home' });
    }
  } else {
    console.error(err);
  }
};
