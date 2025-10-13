/* *Developed by pmatute */
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

type Cert = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  tags?: string[];
  img: string;       // ruta a /public/certs/*.jpg
  priority: number;  // menor = más importante
};

// ===== SOLO IMÁGENES (ajusta textos si deseas) =====
const CERTS: Cert[] = [
  {
    id: "efset",
    title: "EF SET English Certificate – B2",
    issuer: "EF SET",
    date: "May 2025",
    tags: ["Inglés", "B2"],
    img: "/certs/EF.jpg",
    priority: 1,
  },
  {
    id: "leadership",
    title: "Continuing Education Certificate in Leadership (45 h)",
    issuer: "City University Miami (MIU – Continuing Education)",
    date: "Ago 2024",
    img: "/certs/Leadership.jpg",
    priority: 2,
  },
  {
    id: "cisco-srw",
    title: "CCNAv7: Switching, Routing and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    date: "Jul 2021",
    tags: ["Redes"],
    img: "/certs/Cisco-SRW.jpg",
    priority: 3,
  },
  {
    id: "cisco-intro",
    title: "CCNAv7: Introducción a Redes",
    issuer: "Cisco Networking Academy",
    date: "Feb 2021",
    tags: ["Redes"],
    img: "/certs/Cisco-IntroduccionRedes.jpg",
    priority: 4,
  },
  {
    id: "ms-linkedin-software",
    title: "Fundamentos profesionales del desarrollo de software",
    issuer: "Microsoft & LinkedIn Learning",
    date: "Jun 2024",
    img: "/certs/Linkedin-Software.jpg",
    priority: 5,
  },
  {
    id: "ms-linkedin-cyber",
    title: "Fundamentos profesionales en ciberseguridad",
    issuer: "Microsoft & LinkedIn Learning",
    date: "Jun 2024",
    img: "/certs/Linkedin-Cibersecurity.jpg",
    priority: 6,
  },
  {
    id: "certiprof",
    title: "Cybersecurity Awareness Professional Certification (ES)",
    issuer: "CertiProf",
    date: "Vigente",
    img: "/certs/certifpro.jpg",
    priority: 7,
  },
  {
    id: "excel-advanced",
    title: "Excel avanzado: validación de datos, fórmulas, macros y tablas dinámicas (40 h)",
    issuer: "Operador de Capacitación · Ministerio del Trabajo",
    date: "Feb 2024",
    img: "/certs/Excel.jpg",
    priority: 8,
  },
  {
    id: "fine-tuned-b2",
    title: "Certificación Nivel B2 en Inglés (B2.3)",
    issuer: "Fine-Tuned English Language Institute",
    date: "Nov 2024",
    tags: ["Inglés", "B2"],
    img: "/certs/FTN.jpg",
    priority: 9,
  },
  {
    id: "mastermind",
    title: "MasterMind Program Certificate",
    issuer: "Mastermind",
    date: "2021",
    img: "/certs/mastermind.jpg",
    priority: 10,
  },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 text-[11px] rounded-lg bg-white/10 ring-1 ring-white/10 text-white/90">
      {children}
    </span>
  );
}

export default function Certifications() {
  const router = useRouter();
  const isES = (router.locale ?? "es").startsWith("es");

  const copy = isES
    ? {
        title: "Certificaciones",
        subtitle: "Seleccionadas por relevancia. Pulsa “Ver” para abrir la imagen.",
        view: "Ver",
        close: "Cerrar",
        more: "Ver más",
        less: "Ver menos",
      }
    : {
        title: "Certifications",
        subtitle: "Selected by relevance. Press “View” to open the image.",
        view: "View",
        close: "Close",
        more: "Show more",
        less: "Show less",
      };

  const [openId, setOpenId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const openCert = CERTS.find((c) => c.id === openId) || null;

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpenId(null);
  }, []);
  useEffect(() => {
    if (!openId) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId, onKey]);

  const data = [...CERTS].sort((a, b) => a.priority - b.priority);
  const INITIAL_COUNT = 6;
  const visible = expanded ? data : data.slice(0, INITIAL_COUNT);

  return (
    <section className="py-24 md:py-28">
      <div className="w-full pl-6 md:pl-16 lg:pl-28 xl:pl-40 pr-6">
        <div className="max-w-[48rem]">
          <header className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white drop-shadow">
              {copy.title}
            </h2>
            <p className="text-white/75 text-sm md:text-base mt-1">{copy.subtitle}</p>
          </header>

          <div className="grid gap-4">
            {visible.map((c) => (
              <article
                key={c.id}
                className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 md:p-5 backdrop-blur"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
                      {c.title}
                    </h3>
                    <p className="text-white/75 text-xs md:text-sm mt-0.5">
                      {c.issuer} · {c.date}
                    </p>
                    {!!c.tags?.length && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {c.tags.map((t) => (
                          <Badge key={t}>{t}</Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setOpenId(c.id)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition"
                    >
                      {copy.view}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {data.length > INITIAL_COUNT && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="px-4 py-2 text-sm rounded-xl bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/20 transition"
              >
                {expanded ? copy.less : copy.more}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal solo imagen */}
      {openCert && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenId(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenId(null)}
              className="absolute -top-10 right-0 md:top-0 md:-right-10 p-3 rounded-full bg-white/10 ring-1 ring-white/20 text-white hover:bg-white/20 transition"
              aria-label={copy.close}
              title={copy.close}
            >
              ✕
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={openCert.img}
              alt={openCert.title}
              className="w-full h-auto rounded-xl ring-1 ring-white/20 bg-black/40"
            />

            <div className="mt-3 text-white/80 text-sm">
              {openCert.title} — {openCert.issuer}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
