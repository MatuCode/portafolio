import React, { JSX } from "react";
import { useTheme, ThemeKey } from "@/theme/ThemeProvider";

const THEMES: { key: ThemeKey; label: string; icon: JSX.Element }[] = [
  { key: "dark", label: "Oscuro", icon: <span>🌑</span> },
  { key: "neon", label: "Neón", icon: <span>🔆</span> },
  { key: "pixel", label: "Pixel", icon: <span>🟪</span> },
  { key: "future", label: "Futuro", icon: <span>🧊</span> },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="fixed top-6 left-6 z-[70] flex gap-2 p-2 rounded-2xl bg-black/45 backdrop-blur ring-1 ring-white/20"
      aria-label="Theme switcher"
    >
      {THEMES.map((t) => {
        const active = theme === t.key;
        return (
          <button
            key={t.key}
            onClick={() => setTheme(t.key)}
            className={`px-3 py-2 rounded-xl text-sm transition ${
              active ? "bg-[var(--accent)] text-black" : "btn-surface"
            }`}
            title={t.label}
          >
            <span className="mr-1">{t.icon}</span>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
