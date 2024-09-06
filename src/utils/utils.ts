import { toRaw } from 'vue';
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

export const handleAxiosError = (err: unknown, router?: Router) => {
  if (!(err instanceof AxiosError)) {
    console.error(err);
    return;
  }

  const userStore = useUserStore();
  const { $reset } = userStore;
  const { toast } = useToast();

  const httpStatusCode = err.response?.status;
  const detail = err.response?.data.detail;

  if (httpStatusCode !== 422) {
    toast({
      title: 'Error',
      description: detail ?? 'An error occurred. Please try again.',
      variant: 'destructive'
    });
  } else {
    // TODO: Add a more specific error message for the user.
    toast({
      title: 'Error',
      description: 'Provided data is invalid. Please check your input and try again.',
      variant: 'destructive'
    });
  }

  if (httpStatusCode === 401) {
    // If the user is not authenticated, reset the user store and redirect them to the Home route.
    $reset();
    router?.push({ name: 'Home' });
  } else {
    // OPTIONAL: If the user is authenticated but the request fails, return the response status code. This allows the caller function to handle the error appropriately, such as redirecting the user to a different route.
    return httpStatusCode;
  }
};

export const toRawDeep = <T>(observed: T): T => {
  const val = toRaw(observed);

  if (Array.isArray(val)) {
    return val.map(toRawDeep) as T;
  }

  if (val === null) return null as T;

  if (typeof val === 'object') {
    const entries = Object.entries(val).map(([key, val]) => [key, toRawDeep(val)]);

    return Object.fromEntries(entries);
  }

  return val;
};
