import { Link } from "react-router-dom";

const stats = [
  {
    label: "AI Conversations",
    value: "∞",
    icon: "🤖",
  },
  {
    label: "Projects",
    value: "0",
    icon: "💻",
  },
  {
    label: "Files",
    value: "0",
    icon: "📄",
  },
  {
    label: "Locations",
    value: "5",
    icon: "📍",
  },
];

export default function Dashboard() {
  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
            AETHER OS
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Welcome back.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
            Your personal digital workspace for AI,
            development and exploration.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/ai"
              className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              🤖 Open Aether AI
            </Link>

            <Link
              to="/devhub"
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800"
            >
              💻 Open DevHub
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">
                {stat.icon}
              </span>

              <span className="text-2xl font-bold text-white">
                {stat.value}
              </span>
            </div>

            <p className="mt-4 text-sm text-zinc-500">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* Main cards */}
      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* AI */}
        <Link
          to="/ai"
          className="group rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:-translate-y-1 hover:border-violet-500/40"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl">
            🤖
          </div>

          <h2 className="mt-5 text-xl font-semibold text-white">
            Aether AI
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Ask questions, build ideas and work with
            your personal AI assistant.
          </p>

          <span className="mt-5 block text-sm font-medium text-violet-400">
            Open AI →
          </span>
        </Link>

        {/* DevHub */}
        <Link
          to="/devhub"
          className="group rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:-translate-y-1 hover:border-cyan-500/40"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl">
            💻
          </div>

          <h2 className="mt-5 text-xl font-semibold text-white">
            DevHub
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Create projects, manage files and build
            applications inside Aether.
          </p>

          <span className="mt-5 block text-sm font-medium text-cyan-400">
            Open DevHub →
          </span>
        </Link>

        {/* Virtual Varna */}
        <Link
          to="/virtualvarna"
          className="group rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:-translate-y-1 hover:border-emerald-500/40"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-2xl">
            🗺️
          </div>

          <h2 className="mt-5 text-xl font-semibold text-white">
            Virtual Varna
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Explore Varna using an interactive real-world
            map.
          </p>

          <span className="mt-5 block text-sm font-medium text-emerald-400">
            Explore Varna →
          </span>
        </Link>
      </section>

      {/* Quick actions */}
      <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="text-xl font-semibold text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Jump directly into your workspace.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction
            to="/ai"
            icon="✨"
            title="Ask Aether"
          />

          <QuickAction
            to="/devhub"
            icon="➕"
            title="New Project"
          />

          <QuickAction
            to="/virtualvarna"
            icon="📍"
            title="Explore Varna"
          />

          <QuickAction
            to="/settings"
            icon="⚙️"
            title="Settings"
          />
        </div>
      </section>

      {/* Footer */}
      <div className="py-8 text-center text-xs text-zinc-700">
        Aether • Your digital workspace
      </div>
    </div>
  );
}

function QuickAction({
  to,
  icon,
  title,
}: {
  to: string;
  icon: string;
  title: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 transition hover:border-zinc-700 hover:bg-zinc-900"
    >
      <span className="text-lg">{icon}</span>

      <span className="text-sm font-medium text-zinc-300">
        {title}
      </span>
    </Link>
  );
}