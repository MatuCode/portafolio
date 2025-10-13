// src/types/portfolio.ts
export type EducationItem = {
  title: string;       // p.ej., “Ingeniería en Telecomunicaciones”
  place?: string;      // p.ej., “UTPL”
  start?: string;      // p.ej., “2018”
  end?: string;        // p.ej., “2022” o “Actualidad”
  description?: string;
};

export type CertItem = {
  name: string;        // p.ej., “AWS Cloud Practitioner”
  issuer: string;      // p.ej., “Amazon Web Services”
  date?: string;       // p.ej., “2024-05”
  link?: string;       // URL pública del certificado
};
