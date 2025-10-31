/* *Developed by pmatute */
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Cargar PdfImageViewer solo en el cliente para evitar errores SSR
const PdfImageViewer = dynamic(
  () => import("./PdfImageViewer").then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-white/5 via-white/3 to-transparent backdrop-blur-sm ring-1 ring-white/20 shadow-2xl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/30 mb-4"></div>
        <div className="text-white/70 text-sm font-medium">Cargando certificado...</div>
      </div>
    )
  }
);

type Cert = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  tags?: string[];
  img?: string;       // ruta a /public/certs/*.jpg
  pdf?: string;       // ruta a /public/certifications/*.pdf
  priority: number;  // menor = más importante
};

// ===== SOLO IMÁGENES (ajusta textos si deseas) =====
const CERTS: Cert[] = [
  {
    id: "efset",
    title: "EF SET English Certificate – B2",
    issuer: "EF SET",
    date: "May 2025",
    tags: ["Inglés"],
    img: "/certs/EF.jpg",
    priority: 1,
  },
  {
    id: "leadership",
    title: "Continuing Education Certificate in Leadership (45 h)",
    issuer: "City University Miami (MIU – Continuing Education)",
    date: "Ago 2024",
    tags: ["Liderazgo"],
    img: "/certs/Leadership.jpg",
    priority: 2,
  },
  {
    id: "cisco-srw",
    title: "CCNAv7: Switching, Routing and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    date: "Jul 2021",
    tags: ["Redes"],
    img: "/certs/Cisco-SRW.jpg",
    priority: 3,
  },
  {
    id: "cisco-intro",
    title: "CCNAv7: Introducción a Redes",
    issuer: "Cisco Networking Academy",
    date: "Feb 2021",
    tags: ["Redes"],
    img: "/certs/Cisco-IntroduccionRedes.jpg",
    priority: 4,
  },
  {
    id: "ms-linkedin-software",
    title: "Fundamentos profesionales del desarrollo de software",
    issuer: "Microsoft & LinkedIn Learning",
    date: "Jun 2024",
    tags: ["Desarrollo"],
    img: "/certs/Linkedin-Software.jpg",
    priority: 5,
  },
  {
    id: "ms-linkedin-cyber",
    title: "Fundamentos profesionales en ciberseguridad",
    issuer: "Microsoft & LinkedIn Learning",
    date: "Jun 2024",
    tags: ["Ciberseguridad"],
    img: "/certs/Linkedin-Cibersecurity.jpg",
    priority: 6,
  },
  {
    id: "certiprof",
    title: "Cybersecurity Awareness Professional Certification (ES)",
    issuer: "CertiProf",
    date: "Vigente",
    tags: ["Ciberseguridad"],
    img: "/certs/certifpro.jpg",
    priority: 7,
  },
  {
    id: "excel-advanced",
    title: "Excel avanzado: validación de datos, fórmulas, macros y tablas dinámicas (40 h)",
    issuer: "Operador de Capacitación · Ministerio del Trabajo",
    date: "Feb 2024",
    tags: ["Office"],
    img: "/certs/Excel.jpg",
    priority: 8,
  },
  {
    id: "fine-tuned-b2",
    title: "Certificación Nivel B2 en Inglés (B2.3)",
    issuer: "Fine-Tuned English Language Institute",
    date: "Nov 2024",
    tags: ["Inglés"],
    img: "/certs/FTN.jpg",
    priority: 9,
  },
  {
    id: "mastermind",
    title: "MasterMind Program Certificate",
    issuer: "Mastermind",
    date: "2021",
    img: "/certs/mastermind.jpg",
    priority: 10,
  },
  // LinkedIn Learning Certifications
  {
    id: "angular-esencial",
    title: "Angular esencial",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_Angular esencial.pdf",
    priority: 11,
  },
  {
    id: "semantica-web",
    title: "Aprende semántica web",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_Aprende semantica web.pdf",
    priority: 12,
  },
  {
    id: "arquitectura-software",
    title: "Arquitectura de software: Análisis de proyectos esencial",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_Arquitectura de software Analisis de proyectos esencial.pdf",
    priority: 13,
  },
  {
    id: "ciberseguridad-terminologia",
    title: "Concienciación en ciberseguridad: Terminología de ciberseguridad",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Ciberseguridad"],
    pdf: "/certifications/CertificadoDeFinalizacion_Concienciacion en ciberseguridad Terminologia de ciberseguridad.pdf",
    priority: 14,
  },
  {
    id: "desarrollador-frontend",
    title: "Conviértete en desarrollador web frontend",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_Conviertete en desarrollador web frontend.pdf",
    priority: 15,
  },
  {
    id: "css-sass",
    title: "CSS con SASS esencial",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_CSS con SASS esencial.pdf",
    priority: 16,
  },
  {
    id: "css-esencial",
    title: "CSS esencial",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_CSS esencial.pdf",
    priority: 17,
  },
  {
    id: "depurar-javascript",
    title: "Depura el código JavaScript",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_Depura el codigo JavaScript.pdf",
    priority: 18,
  },
  {
    id: "calidad-automatizado",
    title: "Desarrollo web: Control de calidad automatizado",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_Desarrollo web Control de calidad automatizado.pdf",
    priority: 19,
  },
  {
    id: "docker-esencial",
    title: "Docker esencial",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_Docker esencial.pdf",
    priority: 20,
  },
  {
    id: "especialista-desarrollo-web",
    title: "Explora una carrera como especialista en desarrollo web",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_Explora una carrera como especialista en desarrollo web (1).pdf",
    priority: 21,
  },
  {
    id: "fundamentos-ciberseguridad",
    title: "Fundamentos de ciberseguridad",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Ciberseguridad"],
    pdf: "/certifications/CertificadoDeFinalizacion_Fundamentos de ciberseguridad.pdf",
    priority: 22,
  },
  {
    id: "fundamentos-ciberseguridad-redes",
    title: "Fundamentos de la ciberseguridad: Redes",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Ciberseguridad", "Redes"],
    pdf: "/certifications/CertificadoDeFinalizacion_Fundamentos de la ciberseguridad Redes.pdf",
    priority: 23,
  },
  {
    id: "fundamentos-fullstack",
    title: "Fundamentos del desarrollo web: Full Stack o Frontend",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_Fundamentos del desarrollo web Full Stack o Frontend.pdf",
    priority: 24,
  },
  {
    id: "fundamentos-programacion",
    title: "Fundamentos esenciales de la programación",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_Fundamentos esenciales de la programacion.pdf",
    priority: 25,
  },
  {
    id: "github-programadores",
    title: "GitHub para programadores",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_GitHub para programadores.pdf",
    priority: 26,
  },
  {
    id: "html-avanzado",
    title: "HTML avanzado",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_HTML avanzado.pdf",
    priority: 27,
  },
  {
    id: "html-esencial",
    title: "HTML esencial",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_HTML esencial.pdf",
    priority: 28,
  },
  {
    id: "integracion-html-css",
    title: "Integración HTML y CSS esencial",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_Integracion HTML y CSS esencial.pdf",
    priority: 29,
  },
  {
    id: "habilidades-profesionales",
    title: "Introducción a las habilidades profesionales en el desarrollo de software",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_Introduccion a las habilidades profesionales en el desarrollo de software.pdf",
    priority: 30,
  },
  {
    id: "javascript-avanzado",
    title: "JavaScript avanzado: Buenas prácticas",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_JavaScript avanzado Buenas practicas.pdf",
    priority: 31,
  },
  {
    id: "javascript-esencial",
    title: "JavaScript esencial",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_JavaScript esencial.pdf",
    priority: 32,
  },
  {
    id: "azure-ia",
    title: "Microsoft Azure IA esencial: Introducción a Workloads y Machine Learning en Azure",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Ciberseguridad"],
    pdf: "/certifications/CertificadoDeFinalizacion_Microsoft Azure IA esencial Introduccion a Workloads y Machine Learning en Azure.pdf",
    priority: 33,
  },
  {
    id: "copilot-seguridad",
    title: "Microsoft Copilot para Seguridad",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Ciberseguridad"],
    pdf: "/certifications/CertificadoDeFinalizacion_Microsoft Copilot para Seguridad.pdf",
    priority: 34,
  },
  {
    id: "mysql-esencial",
    title: "MySQL esencial",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_MySQL esencial.pdf",
    priority: 35,
  },
  {
    id: "panoramica-amenazas",
    title: "Panorámica de amenazas a la ciberseguridad",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Ciberseguridad"],
    pdf: "/certifications/CertificadoDeFinalizacion_Panoramica de amenazas a la ciberseguridad.pdf",
    priority: 36,
  },
  {
    id: "react-esencial",
    title: "React esencial",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_React esencial.pdf",
    priority: 37,
  },
  {
    id: "scrum-esencial",
    title: "Scrum esencial",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_Scrum esencial .pdf",
    priority: 38,
  },
  {
    id: "scrum-roles",
    title: "SCRUM: Roles",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_SCRUM Roles.pdf",
    priority: 39,
  },
  {
    id: "seguridad-web",
    title: "Seguridad web esencial",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Ciberseguridad"],
    pdf: "/certifications/CertificadoDeFinalizacion_Seguridad web esencial (1).pdf",
    priority: 40,
  },
  {
    id: "typescript-esencial",
    title: "TypeScript esencial",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_TypeScript esencial.pdf",
    priority: 41,
  },
  {
    id: "vue-esencial",
    title: "Vue.js esencial",
    issuer: "LinkedIn Learning",
    date: "2024",
    tags: ["Desarrollo"],
    pdf: "/certifications/CertificadoDeFinalizacion_Vue.js esencial.pdf",
    priority: 42,
  },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 text-[11px] rounded-lg bg-white/10 ring-1 ring-white/10 text-white/90">
      {children}
    </span>
  );
}

