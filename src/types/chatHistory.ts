export type GetChatHistoryResponse = {
  roomUuid: string;
  aiModel: string;
  customInstructions: string;
  messages: ChatHistory[];
};

export type ChatHistory = {
  message: string;
  role: 'user' | 'assistant';
};

export type ChatMessage = {
  roomUuid?: string;
  message: string;
};

export type PostChatHistoryRequest = {
  roomUuid?: string;
  apiProviderId: number;
  aiModel: string;
  customInstructions?: string;
  messages: ChatHistory[];
};

export type PostChatHistoryResponse = {
  roomUuid: string;
  message: string;
};
