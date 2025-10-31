import { useRouter } from "next/router";

export type ProjectSEO = {
  id: string;
  title: string;
  descriptionEs: string;
  descriptionEn: string;
  applicationCategory?: string;
  operatingSystem?: string;
  version?: string;
  datePublished?: string;
  programmingLanguages?: string[];
  softwareRequirements?: string[];
  keywords?: string[];
  offers?: { price: number; priceCurrency: string } | null;
};

export default function ProjectsSchema({
  baseUrl,
  projects,
}: {
  baseUrl: string;
  projects: ProjectSEO[];
}) {
  const { locale } = useRouter();
  const isEs = (locale ?? "es").startsWith("es");

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((p, idx) => {
      const url = `${baseUrl}#project-${p.id}`;
      const item: any = {
        "@type": "SoftwareApplication",
        name: p.title,
        url,
        description: isEs ? p.descriptionEs : p.descriptionEn,
        applicationCategory: p.applicationCategory ?? "SoftwareApplication",
        operatingSystem: p.operatingSystem ?? "Web",
      };
      if (p.version) item.softwareVersion = p.version;
      if (p.datePublished) item.datePublished = p.datePublished;
      if (p.programmingLanguages?.length)
        item.programmingLanguage = p.programmingLanguages.join(", ");
      if (p.softwareRequirements?.length)
        item.softwareRequirements = p.softwareRequirements.join(", ");
      if (p.keywords?.length) item.keywords = p.keywords.join(", ");
      if (p.offers) {
        item.offers = {
          "@type": "Offer",
          price: p.offers.price,
          priceCurrency: p.offers.priceCurrency,
          availability: "https://schema.org/InStock",
        };
      }

      return { "@type": "ListItem", position: idx + 1, url, item };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  );
}

