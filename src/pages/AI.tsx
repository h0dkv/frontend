import { useEffect, useState } from "react";

import ChatSidebar from "../components/ai/ChatSidebar";
import ChatWindow from "../components/ai/ChatWindow";
import ChatInput from "../components/ai/ChatInput";
import FileExplorer from "../components/ai/FileExplorer";

import type { ChatMessage } from "../types/chat";
import type { Conversation } from "../types/conversation";

import { sendChatMessage } from "../services/chat";

import {
  loadConversations,
  loadConversation,
  createConversation as dbCreateConversation,
  saveMessage,
} from "../services/database";

export default function AI() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openedFile, setOpenedFile] = useState<{
    name: string;
    content: string;
  } | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [streamingText, setStreamingText] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const chats = await loadConversations();

        console.log("Aether conversations:", chats);

        if (chats.length === 0) {
          const first = await dbCreateConversation("New Chat");

          setConversations([
            {
              id: first.id,
              title: first.title,
              messages: [],
            },
          ]);

          setActiveConversationId(first.id);
        } else {
          setConversations(
            chats.map((chat) => ({
              id: chat.id,
              title: chat.title,
              messages: [],
            }))
          );

          setActiveConversationId(chats[0].id);
        }
      } catch (error) {
        console.error("Failed to load Aether:", error);

        // Allow Aether to open even if the database is unavailable.
        const localConversation: Conversation = {
          id: crypto.randomUUID(),
          title: "New Chat",
          messages: [
            {
              id: crypto.randomUUID(),
              role: "assistant",
              text: "👋 Hello! I'm Aether. What would you like to build today?",
            },
          ],
        };

        setConversations([localConversation]);
        setActiveConversationId(localConversation.id);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId
  );

  useEffect(() => {
    if (!activeConversationId) return;

    async function loadMessages() {
      try {
        const conversation =
          await loadConversation(activeConversationId);

        setConversations((prev) =>
          prev.map((chat) =>
            chat.id === activeConversationId
              ? {
                ...chat,
                messages: conversation.messages.map((message) => ({
                  id: message.id,
                  role: message.role,
                  text: message.text,
                })),
              }
              : chat
          )
        );
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    }

    loadMessages();
  }, [activeConversationId]);

  async function createConversation() {
    try {
      const chat = await dbCreateConversation(
        `Chat ${conversations.length + 1}`
      );

      setConversations((prev) => [
        ...prev,
        {
          id: chat.id,
          title: chat.title,
          messages: [],
        },
      ]);

      setActiveConversationId(chat.id);
      setStreamingText("");
      setIsThinking(false);
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  }

  async function sendMessage(text: string) {
    if (!text.trim()) return;
    if (!activeConversation) return;
    if (isThinking) return;

    const conversationId = activeConversation.id;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
    };

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? {
            ...conversation,
            messages: [
              ...conversation.messages,
              userMessage,
            ],
          }
          : conversation
      )
    );

    try {
      await saveMessage(
        conversationId,
        "user",
        text
      );

      setIsThinking(true);
      setStreamingText("");

      const result = await sendChatMessage(
        text,
        conversationId
      );

      const reply = result.reply;

      if (result.fileResult?.success) {
        console.log(
          "✅ Aether created:",
          result.fileResult.file
        );
      }
      setIsThinking(false);

      for (let i = 0; i < reply.length; i++) {
        await new Promise((resolve) =>
          setTimeout(resolve, 8)
        );

        setStreamingText(reply.slice(0, i + 1));
      }

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: reply,
      };

      await saveMessage(
        conversationId,
        "assistant",
        reply
      );

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === conversationId
            ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                assistantMessage,
              ],
            }
            : conversation
        )
      );

      setStreamingText("");
    } catch (error) {
      console.error("Aether chat error:", error);

      setIsThinking(false);
      setStreamingText("");

      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "❌ Backend is unavailable.",
      };

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === conversationId
            ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                errorMessage,
              ],
            }
            : conversation
        )
      );
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-zinc-400">
        Loading Aether...
      </div>
    );
  }

  if (!activeConversation) {
    return (
      <div className="flex h-full items-center justify-center text-red-400">
        Failed to initialize Aether.
      </div>
    );
  }

  return (
    <div className="flex h-full gap-6">
      <ChatSidebar
        conversations={conversations}
        activeId={activeConversationId}
        onSelect={setActiveConversationId}
        onNewChat={createConversation}
      />

      <FileExplorer
        onOpenFile={(name, content) => {
          setOpenedFile({
            name,
            content,
          });
        }}
      />

      <div className="flex flex-1 flex-col">
        {openedFile && (
          <div className="mb-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
              <span className="text-sm text-zinc-300">
                📄 {openedFile.name}
              </span>

              <button
                onClick={() => setOpenedFile(null)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <pre className="max-h-80 overflow-auto p-4 text-sm text-zinc-300">
              <code>{openedFile.content}</code>
            </pre>
          </div>
        )}

        <ChatWindow
          messages={activeConversation.messages}
          isThinking={isThinking}
          streamingText={streamingText}
        />

        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}