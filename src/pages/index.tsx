/* *Developed by pmatute */
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

import ProjectsSection, { Project } from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactCard from "@/components/ContactSection";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import SeoHead from "@/components/SeoHead";
import ProjectsSchema from "@/components/ProjectsSchema"; // ← NUEVO

import { projectsES } from "@/content/projects.es";
import { projectsEN } from "@/content/projects.en";

/* =========================
   Menú Tabbed (inline)
   ========================= */
type TabKey =
  | "home"
  | "habilidades"
  | "proyectos"
  | "experiencia"
  | "educacion"
  | "certificaciones"
  | "contacto";

type TabItem = { key: TabKey; label: string };

const TABS: TabItem[] = [
  { key: "home", label: "Home" },
  { key: "habilidades", label: "Habilidades" },
  { key: "proyectos", label: "Proyectos" },
  { key: "experiencia", label: "Experiencia" },
  { key: "educacion", label: "Educación" },
  { key: "certificaciones", label: "Certificaciones" },
  { key: "contacto", label: "Contacto" },
];

function TabbedShowcase({
  items,
  active,
  onChange,
}: {
  items: TabItem[];
  active: TabKey;
  onChange: (key: TabKey) => void;
}) {
  return (
    <nav
      className="fixed left-0 right-0 bottom-2 z-50 flex justify-center px-3"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 8px)" }}
    >
      <ul
        className="
          no-scrollbar
          flex gap-1 items-center
          max-w-[100vw]
          overflow-x-auto overflow-y-hidden
          whitespace-nowrap
          rounded-2xl bg-black/55 backdrop-blur
          px-2 py-2 ring-1 ring-white/15
          snap-x snap-mandatory
        "
      >
        {items.map((item) => {
          const isActive = active === item.key;
          return (
            <li key={item.key} className="snap-center">
              <button
                type="button"
                onClick={() => onChange(item.key)}
                className={`px-3.5 py-2 rounded-xl text-sm transition
                  ${isActive ? "bg-orange-500 text-black" : "text-white/90 hover:bg-white/10"}`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ============== Animación de cambio de pestaña ============== */
const FADE = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
};

/* =========================
   Sección Home (hero)
   ========================= */
function HomeSection() {
  const router = useRouter();
  const lang: "es" | "en" = (router.locale ?? "es").startsWith("es") ? "es" : "en";

  const t = {
    es: {
      name: "Pablo Andrés Matute",
      titles: [
        "Ingeniero en Telecomunicaciones",
        "Desarrollador Full-Stack (Java/Spring Boot · React/Next.js)",
      ],
      blurb:
        "Creo aplicaciones de extremo a extremo: APIs REST seguras con Spring Boot y bases de datos SQL; y frontends modernos con React/Next.js. Me enfoco en buenas prácticas, testing y despliegues en Vercel/Docker.",
    },
    en: {
      name: "Pablo Andrés Matute",
      titles: [
        "Telecommunications Engineer",
        "Full-Stack Developer (Java/Spring Boot · React/Next.js)",
      ],
      blurb:
        "I build end-to-end apps: secure REST APIs with Spring Boot and SQL databases, and modern front-ends with React/Next.js. I focus on best practices, testing and deployments on Vercel/Docker.",
    },
  }[lang];

  return (
    <section className="min-h-screen flex items-center" aria-label="Inicio / Home">
      <div className="w-full max-w-[1200px] pl-6 md:pl-16 lg:pl-28 xl:pl-40 pr-6">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white drop-shadow">
            {t.name}
          </h1>

          <div className="mt-3 space-y-1 text-white/90">
            {t.titles.map((line, i) => (
              <p key={i} className="text-lg md:text-xl">
                {line}
              </p>
            ))}
          </div>

          <p className="mt-4 text-base md:text-lg text-white/85">{t.blurb}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/cv/PabloMatute-CV-ES.pdf"
              download
              className="rounded-xl bg-orange-500 text-black px-5 py-3 font-medium hover:brightness-110 transition"
            >
              Descargar CV (ES)
            </a>
            <a
              href="/cv/PabloMatute-CV-EN.pdf"
              download
              className="rounded-xl px-5 py-3 ring-1 ring-white/30 text-white/90 hover:bg-white/10 transition"
            >
              Download CV (EN)
            </a>
            <a
              href="https://github.com/MatuCode"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl px-5 py-3 ring-1 ring-white/30 text-white/90 hover:bg-white/10 transition"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/pablo-andres-matute"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl px-5 py-3 ring-1 ring-white/30 text-white/90 hover:bg-white/10 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   Página principal
   ========================= */
export default function HomePage() {
  const router = useRouter();
  const [active, setActive] = useState<TabKey>("home");

  const locale = (router.locale ?? "es").startsWith("es") ? "es" : "en";
  const projectsLang = locale === "es" ? projectsES : projectsEN;

  // Normaliza datos para el componente de tarjetas
  const normalizedProjects: Project[] = useMemo(() => {
    const list = projectsLang.projects
      // filtra cualquier “Portfolio” si apareciera
      .filter((p: any) => {
        const title = (p.title ?? "").toString().toLowerCase();
        const slug = (p.slug ?? p.id ?? "").toString().toLowerCase();
        return !title.includes("portfolio") && !slug.includes("portfolio");
      })
      .map((p: any) => ({
        id: p.slug ?? p.id ?? String(p.title),
        title: p.title,
        description: p.details ?? p.description ?? "",
        image: p.imageHD ?? p.image ?? "",
        tags: p.tags,
        demo: p.link ?? p.demo,
        // github intencionalmente omitido
      }));
    return list as Project[];
  }, [projectsLang]);

  // Datos SEO (ES/EN) para JSON-LD en una sola página
  const projectsSEO = useMemo(() => {
    const es = projectsES.projects;
    const en = projectsEN.projects;

    const getId = (x: any) => (x?.slug ?? x?.id ?? String(x?.title)).toString();
    const byIdEn = new Map(en.map((x: any) => [getId(x), x]));

    return es
      .filter((p: any) => {
        const t = (p.title ?? "").toString().toLowerCase();
        const s = (p.slug ?? p.id ?? "").toString().toLowerCase();
        return !t.includes("portfolio") && !s.includes("portfolio");
      })
      .map((p: any) => {
        const id = getId(p);
        const peer = byIdEn.get(id);
        return {
          id,
          title: p.title,
          descriptionEs: p.details ?? p.description ?? "",
          descriptionEn:
            peer?.details ?? peer?.description ?? p.details ?? p.description ?? "",
          applicationCategory: "SoftwareApplication",
          operatingSystem: "Web",
          keywords: p.tags ?? [],
        };
      });
  }, []);

  // lee ?tab=
  useEffect(() => {
    const tab = router.query.tab;
    if (!tab) {
      setActive("home");
      return;
    }
    const key = Array.isArray(tab) ? tab[0] : tab;
    if (TABS.some((t) => t.key === key)) setActive(key as TabKey);
  }, [router.query.tab]);

  const onChangeTab = (key: TabKey) => {
    setActive(key);
    router.push(
      { pathname: "/", query: key === "home" ? {} : { tab: key } },
      undefined,
      { shallow: true }
    );
  };

  const Section = useMemo<React.ReactNode>(() => {
    switch (active) {
      case "home":
        return <HomeSection />;
      case "habilidades":
        return <SkillsSection />;
      case "proyectos":
        return <ProjectsSection projects={normalizedProjects} />;
      case "experiencia":
        return <ExperienceSection />;
      case "educacion":
        return <EducationSection />;
      case "certificaciones":
        return <CertificationsSection />;
      case "contacto":
        return <ContactCard />;
      default:
        return <HomeSection />;
    }
  }, [active, normalizedProjects]);

  return (
    <main className="min-h-screen text-white font-geist-sans app-bg">
      <LanguageSwitcher />
      <ThemeSwitcher />
      <SeoHead />

      {/* JSON-LD con todos los proyectos en una sola página (sin OG) */}
      <ProjectsSchema baseUrl="https://matucode.lat" projects={projectsSEO as any} />

      <AnimatePresence mode="wait">
        <motion.div key={active} initial="initial" animate="animate" exit="exit" variants={FADE}>
          {Section}
        </motion.div>
      </AnimatePresence>

      {/* Menú fijo (píldora) */}
      <TabbedShowcase items={TABS} active={active} onChange={onChangeTab} />
    </main>
  );
}
