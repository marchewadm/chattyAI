import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ChatRoom, GetChatRoomsResponse } from '@/types/chatRoom';

export const useChatRoomStore = defineStore('chatRoom', () => {
  const chatRooms = ref<ChatRoom[]>([]);

  function setChatRoomsData(ChatRoomsData: GetChatRoomsResponse) {
    chatRooms.value = ChatRoomsData.chatRooms;
  }

  return { chatRooms, setChatRoomsData };
});
