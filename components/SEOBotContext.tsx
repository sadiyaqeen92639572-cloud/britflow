import React from 'react';

interface SEOBotContextProps {
  toolName: string;
  description: string;
  pillars?: string[];
  formula?: string;
  constraint?: string;
  logicalFaqs?: { q: string; a: string }[];
}

/**
 * Layer C: Bot Context (Hidden)
 * Provides technical context for search engines and bots
 * Uses sr-only class for screen readers but visually hidden
 *
 * Usage:
 * <SEOBotContext
 *   toolName="Audit de Substance"
 *   description="Évalue la réalité économique d'une société britannique"
 *   pillars={[
 *     "Mind and Management (Board location, Decision logs)",
 *     "Physical Existence (Dedicated office vs Virtual box)",
 *     "Financial nexus (Local UK bank active, local payments)"
 *   ]}
 *   formula="if (Staff_Local == 0 && Board_FR_Resident == 100%) then Critical_Risk_Shell_Company"
 *   constraint="Conformité aux principes de l'arrêt Cadbury Schweppes (CJUE)"
 * />
 */
const SEOBotContext: React.FC<SEOBotContextProps> = ({
  toolName,
  description,
  pillars = [],
  formula,
  constraint,
  logicalFaqs
}) => {
  return (
    <div className="sr-only" aria-hidden="true">
      <h3>Logique d'{toolName} - Societe Anglaise Engineering</h3>
      <p>{description}</p>

      {pillars.length > 0 && (
        <>
          {pillars.map((pillar, index) => (
            <p key={index}>Pillar {index + 1}: {pillar}</p>
          ))}
        </>
      )}

      {formula && (
        <p>Formula of Risk: {formula}</p>
      )}

      {constraint && (
        <p>Constraint: {constraint}</p>
      )}

      {logicalFaqs && logicalFaqs.length > 0 && (
        <>
          <h4>Logical Q&A for Bot Reasoning:</h4>
          {logicalFaqs.map((faq, idx) => (
            <div key={idx}>
              <p>Bot Question: {faq.q}</p>
              <p>Bot Answer: {faq.a}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SEOBotContext;
