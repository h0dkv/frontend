import { useEffect, useState } from "react";
import {
  loadFiles,
  loadFile,
} from "../../services/files";

interface Props {
  onOpenFile: (
    name: string,
    content: string
  ) => void;
}

export default function FileExplorer({
  onOpenFile,
}: Props) {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const result = await loadFiles();
      setFiles(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();

    const interval = setInterval(
      refresh,
      2000
    );

    return () => clearInterval(interval);
  }, []);

  async function openFile(name: string) {
    try {
      const file = await loadFile(name);

      onOpenFile(
        file.name,
        file.content
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside className="w-64 shrink-0 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-white">
          📁 Workspace
        </h2>

        <button
          onClick={refresh}
          className="rounded-lg px-2 py-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          ↻
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-500">
          Loading files...
        </p>
      ) : files.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No files yet.
        </p>
      ) : (
        <div className="space-y-1">
          {files.map((file) => (
            <button
              key={file}
              onClick={() => openFile(file)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              📄
              <span className="truncate">
                {file}
              </span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}