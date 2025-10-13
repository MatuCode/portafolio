/* *Developed by pmatute */
'use client';

type Cert = {
  issuer: string;
  name: string;
  year?: string;
  importance?: number; // menor = más importante
  proofUrl?: string;   // imagen/pdf del certificado
};

type CertI18n = {
  title: string;
  featuredTitle?: string;
  moreBtn?: { show: string; hide: string };
  featured: Cert[];
  extra: Cert[];
};

export default function Certifications({ i18n }: { i18n: CertI18n }) {
  // Combina y ordena por importancia (asc), luego por año (desc) si existe
  const items = [...(i18n.featured || []), ...(i18n.extra || [])].sort((a, b) => {
    const impA = a.importance ?? 99;
    const impB = b.importance ?? 99;
    if (impA !== impB) return impA - impB;
    const yearA = Number(a.year) || 0;
    const yearB = Number(b.year) || 0;
    return yearB - yearA;
  });

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-20" aria-label={i18n.title}>
      {/* Fondo consistente */}
      <div className="absolute inset-0 -z-10 bg-black" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_500px_at_50%_10%,rgba(249,115,22,0.4),rgba(249,115,22,0.12)_45%,transparent_70%)]" />

      <header className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl">{i18n.title}</h2>
        {i18n.featuredTitle && (
          <p className="mt-1 text-white/70">{i18n.featuredTitle}</p>
        )}
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <article key={c.issuer + c.name} className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5">
            <div>
              <h3 className="text-white font-semibold">{c.name}</h3>
              <p className="mt-1 text-sm text-white/80">{c.issuer}</p>
              {c.year && <p className="mt-1 text-xs text-white/60">{c.year}</p>}
            </div>

            {c.proofUrl && (
              <a
                href={c.proofUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-max items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
                title="Abrir certificado"
              >
                Ver certificado
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
