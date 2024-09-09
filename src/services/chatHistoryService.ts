import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { useChatStore } from '@/stores/chatStore';
import { handleAxiosError } from '@/utils/utils';
import type { Router } from 'vue-router';
import type { GetChatHistoryResponse } from '@/types/chatHistory';

const prefixURL = `${import.meta.env.VITE_BACKEND_URL}/chat-history`;

export async function getChatHistoryService(room_uuid: string, router: Router) {
  try {
    const url = `${prefixURL}/${room_uuid}`;

    const userStore = useUserStore();
    const chatStore = useChatStore();
    const { setChatHistoryData } = chatStore;
    const { accessToken } = storeToRefs(userStore);

    const response = await axios.get<GetChatHistoryResponse>(url, {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    });

    setChatHistoryData(response.data);
  } catch (err) {
    const httpStatusCode = handleAxiosError(err, router);

    if (httpStatusCode !== 401) {
      router.push({ name: 'NewChat' });
    }
  }
}

export async function postChatHistoryService(room_uuid: string, message: string, router: Router) {}
