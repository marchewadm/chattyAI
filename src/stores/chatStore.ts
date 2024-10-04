import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ChatRoom } from '@/types/chat.types';
import type { ApiProvider } from '@/types/apiKeys.types';

export const useChatStore = defineStore('chat', () => {
  const apiProvider = ref<ApiProvider | null>(null);
  const apiProviders = ref<ApiProvider[]>([]);
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
    updateChatRoomLastMessage
  };
});
