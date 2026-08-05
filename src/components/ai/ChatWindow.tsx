import Message from "./Message";
import type { ChatMessage } from "../../types/chat";

interface Props {
  messages: ChatMessage[];
}

export default function ChatWindow({ messages }: Props) {
  return (
    <div className="flex-1 overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 space-y-6">
      {messages.map((message) => (
        <Message
          key={message.id}
          role={message.role}
          text={message.text}
        />
      ))}
    </div>
  );
}