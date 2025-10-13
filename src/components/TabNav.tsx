/* *Developed by pmatute */
import React from "react";

export type TabKey =
  | "home"
  | "habilidades"
  | "proyectos"
  | "experiencia"
  | "educacion"
  | "certificaciones"
  | "contacto";

const TABS: { key: TabKey; label: string }[] = [
  { key: "home",            label: "Home" },
  { key: "habilidades",     label: "Habilidades" },
  { key: "proyectos",       label: "Proyectos" },
  { key: "experiencia",     label: "Experiencia" },
  { key: "educacion",       label: "Educación" },
  { key: "certificaciones", label: "Certificaciones" },
  { key: "contacto",        label: "Contacto" },
];

type Props = {
  active: TabKey;
  onChange: (key: TabKey) => void;
};

export default function TabNav({ active, onChange }: Props) {
  return (
    <nav
      className="
        fixed bottom-6 left-1/2 -translate-x-1/2
        z-20
        rounded-2xl backdrop-blur-md
        bg-neutral-900/60 ring-1 ring-white/10
        px-3 py-2 flex gap-2
      "
      aria-label="Secciones del portafolio"
    >
      {TABS.map((t) => {
        const isActive = t.key === active;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={[
              "px-4 py-2 rounded-xl text-sm transition",
              isActive
                ? "bg-orange-500 text-black shadow-[0_0_0_2px_rgba(255,255,255,.2)_inset]"
                : "text-white/80 hover:text-white hover:bg-white/10",
            ].join(" ")}
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
