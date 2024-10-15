import axios from 'axios';
import type { ApiProviderState } from '@/types/apiKeys.types';
import type { ChatMessage, ChatRoomDetails, ChatRoomDetailsPayload } from '@/types/chat.types';

const PREFIX_URL = `${import.meta.env.VITE_BACKEND_URL}/chat-history`;

const CHAT_API_PROVIDERS_URLS: Record<string, string> = {
  openai: `${import.meta.env.VITE_BACKEND_URL}/openai/chat`
};

export async function getChatHistoryClient(roomUuid: string, accessToken: string) {
  return axios.get<Required<ChatRoomDetails>>(`${PREFIX_URL}/${roomUuid}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
}

export async function postChatHistoryClient(
  chatHistoryPayload: ChatRoomDetailsPayload,
  provider: ApiProviderState,
  accessToken: string
) {
  return axios.post<Required<ChatMessage>>(
    CHAT_API_PROVIDERS_URLS[provider.lowerCaseName],
    chatHistoryPayload,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );
}
