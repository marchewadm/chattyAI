import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { handleAxiosError } from '@/utils/utils';
import type { Router } from 'vue-router';
import type { ApiKeysData } from '@/types/zodInferredTypes';

// Set the prefix URL for the api keys routes, just to make the code look cleaner.
const prefixURL = `${import.meta.env.VITE_BACKEND_URL}/api-keys`;

export async function getApiKeysService(router: Router) {
  const userStore = useUserStore();
  const { accessToken } = storeToRefs(userStore);
  const { setUserApiKeysData } = userStore;

  try {
    const response = await axios.get(`${prefixURL}/`, {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    });

    setUserApiKeysData(response.data);
  } catch (err) {
    handleAxiosError(err, router);
  }
}

export async function updateApiKeysService(apiKeysData: ApiKeysData, router: Router) {
  const userStore = useUserStore();
  const { accessToken } = storeToRefs(userStore);

  try {
    const url = `${prefixURL}/update`;

    await axios.patch(url, apiKeysData.apiKeys, {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    });
  } catch (err) {
    handleAxiosError(err, router);
  }
}
