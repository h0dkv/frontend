import type { ChatMessage } from "./chat";

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
}