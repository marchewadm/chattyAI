import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { useChatRoomStore } from '@/stores/chatRoomStore';
import { handleAxiosError } from '@/utils/utils';
import type { Router } from 'vue-router';
import type { GetChatRoomsResponse } from '@/types/chatRoom';

const prefixURL = `${import.meta.env.VITE_BACKEND_URL}/chat-room`;

export async function getChatRoomsService(router: Router) {
  try {
    const url = `${prefixURL}/all`;

    const userStore = useUserStore();
    const { setChatRoomsData } = useChatRoomStore();
    const { accessToken } = storeToRefs(userStore);

    const response = await axios.get<GetChatRoomsResponse>(url, {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    });

    setChatRoomsData(response.data);
  } catch (err) {
    handleAxiosError(err, router);
  }
}
