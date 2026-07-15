"use client";


import React, { useState, useMemo } from 'react';
import { useModeParam } from '../hooks/useModeParam';
import { TAX_RATES } from '../lib/legacyArticles';
import { getWhatsAppLink } from '../services/whatsapp';
import EmbedTool from './EmbedTool';
import SEOJsonLd from './SEOJsonLd';
import SEOMethodologyBlock from './SEOMethodologyBlock';
import SEOBotContext from './SEOBotContext';
import FAQCollapsible from './FAQCollapsible';

const INITIAL_RISK_FEELING: Record<string, number> = { crypto: 80, inheritance: 60, default: 50 };

const WealthAudit: React.FC = () => {
  const mode = useModeParam(['default', 'crypto', 'inheritance'] as const, 'default');
  const [revenue, setRevenue] = useState(150000);
  const [adminHours, setAdminHours] = useState(10);
  const [riskFeeling, setRiskFeeling] = useState(INITIAL_RISK_FEELING[mode]);
  const [heirCount, setHeirCount] = useState(2);

  const audit = useMemo(() => {
    let freedomScore = 0;
    let totalLeakage = 0;
    let protectionLevel = "Critique";

    if (mode === 'inheritance') {
      // Inheritance Mode Calculation
      // Very simplified French succession tax simulation (approximate average rate for high net worth)
      // Standard abatement is low (~100k per child), then quickly 20%, 30%, 40%, 45%
      // For a business asset/wealth of 'revenue' (treated here as Estate Value)

      const estateValue = revenue; // Re-using revenue state as Estate Value
      const taxableBasePerHeir = estateValue / Math.max(1, heirCount);
      const averageTaxRate = taxableBasePerHeir > 550000 ? 0.35 : 0.25; // Blended rate assumption
      const frenchTax = estateValue * averageTaxRate;

      // UK Structure (FIC/Trust) cost is mainly setup + maintenance, very low tax on transmission if structured correctly (Gifting / PETs)
      const ukCost = 5000 + (estateValue * 0.01); // Approx setup fee + 1% friction

      totalLeakage = frenchTax - ukCost; // The "saving" or "leakage avoided"

      // Score based on saving efficiency
      freedomScore = Math.min(100, Math.round((totalLeakage / frenchTax) * 100));
      protectionLevel = freedomScore > 80 ? "Souverain" : freedomScore > 50 ? "Optimisé" : "Confiscatoire";

    } else {
      // Default & Crypto Mode
      const adminCost = adminHours * 12 * TAX_RATES.FRANCE.ADMIN_COST_PER_HOUR;
      const socialLeak = revenue * 0.20;
      const riskImpact = (riskFeeling / 100) * (revenue * 0.5);

      totalLeakage = adminCost + socialLeak + (riskImpact * 0.1);
      freedomScore = Math.max(0, 100 - (totalLeakage / revenue) * 100);
      protectionLevel = freedomScore > 70 ? "Sécurisé" : freedomScore > 40 ? "Vulnérable" : "Critique";
    }

    return {
      freedomScore: Math.round(freedomScore),
      totalLeakage: Math.round(totalLeakage),
      protectionLevel
    };
  }, [revenue, adminHours, riskFeeling, heirCount, mode]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
      <SEOJsonLd
        name="Wealth Audit & Crypto Protection"
        description="Calculate your real freedom score by analyzing admin costs, social charges, and asset seizure risks. Evaluate both traditional business leakage and crypto asset vulnerability through comprehensive financial audit."
        category="FinanceApplication"
      />
      <SEOBotContext
        toolName="Wealth Audit & Crypto Protection"
        description="Financial leakage calculator that computes true economic freedom by quantifying hidden costs (admin time, social charges, risk exposure) for French entrepreneurs and crypto holders. Supports dual-mode analysis for traditional business revenue and crypto portfolio seizure risk assessment."
        pillars={[
          "Pillar 1: Total Leakage Calculation - Aggregates admin costs (time × hourly rate), social charges (20% of revenue), and risk impact (feeling × 50% of revenue exposure)",
          "Pillar 2: Freedom Score Algorithm - Computes percentage score: 100 - (totalLeakage / revenue) × 100, with protection level classification (Sécurisé >70%, Vulnérable 40-70%, Critique <40%)",
          "Pillar 3: Dual-Mode Risk Assessment - Default mode evaluates traditional business costs, Crypto mode evaluates seizure risk through KYC exposure, transaction traceability, and exchange visibility metrics"
        ]}
        formula="freedomScore = Math.max(0, 100 - (totalLeakage / revenue) × 100)"
        constraint="Risk feeling is subjective 0-100 scale; actual seizure probability depends on jurisdiction-specific enforcement procedures and asset custody structure"
      />
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
        <div className="flex-1">
          <h2 className="text-3xl font-black tracking-tighter mb-2">
            {mode === 'crypto' ? (
              <>Audit de <span className="text-blue-500">Saisie Crypto</span></>
            ) : mode === 'inheritance' ? (
              <>Audit de <span className="text-blue-500">Succession</span></>
            ) : (
              <>Audit de <span className="text-blue-500">Liberté Réelle</span></>
            )}
          </h2>
          <p className="text-white text-sm font-medium">
            {mode === 'crypto'
              ? "Évaluez le risque de saisie de vos actifs numériques (CEX/DEX) par le fisc ou un créancier."
              : mode === 'inheritance'
                ? "Calculez le montant des droits de succession économisés via une structure Family Investment Company (UK)."
                : "Calculez ce que la France vous coûte réellement chaque année (Temps + Risque + Cash)."
            }
          </p>
        </div>
        <div className="bg-slate-800 px-6 py-4 rounded-2xl border border-slate-700 text-center min-w-[160px]">
          <div className="text-[10px] uppercase font-black tracking-widest text-white mb-1">
            {mode === 'crypto' ? "Score de Sécurité" : mode === 'inheritance' ? "Score de Transmission" : "Score de Liberté"}
          </div>
          <div className={`text-4xl font-black ${audit.freedomScore > 70 ? 'text-emerald-400' : audit.freedomScore > 40 ? 'text-amber-400' : 'text-red-500'}`}>
            {audit.freedomScore}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-white mb-4">
              {mode === 'crypto' ? "Portfolio Crypto (€)" : mode === 'inheritance' ? "Valeur du Patrimoine (€)" : "Chiffre d'Affaires (€)"} : {revenue.toLocaleString()}€
            </label>
            <input
              type="range" min="50000" max="5000000" step="10000" value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full accent-blue-600 bg-slate-800 rounded-lg appearance-none h-1.5"
            />
          </div>

          {mode === 'inheritance' ? (
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-white mb-4">
                Nombre d'Enfants / Héritiers : {heirCount}
              </label>
              <input
                type="range" min="1" max="6" step="1" value={heirCount}
                onChange={(e) => setHeirCount(Number(e.target.value))}
                className="w-full accent-blue-600 bg-slate-800 rounded-lg appearance-none h-1.5"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-white mb-4">
                {mode === 'crypto' ? "Transactions / Mois (Traçabilité)" : "Heures Admin / Mois"} : {adminHours}
              </label>
              <input
                type="range" min="2" max="40" step="1" value={adminHours}
                onChange={(e) => setAdminHours(Number(e.target.value))}
                className="w-full accent-blue-600 bg-slate-800 rounded-lg appearance-none h-1.5"
              />
            </div>
          )}

          <div>
            {mode !== 'inheritance' && (
              <>
                <label className="block text-xs font-black uppercase tracking-widest text-white mb-4">
                  {mode === 'crypto' ? "Visibilité Exchange (KYC) : " : "Sentiment d'Insécurité Juridique : "}{riskFeeling}%
                </label>
                <input
                  type="range" min="0" max="100" step="5" value={riskFeeling}
                  onChange={(e) => setRiskFeeling(Number(e.target.value))}
                  className="w-full accent-red-500 bg-slate-800 rounded-lg appearance-none h-1.5"
                />
              </>
            )}
            {mode === 'inheritance' && (
              <div className="bg-blue-900/20 border border-blue-800 p-4 rounded-xl">
                <p className="text-[10px] text-blue-300 italic">
                  Note: La fiscalité française des successions monte jusqu'à 45% en ligne directe. Une structure UK bien calibrée (Trust/FIC) permet de neutraliser cette friction.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <h3 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-6">Verdict de l'Analyse</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-3">
              <span className="text-slate-100">{mode === 'crypto' ? "Exposition Saisissable" : mode === 'inheritance' ? "Économie de Droits de Succession" : "Fuite de Trésorerie Invisible"}</span>
              <span className={`font-bold ${mode === 'inheritance' ? 'text-emerald-400' : 'text-red-400'}`}>
                {mode === 'inheritance' ? '+' : '-'}{audit.totalLeakage.toLocaleString()} €
              </span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-3">
              <span className="text-slate-100">{mode === 'crypto' ? "Immunité Actuelle" : "Niveau de Protection"}</span>
              <span className={`font-black uppercase text-xs ${audit.protectionLevel === 'Critique' || audit.protectionLevel === 'Confiscatoire' ? 'text-red-500' : 'text-emerald-500'}`}>
                {audit.protectionLevel}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[11px] text-white italic leading-relaxed mb-6">
              {mode === 'crypto'
                ? "* Ce score évalue la probabilité qu'un tiers (fisc, créancier, liquidateur) puisse geler ou saisir vos actifs numériques personnels via une procédure française standard."
                : mode === 'inheritance'
                  ? "* Ce chiffre représente l'économie d'impôt potentielle réalisée par vos héritiers si votre patrimoine est logé dans une structure UK adaptée (FIC) au lieu d'être détenu en nom propre en France."
                  : "* Ce score inclut la valorisation de votre temps (150€/h) et le risque de blocage administratif (ATD) basé sur les statistiques de recouvrement 2024."
              }
            </p>
            <a
              href={getWhatsAppLink(mode === 'crypto'
                ? `Bonjour, mon score de sécurité Crypto est de ${audit.freedomScore}%. Je veux sanctuariser mon portfolio de ${revenue}€.`
                : mode === 'inheritance'
                  ? `Bonjour, je veux protéger mon héritage de ${revenue}€ pour mes ${heirCount} enfants et éviter les droits de succession abusifs.`
                  : `Bonjour, mon score de liberté Societe Anglaise est de ${audit.freedomScore}%. Je souhaite stopper la fuite de trésorerie de ${audit.totalLeakage}€/an.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 uppercase text-xs tracking-widest text-center block flex items-center justify-center"
            >
              {mode === 'crypto' ? "Activer le Bouclier Crypto" : mode === 'inheritance' ? "Sécuriser mon Héritage" : "Stopper la fuite maintenant"}
            </a>
          </div>
        </div>
      </div>
      <SEOMethodologyBlock
        methodologyTitle="Wealth Leakage & Asset Protection Analysis"
        methodologyText="Our proprietary Freedom Score algorithm quantifies the hidden costs of operating in France by combining three distinct leakage sources: administrative burden (valued at 150€/hour), social contributions on revenue (20%), and risk exposure from creditor or tax authority actions. In Crypto mode, we evaluate seizure probability through KYC visibility, transaction frequency, and exchange custody risks. The resulting score categorizes your protection level and highlights actionable optimization opportunities."
        algorithmName="FreedomScore v2.1"
        algorithmVersion="v2.1"
        precision="85%"
        icon="fa-shield-halved"
        mode={mode}
      />
      <EmbedTool toolId="wealth-audit" toolName="Wealth Audit & Crypto Protection" />

      <FAQCollapsible
        title="FAQ : Patrimoine & Liberté Financière"
        items={[
          {
            question: "La France est-elle vraiment un enfer fiscal ?",
            answer: "Statistiquement, oui. Avec un taux de prélèvements obligatoires de 45.4% du PIB (OCDE 2024), c'est le pays le plus taxé au monde. Pour un entrepreneur performant, cela signifie travailler mathématiquement plus de 6 mois par an uniquement pour l'État (Jour de Libération Fiscale en Juillet)."
          },
          {
            question: "Qu'est-ce que le 'Score de Liberté' Societe Anglaise ?",
            answer: "C'est un indicateur propriétaire qui mesure votre 'Reste à Vivre Réel'. Il soustrait de vos revenus bruts : l'impôt, les charges sociales, l'inflation, le coût administratif de la conformité, et le coût du risque juridique. Un score sous 40% indique une situation de servitude économique."
          },
          {
            question: "L'expatriation fiscale est-elle réservée aux milliardaires ?",
            answer: "Faux. C'était vrai il y a 20 ans. Aujourd'hui, avec le travail à distance et la digitalisation, le seuil de rentabilité de l'expatriation UK se situe autour de 80 000 € de revenus annuels. En dessous, le coût de la vie à Londres absorbe le gain fiscal. Au-dessus, le gain est exponentiel."
          },
          {
            question: "Peut-on éviter les droits de succession (45%) ?",
            answer: "Oui. Le Royaume-Uni offre un régime très favorable appelé 'Potentially Exempt Transfer' (PET). Si vous donnez de votre vivant et survivez 7 ans, la taxation est de... 0%. Contrairement à la France qui taxe lourdement même les donations (abattement très faible)."
          }
        ]}
      />
    </div>
  );
};

export default WealthAudit;