import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    getProject,
  type Project,
} from "../services/projects";
import {
  loadProjectFiles,
  createProjectFile,
  updateProjectFile,
  type ProjectFile,
} from "../services/projectFiles";

export default function Project() {
  const { id } = useParams();

  const [project, setProject] =
    useState<Project | null>(null);

  const [files, setFiles] =
    useState<ProjectFile[]>([]);

  const [activeFileId, setActiveFileId] =
    useState<string | null>(null);

  const [editorContent, setEditorContent] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [creatingFile, setCreatingFile] =
    useState(false);

  const activeFile = files.find(
    (file) => file.id === activeFileId
  );

  useEffect(() => {
    async function loadWorkspace() {
      if (!id) return;

      try {
        const foundProject = await getProject(id);

        if (!foundProject) {
          throw new Error("Project not found");
        }

        setProject(foundProject);

        const projectFiles =
          await loadProjectFiles(id);

        setFiles(projectFiles);

        if (projectFiles.length > 0) {
          setActiveFileId(projectFiles[0].id);
          setEditorContent(
            projectFiles[0].content
          );
        }
      } catch (error) {
        console.error(
          "❌ Failed to load workspace:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadWorkspace();
  }, [id]);

  function selectFile(file: ProjectFile) {
    setActiveFileId(file.id);
    setEditorContent(file.content);
  }

  async function saveFile() {
    if (!activeFile) return;

    try {
      setSaving(true);

      const updated =
        await updateProjectFile(
          activeFile.id,
          editorContent
        );

      setFiles((prev) =>
        prev.map((file) =>
          file.id === updated.id
            ? updated
            : file
        )
      );
    } catch (error) {
      console.error(
        "❌ Failed to save file:",
        error
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleCreateFile() {
    if (!id) return;

    const name = window.prompt(
      "Enter file path:",
      "src/new-file.ts"
    );

    if (!name?.trim()) return;

    const fileName =
      name.trim().split("/").pop() || name.trim();

    const extension =
      fileName.includes(".")
        ? fileName.split(".").pop()
        : "text";

    const language =
      extension === "ts"
        ? "typescript"
        : extension === "tsx"
        ? "typescript"
        : extension === "js"
        ? "javascript"
        : extension === "json"
        ? "json"
        : extension === "css"
        ? "css"
        : extension === "html"
        ? "html"
        : extension === "md"
        ? "markdown"
        : "text";

    try {
      setCreatingFile(true);

      const file =
        await createProjectFile(
          id,
          fileName,
          name.trim(),
          "",
          language
        );

      setFiles((prev) => [
        ...prev,
        file,
      ]);

      setActiveFileId(file.id);
      setEditorContent("");
    } catch (error) {
      console.error(
        "❌ Failed to create file:",
        error
      );
    } finally {
      setCreatingFile(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-zinc-400">
        Loading workspace...
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
    <div className="flex h-full flex-col p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            to="/devhub"
            className="text-sm text-zinc-500 hover:text-zinc-300"
          >
            ← DevHub
          </Link>

          <h1 className="mt-2 text-3xl font-bold text-white">
            {project.name}
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            {project.description ||
              "Aether Project"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-emerald-500/10 px-3 py-2 text-xs text-emerald-400">
            {project.status}
          </span>

          <Link
            to="/ai"
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
          >
            🤖 Aether AI
          </Link>
        </div>
      </div>

      {/* Workspace */}
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
        {/* File explorer */}
        <aside className="w-64 shrink-0 border-r border-zinc-800 bg-zinc-900/70">
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
            <span className="text-sm font-semibold text-white">
              Explorer
            </span>

            <button
              onClick={handleCreateFile}
              disabled={creatingFile}
              className="rounded-lg px-2 py-1 text-lg text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-50"
              title="New file"
            >
              +
            </button>
          </div>

          <div className="p-2">
            {files.length === 0 ? (
              <div className="p-4 text-center text-xs text-zinc-600">
                No files
              </div>
            ) : (
              files.map((file) => (
                <button
                  key={file.id}
                  onClick={() =>
                    selectFile(file)
                  }
                  className={`mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                    file.id === activeFileId
                      ? "bg-violet-500/10 text-violet-300"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                  }`}
                >
                  <span>
                    {file.name.endsWith(".ts")
                      ? "🔷"
                      : file.name.endsWith(".json")
                      ? "📦"
                      : file.name.endsWith(".md")
                      ? "📝"
                      : "📄"}
                  </span>

                  <span className="truncate">
                    {file.path}
                  </span>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Editor */}
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/40 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-300">
                {activeFile?.path ||
                  "No file selected"}
              </span>

              {activeFile && (
                <span className="rounded-md bg-zinc-800 px-2 py-1 text-[10px] uppercase text-zinc-500">
                  {activeFile.language}
                </span>
              )}
            </div>

            <button
              onClick={saveFile}
              disabled={
                !activeFile || saving
              }
              className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-medium text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>

          {activeFile ? (
            <textarea
              value={editorContent}
              onChange={(event) =>
                setEditorContent(
                  event.target.value
                )
              }
              spellCheck={false}
              className="min-h-0 flex-1 resize-none bg-zinc-950 p-6 font-mono text-sm leading-6 text-zinc-300 outline-none"
            />
          ) : (
            <div className="flex flex-1 items-center justify-center text-zinc-600">
              Select a file to start editing
            </div>
          )}
        </main>
      </div>
    </div>
  );
}