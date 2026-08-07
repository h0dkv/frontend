const API = "http://localhost:3000/api";

export async function loadFiles() {
  const res = await fetch(`${API}/files`);

  if (!res.ok) {
    throw new Error("Failed to load files");
  }

  return res.json() as Promise<string[]>;
}

export async function loadFile(name: string) {
  const res = await fetch(
    `${API}/files/${encodeURIComponent(name)}`
  );

  if (!res.ok) {
    throw new Error("Failed to load file");
  }

  return res.json() as Promise<{
    name: string;
    content: string;
  }>;
}