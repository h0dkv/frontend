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
  deleteConversation,
  renameConversation,
} from "../services/database";

export default function AI() {
  const [conversations, setConversations] = useState<
    Conversation[]
  >([]);

  const [activeConversationId, setActiveConversationId] =
    useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [openedFile, setOpenedFile] = useState<{
    name: string;
    content: string;
  } | null>(null);

  const [isThinking, setIsThinking] = useState(false);
  const [streamingText, setStreamingText] = useState("");

  /*
   * Load conversations when Aether opens
   */
  useEffect(() => {
    async function load() {
      try {
        const chats = await loadConversations();

        console.log("Aether conversations:", chats);

        if (chats.length === 0) {
          const first =
            await dbCreateConversation("New Chat");

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
        console.error(
          "Failed to load Aether:",
          error
        );

        /*
         * Fallback conversation if backend/database
         * is temporarily unavailable.
         */
        const localConversation: Conversation = {
          id: crypto.randomUUID(),
          title: "New Chat",
          messages: [
            {
              id: crypto.randomUUID(),
              role: "assistant",
              text:
                "👋 Hello! I'm Aether. What would you like to build today?",
            },
          ],
        };

        setConversations([localConversation]);
        setActiveConversationId(
          localConversation.id
        );
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  /*
   * Currently selected conversation
   */
  const activeConversation =
    conversations.find(
      (conversation) =>
        conversation.id === activeConversationId
    );

  /*
   * Load messages whenever the selected conversation changes
   */
  useEffect(() => {
    if (!activeConversationId) return;

    async function loadMessages() {
      try {
        const conversation =
          await loadConversation(
            activeConversationId
          );

        setConversations((prev) =>
          prev.map((chat) =>
            chat.id === activeConversationId
              ? {
                  ...chat,
                  title: conversation.title,
                  messages:
                    conversation.messages.map(
                      (message) => ({
                        id: message.id,
                        role: message.role,
                        text: message.text,
                      })
                    ),
                }
              : chat
          )
        );
      } catch (error) {
        console.error(
          "Failed to load messages:",
          error
        );
      }
    }

    loadMessages();
  }, [activeConversationId]);

  /*
   * Create a new conversation
   */
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
      setOpenedFile(null);
    } catch (error) {
      console.error(
        "Failed to create conversation:",
        error
      );
    }
  }

  /*
   * Delete conversation
   */
  async function deleteChat(id: string) {
    try {
      await deleteConversation(id);

      const remaining = conversations.filter(
        (chat) => chat.id !== id
      );

      setConversations(remaining);

      /*
       * If the deleted conversation was active,
       * select another one.
       */
      if (activeConversationId === id) {
        if (remaining.length > 0) {
          setActiveConversationId(
            remaining[0].id
          );
        } else {
          const newChat =
            await dbCreateConversation(
              "New Chat"
            );

          setConversations([
            {
              id: newChat.id,
              title: newChat.title,
              messages: [],
            },
          ]);

          setActiveConversationId(newChat.id);
        }
      }

      setStreamingText("");
      setIsThinking(false);
      setOpenedFile(null);
    } catch (error) {
      console.error(
        "Failed to delete conversation:",
        error
      );
    }
  }

  /*
   * Rename conversation
   */
  async function renameChat(
    id: string,
    title: string
  ) {
    if (!title.trim()) return;

    try {
      const updated =
        await renameConversation(
          id,
          title.trim()
        );

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === id
            ? {
                ...chat,
                title: updated.title,
              }
            : chat
        )
      );
    } catch (error) {
      console.error(
        "Failed to rename conversation:",
        error
      );
    }
  }

  /*
   * Send a message to Aether
   */
  async function sendMessage(text: string) {
    if (!text.trim()) return;
    if (!activeConversation) return;
    if (isThinking) return;

    const conversationId =
      activeConversation.id;

    /*
     * Immediately show user message
     */
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
      /*
       * Save user message
       */
      await saveMessage(
        conversationId,
        "user",
        text
      );

      setIsThinking(true);
      setStreamingText("");

      /*
       * Ask Aether
       */
      const result =
        await sendChatMessage(
          text,
          conversationId
        );

      const reply = result.reply;

      /*
       * File creation result
       */
      if (result.fileResult?.success) {
        console.log(
          "✅ Aether created:",
          result.fileResult.file
        );
      }

      setIsThinking(false);

      /*
       * Simulated streaming effect
       */
      for (
        let i = 0;
        i < reply.length;
        i++
      ) {
        await new Promise((resolve) =>
          setTimeout(resolve, 8)
        );

        setStreamingText(
          reply.slice(0, i + 1)
        );
      }

      /*
       * Save assistant response
       */
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

      /*
       * Add assistant message to UI
       */
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
      console.error(
        "Aether chat error:",
        error
      );

      setIsThinking(false);
      setStreamingText("");

      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text:
          "❌ Backend is unavailable.",
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

  /*
   * Loading state
   */
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-zinc-950">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-xl font-bold text-white shadow-lg shadow-violet-600/20">
            A
          </div>

          <p className="text-sm text-zinc-500">
            Loading Aether...
          </p>
        </div>
      </div>
    );
  }

  /*
   * No active conversation
   */
  if (!activeConversation) {
    return (
      <div className="flex h-full items-center justify-center bg-zinc-950">
        <div className="text-center">
          <p className="text-lg font-semibold text-white">
            Failed to initialize Aether.
          </p>

          <button
            onClick={createConversation}
            className="mt-4 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            Create New Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      {/* Chat sidebar */}
      <ChatSidebar
        conversations={conversations}
        activeConversationId={
          activeConversationId
        }
        onSelectConversation={
          setActiveConversationId
        }
        onCreateConversation={
          createConversation
        }
        onDeleteConversation={deleteChat}
        onRenameConversation={renameChat}
      />

      {/* File explorer */}
      <FileExplorer
        onOpenFile={(name, content) => {
          setOpenedFile({
            name,
            content,
          });
        }}
      />

      {/* Main chat area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Opened file */}
        {openedFile && (
          <div className="m-4 mb-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
              <span className="text-sm text-zinc-300">
                📄 {openedFile.name}
              </span>

              <button
                onClick={() =>
                  setOpenedFile(null)
                }
                className="text-zinc-500 transition hover:text-white"
              >
                ✕
              </button>
            </div>

            <pre className="max-h-80 overflow-auto p-4 text-sm text-zinc-300">
              <code>
                {openedFile.content}
              </code>
            </pre>
          </div>
        )}

        {/* Chat */}
        <ChatWindow
          messages={
            activeConversation.messages
          }
          isThinking={isThinking}
          streamingText={streamingText}
        />

        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}