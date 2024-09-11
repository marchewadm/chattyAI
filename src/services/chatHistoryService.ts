import axios from 'axios';
import { toRaw } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { useChatStore } from '@/stores/chatStore';
import { handleAxiosError } from '@/utils/utils';
import type { Router } from 'vue-router';
import type {
  GetChatHistoryResponse,
  ChatMessage,
  PostChatHistoryRequest,
  PostChatHistoryResponse
} from '@/types/chatHistory';

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

export async function postOpenAiChatHistoryService(
  chatHistoryData: PostChatHistoryRequest,
  accessToken: string
) {
  const url = `${import.meta.env.VITE_BACKEND_URL}/openai/chat`;

  const response = await axios.post<PostChatHistoryResponse>(url, chatHistoryData, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  return response.data;
}

export async function postChatHistoryService(chatMessageData: ChatMessage, router: Router) {
  try {
    const chatStore = useChatStore();
    const userStore = useUserStore();

    const { accessToken } = storeToRefs(userStore);
    const { apiProvider, aiModel, customInstructions, chatHistory } = storeToRefs(chatStore);

    if (!accessToken.value) {
      console.log('Access token is not set');
      return;
    }
    if (!apiProvider.value || !aiModel.value) {
      console.log('API Provider is not set');
      return;
    }

    // TODO: Refactor this to use a better approach, such as a loading spinner and displaying the user's message immediately.
    // ---------------------------------------------------------------------------
    // Clone chat history to send it to the backend and wait for the response.
    // When the response is received, the original chat history will be updated.
    // This is done to prevent displaying the user's message before the response is received.
    const clonedChatHistory = structuredClone(toRaw(chatHistory.value));
    clonedChatHistory.push({
      message: chatMessageData.message,
      role: 'user'
    });

    const chatHistoryData: PostChatHistoryRequest = {
      roomUuid: chatMessageData.roomUuid,
      apiProviderId: apiProvider.value.apiProviderId,
      aiModel: aiModel.value,
      customInstructions: customInstructions.value,
      messages: clonedChatHistory
    };

    switch (apiProvider.value.value) {
      case 'openai':
        return await postOpenAiChatHistoryService(chatHistoryData, accessToken.value);
    }
  } catch (err) {
    handleAxiosError(err, router);
  }
}
