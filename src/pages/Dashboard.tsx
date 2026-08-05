import StatsCard from "../components/dashboard/StatsCard.tsx";

export default function Dashboard() {
  return (
    <>
      <h1 className="text-5xl font-bold">
        Welcome back 👋
      </h1>

      <p className="mt-3 text-zinc-400">
        Welcome to Aether OS
      </p>

      <div className="grid gap-6 mt-10 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Projects"
          value="0"
          subtitle="Active projects"
        />

        <StatsCard
          title="AI Chats"
          value="0"
          subtitle="Conversations"
        />

        <StatsCard
          title="Storage"
          value="0 GB"
          subtitle="Cloud usage"
        />

        <StatsCard
          title="Tasks"
          value="0"
          subtitle="Pending"
        />
      </div>
    </>
  );
}