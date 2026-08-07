import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Bot,
  Code2,
  MapPinned,
  User,
  Settings,
} from "lucide-react";

const items = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: Bot,
    label: "Aether AI",
    path: "/ai",
  },
  {
    icon: Code2,
    label: "DevHub",
    path: "/devhub",
  },
  {
    icon: MapPinned,
    label: "Virtual Varna",
    path: "/virtualvarna",
  },
  {
    icon: User,
    label: "Profile",
    path: "/profile",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Logo */}
      <div className="border-b border-zinc-800 px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-xl font-bold text-white shadow-lg shadow-violet-500/10">
            A
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Aether
            </h1>

            <p className="text-xs text-zinc-600">
              Developer Platform
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-700">
          Workspace
        </p>

        {items.slice(0, 4).map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/10"
                    : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={19}
                    strokeWidth={isActive ? 2.3 : 2}
                  />

                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}

        <div className="my-5 border-t border-zinc-900" />

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-700">
          Account
        </p>

        {items.slice(4).map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/10"
                    : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={19}
                    strokeWidth={isActive ? 2.3 : 2}
                  />

                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-zinc-900 p-4">
        <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />

            <span className="text-xs font-medium text-zinc-400">
              Aether Online
            </span>
          </div>

          <p className="mt-2 text-[10px] text-zinc-700">
            Aether v1.0.0
          </p>
        </div>
      </div>
    </aside>
  );
}