/* *Developed by pmatute */
import type { ProjectItem } from "@/types/projects";

export const projectsES: {
  title: string;
  subtitle?: string;
  cta?: string;
  projects: (ProjectItem & { slug: string; details?: string; imageHD?: string; link?: string })[];
} = {
  title: "Proyectos",
  subtitle: "Selección de proyectos recientes con enfoque en backend y productos funcionales.",
  cta: "Abrir",
  projects: [
    {
      slug: "inventario-futurity",
      title: "Futurity — Inventario & Calidad de Servicio",
      description:
        "Proyecto de pasantía: desarrollo de la aplicación web y base de datos para los módulos de Inventario y Calidad de Servicio. Incluye RBAC, checklists, reportes PDF/Excel y paneles de indicadores.",
      details:
        "Se diseñaron endpoints REST en Spring Boot con validación y manejo de errores, estructura de base de datos en MySQL y frontend en React/Vite. Autenticación, roles y reportes automatizados para KPIs.",
      image: "/images/proyectos/futurity.png",
      imageHD: "/images/proyectos/futurity_hd.png",
      tech: [
        "Java 17",
        "Spring Boot",
        "MySQL",
        "React/Vite",
        "Docker",
        "REST",
      ],
      link: "https://github.com/MatuCode",
    },
    {
      slug: "relatos-de-papel",
      title: "Relatos de Papel",
      description:
        "Catálogo de libros: React (frontend) + Spring Boot con Elasticsearch (backend). Búsqueda avanzada, filtros y paginación.",
      image: "/images/proyectos/relatos.png",
      imageHD: "/images/proyectos/relatos_hd.png",
      tech: [
        "React",
        "Spring Boot",
        "Elasticsearch",
        "REST",
      ],
      link: "https://github.com/MatuCode",
    },
    {
      slug: "rsale-backend",
      title: "Rsale Backend",
      description:
        "Servicios REST para plataforma inmobiliaria: autenticación, manejo de imágenes y CRUD de propiedades.",
      image: "/images/proyectos/rsale.png",
      imageHD: "/images/proyectos/rsale_hd.png",
      tech: [
        "Spring Boot",
        "MySQL",
        "JWT",
        "REST",
      ],
      link: "https://github.com/MatuCode",
    },
  ],
};
