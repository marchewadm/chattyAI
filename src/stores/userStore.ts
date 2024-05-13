import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useUserStore = defineStore('user', () => {
  const accessToken = useStorage<string | null>('accessToken', null);

  function setAccessToken(token: string) {
    accessToken.value = token;
  }

  return { accessToken, setAccessToken };
});
