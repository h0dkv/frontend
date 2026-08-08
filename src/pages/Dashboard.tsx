import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bot,
  Code2,
  MapPinned,
  ArrowRight,
  Sparkles,
  Plus,
  Settings,
  Activity,
} from "lucide-react";

import {
  getProjectCount,
  getConversationCount,
  getFileCount,
} from "../services/dashboard";

export default function Dashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [conversationCount, setConversationCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [projects, conversations, files] =
          await Promise.all([
            getProjectCount(),
            getConversationCount(),
            getFileCount(),
          ]);

        setProjectCount(projects.count);
        setConversationCount(conversations.count);
        setFileCount(files.count);
      } catch (error) {
        console.error(
          "❌ Failed to load dashboard stats:",
          error
        );
      } finally {
        setStatsLoading(false);
      }
    }

    loadStats();
  }, []);

  const stats = [
    {
      label: "AI Conversations",
      value: statsLoading
        ? "..."
        : conversationCount.toString(),
      icon: Bot,
    },
    {
      label: "Projects",
      value: statsLoading
        ? "..."
        : projectCount.toString(),
      icon: Code2,
    },
    {
      label: "Files",
      value: statsLoading
        ? "..."
        : fileCount.toString(),
      icon: Activity,
    },
    {
      label: "Locations",
      value: "5",
      icon: MapPinned,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-violet-950/40 via-zinc-900 to-zinc-950 p-8 md:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-violet-400">
            <Sparkles size={16} />
            AETHER OS
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Welcome back.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
            Your personal digital workspace for AI,
            development and exploration.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/ai"
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              <Bot size={18} />
              Open Aether AI
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/devhub"
              className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800"
            >
              <Code2 size={18} />
              Open DevHub
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-zinc-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-zinc-300">
                  <Icon size={20} />
                </div>

                <span className="text-2xl font-bold text-white">
                  {stat.value}
                </span>
              </div>

              <p className="mt-4 text-sm text-zinc-500">
                {stat.label}
              </p>
            </div>
          );
        })}
      </section>

      {/* Workspace */}
      <section className="mt-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">
            Aether Workspace
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Everything you need in one place.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <WorkspaceCard
            to="/ai"
            icon={<Bot size={25} />}
            title="Aether AI"
            description="Ask questions, build ideas, generate code and work with your personal AI assistant."
            action="Open AI →"
            color="violet"
          />

          <WorkspaceCard
            to="/devhub"
            icon={<Code2 size={25} />}
            title="DevHub"
            description="Create projects, manage files and build applications inside Aether."
            action="Open DevHub →"
            color="cyan"
          />

          <WorkspaceCard
            to="/virtualvarna"
            icon={<MapPinned size={25} />}
            title="Virtual Varna"
            description="Explore Varna using an interactive real-world map."
            action="Explore Varna →"
            color="emerald"
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Jump directly into your workspace.
            </p>
          </div>

          <Sparkles
            size={20}
            className="text-zinc-700"
          />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction
            to="/ai"
            icon={<Sparkles size={18} />}
            title="Ask Aether"
          />

          <QuickAction
            to="/devhub"
            icon={<Plus size={18} />}
            title="New Project"
          />

          <QuickAction
            to="/virtualvarna"
            icon={<MapPinned size={18} />}
            title="Explore Varna"
          />

          <QuickAction
            to="/settings"
            icon={<Settings size={18} />}
            title="Settings"
          />
        </div>
      </section>

      {/* Status */}
      <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40" />

          <div>
            <p className="text-sm font-medium text-zinc-300">
              Aether System
            </p>

            <p className="text-xs text-zinc-600">
              Workspace online
            </p>
          </div>

          <span className="ml-auto text-xs font-medium text-emerald-400">
            ONLINE
          </span>
        </div>
      </section>

      <div className="py-8 text-center text-xs text-zinc-700">
        Aether • Your digital workspace
      </div>
    </div>
  );
}

function WorkspaceCard({
  to,
  icon,
  title,
  description,
  action,
  color,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  color: "violet" | "cyan" | "emerald";
}) {
  const colors = {
    violet: {
      icon: "bg-violet-500/10 text-violet-400",
      border: "hover:border-violet-500/50",
      action: "text-violet-400",
    },
    cyan: {
      icon: "bg-cyan-500/10 text-cyan-400",
      border: "hover:border-cyan-500/50",
      action: "text-cyan-400",
    },
    emerald: {
      icon: "bg-emerald-500/10 text-emerald-400",
      border: "hover:border-emerald-500/50",
      action: "text-emerald-400",
    },
  };

  const theme = colors[color];

  return (
    <Link
      to={to}
      className={`group rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:-translate-y-1 hover:bg-zinc-900 ${theme.border}`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.icon}`}
        >
          {icon}
        </div>

        <ArrowRight
          size={20}
          className="text-zinc-700 transition group-hover:translate-x-1"
        />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {description}
      </p>

      <span
        className={`mt-5 block text-sm font-medium ${theme.action}`}
      >
        {action}
      </span>
    </Link>
  );
}

function QuickAction({
  to,
  icon,
  title,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 transition hover:border-zinc-700 hover:bg-zinc-800"
    >
      <div className="text-zinc-400">
        {icon}
      </div>

      <span className="text-sm font-medium text-zinc-300">
        {title}
      </span>

      <ArrowRight
        size={15}
        className="ml-auto text-zinc-700"
      />
    </Link>
  );
}