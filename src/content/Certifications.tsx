/* *Developed by pmatute */
import React from "react";

// Tipado simple para los ítems
type Cert = { name: string; issuer: string; date?: string };

// Props mínimas: pasar el pack i18n ya resuelto (ES o EN)
export default function Certifications({
  i18n,
}: {
  i18n: {
    title: string;
    featuredTitle: string;
    moreBtn: { show: string; hide: string };
    featured: Cert[];
    extra: Cert[];
  };
}) {
  const [showMore, setShowMore] = React.useState(false);

  return (
    <section id="education" className="py-16 bg-black text-white">
      <div className="mx-auto max-w-5xl px-6">
        {/* Título de bloque */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-yellow-400">●</span> {i18n.title}
        </h2>

        {/* Subtítulo */}
        <h3 className="mt-6 text-xl font-semibold text-yellow-300">
          {i18n.featuredTitle}
        </h3>

        {/* Grid de destacadas */}
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {i18n.featured.map((c, idx) => (
            <li
              key={`${c.name}-${idx}`}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 hover:bg-zinc-900 transition"
            >
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-zinc-400">{c.issuer}</p>
              {c.date && <p className="text-xs text-zinc-500 mt-1">{c.date}</p>}
            </li>
          ))}
        </ul>

        {/* Botón mostrar/ocultar */}
        <div className="mt-6">
          <button
            onClick={() => setShowMore((v) => !v)}
            className="rounded-full bg-yellow-400 text-black px-5 py-2 text-sm font-semibold hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            aria-expanded={showMore}
            aria-controls="more-certs"
          >
            {showMore ? i18n.moreBtn.hide : i18n.moreBtn.show}
          </button>
        </div>

        {/* Acordeón (extra) */}
        <div
          id="more-certs"
          className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
            showMore ? "max-h-[2000px] mt-6" : "max-h-0"
          }`}
        >
          <ul className="grid gap-4 sm:grid-cols-2">
            {i18n.extra.map((c, idx) => (
              <li
                key={`extra-${c.name}-${idx}`}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4"
              >
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-zinc-400">{c.issuer}</p>
                {c.date && (
                  <p className="text-xs text-zinc-500 mt-1">{c.date}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
