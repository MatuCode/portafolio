// src/types/portfolio.ts
// Tipos reusables para Educación y Certificaciones en el portafolio.
import type { ReactNode } from 'react';

export type EducationItem = {
  proofUrl: any;
  status: any;
  period: any;
  country: ReactNode | ReactNode[];
  program: any;
  institution: any;
  // Título del estudio o programa (p.ej., "Ingeniería en Telecomunicaciones")
  title: string;
  // Institución o lugar (p.ej., "UTPL")
  place?: string;
  // Rango de fechas (texto libre)
  start?: string;
  end?: string;
  // Descripción breve / logros
  description?: string;
};

export type CertItem = {
  proofUrl: any;
  year(year: any): unknown;
  importance: number;
  // Nombre de la certificación (p.ej., "AWS Cloud Practitioner")
  name: string;
  // Emisor (p.ej., "Amazon Web Services")
  issuer: string;
  // Fecha de obtención
  date?: string;
  // URL al certificado público (opcional)
  link?: string;
};
