export type ChatRoom = {
  roomUuid: string;
  lastMessage: string;
  apiProviderId: number;
};

export type GetChatRoomsResponse = {
  chatRooms: ChatRoom[];
};
