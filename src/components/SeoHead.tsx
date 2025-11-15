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

  // Schema.org Person
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pablo Andrés Matute",
    alternateName: "Pablo Matute",
    url: normalizedCanonical,
    sameAs: [
      "https://www.linkedin.com/in/pablo-andres-matute",
      "https://github.com/MatuCode",
      "https://instagram.com/matute.api.dev",
    ],
    jobTitle: "Full-Stack Developer",
    description: seo.description,
    image: ogImage,
    knowsAbout: [
      "Java",
      "Spring Boot",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "MySQL",
      "SQL",
      "REST API",
      "Full-Stack Development",
      "Backend Development",
      "Frontend Development",
      "Software Engineering",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "UTPL - Universidad Técnica Particular de Loja",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "EC",
      addressRegion: "Ecuador",
    },
    nationality: {
      "@type": "Country",
      name: "Ecuador",
    },
  };

  // Schema.org WebSite
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pablo Matute - Portfolio",
    url: normalizedCanonical,
    description: seo.description,
    inLanguage: ["es", "en"],
    alternateName: "MatuCode Portfolio",
    publisher: {
      "@type": "Person",
      name: "Pablo Andrés Matute",
    },
  };

  // Schema.org ProfessionalService
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Desarrollo Full-Stack - Pablo Matute",
    description: "Servicios de desarrollo web full-stack especializado en Spring Boot, React, Next.js y bases de datos SQL",
    provider: {
      "@type": "Person",
      name: "Pablo Andrés Matute",
    },
    areaServed: {
      "@type": "Country",
      name: "Ecuador",
    },
    serviceType: [
      "Desarrollo Full-Stack",
      "Desarrollo Backend",
      "Desarrollo Frontend",
      "APIs REST",
      "Aplicaciones Web",
    ],
  };

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="author" content="Pablo Andrés Matute" />
        <meta name="keywords" content="desarrollador full-stack, spring boot, react, next.js, java, typescript, portfolio, desarrollador backend, desarrollador frontend, ingeniero telecomunicaciones, ecuador, desarrollo web, api rest, mysql, docker, vercel, pablo matute, matucode, desarrollador ecuador, freelance developer, software engineer" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="es,en" />
        <meta name="language" content="Spanish, English" />
        <meta name="geo.region" content="EC" />
        <meta name="geo.placename" content="Ecuador" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="coverage" content="worldwide" />
        
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
        <meta property="og:image:type" content="image/jpeg" />
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
        <meta name="format-detection" content="telephone=no" />
        
        {/* Google Search Console / Verification */}
        <meta name="google-site-verification" content="" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      {/* Schema.org Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* Schema.org WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* Schema.org ProfessionalService */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  );
}
