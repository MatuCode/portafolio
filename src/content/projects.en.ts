/* *Developed by pmatute */
import type { ProjectItem } from "@/types/projects";

export const projectsEN: {
  title: string;
  subtitle?: string;
  cta?: string;
  projects: (ProjectItem & {
    slug: string;
    details?: string;
    imageHD?: string;
    link?: string;       // Demo
    video?: string;      // Optional project video
    instagram?: string;  // Optional Instagram post/gallery
    note?: string;       // Visible note (e.g., data protection)
  })[];
} = {
  title: "Projects",
  subtitle:
    "Selected recent work focused on backend, REST APIs, and functional products.",
  cta: "Open",
  projects: [
    {
      slug: "inventario-futurity",
      title: "Futurity — Inventory & Service Quality",
      description:
        "Inventory and service-quality management for an ISP: devices, locations, audits, and KPI dashboards.",
      details:
        "Web application oriented to network operations. Register and locate devices (routers, ONUs, radios), run audits with checklists, keep full movement traceability, and generate service KPIs with PDF/Excel exports. "
        + "The backend provides REST endpoints in Spring Boot (Java 17) with validation, error handling, and role-based access control (RBAC). The MySQL schema includes indexes/relations for efficient queries. "
        + "The frontend, built with React/Next.js, implements validated forms, protected routes, and KPI dashboards. Deployments with Docker and environment configuration.",
      note: "Data has been modified to protect the company.",
      image: "/projects/futurity.jpg",
      imageHD: "/projects/futurity.jpg",
      tech: ["Java 17", "Spring Boot", "MySQL", "React/Next.js", "Docker", "REST"],
      link: "#",
      video: "#",
      instagram: "https://instagram.com/matute.api.dev",
    },
    {
      slug: "relatos-de-papel",
      title: "Relatos de Papel",
      description:
        "Book management & e-commerce platform with efficient search, faceted filters, and an editorial admin panel.",
      details:
        "Master’s project aimed at an editorial e-commerce workflow. Catalog with filters by author/topic/publisher, efficient search, pagination, and a cart with a simulated checkout. "
        + "The private area handles CRUD for books/authors/stock plus basic sales analytics. "
        + "Spring Boot backend with DTOs, validation, and JPA mapping; Next.js frontend with SSR, i18n, and reusable components.",
      image: "/projects/relatos.jpg",
      imageHD: "/projects/relatos.jpg",
      tech: ["Java", "Spring Boot", "SQL", "Next.js", "React", "REST"],
      link: "#",
      video: "#",
      instagram: "https://instagram.com/matute.api.dev",
    },
    {
      slug: "rsale-backend",
      title: "Rsale",
      description:
        "Sales & catalog platform with stock control, variants, pricing, and reporting for real-world operation.",
      details:
        "End-to-end solution to manage products, variants, and inventory; order flows, role-based access, and operational reports. "
        + "The backend exposes secure REST APIs with Spring Boot (authentication/JWT, validation, pagination, filtering) and persists to SQL with optimized queries. "
        + "The React/Next.js frontend provides a responsive UI and validated forms. Automated deployments and per-environment configuration.",
      image: "/projects/rsale.jpg",
      imageHD: "/projects/rsale.jpg",
      tech: ["Java", "Spring Boot", "SQL", "Next.js", "React", "REST"],
      link: "#",
      video: "#",
      instagram: "https://instagram.com/matute.api.dev",
    },
  ],
};
