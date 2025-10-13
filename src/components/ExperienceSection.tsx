/* *Developed by pmatute */
import { useRouter } from "next/router";

type Item = {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
  stack?: string[];
};

const dataES: Item[] = [
  {
    role: "Desarrollador Backend / Full-stack",
    company: "Rsale (app móvil inmobiliaria)",
    period: "Junio 2025 — Presente",
    location: "Ecuador / remoto",
    bullets: [
      "Proyecto para empresa real: plataforma de venta de propiedades inmobiliarias.",
      "API REST con Java + Spring Boot (JWT, validación, paginación).",
      "Modelado SQL; manejo de publicaciones e imágenes.",
      "Panel interno de apoyo con React/Next.js + Tailwind.",
    ],
    stack: ["Java", "Spring Boot", "MySQL", "React/Next.js", "Tailwind", "Git"],
  },
  {
    role: "Pasante de Desarrollo (Backend)",
    company: "Futurity",
    period: "Septiembre 2025 — Noviembre 2025",
    location: "Local",
    bullets: [
      "Modelado/normalización de base de datos para inventarios e indicadores de calidad de servicio.",
      "Web local para control de inventarios, calidad de servicio y registro de instrumentos técnicos.",
      "Soporte en reportes y trazabilidad de equipos.",
    ],
    stack: ["Java", "Spring Boot", "MySQL", "React/Vite"],
  },
  {
    role: "Consultor de Desarrollo Web",
    company: "Consultoría V-AST · UNEMI",
    period: "Abril 2024 — Septiembre 2024",
    bullets: [
      "Consultoría para aplicación web universitaria.",
      "Arquitectura y componentes; buenas prácticas de desarrollo.",
      "Entrega de prototipo funcional y documentación técnica.",
    ],
    stack: ["TypeScript", "Next.js", "Tailwind", "Git"],
  },
];

const dataEN: Item[] = [
  {
    role: "Backend / Full-stack Developer",
    company: "Rsale (real-estate mobile app)",
    period: "June 2025 — Present",
    location: "Ecuador / remote",
    bullets: [
      "Real project: platform for selling real-estate properties.",
      "REST API with Java + Spring Boot (JWT, validation, pagination).",
      "SQL modeling; listings and image management.",
      "Support admin panel with React/Next.js + Tailwind.",
    ],
    stack: ["Java", "Spring Boot", "MySQL", "React/Next.js", "Tailwind", "Git"],
  },
  {
    role: "Backend Intern",
    company: "Futurity",
    period: "September 2025 — November 2025",
    location: "On-site",
    bullets: [
      "DB modeling/normalization for inventory and service-quality indicators.",
      "Local web app for inventory control, service quality and instruments registry.",
      "Support for reporting and asset traceability.",
    ],
    stack: ["Java", "Spring Boot", "MySQL", "React/Vite"],
  },
  {
    role: "Web Development Consultant",
    company: "V-AST Consulting · UNEMI",
    period: "April 2024 — September 2024",
    bullets: [
      "Consulting for a university web application.",
      "Architecture & components; dev best practices.",
      "Delivered functional prototype and documentation.",
    ],
    stack: ["TypeScript", "Next.js", "Tailwind", "Git"],
  },
];

export default function ExperienceSection() {
  const router = useRouter();
  const isES = (router.locale ?? "es").startsWith("es");
  const copy = isES
    ? { title: "Experiencia", subtitle: "Roles, logros y stack principal.", data: dataES }
    : { title: "Experience", subtitle: "Roles, impact and primary stack.", data: dataEN };

  return (
    // Usamos py-24/28 para separarlo del borde superior e inferior
    <section className="py-24 md:py-28">
      {/* Alineado a la izquierda */}
      <div className="w-full pl-6 md:pl-16 lg:pl-28 xl:pl-40 pr-6">
        {/* Limitamos el ancho para que el texto no se vea enorme */}
        <div className="max-w-[44rem]">
          <header className="mb-6">
            {/* Título más contenido (tamaños reducidos) */}
            <h2 className="text-2xl md:text-3xl font-semibold text-white drop-shadow">
              {copy.title}
            </h2>
            <p className="text-white/75 text-sm md:text-base mt-1">{copy.subtitle}</p>
          </header>

          {/* Timeline compacto */}
          <ol className="relative border-s border-white/15">
            {copy.data.map((job, i) => (
              <li key={i} className="ms-6 mb-6 md:mb-7">
                {/* marcador */}
                <span className="absolute -start-3.5 mt-1.5 h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-white/20" />
                {/* tarjeta */}
                <article className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 md:p-5 backdrop-blur">
                  <h3 className="text-base md:text-lg font-semibold text-white leading-tight">
                    {job.role} · <span className="text-white/85">{job.company}</span>
                  </h3>
                  <p className="text-white/65 text-xs md:text-sm mt-1">
                    {job.period}
                    {job.location ? ` · ${job.location}` : ""}
                  </p>

                  <ul className="mt-2 md:mt-3 list-disc list-inside space-y-1 text-white/90 text-sm leading-relaxed">
                    {job.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>

                  {!!job.stack?.length && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.stack.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 text-[11px] rounded-lg bg-white/10 ring-1 ring-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
