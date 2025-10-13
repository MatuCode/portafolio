// src/components/ContactSection.tsx
import React from "react";

const EMAIL = "pandresmatute@gmail.com";
const GITHUB_URL = "https://github.com/Matucode";
const LINKEDIN_URL = "https://linkedin.com/in/pablo-andres-matute";
const INSTAGRAM_URL = "https://instagram.com/matute.api.dev";

export default function ContactSection() {
  return (
    <section id="contacto" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <div className="w-full max-w-xl rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
          <h2 className="text-4xl font-extrabold text-white">Contacto</h2>
          <p className="mt-3 text-white/80">
            Puedes contactarme por correo o por mis redes.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-medium text-white shadow-md transition hover:bg-orange-600"
              title={EMAIL}
            >
              ✉️ Enviar correo
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              aria-label="GitHub"
            >
              <GitHub className="h-5 w-5" /> GitHub
            </a>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              aria-label="LinkedIn"
            >
              <LinkedIn className="h-5 w-5" /> LinkedIn
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" /> Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Iconos SVG (sin dependencias) ===== */
function GitHub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.02c-3.34.73-4.04-1.41-4.04-1.41-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.6-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.23v3.31c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}
function LinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-.96 1.82-1.98 3.75-1.98 4.01 0 4.75 2.64 4.75 6.08V21h-4v-5.34c0-1.27-.02-2.9-1.77-2.9-1.78 0-2.05 1.38-2.05 2.8V21h-4V9Z" />
    </svg>
  );
}
function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
    </svg>
  );
}
