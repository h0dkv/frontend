import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface ProjectData {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function Project() {
  const { id } = useParams();

  const [project, setProject] =
    useState<ProjectData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/projects/${id}`
        );

        if (!res.ok) {
          throw new Error("Project not found");
        }

        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error(
          "Failed to load project:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProject();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-zinc-400">
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">
          Project not found
        </h1>

        <Link
          to="/devhub"
          className="mt-4 text-violet-400 hover:text-violet-300"
        >
          ← Back to DevHub
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/devhub"
            className="text-sm text-zinc-500 hover:text-zinc-300"
          >
            ← DevHub
          </Link>

          <h1 className="mt-3 text-4xl font-bold text-white">
            {project.name}
          </h1>

          <p className="mt-2 text-zinc-400">
            {project.description || "No description"}
          </p>
        </div>

        <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
          {project.status}
        </span>
      </div>

      {/* Workspace */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Files */}
        <aside className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
          <h2 className="font-semibold text-white">
            Files
          </h2>

          <div className="mt-5 space-y-2">
            <div className="rounded-xl bg-violet-500/10 px-4 py-3 text-sm text-violet-300">
              📄 README.md
            </div>

            <div className="rounded-xl px-4 py-3 text-sm text-zinc-400 hover:bg-zinc-800">
              📁 src
            </div>

            <div className="rounded-xl px-4 py-3 text-sm text-zinc-400 hover:bg-zinc-800">
              ⚙️ package.json
            </div>
          </div>
        </aside>

        {/* Editor */}
        <main className="min-h-[500px] rounded-3xl border border-zinc-800 bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
            <span className="text-sm text-zinc-300">
              README.md
            </span>

            <span className="text-xs text-zinc-600">
              Project Workspace
            </span>
          </div>

          <div className="p-6">
            <pre className="font-mono text-sm leading-7 text-zinc-400">
{`# ${project.name}

${project.description || "Project created with Aether."}

## Status

${project.status}

## Created

${new Date(
  project.createdAt
).toLocaleString()}

---

Built with Aether.`}
            </pre>
          </div>
        </main>
      </div>
    </div>
  );
}