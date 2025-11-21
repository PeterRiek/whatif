export type ChatMessage = {
  isUser: boolean;
  content: string;
};

export type ChatConversation = {
  chatMessages: ChatMessage[];
};
