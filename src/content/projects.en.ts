/* *Developed by pmatute */
import type { ProjectItem } from "@/components/ProjectsSection";

export const projectsEN: {
  title: string;
  subtitle?: string;
  cta?: string;
  projects: ProjectItem[];
} = {
  title: "Projects",
  subtitle: "Selected recent work focused on backend and functional products.",
  cta: "Open",
  projects: [
    {
      slug: "inventario-futurity",
      title: "Futurity — Inventory & Service Quality",
      description:
        "Internship project: building the web app and database for Inventory and Service Quality modules. Includes RBAC, checklists, PDF/Excel reporting and KPI dashboards.",
      details:
        "Spring Boot REST endpoints with validation and error handling, MySQL data model and a React/Vite frontend. Authentication, role-based permissions and automated KPI reporting.",
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
        "Books catalog: React (frontend) + Spring Boot with Elasticsearch (backend). Advanced search, filters and pagination.",
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
        "REST services for a real-estate platform: authentication, image handling and property CRUD.",
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
