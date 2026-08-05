import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import Dashboard from "../pages/Dashboard";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-auto p-8">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}