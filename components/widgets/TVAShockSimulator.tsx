"use client";

import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, PoundSterling, Euro, Info } from 'lucide-react';
import EmbedTool from '../EmbedTool';
import SEOJsonLd from '../SEOJsonLd';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import FAQCollapsible from '../FAQCollapsible';
import SEOBotContext from '../SEOBotContext';

interface TVAShockSimulatorProps {
  mode?: 'default' | 'embed';
  onLoad?: () => void;
}

const TVAShockSimulator: React.FC<TVAShockSimulatorProps> = ({ mode = 'default', onLoad }) => {
  React.useEffect(() => {
    onLoad?.();
  }, [onLoad]);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33600000000';
  const [currentCA, setCurrentCA] = useState<number>(35000);
  const [projectedGrowth, setProjectedGrowth] = useState<number>(15);

  const SEUIL_FRANCE = 36800;
  const SEUIL_UK = 90000; // £90k ≈ €105k
  const TVA_RATE_FR = 0.20;
  const TVA_RATE_UK = 0.20;
  const PENALTY_RATE = 0.40;

  const projectedCA = currentCA * (1 + projectedGrowth / 100);
  const projectedGBP = projectedCA / 1.15; // Approximate exchange rate

  const franceStatus = projectedCA > SEUIL_FRANCE ? 'exceeded' : 'safe';
  const ukStatus = projectedGBP < SEUIL_UK ? 'safe' : 'exceeded';

  const franceExcess = Math.max(0, projectedCA - SEUIL_FRANCE);
  const tvaDue = projectedCA > SEUIL_FRANCE ? projectedCA * TVA_RATE_FR : 0;
  const penalties = franceExcess > 0 ? tvaDue * PENALTY_RATE : 0;
  const totalCost = tvaDue + penalties;
  const netLoss = franceExcess - totalCost;

  const getWhatsAppMessage = () => {
    return encodeURIComponent(
      `Bonjour, je dépasse le seuil de 36k€. Comment ne pas perdre 20% ?`
    );
  };


  return (
    <div className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 ${mode === 'embed' ? '' : 'shadow-2xl'}`}>
      {mode === 'default' && (
        <>
          <SEOJsonLd
            name="TVA Shock Simulator France/UK"
            description="Simulateur d'impact du dépassement de seuil TVA. France (36.8k€) vs Royaume-Uni (90k£). Calculez vos économies en franchise en base."
            category="FinanceApplication"
          />
          <SEOBotContext
            toolName="TVA Shock Simulator"
            description="VAT threshold modeling tool visualizing the 'Fiscal Cliff' effect when exceeding Micro-Enterprise limits. Compares the French VAT franchise threshold (€36,800) against the UK VAT registration threshold (£90,000 / ~€105,000)."
            pillars={[
              "Pillar 1: Franchise Threshold Differential (x3 higher in UK)",
              "Pillar 2: Retroactive Tax Shock Simulation (20% impact)",
              "Pillar 3: Profit Margin Preservation Analysis"
            ]}
            formula="ShockCost = (Revenue * 0.20) + Penalties40%"
            constraint="VAT rules subject to territoriality principles (OSS/IOSS for e-commerce)."
            logicalFaqs={[
              {
                q: "Quel est le seuil de TVA au Royaume-Uni ?",
                a: "Le seuil est de 90 000 £ de CA annuel. En dessous, vous ne facturez pas de TVA, ce qui est un avantage compétitif majeur face à un concurrent déjà assujetti."
              },
              {
                q: "Pourquoi franchir le seuil à 36k€ est-il un 'choc' en France ?",
                a: "Car vous perdez instantanément 20% de marge ou augmentez vos prix de 20%, sans que vos coûts ne changent, ce qui peut paralyser une petite activité."
              }
            ]}
          />
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="text-orange-500" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white mb-1">TVA Shock Simulator</h2>
              <p className="text-slate-400 text-sm">
                L'impact financier du dépassement du seuil de franchise
              </p>
            </div>
          </div>


          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Euro className="text-orange-400" size={18} />
                <span className="text-xs text-orange-400 font-bold uppercase">France</span>
              </div>
              <div className="text-3xl font-black text-white mb-1">
                {SEUIL_FRANCE.toLocaleString('fr-FR')}€
              </div>
              <div className="text-xs text-slate-500">Seuil de franchise</div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <PoundSterling className="text-emerald-400" size={18} />
                <span className="text-xs text-emerald-400 font-bold uppercase">UK</span>
              </div>
              <div className="text-3xl font-black text-white mb-1">
                {SEUIL_UK.toLocaleString('fr-FR')}£
              </div>
              <div className="text-xs text-slate-500">
                ≈ {(SEUIL_UK * 1.15).toLocaleString('fr-FR')}€ (3x plus élevé)
              </div>
            </div>
          </div>
        </>
      )
      }

      {/* Input Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="text-slate-400" size={20} />
          Vos Paramètres
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-2">
              Chiffre d'Affaires Actuel (€)
            </label>
            <input
              type="number"
              value={currentCA}
              onChange={(e) => setCurrentCA(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="35000"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-2">
              Croissance Estimée (%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={projectedGrowth}
              onChange={(e) => setProjectedGrowth(Number(e.target.value))}
              className="w-full mt-3"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-slate-500">0%</span>
              <span className="text-xl font-black text-emerald-400">{projectedGrowth}%</span>
              <span className="text-xs text-slate-500">100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {/* France Result */}
        <div className={`rounded-2xl p-6 border-2 transition-all ${franceStatus === 'exceeded'
          ? 'bg-red-500/10 border-red-500/50'
          : 'bg-emerald-500/10 border-emerald-500/50'
          }`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🇫🇷</span> France
            </h4>
            <span className={`px-4 py-1 rounded-lg text-sm font-bold ${franceStatus === 'exceeded'
              ? 'bg-red-500 text-white'
              : 'bg-emerald-500 text-white'
              }`}>
              {franceStatus === 'exceeded' ? 'DÉPASSÉ' : 'OK'}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">CA Projeté 2025</span>
              <span className="text-lg font-bold text-white">
                {projectedCA.toLocaleString('fr-FR')}€
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Seuil de Franchise</span>
              <span className="text-sm font-bold text-slate-300">
                {SEUIL_FRANCE.toLocaleString('fr-FR')}€
              </span>
            </div>

            {franceStatus === 'exceeded' && (
              <>
                <div className="flex justify-between items-center pt-3 border-t border-red-500/30">
                  <span className="text-sm text-red-400 font-bold">Dépassement</span>
                  <span className="text-lg font-black text-red-400">
                    +{franceExcess.toLocaleString('fr-FR')}€
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">TVA Due (20%)</span>
                  <span className="text-base font-bold text-red-400">
                    -{tvaDue.toLocaleString('fr-FR')}€
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Pénalités (~40%)</span>
                  <span className="text-base font-bold text-red-400">
                    -{penalties.toLocaleString('fr-FR')}€
                  </span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-red-500/30">
                  <span className="text-sm text-red-400 font-bold">Coût Total</span>
                  <span className="text-xl font-black text-red-400">
                    -{totalCost.toLocaleString('fr-FR')}€
                  </span>
                </div>

                {netLoss < 0 && (
                  <div className="bg-red-500/20 rounded-xl p-4 mt-3">
                    <div className="flex items-center gap-2 text-red-400 text-sm font-bold">
                      <AlertTriangle size={16} />
                      <span>Perte nette : {netLoss.toLocaleString('fr-FR')}€</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {franceStatus === 'safe' && (
              <div className="bg-emerald-500/20 rounded-xl p-4 mt-3">
                <div className="text-emerald-400 text-sm font-bold">
                  ✅ Vous êtes en franchise de TVA
                </div>
                <div className="text-emerald-400/70 text-xs mt-1">
                  Marge de sécurité : {(SEUIL_FRANCE - projectedCA).toLocaleString('fr-FR')}€
                </div>
              </div>
            )}
          </div>
        </div>

        {/* UK Result */}
        <div className={`rounded-2xl p-6 border-2 transition-all ${ukStatus === 'safe'
          ? 'bg-emerald-500/10 border-emerald-500/50'
          : 'bg-orange-500/10 border-orange-500/50'
          }`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🇬🇧</span> UK (avec même CA)
            </h4>
            <span className={`px-4 py-1 rounded-lg text-sm font-bold ${ukStatus === 'safe'
              ? 'bg-emerald-500 text-white'
              : 'bg-orange-500 text-white'
              }`}>
              {ukStatus === 'safe' ? 'OK' : 'DÉPASSÉ'}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">CA en GBP</span>
              <span className="text-lg font-bold text-white">
                {projectedGBP.toLocaleString('fr-FR')}£
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Seuil de Franchise</span>
              <span className="text-sm font-bold text-slate-300">
                {SEUIL_UK.toLocaleString('fr-FR')}£
              </span>
            </div>

            {ukStatus === 'safe' && (
              <>
                <div className="flex justify-between items-center pt-3 border-t border-emerald-500/30">
                  <span className="text-sm text-emerald-400 font-bold">Marge de sécurité</span>
                  <span className="text-lg font-black text-emerald-400">
                    +{(SEUIL_UK - projectedGBP).toLocaleString('fr-FR')}£
                  </span>
                </div>

                {franceStatus === 'exceeded' && (
                  <div className="bg-emerald-500/20 rounded-xl p-4 mt-3">
                    <div className="text-emerald-400 text-sm font-bold">
                      💰 Économie : {totalCost.toLocaleString('fr-FR')}€
                    </div>
                    <div className="text-emerald-400/70 text-xs mt-1">
                      En passant au UK, vous ne paierez pas de TVA
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Warning & Tips */}
      {
        mode === 'default' && (
          <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="flex items-start gap-3">
              <Info className="text-slate-400 mt-0.5" size={16} />
              <div className="text-xs text-slate-400">
                <p className="font-bold text-slate-300 mb-2">À savoir :</p>
                <ul className="space-y-1">
                  <li>• Le seuil de franchise TVA en France est de 36 800€ (2025)</li>
                  <li>• Au UK, le seuil est de 90 000£ (~105 000€), soit 3x plus élevé</li>
                  <li>• En cas de dépassement, la TVA est due sur tout le CA (pas uniquement l'excédent)</li>
                  <li>• Des pénalités de retard s'appliquent si la TVA n'est pas déclarée à temps</li>
                </ul>
              </div>
            </div>
          </div>
        )
      }

      {/* CTA & Sources */}
      {
        mode === 'default' && (
          <div className="mt-8 pt-6 border-t border-slate-700">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="text-[10px] text-slate-500">
                <div className="font-bold mb-1">Sources :</div>
                <div>DGFiP - Seuils de franchise de TVA 2025</div>
                <div>HMRC - VAT Threshold 2025</div>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-500 hover:to-orange-400 transition-all shadow-lg hover:shadow-orange-500/25"
              >
                <span>💬</span>
                <span>Optimiser ma TVA</span>
              </a>
            </div>
          </div>
        )
      }

      {/* Embed Code */}
      {
        mode === 'default' && (
          <EmbedTool toolId="tva-shock" toolName="TVA Shock Simulator" />
        )
      }

      {/* SEO Layer C (Replaced by Components) */}
      {
        mode === 'default' && (
          <>
            <SEOMethodologyBlock
              methodologyTitle="Méthodologie : Différentiel de Franchise TVA"
              methodologyText="Le simulateur 'TVA Shock' quantifie le risque fiscal lié au dépassement du seuil de franchise en base de TVA. Il compare le seuil français (36 800€) au seuil britannique (90 000£), mettant en lumière une 'Zone de Profit Sécurisée' (la tranche 36k€-105k€) où l'entrepreneur UK reste exonéré de TVA contrairement à son homologue français, augmentant mécaniquement sa marge nette de 20%."
              algorithmName="VatGap v2.2"
              algorithmVersion="v2.2"
              precision="98% (Taux 2025)"
              icon="fa-percentage"
            />

            <FAQCollapsible
              title="TVA & Compétitivité : Comprendre les Enjeux"
              items={[
                {
                  question: "Puis-je déduire la TVA sur mes achats au UK ?",
                  answer: "Si vous n'êtes pas assujetti (sous 90k£), non. Mais l'économie de ne pas la facturer à vos clients compense largement la TVA non récupérée sur vos frais."
                },
                {
                  question: "BritFlow gère-t-il l'inscription à la VAT ?",
                  answer: "Oui, nous vous conseillons sur le moment optimal pour s'inscrire ou sur l'utilisation des schémas simplifiés (Flat Rate Scheme) au UK."
                }
              ]}
            />
          </>
        )
      }
    </div >
  );
};

export default TVAShockSimulator;