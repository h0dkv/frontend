import {
  LayoutDashboard,
  Bot,
  Code2,
  MapPinned,
  User,
  Settings,
} from "lucide-react";

const items = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Bot, label: "Aether AI" },
  { icon: Code2, label: "DevHub" },
  { icon: MapPinned, label: "VirtualVarna" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-zinc-800 bg-zinc-900">
      <div className="p-8">
        <h1 className="text-3xl font-bold">Aether</h1>
      </div>

      <nav className="space-y-2 px-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-zinc-800"
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}