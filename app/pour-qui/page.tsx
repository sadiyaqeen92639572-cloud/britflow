import type { Metadata } from "next";
import { SITE_URL } from "../../lib/config";
import { BritTargetAudience } from "../../components/BritTargetAudience";

export const metadata: Metadata = {
  title: "BritFlow : Pour qui ? Profils & Stratégies",
  description: "Solutions sur-mesure pour freelances, PDG et expatriés en quête de souveraineté fiscale.",
  alternates: { canonical: `${SITE_URL}/pour-qui` },
};

export default function PourQuiPage() {
  return <BritTargetAudience />;
}
