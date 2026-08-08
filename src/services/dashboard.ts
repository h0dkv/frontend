const API = "http://localhost:3000/api";

async function request<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API Error ${res.status}`);
  }

  return res.json();
}

export async function getProjectCount() {
  return request<{ count: number }>(
    `${API}/projects/stats/count`
  );
}

export async function getConversationCount() {
  return request<{ count: number }>(
    `${API}/conversations/stats/count`
  );
}

export async function getFileCount() {
  return request<{ count: number }>(
    `${API}/files/stats/count`
  );
}