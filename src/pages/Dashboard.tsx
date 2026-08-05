export default function Dashboard() {
  return (
    <>
      <h1 className="mb-2 text-4xl font-bold">
        Welcome back 👋
      </h1>

      <p className="mb-10 text-zinc-400">
        Your Aether workspace is ready.
      </p>

      <div className="grid grid-cols-3 gap-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-2 text-xl font-semibold">
            🤖 Aether AI
          </h2>

          <p className="text-zinc-400">
            Your intelligent assistant.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-2 text-xl font-semibold">
            💻 DevHub
          </h2>

          <p className="text-zinc-400">
            Manage your projects.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-2 text-xl font-semibold">
            🌍 VirtualVarna
          </h2>

          <p className="text-zinc-400">
            Explore Varna digitally.
          </p>
        </div>
      </div>
    </>
  );
}