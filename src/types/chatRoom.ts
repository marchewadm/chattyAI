export type ChatRoom = {
  roomUuid: string;
  lastMessage: string;
  lastMessageSentAt?: string;
  apiProviderId: number;
};

export type GetChatRoomsResponse = {
  chatRooms: ChatRoom[];
};
