import type { Metadata } from "next";
import { SITE_URL } from "../../lib/config";
import { BritToolsList } from "../../components/BritToolsList";

export const metadata: Metadata = {
  title: "Plateforme d'Outils d'Ingénierie Societe Anglaise",
  description: "Accédez à nos 14 simulateurs et audits de protection et d'optimisation fiscale.",
  alternates: { canonical: `${SITE_URL}/outils` },
};

export default function ToolsIndexPage() {
  return <BritToolsList />;
}