export default function Certifications() {
  const router = useRouter();
  const isES = (router.locale ?? "es").startsWith("es");

  const copy = isES
    ? {
        title: "Certificaciones",
        subtitle: "Seleccionadas por relevancia. Pulsa “Ver” para abrir la imagen.",
        view: "Ver",
        close: "Cerrar",
        more: "Ver más",
        less: "Ver menos",
      }
    : {
        title: "Certifications",
        subtitle: "Selected by relevance. Press “View” to open the image.",
        view: "View",
        close: "Close",
        more: "Show more",
        less: "Show less",
      };

  const [openId, setOpenId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"priority" | "date" | "title">("priority");
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);

  const openCert = CERTS.find((c) => c.id === openId) || null;

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpenId(null);
  }, []);
  useEffect(() => {
    if (!openId) return;
    window.addEventListener("keydown", onKey);
    document.body.classList.add('modal-open');
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove('modal-open');
    };
  }, [openId, onKey]);

  // Get unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    CERTS.forEach(cert => {
      if (cert.tags) cert.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter and sort
  const filteredAndSorted = useMemo(() => {
    let filtered = CERTS.filter(cert => {
      const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTag = selectedTag === "all" || cert.tags?.includes(selectedTag);
      
      const matchesFeatured = !showOnlyFeatured || cert.priority <= 4;
      
      return matchesSearch && matchesTag && matchesFeatured;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          return a.priority - b.priority;
        case "date":
          return b.date.localeCompare(a.date);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedTag, sortBy, showOnlyFeatured]);

  const INITIAL_COUNT = 6;
  const visible = expanded ? filteredAndSorted : filteredAndSorted.slice(0, INITIAL_COUNT);

  return (
    <section className="py-24 md:py-28">
      <div className="w-full pl-6 md:pl-16 lg:pl-28 xl:pl-40 pr-6">
        <div className="max-w-[48rem]">
          <header className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-white drop-shadow">
              {copy.title}
            </h2>
            <p className="text-white/75 text-sm md:text-base mt-1">{copy.subtitle}</p>
          </header>

          {/* Search Input */}
          <div className="mb-6 relative group">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50 group-focus-within:text-white/80 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={isES ? "Buscar certificaciones por título, emisor o tecnología..." : "Search certifications by title, issuer or technology..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 pr-10 rounded-2xl bg-white/10 backdrop-blur-sm text-white placeholder-white/50 ring-1 ring-white/20 focus:ring-2 focus:ring-white/40 focus:outline-none transition-all duration-300 hover:bg-white/12"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label={isES ? "Limpiar búsqueda" : "Clear search"}
              >
                <svg className="h-4 w-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Featured Toggle and Results */}
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                showOnlyFeatured
                  ? "text-white shadow-lg"
                  : "bg-white/10 text-white/80 ring-1 ring-white/15 hover:bg-white/15 hover:text-white"
              }`}
              style={showOnlyFeatured ? {
                background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #0a0a0a 100%)',
                boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3), inset 0 0 0 1px rgba(251, 191, 36, 0.3)',
                border: '1px solid rgba(251, 191, 36, 0.2)'
              } : {}}
            >
              <span className="text-lg">{showOnlyFeatured ? '⭐' : '☆'}</span>
              {isES ? "Solo destacados" : "Featured only"}
            </button>

            <div className="flex items-center gap-2 text-white/60 text-sm">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium">{filteredAndSorted.length}</span>
              <span>{isES ? "de" : "of"} {CERTS.length}</span>
            </div>
          </div>

          {/* Sort and Filter Chips */}
          <div className="mb-6 space-y-4">
            {/* Sort */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                {isES ? "Ordenar:" : "Sort:"}
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSortBy("priority")}
                  className={`px-4 py-2 text-sm rounded-xl font-medium transition-all duration-300 ${
                    sortBy === "priority"
                      ? "text-white shadow-lg"
                      : "bg-white/10 text-white/80 ring-1 ring-white/15 hover:bg-white/15 hover:text-white"
                  }`}
                  style={sortBy === "priority" ? {
                    background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #0a0a0a 100%)',
                    boxShadow: '0 4px 12px rgba(22, 33, 62, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  } : {}}
                >
                  ⭐ {isES ? "Importancia" : "Priority"}
                </button>
                <button
                  onClick={() => setSortBy("date")}
                  className={`px-4 py-2 text-sm rounded-xl font-medium transition-all duration-300 ${
                    sortBy === "date"
                      ? "text-white shadow-lg"
                      : "bg-white/10 text-white/80 ring-1 ring-white/15 hover:bg-white/15 hover:text-white"
                  }`}
                  style={sortBy === "date" ? {
                    background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #0a0a0a 100%)',
                    boxShadow: '0 4px 12px rgba(22, 33, 62, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  } : {}}
                >
                  📅 {isES ? "Fecha" : "Date"}
                </button>
                <button
                  onClick={() => setSortBy("title")}
                  className={`px-4 py-2 text-sm rounded-xl font-medium transition-all duration-300 ${
                    sortBy === "title"
                      ? "text-white shadow-lg"
                      : "bg-white/10 text-white/80 ring-1 ring-white/15 hover:bg-white/15 hover:text-white"
                  }`}
                  style={sortBy === "title" ? {
                    background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #0a0a0a 100%)',
                    boxShadow: '0 4px 12px rgba(22, 33, 62, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  } : {}}
                >
                  🔤 {isES ? "Título" : "Title"}
                </button>
              </div>
            </div>

            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {isES ? "Categoría:" : "Category:"}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedTag("all")}
                    className={`px-4 py-2 text-sm rounded-xl font-medium transition-all duration-300 ${
                      selectedTag === "all"
                        ? "text-white shadow-lg"
                        : "bg-white/10 text-white/80 ring-1 ring-white/15 hover:bg-white/15 hover:text-white"
                    }`}
                    style={selectedTag === "all" ? {
                      background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #0a0a0a 100%)',
                      boxShadow: '0 4px 12px rgba(22, 33, 62, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    } : {}}
                  >
                    {isES ? "Todas" : "All"}
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-4 py-2 text-sm rounded-xl font-medium transition-all duration-300 ${
                        selectedTag === tag
                          ? "text-white shadow-lg"
                          : "bg-white/10 text-white/80 ring-1 ring-white/15 hover:bg-white/15 hover:text-white"
                      }`}
                      style={selectedTag === tag ? {
                        background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #0a0a0a 100%)',
                        boxShadow: '0 4px 12px rgba(22, 33, 62, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      } : {}}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Clear Filters */}
            {(searchTerm || selectedTag !== "all" || showOnlyFeatured) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTag("all");
                  setShowOnlyFeatured(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {isES ? "Limpiar filtros" : "Clear filters"}
              </button>
            )}
          </div>

          <div className="grid gap-4">
            {visible.map((c) => (
              <article
                key={c.id}
                className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 md:p-5 backdrop-blur"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
                      {c.title}
                    </h3>
                    <p className="text-white/75 text-xs md:text-sm mt-0.5">
                      {c.issuer} · {c.date}
                    </p>
                    {!!c.tags?.length && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {c.tags.map((t) => (
                          <Badge key={t}>{t}</Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 flex gap-2">
                  <button
                    type="button"
                      onClick={() => setOpenId(c.id)}
                    className="px-3 py-1.5 text-xs rounded-lg bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition"
                  >
                    {copy.view}
                  </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredAndSorted.length === 0 && (
            <div className="text-center py-12 text-white/50">
              <p className="text-lg">{isES ? "No se encontraron certificaciones" : "No certifications found"}</p>
            </div>
          )}

          {filteredAndSorted.length > INITIAL_COUNT && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="px-6 py-3 text-sm rounded-xl bg-gradient-to-r from-[#16213e] via-[#1a1a2e] to-[#0a0a0a] ring-1 ring-white/20 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {expanded ? copy.less : copy.more}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal imagen o PDF - Diseño Profesional */}
      {openCert && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 md:p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenId(null)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[98vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de cerrar mejorado */}
            <button
              onClick={() => setOpenId(null)}
              className="absolute top-2 right-2 md:top-4 md:right-4 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md ring-2 ring-white/20 text-white hover:bg-white/20 hover:ring-white/40 transition-all duration-200 hover:scale-110 shadow-xl"
              aria-label={copy.close}
              title={copy.close}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Contenedor principal con diseño elegante */}
            <div className="bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/10 overflow-hidden">
              {/* Header del certificado */}
              <div className="px-4 md:px-6 pt-4 md:pt-6 pb-3 text-center border-b border-white/10">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
                  {openCert.title}
                </h3>
                <p className="text-white/60 text-xs md:text-sm mb-2">
                  {openCert.issuer} · {openCert.date}
                </p>
                {openCert.tags && openCert.tags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {openCert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[10px] md:text-xs rounded-md bg-white/8 text-white/70 ring-1 ring-white/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Contenido del certificado */}
              <div className="p-3 md:p-6">
                {openCert.pdf ? (
                  <PdfImageViewer 
                    pdfUrl={openCert.pdf} 
                    alt={openCert.title}
                    loadingText={isES ? "Cargando certificado..." : "Loading certificate..."}
                    errorText={isES ? "Error al cargar el certificado" : "Error loading certificate"}
                    previousText={isES ? "← Anterior" : "← Previous"}
                    nextText={isES ? "Siguiente →" : "Next →"}
                    pageText={isES ? "Página" : "Page"}
                  />
                ) : openCert.img ? (
                  <div className="flex items-center justify-center rounded-2xl bg-white p-3 md:p-6 shadow-2xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={openCert.img}
                      alt={openCert.title}
                      className="w-full h-auto rounded-lg max-w-full object-contain"
                      style={{ maxHeight: '85vh' }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
