/* *Developed by pmatute */
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

import ProjectsSection, { ProjectsCopy } from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SeoHead from "@/components/SeoHead";
import ProjectsSchema, { type ProjectSEO } from "@/components/ProjectsSchema";

import { getDictionary, dictionaries } from "@/i18n";

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

const TAB_ORDER: TabKey[] = [
  "home",
  "habilidades",
  "proyectos",
  "experiencia",
  "educacion",
  "certificaciones",
  "contacto",
];

const TAB_KEYS: TabKey[] = [...TAB_ORDER];

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
      className="fixed left-0 right-0 bottom-2 z-50 flex justify-center px-2 sm:px-3"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 8px)" }}
    >
      <ul
        className="
          no-scrollbar flex gap-0.5 sm:gap-1 items-center max-w-[100vw]
          overflow-x-auto overflow-y-hidden whitespace-nowrap
          rounded-xl sm:rounded-2xl bg-black/60 backdrop-blur px-1 sm:px-2 py-1.5 sm:py-2 ring-1 ring-white/15
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
                className={`px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm transition whitespace-nowrap
                  ${isActive ? "text-white" : "text-white/90 hover:text-white hover:bg-white/10"}`}
                style={isActive ? {
                  background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #0a0a0a 100%)',
                  boxShadow: '0 2px 8px rgba(22, 33, 62, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                } : {}}
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
   Hero Section
   ========================= */
type HeroCopy = {
  name: string;
  titles: string[];
  blurb: string;
  sectionLabel: string;
  cta: {
    downloadEs: string;
    downloadEn: string;
    github: string;
    linkedin: string;
  };
};

function HomeSection({ hero }: { hero: HeroCopy }) {
  return (
    <section className="min-h-screen flex items-center" aria-label={hero.sectionLabel}>
      <div className="w-full max-w-[1200px] px-4 sm:px-6 md:pl-16 lg:pl-28 xl:pl-40 md:pr-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow">
            {hero.name}
          </h1>

          <div className="mt-3 space-y-1 text-white/90">
            {hero.titles.map((line) => (
              <p key={line} className="text-base sm:text-lg md:text-xl">
                {line}
              </p>
            ))}
          </div>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/85">{hero.blurb}</p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
            <a
              href="/cv/PabloMatute-CV-ES.pdf"
              download
              className="rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 font-medium transition text-center sm:text-left"
              style={{
                background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #0a0a0a 100%)',
                boxShadow: '0 4px 15px rgba(22, 33, 62, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0a0a0a 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #0a0a0a 100%)';
              }}
            >
              {hero.cta.downloadEs}
            </a>
            <a
              href="/cv/PabloMatute-CV-EN.pdf"
              download
              className="rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 ring-1 ring-white/30 text-white/90 hover:bg-white/10 transition text-center sm:text-left"
            >
              {hero.cta.downloadEn}
            </a>
            <a
              href="https://github.com/MatuCode"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 ring-1 ring-white/30 text-white/90 hover:bg-white/10 transition text-center sm:text-left"
            >
              {hero.cta.github}
            </a>
            <a
              href="https://www.linkedin.com/in/pablo-andres-matute"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 ring-1 ring-white/30 text-white/90 hover:bg-white/10 transition text-center sm:text-left"
            >
              {hero.cta.linkedin}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   página principal
   ========================= */
export default function HomePage() {
  const router = useRouter();
  const [active, setActive] = useState<TabKey>("home");

  const locale = (router.locale ?? "es").startsWith("es") ? "es" : "en";
  const dictionary = getDictionary(locale);
  const tabItems = TAB_ORDER.map((key) => ({ key, label: dictionary.menu[key] }));

  // Mapear projects con tipos correctos
  const projectsCopy: ProjectsCopy = useMemo(() => ({
    ...dictionary.projects,
    items: dictionary.projects.items.map((item) => ({
      ...item,
      contextType: item.contextType as "academic" | "internship" | "professional" | undefined,
    })),
  }), [dictionary.projects]);

  const projectsSEO = useMemo<ProjectSEO[]>(() => {
    const esProjects = dictionaries.es.projects.items.map((item) => ({
      ...item,
      contextType: item.contextType as "academic" | "internship" | "professional" | undefined,
    }));
    const enProjects = dictionaries.en.projects.items.map((item) => ({
      ...item,
      contextType: item.contextType as "academic" | "internship" | "professional" | undefined,
    }));
    const enMap = new Map(enProjects.map((item) => [item.slug, item]));

    return esProjects.map((item) => {
      const peer = enMap.get(item.slug);
      return {
        id: item.slug,
        title: item.title,
        descriptionEs: item.details ?? item.description,
        descriptionEn: peer?.details ?? peer?.description ?? item.description,
        applicationCategory: "SoftwareApplication",
        operatingSystem: "Web",
        keywords: item.tech ?? [],
      };
    });
  }, []);

  useEffect(() => {
    const tab = router.query.tab;
    if (!tab) {
      setActive("home");
      return;
    }
    const key = Array.isArray(tab) ? tab[0] : tab;
    if (TAB_KEYS.includes(key as TabKey)) setActive(key as TabKey);
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
        return <HomeSection hero={dictionary.hero} />;
      case "habilidades":
        return <SkillsSection copy={dictionary.skills} />;
      case "proyectos":
        return <ProjectsSection copy={projectsCopy} />;
      case "experiencia":
        return <ExperienceSection copy={dictionary.experience} />;
      case "educacion":
        return <EducationSection copy={dictionary.education} />;
      case "certificaciones":
        return <CertificationsSection />;
      case "contacto":
        return <ContactSection copy={dictionary.contact} />;
      default:
        return <HomeSection hero={dictionary.hero} />;
    }
  }, [active, dictionary, projectsCopy]);

  return (
    <main className="min-h-screen text-white font-geist-sans app-bg">
      <LanguageSwitcher />
      <SeoHead seo={dictionary.seo} />
      <ProjectsSchema baseUrl="https://matucode.lat" projects={projectsSEO as any} />

      <AnimatePresence mode="wait">
        <motion.div key={active} initial="initial" animate="animate" exit="exit" variants={FADE}>
          {Section}
        </motion.div>
      </AnimatePresence>

      <TabbedShowcase items={tabItems} active={active} onChange={onChangeTab} />
      
      {/* Componentes flotantes */}
      <LanguageSwitcher />
    </main>
  );
}





