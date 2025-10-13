/* *Developed by pmatute */
import React from "react";
import { useRouter } from "next/router";

type Item = { name: string; icon: string; imgClassName?: string };

/* === CONTENIDO === */
const LANGUAGES: Item[] = [
  { name: "Java",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "TypeScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Python",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "SQL",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
];

const FRAMEWORKS: Item[] = [
  { name: "Spring Boot",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "React",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js",      icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/38BDF8" },
  { name: "Vite",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
];

const TECHNOLOGIES: Item[] = [
  { name: "MySQL",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Elasticsearch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-plain.svg" },
  { name: "Git",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Linux",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Vercel",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", imgClassName: "brightness-0 invert" },
  { name: "Postman",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
];

/* === UI helpers === */
function Group({ title, items }: { title: string; items: Item[] }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((it) => (
          <div
            key={it.name}
            className="flex items-center gap-3 rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-2 backdrop-blur hover:bg-white/10 transition"
            title={it.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={it.icon}
              alt={it.name}
              className={`h-6 w-6 object-contain ${it.imgClassName ?? ""}`}
              loading="lazy"
              draggable={false}
            />
            <span className="text-white/90 text-sm">{it.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LangPill({
  code,
  name,
  level,
}: { code: "ES" | "EN"; name: string; level: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-2">
      <div className="h-7 w-7 rounded-full bg-white/10 ring-1 ring-white/10 flex items-center justify-center text-[11px] font-semibold text-white">
        {code}
      </div>
      <div className="text-white/90 text-sm">
        {name} <span className="text-white/60">· {level}</span>
      </div>
    </div>
  );
}

/* === Componente principal === */
export default function SkillsSection() {
  const router = useRouter();
  const isES = (router.locale ?? "es").startsWith("es");

  const copy = isES
    ? {
        title: "Habilidades",
        subtitle: "Lenguajes, frameworks y tecnologías que uso a diario.",
        groups: { lang: "Lenguajes", fw: "Frameworks", tech: "Tecnologías", langs: "Idiomas" },
      }
    : {
        title: "Skills",
        subtitle: "Languages, frameworks and technologies I use daily.",
        groups: { lang: "Languages", fw: "Frameworks", tech: "Technologies", langs: "Languages" },
      };

  return (
    // Quitamos el centrado vertical y añadimos padding
    <section className="py-24 md:py-28" aria-label="Habilidades">
      {/* Alineado a la izquierda + espacio inferior si tienes un nav fijo */}
      <div className="w-full pl-6 md:pl-16 lg:pl-28 xl:pl-40 pr-6 pb-24">
        <div className="max-w-xl">
          <header className="mb-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-white drop-shadow">
              {copy.title}
            </h2>
            <p className="text-white/80 mt-1">{copy.subtitle}</p>
          </header>

          <Group title={copy.groups.lang} items={LANGUAGES} />
          <Group title={copy.groups.fw} items={FRAMEWORKS} />
          <Group title={copy.groups.tech} items={TECHNOLOGIES} />

          {/* Idiomas */}
          <div className="mt-10">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
              {copy.groups.langs}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
              <LangPill code="ES" name="Español" level="Nativo" />
              <LangPill code="EN" name="Inglés" level="B2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
