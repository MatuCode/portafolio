/* *Developed by pmatute */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;      // /public/...
  tags?: string[];
  demo?: string;
  note?: string;      // p.ej. "Proyecto para empresa real"
};

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<Project | null>(null);
  const { locale } = useRouter();
  const isEs = (locale ?? "es").startsWith("es");
  const seeMore = isEs ? "Ver más" : "Show more";

  // Cerrar con ESC y bloquear scroll al abrir modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
        document.removeEventListener("keydown", onKey);
      };
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="py-20 md:py-24">
      <div className="w-full pl-6 md:pl-16 lg:pl-28 xl:pl-40 pr-6">
        <div className="w-full lg:w-1/2 max-w-[820px]">
          <header className="mb-5">
            <h2 className="text-xl md:text-2xl font-semibold text-white drop-shadow">
              {isEs ? "Proyectos" : "Projects"}
            </h2>
            <p className="text-white/70 text-sm mt-1">
              {isEs
                ? "Selección de trabajos. Full-Stack con Java/Spring Boot y React/Next.js."
                : "Selected work. Full-Stack with Java/Spring Boot and React/Next.js."}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
            {projects.map((p) => (
              <article
                key={p.id}
                className="group relative overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 backdrop-blur h-full flex flex-col"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full aspect-[16/10] object-cover opacity-95"
                  loading="lazy"
                />

                <div className="relative p-3 flex flex-col flex-1 min-h-[160px]">
                  <h3 className="text-white font-semibold text-base leading-snug">
                    {p.title}
                  </h3>

                  {p.note && (
                    <p className="text-[11px] text-orange-300/90 mt-0.5">{p.note}</p>
                  )}

                  <p className="text-white/80 text-[13px] mt-1 line-clamp-3">
                    {p.description}
                  </p>

                  {!!p.tags?.length && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] rounded-md bg-white/10 ring-1 ring-white/10 text-white/90"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-2 flex gap-2">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 text-[11px] rounded-lg bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition"
                        aria-label={(isEs ? "Abrir demo de " : "Open demo of ") + p.title}
                      >
                        Demo
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setOpen(p)}
                      className="px-2.5 py-1 text-[11px] rounded-lg bg-orange-500/90 text-black hover:brightness-110 transition"
                    >
                      {seeMore}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const headingId = `modal-title-${project.id}`;
  const descId = `modal-desc-${project.id}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      aria-describedby={descId}
    >
      <div
        className="relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 md:top-0 md:-right-10 p-3 rounded-full bg-white/10 ring-1 ring-white/20 text-white hover:bg-white/20 transition"
          aria-label="Cerrar"
          title="Cerrar"
        >
          ✕
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto rounded-xl ring-1 ring-white/20 bg-black/40"
        />

        <div className="mt-3 text-white/90">
          <h3 id={headingId} className="text-lg font-semibold">
            {project.title}
          </h3>

          {project.note && (
            <p className="text-orange-300/90 text-sm mt-1">{project.note}</p>
          )}

          <p id={descId} className="mt-2 text-white/80 text-sm">
            {project.description}
          </p>

          {!!project.tags?.length && (
            <div className="mt-3 flex flex-wrap gap-1">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[10px] rounded-md bg-white/10 ring-1 ring-white/10 text-white/90"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 text-xs rounded-lg bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition"
              >
                Demo
              </a>
            )}
            {/* GitHub removido en modal también */}
          </div>
        </div>
      </div>
    </div>
  );
}
