// ============================================================================
// Archivo: src/pages/index.tsx
// Descripción breve:
//   Página principal del portafolio con portada (Home) estilo mockup y sección
//   About/Summary. Incluye bloque de contacto en el Home (email, GitHub,
//   LinkedIn, ubicación) y un menú redondo que navega a secciones internas.
// Cómo se enlaza con el sistema:
//   - Usa Next.js (Pages Router). Este archivo se renderiza en la ruta '/'.
//   - Carga tu foto desde /public/me.png y el CV desde /public/cv.pdf.
//   - Los estilos se basan en TailwindCSS (asegúrate de tenerlo configurado).
// Rutas/Assets que debes crear:
//   - src/pages/index.tsx              ← (este archivo)
//   - public/me.png                    ← tu foto (renómbrala así)
//   - public/cv.pdf                    ← tu CV en PDF
//   - (opcional) configurar la fuente con next/font o @font-face (ver notas)
// Notas de fuente:
//   - Puedes usar Inter con next/font o tu Geist Sans. Este archivo no impone
//     una fuente concreta; hereda la definida en _app.tsx o en CSS global.
// ============================================================================

import Head from "next/head";
import Image from "next/image";

// Paleta de colores: acento y fondo
const ACCENT = "#F6B10A"; // amarillo cálido similar al mockup
const BG = "#0b0b0d";     // negro profundo/gris muy oscuro

