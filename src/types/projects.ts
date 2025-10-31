// src/types/projects.ts
// Tipo com├║n para proyectos del portafolio. Todos los campos opcionales para no romper contenido existente.
export type ProjectItem = {
  title: string;          // Nombre del proyecto (requerido)
  subtitle?: string;      // Breve tagline
  description?: string;   // Descripci├│n corta
  tech?: string[];        // Tecnolog├¡as (logos / chips)
  stack?: string[];       // Stack o categor├¡as
  image?: string;         // Ruta en /public o URL
  repoUrl?: string;       // GitHub
  demoUrl?: string;       // Deploy / Vercel
  year?: number | string; // A├▒o
};
