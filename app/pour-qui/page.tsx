import type { Metadata } from "next";
import { SITE_URL } from "../../lib/config";
import { BritTargetAudience } from "../../components/BritTargetAudience";

const TITLE = "BritFlow : Pour qui ? Profils & Stratégies";
const DESCRIPTION = "Solutions sur-mesure pour freelances, PDG et expatriés en quête de souveraineté fiscale.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/pour-qui` },
};

export default function PourQuiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/pour-qui`,
    isPartOf: { "@type": "WebSite", name: "BritFlow", url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BritTargetAudience />
    </>
  );
}
