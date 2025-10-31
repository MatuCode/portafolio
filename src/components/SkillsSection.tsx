/* *Developed by pmatute */
import React from "react";

type Item = { name: string; icon: string; imgClassName?: string };

type SkillGroupLabels = {
  languages: string;
  frameworks: string;
  technologies: string;
  langs: string;
};

type LanguageLevel = {
  code: string;
  name: string;
  level: string;
};

type SkillsCopy = {
  title: string;
  subtitle: string;
  groups: SkillGroupLabels;
  languageLevels: LanguageLevel[];
};

const LANGUAGES: Item[] = [
  { name: "Java 17",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "TypeScript 5.x",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript ES6+",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Python 3.x",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "SQL (MySQL 8.0)",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
];

const FRAMEWORKS: Item[] = [
  { name: "Spring Boot 3.x",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "React 18",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js 14",      icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "Tailwind CSS 3.x", icon: "https://cdn.simpleicons.org/tailwindcss/38BDF8" },
  { name: "Vite 5.x",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
];

const TECHNOLOGIES: Item[] = [
  { name: "MySQL 8.0",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Elasticsearch 8.x", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-plain.svg" },
  { name: "Git & GitHub",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker & Docker Compose",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Linux (Ubuntu/CentOS)",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Vercel (Deployment)",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", imgClassName: "brightness-0 invert" },
  { name: "Postman (API Testing)",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
];

function Group({ title, items }: { title: string; items: Item[] }) {
  return (
    <div className="mb-6 sm:mb-8">
      <h3 className="text-base sm:text-lg font-semibold text-white mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="group flex items-center gap-2 sm:gap-3 rounded-xl bg-white/5 ring-1 ring-white/10 px-2.5 sm:px-3 py-2 backdrop-blur hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:ring-white/20"
            title={item.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.icon}
              alt={item.name}
              className={`h-5 w-5 sm:h-6 sm:w-6 object-contain transition-transform duration-300 group-hover:scale-110 ${item.imgClassName ?? ""}`}
              loading="lazy"
              draggable={false}
            />
            <span className="text-white/90 text-xs sm:text-sm truncate group-hover:text-white transition-colors duration-300">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LangPill({ code, name, level }: LanguageLevel) {
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

export default function SkillsSection({ copy }: { copy: SkillsCopy }) {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28" aria-label={copy.title}>
      <div className="w-full px-4 sm:px-6 md:pl-16 lg:pl-28 xl:pl-40 md:pr-6 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-xl">
          <header className="mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white drop-shadow">{copy.title}</h2>
            <p className="text-white/80 mt-1 text-sm sm:text-base">{copy.subtitle}</p>
          </header>

          <Group title={copy.groups.languages} items={LANGUAGES} />
          <Group title={copy.groups.frameworks} items={FRAMEWORKS} />
          <Group title={copy.groups.technologies} items={TECHNOLOGIES} />

          <div className="mt-8 sm:mt-10">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3">
              {copy.groups.langs}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-xl">
              {copy.languageLevels.map((lang) => (
                <LangPill key={lang.code} {...lang} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
