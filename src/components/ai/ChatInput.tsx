import { useState } from "react";
import { Send } from "lucide-react";

interface Props {
  onSend: (text: string) => void;
}

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");

  function handleSend() {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  }

  return (
    <div className="mt-6 flex gap-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
        placeholder="Message Aether..."
        className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-4 outline-none focus:border-violet-500"
      />

      <button
        onClick={handleSend}
        className="rounded-2xl bg-violet-600 px-6 transition hover:bg-violet-500"
      >
        <Send size={20} />
      </button>
    </div>
  );
}