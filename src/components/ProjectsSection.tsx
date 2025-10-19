/* *Developed by pmatute */
import React from "react";
import { useRouter } from "next/router";

export type Project = {
  id: string;
  title: string;
  description: string; // usamos tu misma descripción
  image: string;       // /public/...
  tags?: string[];
  instagram?: string;  // botón rosa (marca IG)
  video?: string;      // si no hay, botón gris deshabilitado
  note?: string;
};

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const { locale } = useRouter();
  const isEs = (locale ?? "es").startsWith("es");
  const t = {
    title: isEs ? "Proyectos" : "Projects",
    subtitle: isEs
      ? "Muestras clave. Backend Java/Spring Boot y frontend React/Next.js."
      : "Selected work. Java/Spring Boot backend and React/Next.js frontend.",
    instagram: "Instagram",
    video: "Video",
  };

  return (
    <section className="py-16 md:py-20" aria-label={t.title}>
      <div className="w-full pl-6 md:pl-16 lg:pl-28 xl:pl-40 pr-6">
        {/* >>> mitad izquierda en pantallas grandes <<< */}
        <div className="w-full lg:w-1/2 max-w-[820px]">
          <header className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white drop-shadow">
              {t.title}
            </h2>
            <p className="text-white/70 text-sm mt-1">{t.subtitle}</p>
          </header>

          {/* Lista vertical: cada proyecto en fila (imagen + detalle) */}
          <div className="space-y-5 md:space-y-6">
            {projects.map((p) => (
              <article
                key={p.id}
                className="rounded-xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-4 md:p-5"
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                  {/* Imagen: dejamos exactamente tus tamaños actuales */}
                  <div className="w-full md:w-[340px] lg:w-[360px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-40 md:h-44 lg:h-48 object-cover rounded-lg ring-1 ring-white/10"
                    />
                  </div>

                  {/* Detalle */}
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg leading-snug">
                      {p.title}
                    </h3>
                    {p.note && (
                      <p className="text-xs text-orange-300/95 mt-1">{p.note}</p>
                    )}

                    {/* Descripción: usamos la misma propiedad `description` */}
                    <p className="text-white/85 mt-2 text-sm md:text-[15px] leading-relaxed">
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

                    {/* Botones: Instagram (rosa) + Video (gris si no hay link) */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.instagram && (
                        <a
                          href={p.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 text-xs rounded-lg text-white ring-1 ring-white/15 hover:opacity-90 transition"
                          style={{
                            background:
                              "linear-gradient(45deg,#F58529,#DD2A7B,#8134AF,#515BD4)",
                          }}
                        >
                          {t.instagram}
                        </a>
                      )}

                      {p.video ? (
                        <a
                          href={p.video}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 text-xs rounded-lg bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition"
                        >
                          {t.video}
                        </a>
                      ) : (
                        <button
                          disabled
                          className="px-3 py-1.5 text-xs rounded-lg bg-gray-500/30 text-white/70 ring-1 ring-white/10 cursor-not-allowed"
                          title={isEs ? "Próximamente" : "Coming soon"}
                        >
                          {t.video}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        {/* /mitad izquierda */}
      </div>
    </section>
  );
}
