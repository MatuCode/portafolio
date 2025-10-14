/* src/components/ContactSection.tsx
 * Card de Contacto:
 * - Fondo glass (estilos inline para evitar purga)
 * - Botón "Send email", debajo el correo
 * - Debajo: logos (SVG inline) de LinkedIn, GitHub, Instagram
 */

import React from "react";
import { useRouter } from "next/router";

const ContactSection: React.FC = () => {
  const { locale } = useRouter();
  const lang: "es" | "en" = (locale ?? "es").startsWith("es") ? "es" : "en";

  const t = {
    es: {
      title: "Contacto",
      subtitle: "Puedes contactarme por correo o LinkedIn.",
      emailBtn: "Enviar correo",
      emailAria: "Enviar correo a Pablo Andrés Matute",
      email: "pandresmatute@gmail.com",
      linkedInLabel: "LinkedIn",
      gitHubLabel: "GitHub",
      igLabel: "Instagram",
    },
    en: {
      title: "Contact",
      subtitle: "You can reach me by email or LinkedIn.",
      emailBtn: "Send email",
      emailAria: "Send an email to Pablo Andrés Matute",
      email: "pandresmatute@gmail.com",
      linkedInLabel: "LinkedIn",
      gitHubLabel: "GitHub",
      igLabel: "Instagram",
    },
  }[lang];

  /* === Estilos inline del card/velo (no purgables) === */
  const cardStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 40,
  maxWidth: 720,
  borderRadius: "var(--card-radius)",
  padding: "2rem",
  background: "var(--card-bg)",
  backdropFilter: "var(--card-blur)",
  WebkitBackdropFilter: "var(--card-blur)",
  boxShadow: "var(--shadow-lg)",
  border: "1px solid var(--card-border)",
};


  const veilStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0 as unknown as number,
    zIndex: 10,
    background: "rgba(0,0,0,.30)",
    maskImage: "radial-gradient(60% 60% at 20% 40%, black, transparent)",
    WebkitMaskImage: "radial-gradient(60% 60% at 20% 40%, black, transparent)",
    pointerEvents: "none",
  };

  /* === Estilos inline para botones/iconos === */
  const iconBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.25)",
    background: "rgba(255,255,255,.08)",
    color: "#fff",
    textDecoration: "none",
  };

  return (
    <section
      id="contacto"
      className="relative isolate min-h-[70vh] w-full flex items-center py-16 sm:py-24 px-6 lg:px-12 text-white"
      aria-label={t.title}
    >
      <div style={cardStyle}>
        <h2 className="text-4xl font-bold tracking-tight">{t.title}</h2>
        <p className="mt-3 text-base/7 text-white/80">{t.subtitle}</p>

        {/* Botón principal */}
        <div className="mt-8">
          <a
            href={`mailto:${t.email}`}
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium bg-orange-500 hover:bg-orange-600 transition"
            aria-label={t.emailAria}
          >
            {t.emailBtn}
          </a>
        </div>

        {/* Correo debajo del botón */}
        <div className="mt-4">
          <a
            href={`mailto:${t.email}`}
            className="text-white/90 underline decoration-white/30 underline-offset-4 hover:decoration-white"
            style={{ fontSize: 16 }}
          >
            {t.email}
          </a>
        </div>

        {/* Logos debajo del correo */}
        <div className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium btn-surface transition">
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/pablo-andres-matute"
            target="_blank"
            rel="noopener noreferrer"
            title={t.linkedInLabel}
            aria-label={t.linkedInLabel}
            style={iconBtn}
          >
            {/* SVG LinkedIn */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.135 1.447-2.135 2.943v5.663H9.352V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.605 0 4.27 2.373 4.27 5.459v6.284zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.996 20.452H3.677V9h3.319v11.452z"/>
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/MatuCode"
            target="_blank"
            rel="noopener noreferrer"
            title={t.gitHubLabel}
            aria-label={t.gitHubLabel}
            style={iconBtn}
          >
            {/* SVG GitHub */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.79-.25.79-.56v-2.15c-3.22.7-3.9-1.39-3.9-1.39-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.74 1.27 3.41.97.11-.76.41-1.27.75-1.56-2.57-.29-5.27-1.29-5.27-5.73 0-1.26.45-2.3 1.2-3.11-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.22 1.19a11.2 11.2 0 0 1 5.86 0c2.24-1.5 3.22-1.19 3.22-1.19.63 1.58.23 2.75.11 3.04.75.81 1.2 1.85 1.2 3.11 0 4.45-2.71 5.44-5.29 5.72.42.36.81 1.07.81 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/matute.api.dev"
            target="_blank"
            rel="noopener noreferrer"
            title={t.igLabel}
            aria-label={t.igLabel}
            style={iconBtn}
          >
            {/* SVG Instagram */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/>
            </svg>
          </a>
        </div>
      </div>

      <div aria-hidden="true" style={veilStyle} />
    </section>
  );
};

export default ContactSection;
