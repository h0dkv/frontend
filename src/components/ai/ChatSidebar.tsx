import { Plus } from "lucide-react";
import type { Conversation } from "../../types/conversation";

interface Props {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

export default function ChatSidebar({
  conversations,
  activeId,
  onSelect,
  onNewChat,
}: Props) {
  return (
    <aside className="w-72 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
      <button
        onClick={onNewChat}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 transition hover:bg-violet-500"
      >
        <Plus size={18} />
        New Chat
      </button>

      <div className="space-y-2">
        {conversations.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`w-full rounded-xl p-3 text-left transition ${
              activeId === chat.id
                ? "bg-violet-600 text-white"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            {chat.title}
          </button>
        ))}
      </div>
    </aside>
  );
}