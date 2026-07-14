import type { Metadata } from "next";
import { SITE_URL } from "../../lib/config";
import { BritAbout } from "../../components/BritAbout";

export const metadata: Metadata = {
  title: "À Propos de BritFlow : L'Autorité UK-FR",
  description: "Pourquoi nous faisons de l'ingénierie fiscale de défense. Expertise, IA et Common Law.",
  alternates: { canonical: `${SITE_URL}/a-propos` },
};

export default function AProposPage() {
  return <BritAbout />;
}
