/* *Developed by pmatute */
import type { ProjectItem } from "@/types/projects";

export const projectsES: {
  title: string;
  subtitle?: string;
  cta?: string;
  projects: (ProjectItem & {
    slug: string;
    details?: string;
    imageHD?: string;
    link?: string;       // Demo
    video?: string;      // Video del proyecto (opcional)
    instagram?: string;  // Post/galería en Instagram (opcional)
    note?: string;       // Nota visible (p.ej. protección de datos)
  })[];
} = {
  title: "Proyectos",
  subtitle:
    "Selección de proyectos recientes con enfoque en backend, APIs REST y productos funcionales.",
  cta: "Abrir",
  projects: [
    {
      slug: "inventario-futurity",
      title: "Futurity — Inventario & Calidad de Servicio",
      description:
        "Sistema de gestión de inventario y calidad de servicio para un ISP: equipos, ubicaciones, auditorías y KPIs.",
      details:
        "Aplicación web orientada a operaciones de red. Permite registrar y localizar equipos (routers, ONUs, radios), realizar auditorías con checklists, mantener la trazabilidad de movimientos y generar indicadores de servicio con reportes PDF/Excel. "
        + "El backend expone endpoints REST en Spring Boot (Java 17) con validación, manejo de errores y seguridad basada en roles (RBAC). La base de datos MySQL incluye índices y relaciones para consultas eficientes. El frontend, desarrollado con React/Next.js, implementa formularios validados, rutas protegidas y paneles con KPIs. Despliegues con Docker y variables de entorno.",
      note: "Los datos han sido modificados para protección de la empresa.",
      image: "/projects/futurity.jpg",
      imageHD: "/projects/futurity.jpg",
      tech: ["Java 17", "Spring Boot", "MySQL", "React/Next.js", "Docker", "REST"],
      link: "#", // Demo (opcional)
      video: "#", // URL a video (opcional)
      instagram: "https://instagram.com/matute.api.dev",
    },
    {
      slug: "relatos-de-papel",
      title: "Relatos de Papel",
      description:
        "Plataforma para gestión y venta de libros con búsquedas eficientes, filtros combinables y panel editorial.",
      details:
        "Proyecto de maestría orientado a e-commerce editorial. Incluye catálogo con filtros por autor/tema/editorial, búsqueda eficiente, paginación y una cesta de compra con pasarela simulada. "
        + "El área privada permite el mantenimiento de libros, autores y existencias, así como analítica básica de ventas. "
        + "Backend en Spring Boot con DTOs, validaciones y mapeo JPA; frontend en Next.js con SSR, i18n y componentes reutilizables.",
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
        "Plataforma de ventas y catálogo con control de stock, variantes, precios y reportería para operación real.",
      details:
        "Solución end-to-end para gestionar productos, variantes y existencias; con flujos de pedido, roles por perfil y reportes de operación. "
        + "El backend expone APIs REST seguras con Spring Boot (autenticación/JWT, validaciones, paginación y filtrado), persistiendo en SQL con consultas optimizadas. "
        + "El frontend en React/Next.js ofrece una interfaz responsiva y formularios con validación. Despliegues automatizados y manejo de configuración por entorno.",
      image: "/projects/rsale.jpg",
      imageHD: "/projects/rsale.jpg",
      tech: ["Java", "Spring Boot", "SQL", "Next.js", "React", "REST"],
      link: "#",
      video: "#",
      instagram: "https://instagram.com/matute.api.dev",
    },
  ],
};
