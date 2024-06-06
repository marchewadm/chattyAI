import axios from 'axios';
import { handleAxiosError } from '@/utils/utils';
import { useChatStore } from '@/stores/chatStore';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import type { AiModelsData } from '@/types/apiKey';
import type { Router } from 'vue-router';

// Set the prefix URL for the AI models routes, just to make the code look cleaner.
const prefixURL = `${import.meta.env.VITE_BACKEND_URL}/ai-models`;

export async function getAiModelsService(router: Router) {
  const userStore = useUserStore();
  const { accessToken } = storeToRefs(userStore);
  const { setAiModelsData } = useChatStore();

  try {
    const response = await axios.get<AiModelsData>(`${prefixURL}/`, {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    });

    setAiModelsData(response.data);
  } catch (err) {
    handleAxiosError(err, router);
  }
}
