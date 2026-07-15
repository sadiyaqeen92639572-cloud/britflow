import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/site/Header";
import Footer from "../components/site/Footer";
import { SITE_URL } from "../lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Societe Anglaise - Optimisation Fiscale & Société Limited Londres",
    template: "%s | Societe Anglaise",
  },
  description:
    "Simulez vos gains fiscaux, auditez votre substance et créez votre société Limited à Londres en toute sécurité. Le guide ultime pour les entrepreneurs français.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Societe Anglaise - L'Expertise Fiscale UK pour Français",
    description:
      "Ouvrir une Limited à Londres n'a jamais été aussi sécurisé. Découvrez nos outils d'audit de substance.",
    type: "website",
    url: SITE_URL,
    images: [`${SITE_URL}/og-image.png`],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Societe Anglaise",
  legalName: "Societe Anglaise Ltd",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "269 Poynders Gardens, Office 01",
    addressLocality: "London",
    addressRegion: "England",
    postalCode: "SW4 8PQ",
    addressCountry: "GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
