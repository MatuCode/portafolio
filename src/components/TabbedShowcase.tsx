/* *Developed by pmatute */
'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KnowledgeSection from '@/components/KnowledgeSection';
import ProjectsSection from '@/components/ProjectsSection';
import type { EducationItem, CertItem } from '@/types/portfolio';

type Props = {
  projectsI18n?: any; // { title, subtitle?, projects: [{ tech?: string[]; stack?: string[]; ... }] }
  education?: EducationItem[];
  certifications?: CertItem[];
  contact?: { email: string; github: string; linkedin: string };
};

const tabs = [
  'Home',
  'Habilidades',
  'Proyectos',
  'Experiencia',
  'Educación',
  'Certificaciones',
  'Contacto',
] as const;

type Tab = typeof tabs[number];

export default function TabbedShowcase({
  projectsI18n,
  education = [],
  certifications = [],
  contact,
}: Props) {
  const [active, setActive] = useState<Tab>('Proyectos');

  // 🔧 Compat layer: si tus proyectos usan `stack`, lo mapeamos a `tech` para evitar el error p.tech.map
  const normalizedProjectsI18n = useMemo(() => {
    if (!projectsI18n) return projectsI18n;
    const list = Array.isArray(projectsI18n.projects) ? projectsI18n.projects : [];
    const projects = list.map((p: any) => ({
      ...p,
      tech: p?.tech ?? p?.stack ?? [], // <-- aquí el fix
    }));
    return { ...projectsI18n, projects };
  }, [projectsI18n]);

  // Ordena certificaciones por importancia y año
  const sortedCerts = useMemo(
    () =>
      [...certifications].sort((a, b) => {
        const ia = a.importance ?? 99;
        const ib = b.importance ?? 99;
        if (ia !== ib) return ia - ib;
        const ya = Number(a.year) || 0;
        const yb = Number(b.year) || 0;
        return yb - ya;
      }),
    [certifications]
  );

  return (
    <section
      className="relative mx-auto max-w-7xl px-6 py-16 md:py-20"
      aria-label="Contenido por pestañas"
    >
      {/* Barra de pestañas STICKY */}
      <div className="sticky top-0 z-40 mx-auto w-full max-w-5xl">
        <div className="mt-2 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/50 p-2 backdrop-blur supports-[backdrop-filter]:bg-black/30">
          {tabs.map((t) => {
            const isActive = active === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActive(t)}
                className={[
                  'relative rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none',
                  'min-w-[8.5rem]',
                  isActive ? 'text-black' : 'text-white/80 hover:text-white',
                ].join(' ')}
                aria-pressed={isActive}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-orange-500 shadow-lg shadow-orange-900/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido */}
      <div className="mx-auto mt-10 max-w-6xl">
        <AnimatePresence mode="wait">
          {active === 'Home' && (
            <motion.div
              key="tab-home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="text-center text-white/80"
            >
              <p>Bienvenido a mi portafolio. Usa las pestañas para explorar.</p>
            </motion.div>
          )}

          {active === 'Habilidades' && (
            <motion.div
              key="tab-skills"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <KnowledgeSection />
            </motion.div>
          )}

          {active === 'Proyectos' && (
            <motion.div
              key="tab-projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectsSection projects={normalizedProjectsI18n?.projects ?? []} />
            </motion.div>
          )}

          {active === 'Experiencia' && (
            <motion.div
              key="tab-experience"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid gap-4 md:grid-cols-2"
            >
              {/* Ejemplos: reemplaza por tu data */}
              <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-white font-semibold">Pasantía — Futurity (Inventario & Calidad)</h3>
                <p className="mt-1 text-sm text-white/70">
                  Backend Java/Spring Boot, módulos de bodega, calidad y técnicos. MySQL + Docker.
                </p>
                <p className="mt-2 text-xs text-white/50">2025 · Ecuador</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-white font-semibold">Relatos de Papel — Microservicio Catálogo</h3>
                <p className="mt-1 text-sm text-white/70">
                  Spring Boot 3.2.5 + Elasticsearch; despliegue Railway + Vercel.
                </p>
                <p className="mt-2 text-xs text-white/50">2025 · UNIR</p>
              </article>
            </motion.div>
          )}

          {active === 'Educación' && (
            <motion.div
              key="tab-education"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid gap-4 md:grid-cols-2"
            >
              {education.map((e) => (
                <article key={e.institution + e.program} className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div>
                    <h3 className="text-white font-semibold">{e.institution}</h3>
                    <p className="mt-1 text-sm text-white/80">{e.program}</p>
                    <p className="mt-1 text-xs text-white/60">
                      {e.country}{e.period ? ` · ${e.period}` : ''}
                    </p>
                    {e.status && (
                      <span className="mt-2 inline-flex items-center rounded-full bg-orange-500/20 px-2 py-0.5 text-xs font-semibold text-orange-300 ring-1 ring-orange-300/40">
                        {e.status}
                      </span>
                    )}
                  </div>
                  {e.proofUrl && (
                    <a
                      href={e.proofUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex w-max items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
                      title="Abrir título/certificado"
                    >
                      Ver título / certificado
                    </a>
                  )}
                </article>
              ))}
            </motion.div>
          )}

          {active === 'Certificaciones' && (
            <motion.div
              key="tab-certs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {sortedCerts.map((c) => (
                <article key={c.issuer + c.name} className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div>
                    <h3 className="text-white font-semibold">{c.name}</h3>
                    <p className="mt-1 text-sm text-white/80">{c.issuer}</p>
                    {(typeof c.year === 'string' || typeof c.year === 'number') && (
                      <p className="mt-1 text-xs text-white/60">{String(c.year)}</p>
                    )}
                  </div>
                  {c.proofUrl && (
                    <a
                      href={c.proofUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex w-max items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
                      title="Abrir certificado"
                    >
                      Ver certificado
                    </a>
                  )}
                </article>
              ))}
            </motion.div>
          )}

          {active === 'Contacto' && contact && (
            <motion.div
              key="tab-contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid gap-4 md:grid-cols-3"
            >
              <a href={`mailto:${contact.email}`} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white transition hover:bg-white/10">
                <h3 className="font-semibold">Email</h3>
                <p className="mt-1 text-sm text-white/80">{contact.email}</p>
              </a>
              <a href={contact.github} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white transition hover:bg-white/10">
                <h3 className="font-semibold">GitHub</h3>
                <p className="mt-1 text-sm text-white/80">{contact.github}</p>
              </a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white transition hover:bg-white/10">
                <h3 className="font-semibold">LinkedIn</h3>
                <p className="mt-1 text-sm text-white/80">{contact.linkedin}</p>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
