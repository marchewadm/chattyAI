import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { useChatStore } from '@/stores/chatStore';
import { storeToRefs } from 'pinia';
import { handleAxiosError } from '@/utils/utils';
import { useToast } from '@/components/ui/toast';
import type { Router } from 'vue-router';
import type { ApiKeysData } from '@/types/zodInferredTypes';
import type { ApiKeyData } from '@/types/apiKey';

// Set the prefix URL for the api keys routes, just to make the code look cleaner.
const prefixURL = `${import.meta.env.VITE_BACKEND_URL}/api-keys`;

const { toast } = useToast();

export async function getApiKeysService(router: Router) {
  const userStore = useUserStore();
  const { accessToken } = storeToRefs(userStore);
  const { setUserApiKeysData } = useChatStore();

  try {
    const response = await axios.get<ApiKeyData[]>(`${prefixURL}/`, {
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

    const response = await axios.patch<{ message: string }>(url, apiKeysData.apiKeys, {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    });

    toast({
      title: 'Success',
      description: response.data.message
    });
  } catch (err) {
    handleAxiosError(err, router);
  }
}
