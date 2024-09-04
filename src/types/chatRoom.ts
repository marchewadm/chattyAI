export type ChatRoom = {
  roomUuid: string;
  lastMessage: string;
  lastMessageSentAt?: string;
};

export type GetChatRoomsResponse = {
  chatRooms: ChatRoom[];
};
