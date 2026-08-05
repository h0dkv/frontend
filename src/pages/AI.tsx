import { Send } from "lucide-react";

export default function AI() {
  return (
    <div className="flex h-full flex-col">
      <h1 className="text-4xl font-bold">🤖 Aether AI</h1>

      <p className="mt-2 text-zinc-400">
        Your intelligent development assistant.
      </p>

      <div className="mt-8 flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="space-y-4">
          <div className="max-w-xl rounded-2xl bg-violet-600 p-4">
            Hello, Hristian 👋
            <br />
            What would you like to build today?
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <input
          className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-4 outline-none focus:border-violet-500"
          placeholder="Ask Aether anything..."
        />

        <button className="rounded-xl bg-violet-600 px-6 transition hover:bg-violet-500">
          <Send />
        </button>
      </div>
    </div>
  );
}