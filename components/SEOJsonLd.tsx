import React from 'react';
import { SITE_URL } from '../lib/config';

interface SEOJsonLdProps {
  name?: string;
  description?: string;
  category?: string;
  url?: string;
  schema?: object;
}

/**
 * Layer A: JSON-LD Structured Data
 * Generates Schema.org SoftwareApplication markup for SEO
 */
const SEOJsonLd: React.FC<SEOJsonLdProps> = ({
  name,
  description,
  category = "BusinessApplication",
  url = SITE_URL,
  schema: customSchema
}) => {
  const schema = customSchema || {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `${name} - Societe Anglaise`,
    "operatingSystem": "All",
    "applicationCategory": category,
    "description": description,
    "url": url,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "author": {
      "@type": "Organization",
      "name": "Societe Anglaise"
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};

export default SEOJsonLd;
