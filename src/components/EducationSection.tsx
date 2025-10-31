import React, { useState, useCallback, useEffect } from "react";

export type EducationItem = {
  degree: string;
  institution: string;
  location: string;
  modality: string;
  period: string;
  status?: string;
  titleImage?: string;
};

export type EducationCopy = {
  title: string;
  subtitle: string;
  viewTitle: string;
  close: string;
  chips: {
    modality: string;
    location: string;
    inProgress: string;
  };
  items: EducationItem[];
};

export default function EducationSection({ copy }: { copy: EducationCopy }) {
  const [open, setOpen] = useState<EducationItem | null>(null);

  const onKey = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") setOpen(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onKey]);

  return (
    <section className="py-24 md:py-28">
      <div className="w-full pl-6 md:pl-16 lg:pl-28 xl:pl-40 pr-6">
        <div className="max-w-[44rem]">
          <header className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white drop-shadow">
              {copy.title}
            </h2>
            <p className="text-white/75 text-sm md:text-base mt-1">{copy.subtitle}</p>
          </header>

          <div className="space-y-4">
            {copy.items.map((item, index) => (
              <article
                key={`${item.degree}-${index}`}
                className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 backdrop-blur"
              >
                <h3 className="text-base md:text-lg font-semibold text-white leading-tight">{item.degree}</h3>
                <p className="text-white/85 mt-1">{item.institution}</p>
                <p className="text-white/70 text-xs md:text-sm mt-1">
                  {item.location} · {item.modality} · {item.period}
                  {item.status ? ` · ${item.status}` : ""}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 text-[11px] rounded-lg bg-white/10 ring-1 ring-white/10">
                    {item.modality}
                  </span>
                  <span className="px-2.5 py-1 text-[11px] rounded-lg bg-white/10 ring-1 ring-white/10">
                    {item.location}
                  </span>
                  {item.status && (
                    <span 
                      className="px-2.5 py-1 text-[11px] rounded-lg text-white"
                      style={{
                        background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #0a0a0a 100%)',
                        boxShadow: '0 2px 8px rgba(22, 33, 62, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {copy.chips.inProgress}
                    </span>
                  )}

                  {item.titleImage && (
                    <button
                      type="button"
                      onClick={() => setOpen(item)}
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

      {open && open.titleImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <div className="relative w-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute -top-10 right-0 md:top-0 md:-right-10 p-3 rounded-full bg-white/10 ring-1 ring-white/20 text-white hover:bg-white/20 transition"
              aria-label={copy.close}
              title={copy.close}
            >
              ×
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={open.titleImage}
              alt={`${open.degree} - ${open.institution}`}
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
