/* *Developed by pmatute */
import type { ProjectItem } from "@/components/ProjectsSection";

export const projectsES: {
  title: string;
  subtitle?: string;
  cta?: string;
  projects: ProjectItem[];
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
        { name: "Java 17", icon: "/icons/tech/java.svg" },
        { name: "Spring Boot", icon: "/icons/tech/spring.svg" },
        { name: "MySQL", icon: "/icons/tech/mysql.svg" },
        { name: "React/Vite", icon: "/icons/tech/react.svg" },
        { name: "Docker", icon: "/icons/tech/docker.svg" },
        { name: "REST", icon: "/icons/tech/rest.svg" },
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
        { name: "React", icon: "/icons/tech/react.svg" },
        { name: "Spring Boot", icon: "/icons/tech/spring.svg" },
        { name: "Elasticsearch", icon: "/icons/tech/elasticsearch.svg" },
        { name: "REST", icon: "/icons/tech/rest.svg" },
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
        { name: "Spring Boot", icon: "/icons/tech/spring.svg" },
        { name: "MySQL", icon: "/icons/tech/mysql.svg" },
        { name: "JWT", icon: "/icons/tech/jwt.svg" },
        { name: "REST", icon: "/icons/tech/rest.svg" },
      ],
      link: "https://github.com/MatuCode",
    },
  ],
};
