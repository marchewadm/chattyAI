import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { ref } from 'vue';
import type { UserProfileData } from '@/types/user';

export const useUserStore = defineStore('user', () => {
  const name = ref<string | null>(null);
  const email = ref<string | null>(null);
  const avatar = ref<string | null>(null);
  const accessToken = useStorage<string | null>('accessToken', null);

  function setAccessToken(token: string) {
    accessToken.value = token;
  }

  function setUserProfileData(userProfileData: UserProfileData) {
    name.value = userProfileData.name;
    email.value = userProfileData.email;
    avatar.value = userProfileData.avatar;
  }

  return { name, email, avatar, accessToken, setAccessToken, setUserProfileData };
});
