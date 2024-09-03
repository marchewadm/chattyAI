import axios from 'axios';
import { handleAxiosError } from '@/utils/utils';
import { useChatStore } from '@/stores/chatStore';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import type { ApiProvidersData } from '@/types/apiKey';
import type { Router } from 'vue-router';

// Set the prefix URL for the AI models routes, just to make the code look cleaner.
const prefixURL = `${import.meta.env.VITE_BACKEND_URL}/api-provider`;

export async function getApiProvidersService(router: Router) {
  const userStore = useUserStore();
  const { accessToken } = storeToRefs(userStore);
  const { setApiProvidersData } = useChatStore();

  try {
    const response = await axios.get<{ api_providers: ApiProvidersData[] }>(`${prefixURL}/all`, {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    });

    setApiProvidersData(response.data.api_providers);
  } catch (err) {
    handleAxiosError(err, router);
  }
}
