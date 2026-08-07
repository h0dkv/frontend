import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  loadProjects,
  createProject,
  deleteProject,
  type Project,
} from "../services/projects.js";

export default function DevHub() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function refreshProjects() {
    try {
      const data = await loadProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    }
  }

  useEffect(() => {
    refreshProjects();
  }, []);

  async function handleCreate() {
    if (!name.trim()) return;

    try {
      const project = await createProject(
        name.trim(),
        description.trim()
      );

      setProjects((prev) => [project, ...prev]);

      setName("");
      setDescription("");
      setShowCreate(false);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteProject(id);

      setProjects((prev) =>
        prev.filter((project) => project.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  }

  return (
    <div className="min-h-full space-y-8 p-6">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-violet-400">
          DEVELOPMENT
        </p>

        <div className="mt-2 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              DevHub
            </h1>

            <p className="mt-2 text-zinc-400">
              Build, manage and organize your projects.
            </p>
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500"
          >
            + New Project
          </button>
        </div>
      </section>

      {/* Create Project */}
      {showCreate && (
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            Create Project
          </h2>

          <div className="mt-5 space-y-4">
            <input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Project name"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-violet-500"
            />

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Project description"
              rows={3}
              className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-violet-500"
            />

            <div className="flex gap-3">
              <button
                onClick={handleCreate}
                disabled={!name.trim()}
                className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create Project
              </button>

              <button
                onClick={() => {
                  setShowCreate(false);
                  setName("");
                  setDescription("");
                }}
                className="rounded-xl border border-zinc-700 px-5 py-3 text-zinc-300 transition hover:bg-zinc-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-3">
        <Stat
          icon="📁"
          title="Projects"
          value={String(projects.length)}
        />

        <Stat
          icon="💻"
          title="Active"
          value={String(
            projects.filter(
              (project) => project.status === "Active"
            ).length
          )}
        />

        <Stat
          icon="⚡"
          title="Aether"
          value="Ready"
        />
      </section>

      {/* Projects */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            Your Projects
          </h2>

          <span className="text-sm text-zinc-500">
            {projects.length} projects
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-800 p-12 text-center">
            <div className="text-4xl">📁</div>

            <h3 className="mt-4 font-semibold text-white">
              No projects yet
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Create your first project to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 transition hover:-translate-y-1 hover:border-violet-500/40"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-2xl">
                    💻
                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    {project.status}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">
                  {project.name}
                </h3>

                <p className="mt-2 text-sm text-zinc-400">
                  {project.description || "No description"}
                </p>

                <div className="mt-5 flex gap-4">
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-sm text-violet-400 transition hover:text-violet-300"
                  >
                    Open →
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(project.id)
                    }
                    className="text-sm text-red-400 transition hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Development Tools */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-white">
          Development Tools
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <ToolCard
            icon="🤖"
            title="Aether AI"
            description="Build and debug with Aether."
            to="/ai"
          />

          <ToolCard
            icon="📂"
            title="Workspace"
            description="Manage your project files."
            to="/ai"
          />

          <ToolCard
            icon="⚙️"
            title="Environment"
            description="Configure your development environment."
            to="/settings"
          />
        </div>
      </section>
    </div>
  );
}

function Stat({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>

        <span className="text-2xl font-bold text-white">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm text-zinc-400">
        {title}
      </p>
    </div>
  );
}

function ToolCard({
  icon,
  title,
  description,
  to,
}: {
  icon: string;
  title: string;
  description: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 transition hover:border-violet-500/40 hover:bg-zinc-900"
    >
      <div className="text-2xl">{icon}</div>

      <h3 className="mt-4 font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        {description}
      </p>
    </Link>
  );
}