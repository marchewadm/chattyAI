import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { UserProfile, PartialUserProfile } from '@/types/user.types';

export const useUserStore = defineStore('user', () => {
  const name = ref<string | null>(null);
  const email = ref<string | null>(null);
  const avatar = ref<string | null>(null);
  const isPassphrase = ref<boolean | null>(null);
  const accessToken = useStorage<string | null>('accessToken', null);

  const $reset = () => {
    name.value = null;
    email.value = null;
    avatar.value = null;
    accessToken.value = null;
  };

  const setAccessToken = (token: string) => {
    accessToken.value = token;
  };

  const setUserProfile = (userProfile: UserProfile) => {
    name.value = userProfile.name;
    email.value = userProfile.email;
    avatar.value = userProfile.avatar;
    isPassphrase.value = userProfile.isPassphrase;
  };

  const updateUserProfile = (partialUserProfile: PartialUserProfile) => {
    // Email won't be updated immediately due to the verification process, that's why it's not included here.
    if (partialUserProfile.name) {
      name.value = partialUserProfile.name;
    }
  };

  const isUserAuthenticated = computed(() => accessToken.value !== null);

  return {
    name,
    email,
    avatar,
    isPassphrase,
    accessToken,
    $reset,
    setAccessToken,
    setUserProfile,
    updateUserProfile,
    isUserAuthenticated
  };
});
