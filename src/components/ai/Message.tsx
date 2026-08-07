import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageProps {
  role: "user" | "assistant";
  text: string;
}

export default function Message({
  role,
  text,
}: MessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-3xl rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-violet-600 text-white"
            : "bg-zinc-800 text-zinc-100"
        }`}
      >
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({
                className,
                children,
                ...props
              }) {
                const match =
                  /language-(\w+)/.exec(
                    className || ""
                  );

                const code = String(children).replace(
                  /\n$/,
                  ""
                );

                // Inline code
                if (!match) {
                  return (
                    <code
                      className="rounded bg-zinc-700 px-1.5 py-0.5 text-sm"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }

                const language = match[1];

                async function copyCode() {
                  await navigator.clipboard.writeText(
                    code
                  );
                }

                return (
                  <div className="my-4 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950">
                    <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-900 px-4 py-2">
                      <span className="text-xs text-zinc-400">
                        {language}
                      </span>

                      <button
                        onClick={copyCode}
                        className="rounded-md px-3 py-1 text-xs text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
                      >
                        Copy
                      </button>
                    </div>

                    <pre className="overflow-x-auto p-4">
                      <code
                        className="text-sm text-zinc-100"
                        {...props}
                      >
                        {children}
                      </code>
                    </pre>
                  </div>
                );
              },

              p({ children }) {
                return (
                  <p className="mb-3 last:mb-0">
                    {children}
                  </p>
                );
              },

              ul({ children }) {
                return (
                  <ul className="mb-3 list-disc pl-6">
                    {children}
                  </ul>
                );
              },

              ol({ children }) {
                return (
                  <ol className="mb-3 list-decimal pl-6">
                    {children}
                  </ol>
                );
              },

              h1({ children }) {
                return (
                  <h1 className="mb-3 text-2xl font-bold">
                    {children}
                  </h1>
                );
              },

              h2({ children }) {
                return (
                  <h2 className="mb-3 text-xl font-bold">
                    {children}
                  </h2>
                );
              },

              h3({ children }) {
                return (
                  <h3 className="mb-2 text-lg font-bold">
                    {children}
                  </h3>
                );
              },

              strong({ children }) {
                return (
                  <strong className="font-bold">
                    {children}
                  </strong>
                );
              },
            }}
          >
            {text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}