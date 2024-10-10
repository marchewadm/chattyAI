import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ChatRoom } from '@/types/chat.types';
import type { ApiProviderState, ApiProviderDetails } from '@/types/apiKeys.types';

export const useChatStore = defineStore('chat', () => {
  const apiProvider = ref<ApiProviderState | null>(null);
  const apiProviders = ref<ApiProviderState[]>([]);
  const aiModel = ref<string | null>(null);
  const customInstructions = ref<string>('You are a helpful assistant.');
  const chatRooms = ref<ChatRoom[]>([]);

  const setChatRooms = (chatRoomsData: ChatRoom[]) => {
    chatRooms.value = chatRoomsData.map((chatRoom) => {
      return {
        roomUuid: chatRoom.roomUuid,
        lastMessage: chatRoom.lastMessage,
        apiProviderId: chatRoom.apiProviderId
      };
    });
  };

  const setApiProviders = (apiProvidersData: ApiProviderDetails[]) => {
    apiProviders.value = apiProvidersData.map((apiProvider) => {
      return {
        name: apiProvider.name,
        lowerCaseName: apiProvider.name.toLowerCase(),
        aiModels: apiProvider.aiModels,
        apiProviderId: apiProvider.id,
        isSelected: false
      };
    });
  };

  const updateChatRoomLastMessage = (roomUuid: string, lastMessage: string) => {
    chatRooms.value = chatRooms.value.map((chatRoom) =>
      chatRoom.roomUuid === roomUuid ? { ...chatRoom, lastMessage } : chatRoom
    );
  };

  return {
    apiProvider,
    apiProviders,
    aiModel,
    customInstructions,
    chatRooms,
    setChatRooms,
    setApiProviders,
    updateChatRoomLastMessage
  };
});
