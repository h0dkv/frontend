import { useState } from "react";
import ChatSidebar from "../components/ai/ChatSidebar";
import ChatWindow from "../components/ai/ChatWindow";
import ChatInput from "../components/ai/ChatInput";
import type { ChatMessage } from "../types/chat";
import type { Conversation } from "../types/conversation";
import { sendChatMessage } from "../services/chat";

export default function AI() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "👋 Hello! I'm Aether. What would you like to build today?",
        },
      ],
    },
  ]);

  const [activeConversationId, setActiveConversationId] = useState(
    conversations[0].id
  );

  const activeConversation =
    conversations.find((c) => c.id === activeConversationId)!;

  function createConversation() {
    const conversation: Conversation = {
      id: crypto.randomUUID(),
      title: `Chat ${conversations.length + 1}`,
      messages: [
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "👋 New conversation started.",
        },
      ],
    };

    setConversations((prev) => [...prev, conversation]);
    setActiveConversationId(conversation.id);
  }

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
    };

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === activeConversationId
          ? {
              ...conversation,
              messages: [...conversation.messages, userMessage],
            }
          : conversation
      )
    );

    try {
      const reply = await sendChatMessage(text);

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: reply,
      };

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === activeConversationId
            ? {
                ...conversation,
                messages: [...conversation.messages, assistantMessage],
              }
            : conversation
        )
      );
    } catch {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "❌ Backend is unavailable.",
      };

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === activeConversationId
            ? {
                ...conversation,
                messages: [...conversation.messages, assistantMessage],
              }
            : conversation
        )
      );
    }
  }

  return (
    <div className="flex h-full gap-6">
      <ChatSidebar
        conversations={conversations}
        activeId={activeConversationId}
        onSelect={setActiveConversationId}
        onNewChat={createConversation}
      />

      <div className="flex flex-1 flex-col">
        <ChatWindow messages={activeConversation.messages} />
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}