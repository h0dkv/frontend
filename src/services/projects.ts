const API = "http://localhost:3000/api";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function loadProjects(): Promise<Project[]> {
  const res = await fetch(`${API}/projects`);

  if (!res.ok) {
    throw new Error("Failed to load projects");
  }

  return res.json();
}

export async function getProject(
  id: string
): Promise<Project> {
  const res = await fetch(`${API}/projects/${id}`);

  if (!res.ok) {
    throw new Error("Project not found");
  }

  return res.json();
}

export async function createProject(
  name: string,
  description = ""
): Promise<Project> {
  const res = await fetch(`${API}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return res.json();
}

export async function deleteProject(
  id: string
): Promise<void> {
  const res = await fetch(`${API}/projects/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete project");
  }
}