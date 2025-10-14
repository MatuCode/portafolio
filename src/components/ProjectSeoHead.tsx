import Head from "next/head";
import { useRouter } from "next/router";

type Offer = { price: number; priceCurrency: string };

type Props = {
  canonical: string;            // URL absoluta del proyecto, ej: https://matucode.lat/proyectos/rsale
  title: string;                // Título base (visible en <title>)
  descriptionEs: string;        // Descripción ES
  descriptionEn: string;        // Descripción EN
  // Campos Schema.org (opcionales pero recomendados)
  applicationCategory?: string; // ej: "BusinessApplication", "DeveloperApplication"
  operatingSystem?: string;     // ej: "Web", "Cross-platform"
  version?: string;             // ej: "1.0.0"
  datePublished?: string;       // ISO (YYYY-MM-DD)
  programmingLanguages?: string[]; // ej: ["Java", "TypeScript"]
  softwareRequirements?: string[]; // ej: ["PostgreSQL", "Docker"]
  keywords?: string[];          // tags/keywords
  offers?: Offer | null;        // si aplica precio (saas/app), si no, null/omitir
};

export default function ProjectSeoHead({
  canonical,
  title,
  descriptionEs,
  descriptionEn,
  applicationCategory = "SoftwareApplication",
  operatingSystem = "Web",
  version,
  datePublished,
  programmingLanguages,
  softwareRequirements,
  keywords,
  offers,
}: Props) {
  const { locale } = useRouter();
  const isEs = (locale ?? "es").startsWith("es");
  const desc = isEs ? descriptionEs : descriptionEn;

  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    url: canonical,
    description: desc,
    applicationCategory,
    operatingSystem,
    author: {
      "@type": "Person",
      name: "Pablo Andrés Matute",
      url: "https://matucode.lat",
    },
  };

  if (version) jsonLd.softwareVersion = version;
  if (datePublished) jsonLd.datePublished = datePublished;
  if (programmingLanguages?.length) jsonLd.programmingLanguage = programmingLanguages.join(", ");
  if (softwareRequirements?.length) jsonLd.softwareRequirements = softwareRequirements.join(", ");
  if (keywords?.length) jsonLd.keywords = keywords.join(", ");
  if (offers) {
    jsonLd.offers = {
      "@type": "Offer",
      price: offers.price,
      priceCurrency: offers.priceCurrency,
      availability: "https://schema.org/InStock",
    };
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
        {/* Alternates por idioma */}
        <link rel="alternate" hrefLang="es" href={canonical.replace("/en", "")} />
        <link rel="alternate" hrefLang="en" href={canonical.replace("://", "://") + "/en"} />
        <link rel="alternate" hrefLang="x-default" href={canonical.replace("/en", "")} />

        {/* Sin Open Graph ni Twitter (como pediste) */}
        <meta name="robots" content="index,follow" />
      </Head>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
