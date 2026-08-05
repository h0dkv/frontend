import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MessageProps {
  role: "user" | "assistant";
  text: string;
}

export default function Message({ role, text }: MessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-4xl rounded-2xl px-5 py-4 ${isUser
            ? "bg-violet-600 text-white"
            : "bg-zinc-800 text-zinc-100"
          }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{text}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");

                if (!inline && match) {
                  const code = String(children).replace(/\n$/, "");

                  return (
                    <div className="relative my-4">
                      <button
                        className="absolute right-3 top-3 rounded bg-zinc-700 px-3 py-1 text-xs hover:bg-zinc-600"
                        onClick={() => navigator.clipboard.writeText(code)}
                      >
                        Copy
                      </button>

                      <SyntaxHighlighter
                        language={match[1]}
                        style={oneDark}
                        PreTag="div"
                      >
                        {code}
                      </SyntaxHighlighter>
                    </div>
                  );
                }

                return (
                  <code
                    className="rounded bg-zinc-700 px-1 py-0.5"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {text}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}