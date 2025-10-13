// src/types/projects.ts
// Tipo común para proyectos del portafolio. Todos los campos opcionales para no romper contenido existente.
export type ProjectItem = {
  title: string;          // Nombre del proyecto (requerido)
  subtitle?: string;      // Breve tagline
  description?: string;   // Descripción corta
  tech?: string[];        // Tecnologías (logos / chips)
  stack?: string[];       // Stack o categorías
  image?: string;         // Ruta en /public o URL
  repoUrl?: string;       // GitHub
  demoUrl?: string;       // Deploy / Vercel
  year?: number | string; // Año
};
