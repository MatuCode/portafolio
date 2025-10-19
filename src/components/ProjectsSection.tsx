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
  video?: string;     // nuevo
  instagram?: string; // nuevo
  note?: string;
};

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const { locale } = useRouter();
  const isEs = (locale ?? "es").startsWith("es");
  const t = {
    title: isEs ? "Proyectos" : "Projects",
    demo: isEs ? "Demo" : "Demo",
    video: isEs ? "Video" : "Video",
    instagram: "Instagram",
    prev: isEs ? "Anterior" : "Prev",
    next: isEs ? "Siguiente" : "Next",
    more: isEs ? "Ver más" : "Show more",
  };

  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState<Project | null>(null);

  const p = projects[idx] ?? projects[0];

  const prev = () => setIdx((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIdx((i) => (i + 1) % projects.length);

  // Navegación con flechas del teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [projects.length]);

  return (
    <section className="py-20 md:py-24" aria-label={t.title}>
      <div className="w-full pl-6 md:pl-16 lg:pl-28 xl:pl-40 pr-6">
        <header className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white drop-shadow">{t.title}</h2>
          <p className="text-white/70 text-sm mt-1">
            {isEs
              ? "Muestras clave. Backend Java/Spring Boot y frontend React/Next.js."
              : "Selected work. Java/Spring Boot backend and React/Next.js frontend."}
          </p>
        </header>

        {/* Navegación */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="shrink-0 px-3 py-2 rounded-xl bg-white/8 ring-1 ring-white/15 text-white/90 hover:bg-white/15 transition"
            aria-label={t.prev}
          >
            ←
          </button>

          {/* Tarjeta grande, 1 a la vez */}
          <article className="flex-1 relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.title}
              className="w-full aspect-[16/9] object-cover"
            />

            <div className="p-5">
              <h3 className="text-white font-semibold text-lg leading-snug">{p.title}</h3>
              {p.note && (
                <p className="text-xs text-orange-300/95 mt-1">{p.note}</p>
              )}

              <p className="text-white/85 mt-3 text-sm md:text-[15px] leading-relaxed">
                {p.description}
              </p>

              {!!p.tags?.length && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[11px] rounded-md bg-white/10 ring-1 ring-white/10 text-white/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 text-xs rounded-lg bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition"
                  >
                    {t.demo}
                  </a>
                )}
                {p.video && (
                  <a
                    href={p.video}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 text-xs rounded-lg bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition"
                  >
                    {t.video}
                  </a>
                )}
                {p.instagram && (
                  <a
                    href={p.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 text-xs rounded-lg bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition"
                  >
                    {t.instagram}
                  </a>
                )}
              </div>
            </div>
          </article>

          <button
            onClick={next}
            className="shrink-0 px-3 py-2 rounded-xl bg-white/8 ring-1 ring-white/15 text-white/90 hover:bg-white/15 transition"
            aria-label={t.next}
          >
            →
          </button>
        </div>

        {/* Dots */}
        <div className="mt-4 flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === idx ? "bg-orange-400" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to ${i + 1}`}
            />
          ))}
        </div>

        {/* Botón “Ver más” solo cuando estás parado en el tercer proyecto */}
        {idx === 2 && projects[2] && (
          <div className="mt-6">
            <button
              onClick={() => setOpen(projects[2])}
              className="px-4 py-2 rounded-xl bg-orange-500 text-black font-medium hover:brightness-110 transition"
            >
              {t.more}
            </button>
          </div>
        )}
      </div>

      {/* Modal detalle */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(null)}
              className="absolute -top-10 right-0 md:top-0 md:-right-10 p-3 rounded-full bg-white/10 ring-1 ring-white/20 text-white hover:bg-white/20 transition"
              aria-label="Cerrar"
              title="Cerrar"
            >
              ✕
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={open.image}
              alt={open.title}
              className="w-full h-auto rounded-xl ring-1 ring-white/20 bg-black/40"
            />

            <div className="mt-3 text-white/90">
              <h3 className="text-lg font-semibold">{open.title}</h3>
              {open.note && <p className="text-orange-300/90 text-sm mt-1">{open.note}</p>}
              <p className="mt-2 text-white/80 text-sm">{open.description}</p>

              {!!open.tags?.length && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {open.tags.map((t) => (
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
                {open.demo && (
                  <a
                    href={open.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 text-xs rounded-lg bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition"
                  >
                    {t.demo}
                  </a>
                )}
                {open.video && (
                  <a
                    href={open.video}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 text-xs rounded-lg bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition"
                  >
                    {t.video}
                  </a>
                )}
                {open.instagram && (
                  <a
                    href={open.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 text-xs rounded-lg bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition"
                  >
                    {t.instagram}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
