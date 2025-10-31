import Head from "next/head";
import { useRouter } from "next/router";

type Offer = { price: number; priceCurrency: string };

type Props = {
  canonical: string; // URL absoluta del proyecto, ej: https://matucode.lat/proyectos/rsale
  title: string; // Título mostrado en <title>
  descriptionEs: string; // Descripción en español
  descriptionEn: string; // Descripción en inglés
  applicationCategory?: string;
  operatingSystem?: string;
  version?: string;
  datePublished?: string;
  programmingLanguages?: string[];
  softwareRequirements?: string[];
  keywords?: string[];
  offers?: Offer | null;
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
  const description = isEs ? descriptionEs : descriptionEn;

  const normalizedCanonical = canonical.replace(/\/+$/, "");
  const baseCanonical = normalizedCanonical.replace(/\/en$/i, "");
  const canonicalEn = `${baseCanonical}/en`;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    url: normalizedCanonical,
    description,
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
        <meta name="description" content={description} />
        <link rel="canonical" href={normalizedCanonical} />
        <link rel="alternate" hrefLang="es" href={baseCanonical} />
        <link rel="alternate" hrefLang="en" href={canonicalEn} />
        <link rel="alternate" hrefLang="x-default" href={baseCanonical} />
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
