/* *Developed by pmatute */
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

import ProjectsSection, { Project } from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";

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
    <nav className="fixed inset-x-0 bottom-6 z-50 flex justify-center">
      <ul className="flex gap-2 rounded-2xl bg-black/50 backdrop-blur px-3 py-2 ring-1 ring-white/15">
        {items.map((item) => {
          const isActive = active === item.key;
          return (
            <li key={item.key}>
              <button
                type="button"
                onClick={() => onChange(item.key)}
                className={`px-4 py-2 rounded-xl text-sm transition
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
      titles: ["Ingeniero en Telecomunicaciones", "Máster en Desarrollo de Software (en proceso)"],
      blurb:
        "Aprendiendo a ser desarrollador full-stack: backend con Java / Spring Boot y frontend con React / Next.js, trabajando con bases de datos SQL.",
      cv: "Descargar CV",
    },
    en: {
      name: "Pablo Andrés Matute",
      titles: ["Telecommunications Engineer", "Master's in Software Development (in progress)"],
      blurb:
        "Learning to become a full-stack developer: backend with Java / Spring Boot and frontend with React / Next.js, working with SQL databases.",
      cv: "Download CV",
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
              Descargar CV (ES) <span className="ml-1"></span>
            </a>

            <a
              href="/cv/PabloMatute-CV-EN.pdf"
              download
              className="rounded-xl px-5 py-3 ring-1 ring-white/30 text-white/90 hover:bg-white/10 transition"
            >
              Download CV (EN) <span className="ml-1"></span>
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

  // Idioma simple para dataset de proyectos
  const locale = (router.locale ?? "es").startsWith("es") ? "es" : "en";

  // Proyectos de muestra (ajústalos a tus datos reales)
  // ===== REEMPLAZA projectsES y projectsEN POR ESTO =====
  const projectsES: Project[] = [
    {
      id: "rsale",
      title: "Rsale",
      description:
        "Plataforma de ventas y gestión de catálogo. Proyecto desarrollado para una empresa real (entorno productivo).",
      image: "/projects/rsale.jpg",
      tags: ["Java", "TypeScript", "SQL", "Spring Boot", "React"],
      github: "https://github.com/MatuCode",
      demo: "#",
    },
    {
      id: "futurity",
      title: "Futurity Inventory",
      description:
        "Sistema de inventario y calidad de servicio para un ISP. Proyecto implementado para una empresa real.",
      image: "/projects/futurity.jpg",
      tags: ["Java", "TypeScript", "SQL", "Spring Boot", "React"],
      github: "https://github.com/MatuCode",
    },
    {
      id: "relatos",
      title: "Relatos de Papel",
      description:
        "Trabajo de maestría: plataforma para gestión y venta de libros con búsquedas eficientes.",
      image: "/projects/relatos.jpg",
      tags: ["Java", "TypeScript", "SQL", "Spring Boot", "Next.js"],
      github: "https://github.com/MatuCode",
      demo: "#",
    },
    {
      id: "portfolio",
      title: "Portfolio Web",
      description: "Portafolio personal con animaciones y secciones dinámicas.",
      image: "/projects/portfolio.jpg",
      tags: ["TypeScript", "JavaScript", "CSS", "Next.js", "Tailwind", "Framer Motion"],
      github: "https://github.com/MatuCode",
      demo: "/",
    },
  ];

  const projectsEN: Project[] = [
    {
      id: "rsale-en",
      title: "Rsale",
      description:
        "Sales and catalog management platform. Built for a real company (production environment).",
      image: "/projects/rsale.jpg",
      tags: ["Java", "TypeScript", "SQL", "Spring Boot", "React"],
      github: "https://github.com/MatuCode",
      demo: "#",
    },
    {
      id: "futurity-en",
      title: "Futurity Inventory",
      description: "Inventory and service quality system for an ISP. Implemented for a real company.",
      image: "/projects/futurity.jpg",
      tags: ["Java", "TypeScript", "SQL", "Spring Boot", "React"],
      github: "https://github.com/MatuCode",
    },
    {
      id: "relatos-en",
      title: "Relatos de Papel",
      description:
        "Master’s degree project: platform for managing and selling books with efficient search.",
      image: "/projects/relatos.jpg",
      tags: ["Java", "TypeScript", "SQL", "Spring Boot", "Next.js"],
      github: "https://github.com/MatuCode",
      demo: "#",
    },
    {
      id: "portfolio-en",
      title: "Portfolio Website",
      description: "Personal portfolio with smooth animations and dynamic sections.",
      image: "/projects/portfolio.jpg",
      tags: ["TypeScript", "JavaScript", "CSS", "Next.js", "Tailwind", "Framer Motion"],
      github: "https://github.com/MatuCode",
      demo: "/",
    },
  ];

  const projects = locale === "es" ? projectsES : projectsEN;

  // Lee ?tab=... (para deep links)
  useEffect(() => {
    const q = (router.query.tab as string | undefined)?.toLowerCase();
    const allowed: TabKey[] = [
      "home",
      "habilidades",
      "proyectos",
      "experiencia",
      "educacion",
      "certificaciones",
      "contacto",
    ];
    if (q && (allowed as string[]).includes(q)) setActive(q as TabKey);
  }, [router.query.tab]);

  // Cambio de pestaña sin recargar
  const onChangeTab = (key: TabKey) => {
    setActive(key);
    router.push({ pathname: "/", query: key === "home" ? {} : { tab: key } }, undefined, {
      shallow: true,
    });
  };

  // Mapa pestaña -> sección
  const Section = useMemo(() => {
    switch (active) {
      case "home":
        return HomeSection;
      case "habilidades":
        return SkillsSection;
      case "proyectos":
        return () => <ProjectsSection projects={projects} />;
      case "experiencia":
        return ExperienceSection;
      case "educacion":
        return EducationSection;
      case "certificaciones":
        return CertificationsSection;
      case "contacto":
        return ContactSection;
      default:
        return HomeSection;
    }
  }, [active, projects]);

  return (
    <main className="min-h-screen text-white font-geist-sans bg-transparent">
      <AnimatePresence mode="wait">
        <motion.div key={active} initial="initial" animate="animate" exit="exit" variants={FADE}>
          <Section />
        </motion.div>
      </AnimatePresence>

      {/* Menú fijo (píldora) */}
      <TabbedShowcase items={TABS} active={active} onChange={onChangeTab} />
    </main>
  );
}
