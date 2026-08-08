import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

import {
  getProject,
  type Project,
} from "../services/projects";

import {
  loadProjectFiles,
  createProjectFile,
  updateProjectFile,
  deleteProjectFile,
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

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [creatingFile, setCreatingFile] =
    useState(false);

  const [isDirty, setIsDirty] =
    useState(false);

  const activeFile = files.find(
    (file) => file.id === activeFileId
  );

  // ---------------------------------------
  // LOAD PROJECT + FILES
  // ---------------------------------------

  useEffect(() => {
    async function loadWorkspace() {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const foundProject =
          await getProject(id);

        if (!foundProject) {
          throw new Error(
            "Project not found"
          );
        }

        setProject(foundProject);

        const projectFiles =
          await loadProjectFiles(id);

        setFiles(projectFiles);

        if (projectFiles.length > 0) {
          setActiveFileId(
            projectFiles[0].id
          );

          setEditorContent(
            projectFiles[0].content
          );

          setIsDirty(false);
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

  // ---------------------------------------
  // SELECT FILE
  // ---------------------------------------

  function selectFile(file: ProjectFile) {
    setActiveFileId(file.id);
    setEditorContent(file.content);
    setIsDirty(false);
  }

  // ---------------------------------------
  // SAVE FILE
  // ---------------------------------------

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

      setEditorContent(
        updated.content
      );

      setIsDirty(false);
    } catch (error) {
      console.error(
        "❌ Failed to save file:",
        error
      );
    } finally {
      setSaving(false);
    }
  }

  // ---------------------------------------
  // CTRL + S
  // ---------------------------------------

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        (event.ctrlKey ||
          event.metaKey) &&
        event.key.toLowerCase() === "s"
      ) {
        event.preventDefault();

        if (
          activeFile &&
          !saving &&
          isDirty
        ) {
          void saveFile();
        }
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    activeFile,
    saving,
    isDirty,
    editorContent,
  ]);

  // ---------------------------------------
  // CREATE FILE
  // ---------------------------------------

  async function handleCreateFile() {
    if (!id) return;

    const name = window.prompt(
      "Enter file path:",
      "src/new-file.ts"
    );

    if (!name?.trim()) return;

    const cleanPath = name.trim();

    const fileName =
      cleanPath
        .split("/")
        .pop() ||
      cleanPath;

    const extension =
      fileName.includes(".")
        ? fileName
          .split(".")
          .pop()
          ?.toLowerCase()
        : "text";

    let language = "text";

    if (extension === "ts") {
      language = "typescript";
    } else if (
      extension === "tsx"
    ) {
      language = "typescript";
    } else if (
      extension === "js"
    ) {
      language = "javascript";
    } else if (
      extension === "jsx"
    ) {
      language = "javascript";
    } else if (
      extension === "json"
    ) {
      language = "json";
    } else if (
      extension === "css"
    ) {
      language = "css";
    } else if (
      extension === "html"
    ) {
      language = "html";
    } else if (
      extension === "md"
    ) {
      language = "markdown";
    }

    try {
      setCreatingFile(true);

      const file =
        await createProjectFile(
          id,
          fileName,
          cleanPath,
          "",
          language
        );

      setFiles((prev) => [
        ...prev,
        file,
      ]);

      setActiveFileId(file.id);
      setEditorContent(
        file.content
      );
      setIsDirty(false);
    } catch (error) {
      console.error(
        "❌ Failed to create file:",
        error
      );
    } finally {
      setCreatingFile(false);
    }
  }

  // ---------------------------------------
  // DELETE FILE
  // ---------------------------------------

  async function handleDeleteFile() {
    if (!activeFile) return;

    const confirmed =
      window.confirm(
        `Delete "${activeFile.path}"?`
      );

    if (!confirmed) return;

    try {
      await deleteProjectFile(
        activeFile.id
      );

      setFiles((prev) =>
        prev.filter(
          (file) =>
            file.id !==
            activeFile.id
        )
      );

      setActiveFileId(null);
      setEditorContent("");
      setIsDirty(false);
    } catch (error) {
      console.error(
        "❌ Failed to delete file:",
        error
      );
    }
  }

  // ---------------------------------------
  // LOADING
  // ---------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm text-zinc-500">
          Loading workspace...
        </div>
      </div>
    );
  }

  // ---------------------------------------
  // PROJECT NOT FOUND
  // ---------------------------------------

  if (!project) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="text-5xl">
          📁
        </div>

        <h1 className="mt-4 text-2xl font-bold text-white">
          Project not found
        </h1>

        <Link
          to="/devhub"
          className="mt-4 text-violet-400 transition hover:text-violet-300"
        >
          ← Back to DevHub
        </Link>
      </div>
    );
  }

  // ---------------------------------------
  // UI
  // ---------------------------------------

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* HEADER */}

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <Link
            to="/devhub"
            className="text-sm text-zinc-500 transition hover:text-white"
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
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            🤖 Aether AI
          </Link>
        </div>
      </div>

      {/* WORKSPACE */}

      <div className="flex min-h-0 flex-1 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
        {/* FILE EXPLORER */}

        <aside className="w-64 shrink-0 border-r border-zinc-800 bg-zinc-900/70">
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
            <span className="text-sm font-semibold text-white">
              Explorer
            </span>

            <button
              onClick={
                handleCreateFile
              }
              disabled={
                creatingFile
              }
              className="rounded-lg px-2 py-1 text-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-white disabled:opacity-50"
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
                    selectFile(
                      file
                    )
                  }
                  className={`mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${file.id ===
                    activeFileId
                    ? "bg-violet-500/10 text-violet-300"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                    }`}
                >
                  <span>
                    {file.name.endsWith(
                      ".ts"
                    ) ||
                      file.name.endsWith(
                        ".tsx"
                      )
                      ? "🔷"
                      : file.name.endsWith(
                        ".js"
                      ) ||
                        file.name.endsWith(
                          ".jsx"
                        )
                        ? "🟨"
                        : file.name.endsWith(
                          ".json"
                        )
                          ? "📦"
                          : file.name.endsWith(
                            ".md"
                          )
                            ? "📝"
                            : file.name.endsWith(
                              ".css"
                            )
                              ? "🎨"
                              : file.name.endsWith(
                                ".html"
                              )
                                ? "🌐"
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

        {/* EDITOR */}

        <main className="flex min-w-0 flex-1 flex-col">
          {/* EDITOR HEADER */}

          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/40 px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-300">
                {activeFile?.path ||
                  "No file selected"}
              </span>

              {activeFile && (
                <span className="rounded-md bg-zinc-800 px-2 py-1 text-[10px] uppercase text-zinc-500">
                  {
                    activeFile.language
                  }
                </span>
              )}

              {isDirty && (
                <span className="text-xs text-amber-400">
                  ● Unsaved
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={
                  handleDeleteFile
                }
                disabled={
                  !activeFile ||
                  saving
                }
                className="rounded-lg border border-red-500/20 px-4 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Delete
              </button>

              <button
                onClick={saveFile}
                disabled={
                  !activeFile ||
                  saving ||
                  !isDirty
                }
                className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save"}
              </button>
            </div>
          </div>

          {/* TEXT EDITOR */}

          {activeFile ? (
            <Editor
              height="100%"
              theme="vs-dark"
              language={
                activeFile.language === "typescript"
                  ? "typescript"
                  : activeFile.language === "javascript"
                    ? "javascript"
                    : activeFile.language === "json"
                      ? "json"
                      : activeFile.language === "css"
                        ? "css"
                        : activeFile.language === "html"
                          ? "html"
                          : activeFile.language === "markdown"
                            ? "markdown"
                            : "plaintext"
              }
              value={editorContent}
              onChange={(value) => {
                setEditorContent(value ?? "");
                setIsDirty(true);
              }}
              options={{
                automaticLayout: true,
                minimap: {
                  enabled: true,
                },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                padding: {
                  top: 16,
                },
              }}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center text-zinc-600">
              Select a file to start
              editing
            </div>
          )}
        </main>
      </div>
    </div>
  );
}