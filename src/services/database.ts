const API = "http://localhost:3000/api";

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `API Error ${res.status}: ${errorText || res.statusText}`
    );
  }

  return res.json();
}

export async function createConversation(title: string) {
  return request<{
    id: string;
    title: string;
    createdAt: string;
  }>(`${API}/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });
}

export async function loadConversations() {
  return request<
    {
      id: string;
      title: string;
      createdAt: string;
    }[]
  >(`${API}/conversations`);
}

export async function loadConversation(id: string) {
  return request<{
    id: string;
    title: string;
    createdAt: string;
    messages: {
      id: string;
      role: "user" | "assistant";
      text: string;
      createdAt: string;
    }[];
  }>(`${API}/conversations/${id}`);
}

export async function saveMessage(
  conversationId: string,
  role: "user" | "assistant",
  text: string
) {
  return request(`${API}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversationId,
      role,
      text,
    }),
  });
}