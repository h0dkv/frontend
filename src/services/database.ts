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

export type Conversation = {
  id: string;
  title: string;
  createdAt: string;
};

export type DatabaseMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  createdAt: string;
};

export async function createConversation(
  title: string
) {
  return request<Conversation>(
    `${API}/conversations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    }
  );
}

export async function loadConversations() {
  return request<Conversation[]>(
    `${API}/conversations`
  );
}

export async function loadConversation(id: string) {
  return request<
    Conversation & {
      messages: DatabaseMessage[];
    }
  >(`${API}/conversations/${id}`);
}

export async function loadMessages(
  conversationId: string
) {
  return request<DatabaseMessage[]>(
    `${API}/messages/${conversationId}`
  );
}

export async function saveMessage(
  conversationId: string,
  role: "user" | "assistant",
  text: string
) {
  return request<DatabaseMessage>(
    `${API}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId,
        role,
        text,
      }),
    }
  );
}

export async function deleteConversation(
  id: string
) {
  return request<{ success: boolean }>(
    `${API}/conversations/${id}`,
    {
      method: "DELETE",
    }
  );
}

export async function renameConversation(
  id: string,
  title: string
) {
  return request<Conversation>(
    `${API}/conversations/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    }
  );
}