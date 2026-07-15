import type { Metadata } from "next";
import { SITE_URL } from "../../lib/config";
import Observatoire from "../../components/Observatoire";

export const metadata: Metadata = {
  title: { absolute: "Baromètre de la Liberté Entrepreneuriale 2025 | Observatoire Societe Anglaise" },
  description:
    "Observatoire indépendant de la compétitivité des entreprises françaises face au modèle anglo-saxon. Données sur les faillites, l'URSSAF et l'exode fiscal.",
  alternates: { canonical: `${SITE_URL}/observatoire` },
};

// Observatoire renders its own Dataset JSON-LD internally (via <SEOJsonLd>),
// so no need to duplicate it here.
export default function ObservatoirePage() {
  return <Observatoire />;
}
