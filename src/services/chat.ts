export async function sendChatMessage(message: string): Promise<string> {
  const response = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Backend error");
  }

  const data = await response.json();
  return data.reply;
}