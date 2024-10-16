export type ChatRoom = {
  roomUuid: string;
  lastMessage: string;
  apiProviderId: number;
};

export type ChatRoomDetails = {
  roomUuid?: string;
  aiModel: string;
  customInstructions?: string;
  messages: ChatMessageDetails[];
};

export type ChatRoomDetailsPayload = ChatRoomDetails & {
  apiProviderId: number;
};

export type ChatMessage = {
  roomUuid?: string;
  message: string;
};

export type ChatMessageDetails = {
  message: string;
  role: 'user' | 'assistant';
  isDeliveredRealTime?: boolean;
};
