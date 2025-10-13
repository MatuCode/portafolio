/* *Developed by pmatute */
import { useRouter } from "next/router";
import React, { useState, useCallback, useEffect } from "react";

type Edu = {
  degree: string;
  institution: string;
  location: string;
  modality: string;
  period: string;
  status?: string;
  titleImage?: string; // ← imagen del diploma (opcional)
};

const listES: Edu[] = [
  {
    degree: "Máster Universitario en Ingeniería de Software y Sistemas Informáticos",
    institution: "UNIR — Universidad Internacional de La Rioja",
    location: "España",
    modality: "Virtual",
    period: "Marzo 2025 — Febrero 2026",
    status: "En proceso",
    // titleImage: "..." // sin diploma todavía
  },
  {
    degree: "Ingeniero en Telecomunicaciones",
    institution: "UTPL — Universidad Técnica Particular de Loja",
    location: "Loja, Ecuador",
    modality: "Presencial",
    period: "2018 — 2024",
    // 🔁 Reemplaza esta ruta por tu imagen real en /public
    titleImage: "/titles/utpl-telecomunicaciones.jpg",
  },
];

const listEN: Edu[] = [
  {
    degree: "Master’s in Software Engineering and Computer Systems",
    institution: "UNIR — International University of La Rioja",
    location: "Spain",
    modality: "Online",
    period: "March 2025 — February 2026",
    status: "In progress",
  },
  {
    degree: "Telecommunications Engineer",
    institution: "UTPL — Technical Private University of Loja",
    location: "Loja, Ecuador",
    modality: "On-campus",
    period: "2018 — 2024",
    // 🔁 Replace with your real image path in /public
    titleImage: "/titles/utpl-telecomunicaciones.jpg",
  },
];

export default function EducationSection() {
  const router = useRouter();
  const isES = (router.locale ?? "es").startsWith("es");

  const copy = isES
    ? {
        title: "Educación",
        subtitle: "Formación universitaria y modalidad de estudio.",
        list: listES,
        chips: { inProgress: "En proceso" },
        viewTitle: "Ver título",
        close: "Cerrar",
      }
    : {
        title: "Education",
        subtitle: "Academic background and study modality.",
        list: listEN,
        chips: { inProgress: "In progress" },
        viewTitle: "View diploma",
        close: "Close",
      };

  const [open, setOpen] = useState<Edu | null>(null);

  // Cerrar con ESC
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(null);
  }, []);
  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onKey]);

  return (
    <section className="py-24 md:py-28">
      {/* Contenido a la izquierda */}
      <div className="w-full pl-6 md:pl-16 lg:pl-28 xl:pl-40 pr-6">
        <div className="max-w-[44rem]">
          <header className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white drop-shadow">
              {copy.title}
            </h2>
            <p className="text-white/75 text-sm md:text-base mt-1">
              {copy.subtitle}
            </p>
          </header>

          <div className="space-y-4">
            {copy.list.map((e, i) => (
              <article
                key={i}
                className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 backdrop-blur"
              >
                <h3 className="text-base md:text-lg font-semibold text-white leading-tight">
                  {e.degree}
                </h3>

                <p className="text-white/85 mt-1">{e.institution}</p>

                <p className="text-white/70 text-xs md:text-sm mt-1">
                  {e.location} · {e.modality} · {e.period}
                  {e.status ? ` · ${e.status}` : ""}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 text-[11px] rounded-lg bg-white/10 ring-1 ring-white/10">
                    {e.modality}
                  </span>
                  <span className="px-2.5 py-1 text-[11px] rounded-lg bg-white/10 ring-1 ring-white/10">
                    {e.location}
                  </span>
                  {e.status && (
                    <span className="px-2.5 py-1 text-[11px] rounded-lg bg-orange-500/90 text-black">
                      {copy.chips.inProgress}
                    </span>
                  )}

                  {/* Botón para ver el título (solo si hay imagen) */}
                  {e.titleImage && (
                    <button
                      type="button"
                      onClick={() => setOpen(e)}
                      className="ml-auto px-3 py-1.5 text-xs rounded-lg bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition"
                      title={copy.viewTitle}
                    >
                      {copy.viewTitle}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Modal del título */}
      {open && open.titleImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute -top-10 right-0 md:top-0 md:-right-10 p-3 rounded-full bg-white/10 ring-1 ring-white/20 text-white hover:bg-white/20 transition"
              aria-label={copy.close}
              title={copy.close}
            >
              ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={open.titleImage}
              alt={open.degree}
              className="w-full h-auto rounded-xl ring-1 ring-white/20 bg-black/40"
            />
            <div className="mt-3 text-white/80 text-sm">
              {open.degree} — {open.institution}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
