import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ThemeKey = "dark" | "neon" | "pixel" | "future";

type ThemeCtx = { theme: ThemeKey; setTheme: (t: ThemeKey) => void; };
const Ctx = createContext<ThemeCtx>({ theme: "dark", setTheme: () => {} });

export const useTheme = () => useContext(Ctx);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeKey>("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as ThemeKey | null) ?? "dark";
    setTheme(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-neon", "theme-pixel", "theme-future");
    if (theme === "neon") root.classList.add("theme-neon");
    if (theme === "pixel") root.classList.add("theme-pixel");
    if (theme === "future") root.classList.add("theme-future");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
