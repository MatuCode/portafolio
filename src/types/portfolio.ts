// src/types/portfolio.ts
import type { ReactNode } from 'react';
export type EducationItem = {
  program: any;
  country: ReactNode;
  period: any;
  status: any;
  proofUrl: any;
  institution: any;
  title: string;
  place?: string;
  start?: string;
  end?: string;
  description?: string;
};

export type CertItem = {
  proofUrl: any;
  name: string;
  issuer: string;
  date?: string;
  link?: string;
  importance?: number;      // ← añade esto
  year?: number | string;   // ← y esto
};
