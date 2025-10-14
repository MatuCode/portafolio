import Head from "next/head";
import { useRouter } from "next/router";

type Props = {
  title?: string;
  descriptionEs?: string;
  descriptionEn?: string;
  canonical?: string;
};

export default function SeoHead({
  title = "Pablo Matute · Full-Stack",
  descriptionEs = "Desarrollador Full-Stack: Spring Boot, React/Next.js, SQL, despliegues en Vercel/Docker.",
  descriptionEn = "Full-Stack Developer: Spring Boot, React/Next.js, SQL, deployments on Vercel/Docker.",
  canonical = "https://matucode.lat",
}: Props) {
  const { locale } = useRouter();
  const desc = (locale ?? "es").startsWith("es") ? descriptionEs : descriptionEn;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pablo Andrés Matute",
    url: "https://matucode.lat",
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
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />

        {/* Alternates por idioma */}
        <link rel="alternate" hrefLang="es" href={`${canonical}/`} />
        <link rel="alternate" hrefLang="en" href={`${canonical}/en`} />
        <link rel="alternate" hrefLang="x-default" href={`${canonical}/`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Spring Boot · React/Next.js · SQL" />
        <meta property="og:image" content={`${canonical}/og.png`} />
      </Head>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
