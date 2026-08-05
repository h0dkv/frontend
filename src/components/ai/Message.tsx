interface MessageProps {
  role: "user" | "assistant";
  text: string;
}

export default function Message({ role, text }: MessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-2xl rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-violet-600 text-white"
            : "bg-zinc-800 text-zinc-100"
        }`}
      >
        {text}
      </div>
    </div>
  );
}