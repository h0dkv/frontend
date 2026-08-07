const API = "http://localhost:3000/api";

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export async function loadProjectFiles(
  projectId: string
): Promise<ProjectFile[]> {
  const res = await fetch(
    `${API}/project-files/project/${projectId}`
  );

  if (!res.ok) {
    throw new Error("Failed to load project files");
  }

  return res.json();
}

export async function createProjectFile(
  projectId: string,
  name: string,
  path: string,
  content = "",
  language = "text"
): Promise<ProjectFile> {
  const res = await fetch(`${API}/project-files`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId,
      name,
      path,
      content,
      language,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create project file");
  }

  return res.json();
}

export async function updateProjectFile(
  id: string,
  content: string
): Promise<ProjectFile> {
  const res = await fetch(
    `${API}/project-files/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update project file");
  }

  return res.json();
}

export async function deleteProjectFile(
  id: string
): Promise<void> {
  const res = await fetch(
    `${API}/project-files/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete project file");
  }
}