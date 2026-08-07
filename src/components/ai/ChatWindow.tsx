import { useEffect, useRef } from "react";
import Message from "./Message";
import type { ChatMessage } from "../../types/chat";

interface Props {
  messages: ChatMessage[];
  isThinking: boolean;
  streamingText: string;
}

export default function ChatWindow({
  messages,
  isThinking,
  streamingText,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isThinking, streamingText]);

  return (
    <div className="flex-1 overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 space-y-6">
      {messages.map((message) => (
        <Message
          key={message.id}
          role={message.role}
          text={message.text}
        />
      ))}

      {isThinking && (
        <div className="flex justify-start">
          <div className="rounded-2xl bg-zinc-800 px-5 py-4 text-zinc-400 animate-pulse">
            ⚡ Aether is thinking...
          </div>
        </div>
      )}

      {streamingText && (
        <Message
          role="assistant"
          text={streamingText}
        />
      )}

      <div ref={bottomRef} />
    </div>
  );
}