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
  const ogImage = `${normalizedCanonical}/og-image.jpeg`;

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
    description: seo.description,
    image: ogImage,
  };

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="author" content="Pablo Andrés Matute" />
        <meta name="keywords" content="desarrollador full-stack, spring boot, react, next.js, java, typescript, portfolio, desarrollador backend, desarrollador frontend, ingeniero telecomunicaciones, ecuador" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="es,en" />
        
        {/* Canonical URLs */}
        <link rel="canonical" href={normalizedCanonical} />
        <link rel="alternate" hrefLang="es" href={canonicalEs} />
        <link rel="alternate" hrefLang="en" href={canonicalEn} />
        <link rel="alternate" hrefLang="x-default" href={canonicalEs} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={normalizedCanonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.ogDescription || seo.description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Pablo Matute - Full-Stack Developer Portfolio | Spring Boot · React/Next.js · SQL" />
        <meta property="og:site_name" content="Pablo Matute Portfolio" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:locale:alternate" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={normalizedCanonical} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.ogDescription || seo.description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Pablo Matute - Full-Stack Developer Portfolio" />
        <meta name="twitter:creator" content="@matute.api.dev" />
        <meta name="twitter:site" content="@matute.api.dev" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#16213e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Pablo Matute" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
