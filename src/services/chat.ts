const API = "http://localhost:3000/api";

export async function sendChatMessage(
  message: string,
  conversationId: string
) {
  const res = await fetch(`${API}/chat`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      message,
      conversationId,
    }),
  });

  if (!res.ok) {
    throw new Error(
      `API Error ${res.status}: ${await res.text()}`
    );
  }

  const data = await res.json();

  return data;
}