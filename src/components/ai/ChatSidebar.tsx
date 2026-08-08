import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { useState } from "react";
import type { Conversation } from "../../types/conversation";

interface Props {
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onCreateConversation: () => void | Promise<void>;
  onDeleteConversation: (id: string) => void | Promise<void>;
  onRenameConversation: (
    id: string,
    title: string
  ) => void | Promise<void>;
}

export default function ChatSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation,
  onRenameConversation,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  const [editingTitle, setEditingTitle] = useState("");

  function startEditing(
    id: string,
    title: string
  ) {
    setEditingId(id);
    setEditingTitle(title);
  }

  async function saveRename(id: string) {
    if (!editingTitle.trim()) {
      cancelRename();
      return;
    }

    await onRenameConversation(
      id,
      editingTitle.trim()
    );

    setEditingId(null);
    setEditingTitle("");
  }

  function cancelRename() {
    setEditingId(null);
    setEditingTitle("");
  }

  async function handleDelete(id: string) {
    const chat = conversations.find(
      (conversation) => conversation.id === id
    );

    if (!chat) return;

    const confirmed = window.confirm(
      `Delete "${chat.title}"?`
    );

    if (!confirmed) return;

    await onDeleteConversation(id);
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 p-4">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Conversations
          </h2>

          <p className="text-xs text-zinc-500">
            Your Aether chats
          </p>
        </div>

        <button
          onClick={onCreateConversation}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-500"
          title="New Chat"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* New Chat */}
      <div className="p-3">
        <button
          onClick={onCreateConversation}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-violet-600 hover:bg-zinc-800 hover:text-white"
        >
          <Plus size={17} />
          New Chat
        </button>
      </div>

      {/* Conversations */}
      <div className="flex-1 space-y-2 overflow-y-auto px-3 pb-4">
        {conversations.length === 0 ? (
          <div className="px-3 py-8 text-center text-xs text-zinc-600">
            No conversations yet.
          </div>
        ) : (
          conversations.map((chat) => {
            const isActive =
              activeConversationId === chat.id;

            const isEditing =
              editingId === chat.id;

            return (
              <div
                key={chat.id}
                className={`group rounded-xl transition ${
                  isActive
                    ? "bg-violet-600"
                    : "bg-zinc-900 hover:bg-zinc-800"
                }`}
              >
                {isEditing ? (
                  /* Rename mode */
                  <div className="flex items-center gap-1 p-2">
                    <input
                      autoFocus
                      value={editingTitle}
                      onChange={(event) =>
                        setEditingTitle(
                          event.target.value
                        )
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          saveRename(chat.id);
                        }

                        if (event.key === "Escape") {
                          cancelRename();
                        }
                      }}
                      className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-2 py-1.5 text-sm text-white outline-none focus:border-violet-500"
                    />

                    <button
                      onClick={() =>
                        saveRename(chat.id)
                      }
                      className="rounded-lg p-1.5 text-green-400 hover:bg-zinc-800"
                      title="Save"
                    >
                      <Check size={15} />
                    </button>

                    <button
                      onClick={cancelRename}
                      className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      title="Cancel"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  /* Normal mode */
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        onSelectConversation(
                          chat.id
                        )
                      }
                      className="min-w-0 flex-1 px-3 py-3 text-left"
                    >
                      <div
                        className={`truncate text-sm ${
                          isActive
                            ? "font-medium text-white"
                            : "text-zinc-300"
                        }`}
                      >
                        {chat.title}
                      </div>
                    </button>

                    {/* Actions */}
                    <div
                      className={`flex items-center gap-1 pr-2 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      } transition`}
                    >
                      <button
                        onClick={() =>
                          startEditing(
                            chat.id,
                            chat.title
                          )
                        }
                        className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
                        title="Rename"
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(chat.id)
                        }
                        className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-red-500/20 hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}