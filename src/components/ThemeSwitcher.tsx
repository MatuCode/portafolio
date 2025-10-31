import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDictionary } from "@/i18n";

type Theme = "dark" | "neon" | "pixel";

type ThemeOption = { key: Theme; dot: string };

const THEME_OPTIONS: ThemeOption[] = [
  { key: "dark", dot: "bg-fuchsia-400" },
  { key: "neon", dot: "bg-cyan-400" },
  { key: "pixel", dot: "bg-yellow-400" },
];

export default function ThemeSwitcher() {
  const { locale } = useRouter();
  const dictionary = getDictionary(locale);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("theme") as Theme) || "dark";
  });

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="fixed top-4 left-4 z-[60] flex gap-2">
      {THEME_OPTIONS.map((option) => {
        const active = theme === option.key;
        const label = dictionary.themes?.[option.key] ?? option.key;
        return (
          <button
            key={option.key}
            onClick={() => setTheme(option.key)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ring-white/20 backdrop-blur
              ${active ? "bg-white/10" : "bg-black/40 hover:bg-black/50"} text-white`}
            title={label}
          >
            <span className={`inline-block h-3 w-3 rounded-full ${option.dot}`} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
