import { useState } from "react";

type SettingRowProps = {
  icon: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const [accent, setAccent] = useState("Violet");

  function resetSettings() {
    setDarkMode(true);
    setAnimations(true);
    setNotifications(true);
    setAutoSave(true);
    setAccent("Violet");
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
            AETHER SYSTEM
          </p>

          <h1 className="mt-2 text-4xl font-bold text-white">
            Settings
          </h1>

          <p className="mt-2 text-zinc-500">
            Customize your Aether workspace.
          </p>
        </div>

        {/* Appearance */}
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">
            Appearance
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Customize how Aether looks and feels.
          </p>

          <div className="mt-5 space-y-2">
            <SettingRow
              icon="🌙"
              title="Dark Mode"
              description="Use the dark Aether interface."
            >
              <Toggle
                enabled={darkMode}
                onClick={() => setDarkMode(!darkMode)}
              />
            </SettingRow>

            <SettingRow
              icon="✨"
              title="Animations"
              description="Enable interface transitions and animations."
            >
              <Toggle
                enabled={animations}
                onClick={() =>
                  setAnimations(!animations)
                }
              />
            </SettingRow>
          </div>

          {/* Accent */}
          <div className="mt-6 border-t border-zinc-800 pt-6">
            <p className="text-sm font-medium text-zinc-300">
              Accent Color
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              Choose Aether's primary accent.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {[
                "Violet",
                "Cyan",
                "Emerald",
                "Blue",
                "Rose",
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => setAccent(color)}
                  className={`rounded-xl border px-4 py-2 text-sm transition ${
                    accent === color
                      ? "border-violet-500 bg-violet-500/10 text-violet-300"
                      : "border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Workspace */}
        <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">
            Workspace
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Configure how your workspace behaves.
          </p>

          <div className="mt-5 space-y-2">
            <SettingRow
              icon="💾"
              title="Auto Save"
              description="Automatically save changes to project files."
            >
              <Toggle
                enabled={autoSave}
                onClick={() => setAutoSave(!autoSave)}
              />
            </SettingRow>

            <SettingRow
              icon="🔔"
              title="Notifications"
              description="Show important Aether notifications."
            >
              <Toggle
                enabled={notifications}
                onClick={() =>
                  setNotifications(!notifications)
                }
              />
            </SettingRow>
          </div>
        </section>

        {/* AI */}
        <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">
            Aether AI
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            AI assistant configuration.
          </p>

          <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl">
                🤖
              </div>

              <div>
                <p className="font-medium text-white">
                  Aether
                </p>

                <p className="text-sm text-zinc-600">
                  Personal AI assistant
                </p>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs text-emerald-400">
                  Online
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Data */}
        <section className="mt-6 rounded-3xl border border-red-500/10 bg-red-500/[0.02] p-6">
          <h2 className="text-lg font-semibold text-white">
            Danger Zone
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Actions that affect your local Aether settings.
          </p>

          <button
            onClick={resetSettings}
            className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >
            Reset Settings
          </button>
        </section>

        {/* Version */}
        <div className="py-8 text-center">
          <p className="text-xs text-zinc-700">
            Aether v1.0.0
          </p>

          <p className="mt-1 text-xs text-zinc-800">
            Your digital workspace
          </p>
        </div>
      </div>
    </div>
  );
}

function SettingRow({
  icon,
  title,
  description,
  children,
}: SettingRowProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-lg">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-zinc-200">
          {title}
        </p>

        <p className="mt-1 text-xs text-zinc-600">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

function Toggle({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle setting"
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        enabled
          ? "bg-violet-600"
          : "bg-zinc-700"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          enabled
            ? "left-6"
            : "left-1"
        }`}
      />
    </button>
  );
}