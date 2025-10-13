/* *Developed by pmatute */
import React from "react";

export default function HomeHero() {
  return (
    <section
      className="
        min-h-screen
        flex items-center
      "
      aria-label="Inicio"
    >
      {/* Contenedor ancho, pero con padding hacia la izquierda para “pegar” el contenido */}
      <div
        className="
          w-full max-w-[1200px]
          pl-6 md:pl-16 lg:pl-28 xl:pl-40
          pr-6
        "
      >
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white drop-shadow">
            Pablo Andrés Matute
          </h1>

          <p className="mt-4 text-lg md:text-xl text-white/90">
            Desarrollador Backend · Java · Spring Boot · MySQL
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/cv/PabloMatute-CV.pdf"
              className="rounded-xl bg-orange-500 text-black px-5 py-3 font-medium hover:brightness-110 transition"
            >
              Descargar CV
            </a>
            <a
              href="https://github.com/Matucode"
              target="_blank"
              className="rounded-xl px-5 py-3 ring-1 ring-white/30 text-white/90 hover:bg-white/10 transition"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className="rounded-xl px-5 py-3 ring-1 ring-white/30 text-white/90 hover:bg-white/10 transition"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
