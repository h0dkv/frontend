import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
            AETHER ACCOUNT
          </p>

          <h1 className="mt-2 text-4xl font-bold text-white">
            Profile
          </h1>

          <p className="mt-2 text-zinc-500">
            Manage your Aether profile and workspace.
          </p>
        </div>

        {/* Profile card */}
        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60">
          <div className="h-32 bg-gradient-to-r from-violet-600/20 via-cyan-500/10 to-transparent" />

          <div className="px-6 pb-6">
            <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-zinc-900 bg-gradient-to-br from-violet-600 to-cyan-500 text-4xl font-bold text-white shadow-xl">
                  A
                </div>

                <div className="pb-1">
                  <h2 className="text-2xl font-bold text-white">
                    Aether User
                  </h2>

                  <p className="text-sm text-zinc-500">
                    Aether Workspace
                  </p>
                </div>
              </div>

              <Link
                to="/settings"
                className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
              >
                ⚙️ Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
            <h2 className="text-lg font-semibold text-white">
              Account
            </h2>

            <div className="mt-5 space-y-4">
              <Info
                label="Username"
                value="Aether User"
              />

              <Info
                label="Email"
                value="Not connected"
              />

              <Info
                label="Account type"
                value="Personal"
              />
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
            <h2 className="text-lg font-semibold text-white">
              Workspace
            </h2>

            <div className="mt-5 space-y-4">
              <Info
                label="Projects"
                value="Aether DevHub"
              />

              <Info
                label="AI"
                value="Aether AI"
              />

              <Info
                label="City"
                value="Virtual Varna"
              />
            </div>
          </section>
        </div>

        {/* Features */}
        <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">
            Aether Modules
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Module
              icon="🤖"
              title="Aether AI"
              description="AI assistant"
            />

            <Module
              icon="💻"
              title="DevHub"
              description="Development workspace"
            />

            <Module
              icon="🗺️"
              title="Virtual Varna"
              description="Interactive map"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
      <span className="text-sm text-zinc-500">
        {label}
      </span>

      <span className="text-sm font-medium text-zinc-200">
        {value}
      </span>
    </div>
  );
}

function Module({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
      <span className="text-2xl">{icon}</span>

      <h3 className="mt-3 text-sm font-semibold text-white">
        {title}
      </h3>

      <p className="mt-1 text-xs text-zinc-600">
        {description}
      </p>
    </div>
  );
}