import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ChatRoom, GetChatRoomsResponse } from '@/types/chatRoom';

export const useChatRoomStore = defineStore('chatRoom', () => {
  const chatRooms = ref<ChatRoom[]>([]);

  function setChatRoomsData(chatRoomsData: GetChatRoomsResponse) {
    chatRooms.value = chatRoomsData.chatRooms.map((chatRoom) => {
      return {
        roomUuid: chatRoom.roomUuid,
        lastMessage: chatRoom.lastMessage,
        apiProviderId: chatRoom.apiProviderId
      };
    });
  }

  function updateChatRoomLastMessage(roomUuid: string, lastMessage: string) {
    chatRooms.value = chatRooms.value.map((chatRoom) =>
      chatRoom.roomUuid === roomUuid ? { ...chatRoom, lastMessage } : chatRoom
    );
  }

  return { chatRooms, setChatRoomsData, updateChatRoomLastMessage };
});
