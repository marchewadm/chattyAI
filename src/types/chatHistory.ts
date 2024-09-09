export type GetChatHistoryResponse = {
  roomUuid: string;
  aiModel: string;
  messages: [
    {
      message: string;
      sentAt: string;
      role: 'user' | 'assistant';
    }
  ];
};

export type ChatHistory = {
  message: string;
  sentAt: string;
  role: 'user' | 'assistant';
};
