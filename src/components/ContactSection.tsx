// src/components/ContactSection.tsx
/* *Developed by pmatute */
import React from "react";

export default function ContactSection() {
  // Si quieres que el botón realmente envíe un correo sin backend,
  // puedes usar el mailto de abajo.
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = encodeURIComponent(String(form.get("name") || ""));
    const email = encodeURIComponent(String(form.get("email") || ""));
    const message = encodeURIComponent(String(form.get("message") || ""));

    const subject = encodeURIComponent(`Contacto desde el portafolio`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:pablomatutez@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-24 md:py-28">
      <div className="w-full pl-6 md:pl-16 lg:pl-28 xl:pl-40 pr-6">
        <header className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white drop-shadow">
            Contacto
          </h2>
          <p className="text-white/75 text-sm md:text-base mt-1">
            Envíame un mensaje o conéctate por redes.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="max-w-xl grid gap-3">
            <input
              name="name"
              required
              placeholder="Tu nombre"
              className="w-full rounded-xl bg-white/10 ring-1 ring-white/15 text-white px-4 py-3 placeholder-white/50 focus:outline-none focus:ring-white/30"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Tu correo"
              className="w-full rounded-xl bg-white/10 ring-1 ring-white/15 text-white px-4 py-3 placeholder-white/50 focus:outline-none focus:ring-white/30"
            />
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Tu mensaje"
              className="w-full rounded-xl bg-white/10 ring-1 ring-white/15 text-white px-4 py-3 placeholder-white/50 focus:outline-none focus:ring-white/30"
            />
            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center rounded-xl bg-orange-500 text-black px-5 py-3 font-medium hover:brightness-110 transition"
            >
              Enviar
            </button>
          </form>

          {/* Redes (logos como enlaces) */}
          <div className="flex items-start gap-4">
            <div className="grid grid-cols-4 gap-3">
              <a
                href="https://github.com/Matucode"
                target="_blank"
                rel="noreferrer"
                className="h-12 w-12 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-white hover:bg-white/20 transition"
                aria-label="GitHub"
                title="GitHub"
              >
                {/* SVG GitHub */}
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
                  <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.62-4.04-1.62-.55-1.39-1.35-1.76-1.35-1.76-1.1-.76.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.86 2.83 1.32 3.52 1.01.11-.8.42-1.33.76-1.63-2.67-.31-5.47-1.33-5.47-5.94 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.57.12-3.27 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.7.24 2.96.12 3.27.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .5Z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/pablo-andres-matute/"
                target="_blank"
                rel="noreferrer"
                className="h-12 w-12 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-white hover:bg-white/20 transition"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                {/* SVG LinkedIn alternativo bien visible */}
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001ZM3 8.98h3.96V21H3V8.98Zm6.74 0H13.6v1.64h.05c.64-1.14 2.2-2.35 4.53-2.35C22 8.27 23 11 23 14.76V21h-3.96v-5.36c0-1.28-.02-2.93-1.78-2.93-1.79 0-2.06 1.4-2.06 2.84V21H11.3V8.98h-1.56Z"/>
                </svg>
              </a>

              <a
                href="https://instagram.com/matute.api.dev"
                target="_blank"
                rel="noreferrer"
                className="h-12 w-12 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-white hover:bg-white/20 transition"
                aria-label="Instagram"
                title="Instagram"
              >
                {/* SVG Instagram */}
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11.001 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7.001 3.5 3.5 0 0 0 0-7ZM18 6.5a1 1 0 1 1 0 2.001 1 1 0 0 1 0-2.001Z"/>
                </svg>
              </a>

              <a
                href="https://wa.me/593967581682" // ← tu número con código de país
                target="_blank"
                rel="noreferrer"
                className="h-12 w-12 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-white hover:bg-white/20 transition"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                {/* SVG WhatsApp */}
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
                  <path d="M12 .5A11.5 11.5 0 0 0 2.09 18.37L.5 23.5l5.3-1.53A11.49 11.49 0 1 0 12 .5Zm0 2a9.5 9.5 0 1 1 0 19c-1.6 0-3.1-.39-4.44-1.08l-.32-.17-3.12.9.9-3.04-.18-.33A9.5 9.5 0 0 1 12 2.5Zm-3.08 5.1c.13-.3.26-.3.35-.3h.3c.1 0 .23 0 .35.26.14.26.47.92.5.99.04.08.07.18.01.29-.06.12-.09.19-.19.3-.1.1-.2.23-.29.31-.1.08-.2.17-.08.34.12.18.53.86 1.15 1.39.79.7 1.46.91 1.67 1 .21.08.33.07.45-.05.12-.13.52-.6.66-.81.14-.21.28-.17.47-.1.2.07 1.26.59 1.48.7.22.12.37.17.42.26.05.1.05.56-.13 1.1s-1.1 1.04-1.53 1.1c-.39.06-.88.08-1.46-.09-.34-.1-1.09-.35-1.84-.84-.82-.54-1.49-1.21-1.91-1.98-.42-.77-.8-1.83-.9-2.13-.1-.3-.01-.66.14-.92Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
