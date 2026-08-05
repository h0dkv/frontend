import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-8 py-5">
      <div className="flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-white placeholder:text-zinc-500"
        />
      </div>

      <div className="flex items-center gap-5">
        <Bell />

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold">
          H
        </div>
      </div>
    </header>
  );
}