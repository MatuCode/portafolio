import Head from "next/head";

export type SeoCopy = {
  title: string;
  description: string;
  ogDescription: string;
};

export default function SeoHead({
  seo,
  canonical = "https://matucode.lat",
}: {
  seo: SeoCopy;
  canonical?: string;
}) {
  const normalizedCanonical = canonical.replace(/\/+$/, "");
  const canonicalEs = `${normalizedCanonical}/`;
  const canonicalEn = `${normalizedCanonical}/en`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pablo Andrés Matute",
    url: normalizedCanonical,
    sameAs: [
      "https://www.linkedin.com/in/pablo-andres-matute",
      "https://github.com/MatuCode",
      "https://instagram.com/matute.api.dev",
    ],
    jobTitle: "Full-Stack Developer",
  };

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={normalizedCanonical} />
        <link rel="alternate" hrefLang="es" href={canonicalEs} />
        <link rel="alternate" hrefLang="en" href={canonicalEn} />
        <link rel="alternate" hrefLang="x-default" href={canonicalEs} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={normalizedCanonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:image" content={`${normalizedCanonical}/og.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Pablo Matute - Full-Stack Developer Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.ogDescription} />
        <meta name="twitter:image" content={`${normalizedCanonical}/og.png`} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Pablo Andrés Matute" />
        <meta name="keywords" content="desarrollador full-stack, spring boot, react, next.js, java, typescript, portfolio, desarrollador backend, desarrollador frontend" />
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
