/* src/components/ContactSection.tsx
 * Componente de Contacto con "glass-card" visible (fondo semitransparente, blur, borde y sombra).
 * i18n simple por locale (ES/EN) igual que tu HomeSection.
 * Enlaces reales: email, LinkedIn, GitHub e Instagram.
 */

import React from "react";
import { useRouter } from "next/router";

const ContactSection: React.FC = () => {
  const router = useRouter();
  const lang: "es" | "en" = (router.locale ?? "es").startsWith("es") ? "es" : "en";

  const t = {
    es: {
      title: "Contacto",
      subtitle: "Puedes contactarme por correo o LinkedIn.",
      emailBtn: "Enviar correo",
      emailAria: "Enviar correo a Pablo Andrés Matute",
      linkedin: "LinkedIn",
      github: "GitHub: @MatuCode",
      instagram: "Instagram: @matute.api.dev",
      email: "pandresmatute@gmail.com",
    },
    en: {
      title: "Contact",
      subtitle: "You can reach me by email or LinkedIn.",
      emailBtn: "Send email",
      emailAria: "Send an email to Pablo Andrés Matute",
      linkedin: "LinkedIn",
      github: "GitHub: @MatuCode",
      instagram: "Instagram: @matute.api.dev",
      email: "pandresmatute@gmail.com",
    },
  }[lang];

  return (
    <section
      id="contacto"
      className="
        relative isolate
        min-h-[70vh] w-full
        flex items-center
        py-16 sm:py-24 px-6 lg:px-12
        text-white
      "
      aria-label={t.title}
    >
      {/* CARD (el “cuadro”) */}
      <div
        className="
          relative z-20
          max-w-xl
          rounded-2xl
          p-8 sm:p-10
          bg-neutral-900/60
          backdrop-blur-md
          ring-1 ring-white/20
          shadow-2xl
        "
      >
        <h2 className="text-4xl font-bold tracking-tight">{t.title}</h2>

        <p className="mt-3 text-base/7 text-white/80">{t.subtitle}</p>

        {/* Botones principales */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${t.email}`}
            className="
              inline-flex items-center justify-center
              rounded-xl px-5 py-3
              font-medium
              bg-orange-500 hover:bg-orange-600
              transition
              ring-1 ring-orange-400/20
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400
            "
            aria-label={t.emailAria}
          >
            {t.emailBtn}
          </a>

          <a
            href="https://linkedin.com/in/pablo-andres-matute"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center
              rounded-xl px-5 py-3
              font-medium
              bg-white/10 hover:bg-white/15
              transition
              ring-1 ring-white/20
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50
            "
          >
            {t.linkedin}
          </a>
        </div>

        {/* Enlaces secundarios */}
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/80">
          <a
            href="https://github.com/MatuCode"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            {t.github}
          </a>
          <a
            href="https://instagram.com/matute.api.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            {t.instagram}
          </a>
          <span className="hidden sm:inline">|</span>
          <span className="select-all">{t.email}</span>
        </div>
      </div>

      {/* Velo radial sutil por detrás para separar el card del fondo */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-10
          [mask-image:radial-gradient(60%_60%_at_20%_40%,black,transparent)]
          bg-black/30
        "
      />
    </section>
  );
};

export default ContactSection;
