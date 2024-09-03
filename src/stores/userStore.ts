import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { ref } from 'vue';
import type { UserProfileData } from '@/types/user';

export const useUserStore = defineStore('user', () => {
  const name = ref<string | null>(null);
  const email = ref<string | null>(null);
  const avatar = ref<string | null>(null);
  const isPassphrase = ref<boolean | null>(null);
  const accessToken = useStorage<string | null>('accessToken', null);

  function $reset() {
    name.value = null;
    email.value = null;
    avatar.value = null;
    accessToken.value = null;
  }

  function setAccessToken(token: string) {
    accessToken.value = token;
  }

  function setUserProfileData(userProfileData: UserProfileData) {
    name.value = userProfileData.name;
    email.value = userProfileData.email;
    avatar.value = userProfileData.avatar;
    isPassphrase.value = userProfileData.isPassphrase;
  }

  function updateUserProfileData(partialProfileAccountData: { name?: string }) {
    // Email won't be updated immediately due to the verification process, that's why it's not included here.
    if (partialProfileAccountData.name) name.value = partialProfileAccountData.name;
  }

  return {
    name,
    email,
    avatar,
    isPassphrase,
    accessToken,
    $reset,
    setAccessToken,
    setUserProfileData,
    updateUserProfileData
  };
});