// Componente principal de la página de inicio
export default function Home() {
  return (
    <>
      {/* Head: SEO básico y configuración de viewport */}
      <Head>
        <title>Pablo Andrés Matute — Portafolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Portafolio de Pablo Andrés Matute — Desarrollador Backend"
        />
      </Head>

      {/* ============================== HERO (HOME) ============================== */}
      <section
        id="home"
        className="relative min-h-screen w-full overflow-hidden"
        style={{ background: BG }}
      >
        {/* Círculo radial de acento detrás de la foto para dar profundidad */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute right-[-10%] top-1/4 h-[60vmin] w-[60vmin] rounded-full"
            style={{
              background: `radial-gradient(45% 45% at 50% 50%, ${ACCENT}22 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Barra superior: estado "Open to work" y botón de CV */}
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-6">
          <div className="flex items-center gap-2 text-white/90">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="text-sm">Open to work</span>
          </div>
          <a
            href="/cv.pdf" // coloca tu CV en public/cv.pdf
            className="rounded-full px-5 py-2 text-sm font-medium text-black shadow"
            style={{ background: ACCENT }}
          >
            Download CV
          </a>
        </div>

        {/* Contenido central del hero: título + contacto a la izquierda, foto a la derecha */}
        <div className="mx-auto grid min-h-[70vh] max-w-6xl grid-cols-1 items-center gap-8 px-6 pb-10 pt-10 md:grid-cols-2">
          {/* Columna izquierda: título, rol y bloque de contacto */}
          <div className="text-white">
            {/* Rol en mayúsculas con tracking amplio para un look profesional */}
            <p className="text-[12px] tracking-widest text-white/70">BACKEND DEVELOPER</p>

            {/* Nombre: se puede ajustar el tamaño en md para responsividad */}
            <h1 className="mt-2 text-4xl font-extrabold leading-tight md:text-6xl">
              Pablo Andrés Matute
            </h1>

            {/* Bloque de contacto con íconos inline (SVG) */}
            <div className="mt-6 space-y-3 text-sm md:text-[15px]">
              <ContactRow icon={<MailIcon />}>
                <a className="hover:underline" href="mailto:pandresmatute@gmail.com">
                  pandresmatute@gmail.com
                </a>
              </ContactRow>

              {/* GitHub con ícono y enlace a tu perfil */}
              <ContactRow icon={<GitHubIcon />}>
                <a
                  className="hover:underline"
                  href="https://github.com/pandresmatute"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/pandresmatute
                </a>
              </ContactRow>

              {/* LinkedIn: reemplaza la URL por la de tu perfil real */}
              <ContactRow icon={<LinkedInIcon />}>
                <a
                  className="hover:underline"
                  href="https://www.linkedin.com/in/pablo-andres-matute/"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/pablo-andres-matute
                </a>
              </ContactRow>

              {/* Ubicación actual */}
              <ContactRow icon={<MapPinIcon />}>Ecuador</ContactRow>
            </div>

            {/* Menú inferior de la portada: anclas internas para navegar por secciones */}
            <nav className="mt-8 w-full">
              <ul className="flex w-full items-center gap-2 rounded-full bg-white/5 p-2 text-[13px] text-white/90 ring-1 ring-white/10 backdrop-blur">
                {[
                  { href: "#home", label: "Home" },
                  { href: "#about", label: "About Me" },
                  { href: "#experience", label: "Experiencia" },
                  { href: "#education", label: "Educación" },
                  { href: "#projects", label: "Proyectos" },
                ].map((i) => (
                  <li key={i.href}>
                    <a
                      href={i.href}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 hover:bg-white/10"
                    >
                      {i.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Columna derecha: foto del usuario */}
          <div className="relative">
            {/* Borde sutil para separar la imagen del fondo */}
            <div className="pointer-events-none absolute -inset-6 rounded-3xl ring-1 ring-white/10" aria-hidden />

            {/* Usa /public/me.png. Ajusta width/height según tu imagen real */}
            <Image
              src="/me.png"
              alt="Foto de Pablo Andrés Matute"
              width={700}
              height={900}
              className="h-auto w-full rounded-3xl object-cover object-center shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* ============================== ABOUT / SUMMARY ============================== */}
      <section id="about" className="py-16" style={{ background: BG }}>
        <div className="mx-auto max-w-5xl px-6 text-white">
          {/* Título del bloque About en color de acento */}
          <h2 className="text-3xl font-semibold" style={{ color: ACCENT }}>
            Summary
          </h2>

          {/* Dos columnas de texto para el resumen general */}
          <div className="mt-6 grid gap-10 md:grid-cols-2">
            <p className="leading-relaxed text-white/85">
              Soy un desarrollador Backend orientado a Java y Spring Boot, con experiencia en
              diseño de microservicios, bases de datos relacionales y búsqueda con Elasticsearch.
              Priorizo la calidad del código, las pruebas y despliegues limpios en plataformas como
              Railway y Vercel. Disfruto crear productos útiles y accesibles con un enfoque práctico en
              performance.
            </p>
            <p className="leading-relaxed text-white/85">
              He colaborado en proyectos académicos y prácticos, integrando APIs REST, Docker y
              monitoreo básico. Mi filosofía de trabajo se centra en la claridad, la empatía técnica y la
              mejora continua, buscando que cada decisión de ingeniería aporte valor real al usuario.
            </p>
          </div>

          {/* Bloque destacado estilo "quote" con borde de acento */}
          <div
            className="mt-10 rounded-2xl border-l-4 p-6 text-xl font-semibold leading-relaxed md:text-2xl"
            style={{ borderColor: ACCENT, background: "#101015" }}
          >
            Impulsado por la curiosidad y el aprendizaje constante, exploro nuevas herramientas y
            metodologías para elevar la calidad de mis entregables. Me enfoco en combinar APIs robustas
            con interfaces modernas que aporten resultados de alto impacto para usuarios y negocios.
          </div>
        </div>
      </section>

      {/* ============================== MARCADORES (rellenar más tarde) ============================== */}
      <section id="experience" className="py-24" style={{ background: BG }}>
        <div className="mx-auto max-w-5xl px-6 text-white/70">
          Experiencia (pendiente de contenido)
        </div>
      </section>
      <section id="education" className="py-24" style={{ background: BG }}>
        <div className="mx-auto max-w-5xl px-6 text-white/70">
          Educación (pendiente de contenido)
        </div>
      </section>
      <section id="projects" className="py-24" style={{ background: BG }}>
        <div className="mx-auto max-w-5xl px-6 text-white/70">
          Proyectos (pendiente de contenido)
        </div>
      </section>
    </>
  );
}

// ============================== COMPONENTES DE APOYO ===============================

// ContactRow: fila con ícono circular y contenido de contacto (enlaces o texto)
function ContactRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/90 ring-1 ring-white/10">
        {icon}
      </span>
      <div>{children}</div>
    </div>
  );
}

// Íconos SVG inline (no dependen de librerías externas)
function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Sombra del sobre */}
      <path d="M4 4h16v16H4z" opacity=".2" />
      {/* Línea interior del sobre */}
      <path d="M22 6l-10 7L2 6" />
      {/* Rectángulo principal del sobre */}
      <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-white"
      aria-hidden
    >
      <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.85 3.15 8.96 7.51 10.41.55.1.75-.24.75-.53 0-.26-.01-1.12-.02-2.04-3.06.66-3.7-1.3-3.7-1.3-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.19 3.19.91.1-.71.38-1.19.69-1.47-2.44-.28-5.01-1.22-5.01-5.44 0-1.2.43-2.17 1.13-2.94-.11-.28-.49-1.42.11-2.96 0 0 .92-.3 3.02 1.12A10.5 10.5 0 0112 6.8c.94 0 1.88.13 2.76.38 2.1-1.42 3.02-1.12 3.02-1.12.6 1.54.22 2.68.11 2.96.7.77 1.13 1.74 1.13 2.94 0 4.23-2.57 5.16-5.02 5.43.39.34.73 1 .73 2.02 0 1.46-.01 2.64-.01 3 0 .29.2.64.76.53A10.53 10.53 0 0023.02 11.5C23.02 5.24 18.27.5 12 .5z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-white"
      aria-hidden
    >
      <path d="M4.98 3.5C4.98 4.88 3.85 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zM8 8.5h3.8v2.1h.05c.53-1 1.85-2.1 3.8-2.1 4.06 0 4.8 2.67 4.8 6.13V24h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V24H8V8.5z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
