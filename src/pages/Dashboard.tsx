import Card from "../components/ui/Card";

export default function Dashboard() {
  return (
    <>
      <h1 className="mb-2 text-4xl font-bold">
        Welcome to Aether 👋
      </h1>

      <p className="mb-8 text-zinc-400">
        Your digital workspace.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <Card
          title="🤖 Aether AI"
          description="Your personal AI assistant."
        />

        <Card
          title="💻 DevHub"
          description="Manage and share your projects."
        />

        <Card
          title="🌍 VirtualVarna"
          description="Explore Varna in a virtual world."
        />
      </div>
    </>
  );
}