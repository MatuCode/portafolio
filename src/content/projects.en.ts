/* *Developed by pmatute */
import type { ProjectItem } from "@/types/projects";
export const projectsEN: {
  title: string;
  subtitle?: string;
  cta?: string;
  projects: (ProjectItem & { slug: string; details?: string; imageHD?: string; link?: string })[];
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
        "Books catalog: React (frontend) + Spring Boot with Elasticsearch (backend). Advanced search, filters and pagination.",
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
        "REST services for a real-estate platform: authentication, image handling and property CRUD.",
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
