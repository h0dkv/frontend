
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
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Bot, label: "Aether AI", path: "/ai" },
    { icon: Code2, label: "DevHub", path: "/devhub" },
    { icon: MapPinned, label: "VirtualVarna", path: "/virtualvarna" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
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
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${isActive
                                    ? "bg-violet-600 text-white"
                                    : "hover:bg-zinc-800 text-zinc-300"
                                }`
                            }
                        >
                            <Icon size={20} />
                            {item.label}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}