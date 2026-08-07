import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-full space-y-8 p-6">
      {/* Hero */}
      <section className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-violet-600/20 via-zinc-900 to-zinc-950 p-8">
        <p className="mb-2 text-sm font-medium text-violet-400">
          AETHER OS
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          Welcome back.
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Your digital workspace for AI, development,
          projects and everything you're building.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            to="/ai"
            className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500"
          >
            Open Aether AI →
          </Link>

          <Link
            to="/devhub"
            className="rounded-xl border border-zinc-700 px-5 py-3 font-medium text-zinc-200 transition hover:bg-zinc-800"
          >
            DevHub
          </Link>
        </div>
      </section>

      {/* Quick Access */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-white">
          Quick Access
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            icon="🤖"
            title="Aether AI"
            description="Chat, code and build with your AI assistant."
            to="/ai"
          />

          <DashboardCard
            icon="💻"
            title="DevHub"
            description="Your development workspace and projects."
            to="/devhub"
          />

          <DashboardCard
            icon="🌍"
            title="Virtual Varna"
            description="Explore your virtual environment."
            to="/virtualvarna"
          />

          <DashboardCard
            icon="⚙️"
            title="Settings"
            description="Customize your Aether experience."
            to="/settings"
          />
        </div>
      </section>

      {/* Activity */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-white">
          Recent Activity
        </h2>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
          <Activity
            icon="🤖"
            title="Aether AI"
            description="AI workspace is ready"
          />

          <Activity
            icon="💻"
            title="DevHub"
            description="Development environment available"
          />

          <Activity
            icon="📁"
            title="Workspace"
            description="Your project files are ready"
          />
        </div>
      </section>
    </div>
  );
}

interface DashboardCardProps {
  icon: string;
  title: string;
  description: string;
  to: string;
}

function DashboardCard({
  icon,
  title,
  description,
  to,
}: DashboardCardProps) {
  return (
    <Link
      to={to}
      className="group rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 transition hover:-translate-y-1 hover:border-violet-500/50 hover:bg-zinc-900"
    >
      <div className="mb-4 text-3xl">
        {icon}
      </div>

      <h3 className="font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        {description}
      </p>

      <div className="mt-4 text-sm text-violet-400 opacity-0 transition group-hover:opacity-100">
        Open →
      </div>
    </Link>
  );
}

interface ActivityProps {
  icon: string;
  title: string;
  description: string;
}

function Activity({
  icon,
  title,
  description,
}: ActivityProps) {
  return (
    <div className="flex items-center gap-4 border-b border-zinc-800 py-4 last:border-0">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800">
        {icon}
      </div>

      <div>
        <p className="font-medium text-white">
          {title}
        </p>

        <p className="text-sm text-zinc-500">
          {description}
        </p>
      </div>
    </div>
  );
}