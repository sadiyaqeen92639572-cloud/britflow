"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingDown, AlertCircle, Info } from 'lucide-react';
import EmbedTool from '../EmbedTool';
import SEOJsonLd from '../SEOJsonLd';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import FAQCollapsible from '../FAQCollapsible';
import SEOBotContext from '../SEOBotContext';

interface LiquidationCostCalculatorProps {
  mode?: 'default' | 'embed';
  onLoad?: () => void;
}

interface LiquidationResult {
  totalCost: number;
  breakdown: {
    liquidator: number;
    publication: number;
    taxes: number;
    accounting: number;
    fees: number;
  };
  timeline: string;
}

const LiquidationCostCalculator: React.FC<LiquidationCostCalculatorProps> = ({ mode = 'default', onLoad }) => {
  React.useEffect(() => {
    onLoad?.();
  }, [onLoad]);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33600000000';
  const [capital, setCapital] = useState<number>(50000);
  const [duration, setDuration] = useState<number>(3);
  const [hasLiability, setHasLiability] = useState<boolean>(false);
  const [country, setCountry] = useState<'france' | 'uk'>('france');

  const calculateFrance = (cap: number, dur: number, hasLia: boolean): LiquidationResult => {
    const liquidator = hasLia ? 3500 : 2000;
    const publication = 300;
    const longTerm = dur >= 2;
    const taxRate = longTerm ? 0.192 + 0.172 : 0.30; // 19.2% + 17.2% PS or 30% flat tax
    const taxes = cap * taxRate;
    const accounting = hasLia ? 1500 : 800;
    const fees = 50;
    const totalCost = liquidator + publication + taxes + accounting + fees;

    return {
      totalCost,
      breakdown: {
        liquidator,
        publication,
        taxes,
        accounting,
        fees,
      },
      timeline: hasLia ? '6-9 mois' : '3-6 mois',
    };
  };

  const calculateUK = (cap: number, dur: number, hasLia: boolean): LiquidationResult => {
    const liquidator = hasLia ? 1200 : 600;
    const publication = 8; // £
    const entrepreneursRelief = dur >= 2 && cap <= 1000000;
    const taxRate = entrepreneursRelief ? 0.10 : 0.20;
    const taxes = cap * taxRate;
    const accounting = hasLia ? 400 : 200;
    const fees = 8; // £
    const totalCost = liquidator + publication + taxes + accounting + fees;

    return {
      totalCost,
      breakdown: {
        liquidator,
        publication,
        taxes,
        accounting,
        fees,
      },
      timeline: hasLia ? '3-4 mois' : '2-3 mois',
    };
  };

  const franceResult = calculateFrance(capital, duration, hasLiability);
  const ukResult = calculateUK(capital, duration, hasLiability);

  const savings = franceResult.totalCost - ukResult.totalCost;
  const savingsPercentage = (savings / franceResult.totalCost) * 100;

  const getWhatsAppMessage = () => {
    return encodeURIComponent(
      `Bonjour, j'ai calculé le coût de ma liquidation. Comment éviter de tout perdre ?`
    );
  };


  return (
    <div className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 ${mode === 'embed' ? '' : 'shadow-2xl'}`}>
      {mode === 'default' && (
        <>
          <SEOJsonLd
            name="Liquidation Cost Calculator France vs UK"
            description="Simulateur de coût de liquidation amiable ou judiciaire. Comparez les frais de greffe (France) vs dissolution administrative (UK)."
            category="FinanceApplication"
          />
          <SEOBotContext
            toolName="Liquidation Cost Calculator"
            description="Cost analysis tool comparing the financial burden of company dissolution in France vs UK. Calculates total liquidation costs including liquidator fees, publication costs, taxes on liquidation surplus (Boni de Liquidation), and administrative friction."
            pillars={[
              "Pillar 1: Procedural Cost Analysis (Liquidator/Greffe vs Companies House £10)",
              "Pillar 2: Tax on Surplus (30% Flat Tax FR vs 10% Entrepreneurs Relief UK)",
              "Pillar 3: Time-to-Close (6-9 months FR vs 3 months UK)"
            ]}
            formula="TotalCost = LiquidatorFees + LegalPubs + TaxOnSurplus"
            constraint="Does not substitute for a formal quote from a judicial liquidator."
            logicalFaqs={[
              {
                q: "Combien coûte la fermeture d'une SASU en 2025 ?",
                a: "Le coût total oscille entre 1500€ et 3000€ incluant les annonces légales, les frais de greffe, le bilan de liquidation et les éventuelles taxes de radiation."
              },
              {
                q: "Pourquoi est-ce moins cher de fermer une boîte au UK ?",
                a: "La procédure de 'Strike-off' au Royaume-Uni est digitale et coûte moins de £50 si la société est saine. Il n'y a pas d'annonce légale coûteuse obligatoire."
              }
            ]}
          />
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center">
              <Calculator className="text-red-500" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white mb-1">Liquidation Cost Calculator</h2>
              <p className="text-slate-400 text-sm">
                Comparaison des coûts de fermeture : France vs UK
              </p>
            </div>
          </div>
        </>
      )}

      {/* Input Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Info size={20} />
          Paramètres de Votre Entreprise
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Capital */}
          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-2">
              Capital Social (€)
            </label>
            <input
              type="range"
              min="10000"
              max="500000"
              step="10000"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-slate-500">10k€</span>
              <span className="text-xl font-black text-white">
                {capital.toLocaleString('fr-FR')}€
              </span>
              <span className="text-xs text-slate-500">500k€</span>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-2">
              Durée d'Activité (années)
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={duration}
              onChange={(e) => setDuration(Math.max(1, Number(e.target.value)))}
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500"
            />
            <div className="text-xs text-slate-500 mt-2">
              {duration >= 2 ? (
                <span className="text-emerald-400">✅ Long terme (réduit les impôts)</span>
              ) : (
                <span className="text-orange-400">⚠️ Court terme (taxation plus élevée)</span>
              )}
            </div>
          </div>

          {/* Liability */}
          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-2">
              Passif à Liquidider
            </label>
            <button
              onClick={() => setHasLiability(!hasLiability)}
              className={`w-full py-3 rounded-xl font-bold transition-all ${hasLiability
                ? 'bg-red-500 text-white'
                : 'bg-emerald-500 text-white'
                }`}
            >
              {hasLiability ? '⚠️ Oui, avec passif' : '✅ Non, sans passif'}
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* France Result */}
        <div className={`rounded-2xl border-2 transition-all ${country === 'france'
          ? 'bg-blue-500/10 border-blue-500/50'
          : 'bg-slate-800/50 border-slate-700'
          }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🇫🇷</span> France (SASU)
              </h4>
              <span className="text-2xl">📜</span>
            </div>

            <div className="space-y-4">
              {/* Total */}
              <div className="bg-slate-900 rounded-xl p-4 text-center">
                <div className="text-xs text-slate-500 mb-1">Coût Total</div>
                <div className="text-3xl font-black text-red-400">
                  {franceResult.totalCost.toLocaleString('fr-FR')}€
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  ~{((franceResult.totalCost / capital) * 100).toFixed(0)}% du capital
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Liquidateur</span>
                  <span className="font-bold text-white">
                    {franceResult.breakdown.liquidator.toLocaleString('fr-FR')}€
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Publication</span>
                  <span className="font-bold text-white">
                    {franceResult.breakdown.publication.toLocaleString('fr-FR')}€
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Fiscalité +values</span>
                  <span className="font-bold text-red-400">
                    -{franceResult.breakdown.taxes.toLocaleString('fr-FR')}€
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Comptable</span>
                  <span className="font-bold text-white">
                    {franceResult.breakdown.accounting.toLocaleString('fr-FR')}€
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Frais greffe</span>
                  <span className="font-bold text-white">
                    {franceResult.breakdown.fees.toLocaleString('fr-FR')}€
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-blue-500/20 rounded-xl p-4 text-center">
                <div className="text-xs text-slate-400 mb-1">Délai de fermeture</div>
                <div className="text-lg font-bold text-blue-400">{franceResult.timeline}</div>
              </div>
            </div>
          </div>
        </div>

        {/* UK Result */}
        <div className={`rounded-2xl border-2 transition-all ${country === 'uk'
          ? 'bg-emerald-500/10 border-emerald-500/50'
          : 'bg-slate-800/50 border-slate-700'
          }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🇬🇧</span> UK (Limited)
              </h4>
              <span className="text-2xl">🎯</span>
            </div>

            <div className="space-y-4">
              {/* Total */}
              <div className="bg-slate-900 rounded-xl p-4 text-center">
                <div className="text-xs text-slate-500 mb-1">Coût Total</div>
                <div className="text-3xl font-black text-emerald-400">
                  {ukResult.totalCost.toLocaleString('fr-FR')}€
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  ~{((ukResult.totalCost / capital) * 100).toFixed(0)}% du capital
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Liquidateur</span>
                  <span className="font-bold text-white">
                    {ukResult.breakdown.liquidator.toLocaleString('fr-FR')}€
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Dissolution</span>
                  <span className="font-bold text-white">
                    {ukResult.breakdown.publication}£
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Fiscalité +values</span>
                  <span className="font-bold text-emerald-400">
                    {ukResult.breakdown.taxes.toLocaleString('fr-FR')}€
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Comptable</span>
                  <span className="font-bold text-white">
                    {ukResult.breakdown.accounting.toLocaleString('fr-FR')}€
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Companies House</span>
                  <span className="font-bold text-white">
                    {ukResult.breakdown.fees}£
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-emerald-500/20 rounded-xl p-4 text-center">
                <div className="text-xs text-slate-400 mb-1">Délai de fermeture</div>
                <div className="text-lg font-bold text-emerald-400">{ukResult.timeline}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Highlight */}
      {mode === 'default' && (
        <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border-2 border-emerald-500/30 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center">
                <TrendingDown className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Économie UK</h3>
                <p className="text-slate-400 text-sm">
                  En choisissant une Limited plutôt qu'une SASU
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-4xl font-black text-emerald-400">
                {savings.toLocaleString('fr-FR')}€
              </div>
              <div className="text-sm text-emerald-400/80 font-bold">
                {savingsPercentage.toFixed(0)}% d'économie
              </div>
            </div>
          </div>

          {duration >= 2 && capital <= 100000 && (
            <div className="mt-4 p-3 bg-emerald-500/20 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <AlertCircle size={16} />
                <span className="font-bold">
                  Entrepreneurs' Relief applicable au UK : 10% de taxe sur les plus-values (vs 30% en France)
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Key Insights */}
      {mode === 'default' && (
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Info size={20} />
            Points Clés
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
              <div className="text-slate-300">
                <span className="text-white font-bold">Entrepreneurs' Relief :</span>
                Au UK, 10% de taxe jusqu'à 1M£ de plus-values (vs 30% flat tax en France)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
              <div className="text-slate-300">
                <span className="text-white font-bold">Frais réduits :</span>
                Dissolution UK : 8£ vs greffe France : 50€ + 200-400€ de publication
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
              <div className="text-slate-300">
                <span className="text-white font-bold">Liquidateur :</span>
                3-5x moins cher au UK pour les mêmes services
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
              <div className="text-slate-300">
                <span className="text-white font-bold">Délai :</span>
                2-3x plus rapide au UK pour une fermeture complète
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sources */}
      {mode === 'default' && (
        <div className="pt-6 border-t border-slate-700">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="text-[10px] text-slate-500">
              <div className="font-bold mb-1">Sources :</div>
              <div>Greffe de Paris - Frais de liquidation</div>
              <div>Companies House - Dissolution fees</div>
              <div>Ordonnance 2021-1190 - Montants liquidation</div>
              <div>HMRC - Entrepreneurs' Relief</div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl font-bold hover:from-red-500 hover:to-red-400 transition-all shadow-lg hover:shadow-red-500/25"
            >
              <span>💬</span>
              <span>Conseil Gratuit WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Embed Code */}
      {mode === 'default' && (
        <EmbedTool toolId="liquidation-cost" toolName="Liquidation Cost Calculator" />
      )}

      {/* SEO Layer C (Replaced by Components) */}
      {mode === 'default' && (
        <>
          <SEOMethodologyBlock
            methodologyTitle="Analyse Comparative : Coûts de Liquidation 2025"
            methodologyText="Le 'Liquidation Cost Calculator' aggrège les coûts réglementés (Greffe du Tribunal de Commerce, Bodacc, Annonces Légales) et les honoraires moyens de liquidateurs amiables pour estimer le coût total de fermeture d'une SASU. Il confronte ces données au processus de 'Voluntary Strike-off' britannique (Formulaire DS01), démontrant un écart de coût de x10 à x20 en défaveur de la France, exacerbé par la taxation du Bon de Liquidation (30% vs 10% avec BADR/Entrepreneurs Relief)."
            algorithmName="CloseCost v2.0"
            algorithmVersion="v2.0"
            precision="90%"
            icon="fa-door-closed"
          />

          <FAQCollapsible
            title="Liquidation & Dissolution : Vos Questions"
            items={[
              {
                question: "Quelle est la différence entre dissolution et liquidation ?",
                answer: "La dissolution est l'acte de décès politique de l'entreprise. La liquidation est la phase de vente des actifs et paiement des dettes avant la radiation finale."
              },
              {
                question: "Dissoudre sa boîte au UK prend-il du temps ?",
                answer: "Le processus prend environ 2 à 3 mois pour être définitif, mais l'essentiel de la procédure est instantané lors de l'envoi du formulaire DS01."
              }
            ]}
          />
        </>
      )}
    </div>
  );
};

export default LiquidationCostCalculator;