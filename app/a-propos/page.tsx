import type { Metadata } from "next";
import { SITE_URL } from "../../lib/config";
import { BritAbout } from "../../components/BritAbout";

const TITLE = "À Propos de BritFlow : L'Autorité UK-FR";
const DESCRIPTION = "Pourquoi nous faisons de l'ingénierie fiscale de défense. Expertise, IA et Common Law.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/a-propos` },
};

export default function AProposPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/a-propos`,
    isPartOf: { "@type": "WebSite", name: "BritFlow", url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BritAbout />
    </>
  );
}
