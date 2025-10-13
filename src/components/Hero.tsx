/* *Developed by pmatute */
'use client';

import { motion } from 'framer-motion';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[80vh] items-center justify-center text-center md:text-left"
      aria-label="Sección de presentación"
    >
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        {/* Animación de aparición */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Nombre */}
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Pablo Andrés Matute
          </h1>

          {/* Rol y stack */}
          <p className="mt-3 text-lg text-white/85">
            Desarrollador Backend · Java · Spring Boot · MySQL
          </p>

          {/* Botones */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            {/* Botón CV */}
            <a
              href={`${BASE}/cv/PabloMatute-CV.pdf`}
              className="rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-orange-900/30 ring-1 ring-orange-300 transition hover:-translate-y-[1px] hover:bg-orange-400 hover:shadow-orange-900/40"
            >
              Descargar CV
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Matucode"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/70 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-[1px] hover:border-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.2 3.4 9.6 8.2 11.2.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.2-.8.1-.8.1-.8 1.3.1 2 .9 2 .9 1.1 2 2.9 1.4 3.6 1.1.1-.8.4-1.4.8-1.7-2.6-.3-5.3-1.4-5.3-6A4.7 4.7 0 0 1 7 7.2c-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a10.9 10.9 0 0 1 5.8 0C18.3 3.8 19.3 4 19.3 4c.6 1.6.2 2.8.1 3.1a4.7 4.7 0 0 1 1.2 3.2c0 4.6-2.7 5.7-5.3 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6 8.2-11.2A11.5 11.5 0 0 0 12 .5Z"/>
              </svg>
              GitHub
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/pablo-matute"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/70 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-[1px] hover:border-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.6c0-1.34-.02-3.06-1.87-3.06-1.88 0-2.17 1.47-2.17 2.96v5.7H9.31V9h3.41v1.56h.05c.47-.9 1.62-1.86 3.33-1.86 3.56 0 4.21 2.34 4.21 5.39v6.36ZM5.34 7.44a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
