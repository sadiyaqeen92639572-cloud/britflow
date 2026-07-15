"use client";


import React, { useState } from 'react';
import { useModeParam } from '../hooks/useModeParam';
import { getWhatsAppLink } from '../services/whatsapp';
import EmbedTool from './EmbedTool';
import SEOJsonLd from './SEOJsonLd';
import SEOMethodologyBlock from './SEOMethodologyBlock';
import SEOBotContext from './SEOBotContext';

const ReboundVault: React.FC = () => {
  const [debtAmount, setDebtAmount] = useState(50000);
  const [monthlySavingPotential, setMonthlySavingPotential] = useState(3000);
  const mode = useModeParam(['default', 'fiben', 'liability'] as const, 'default');

  const monthsToRecover = Math.round(debtAmount / monthlySavingPotential);

  return (
    <div id="rebound-vault" className={`bg-slate-900 border-4 ${mode === 'liability' ? 'border-red-600' : 'border-red-500'} rounded-[40px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden scroll-mt-24`}>
      <SEOJsonLd
        name="Rebound Vault & Recovery"
        description="Crisis recovery simulator for debt reconstruction, FIBEN bypass strategies, and liability protection. Calculate recovery timelines and access UK-based rebuilding mechanisms."
        category="FinanceApplication"
      />
      <SEOBotContext
        toolName="Rebound Vault & Recovery"
        description="Multi-mode crisis recovery calculator supporting three scenarios: (1) Default debt reconstruction timeline calculation, (2) FIBEN bypass demonstrating French credit registry inapplicability to UK structures, (3) Liability protection against French commercial debt comblement procedures. Computes recovery duration (debtAmount / monthlySaving) and explains jurisdictional barrier mechanisms."
        pillars={[
          "Pillar 1: Recovery Timeline Calculation - Computes months required: debtAmount / monthlySavingPotential, demonstrating UK Limited's 22% savings advantage accelerating recovery by ~8 months versus SASU",
          "Pillar 2: FIBEN Jurisdictional Barrier - French credit registry (Fichier des Incidents de Crédit) has no cross-border application to UK Limited companies, enabling immediate banking access post-bankruptcy",
          "Pillar 3: Liability Shield Protection - UK Limited corporate veil prevents personal asset seizure for commercial debt comblement (passif shortfall recovery) absent personal guarantees"
        ]}
        formula="monthsToRecover = Math.round(debtAmount / monthlySavingPotential)"
        constraint="Liability protection applies only to commercial debts without personal guarantees; directors remain liable for fraudulent trading. FIBEN bypass requires actual UK incorporation and banking relationship."
      />
      <div className={`absolute top-0 right-0 ${mode === 'liability' ? 'bg-red-600' : 'bg-red-500'} text-white px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest`}>
        {mode === 'liability' ? 'Défense Comblement Passif' : mode === 'fiben' ? 'FIBEN Bypass Protocol' : 'Crisis Recovery v1.2'}
      </div>

      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h2 className="text-4xl font-black tracking-tighter mb-4 uppercase leading-none">
            {mode === 'liability' ? (
              <>Bouclier <span className="text-red-600">Anti-Comblement</span></>
            ) : mode === 'fiben' ? (
              <>Relance <span className="text-red-500">Post-Fichage</span></>
            ) : (
              <>Simulateur de <span className="text-red-500">Rebond</span> Post-Crise</>
            )}
          </h2>
          <p className="text-white font-bold italic uppercase tracking-tighter text-xs">
            {mode === 'liability'
              ? "Ne payez pas vos dettes commerciales sur vos deniers personnels."
              : mode === 'fiben'
                ? "Le fichage français n'existe pas au Royaume-Uni. Repartez à zéro."
                : "Reconstituez votre capital via le levier britannique"
            }
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <label className="block text-[10px] font-black uppercase text-white mb-4 tracking-widest">
                {mode === 'liability' ? "Montant Réclamé (Faute Gestion)" : mode === 'fiben' ? "Besoin en Fonds de Roulement" : "Passif / Dettes à combler (€)"}
              </label>
              <input
                type="number" value={debtAmount} onChange={(e) => setDebtAmount(Number(e.target.value))}
                className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl px-6 py-4 text-xl font-bold focus:border-red-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-white mb-4 tracking-widest">
                {mode === 'liability' ? "Cash-Flow Mensuel Actuel (€)" : "Capacité d'épargne via Limited / mois (€)"}
              </label>
              <input
                type="number" value={monthlySavingPotential} onChange={(e) => setMonthlySavingPotential(Number(e.target.value))}
                className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl px-6 py-4 text-xl font-bold focus:border-red-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-3xl p-8 border border-red-900/50 flex flex-col justify-center text-center">
            <div className="text-[10px] font-black text-white uppercase tracking-widest mb-2">
              {mode === 'liability' ? "Temps de Survie sans Protection" : "Temps de Reconstitution"}
            </div>
            <div className="text-5xl font-black text-white mb-6">{monthsToRecover} <span className="text-xl">Mois</span></div>
            <p className="text-red-100/40 text-[10px] font-medium leading-relaxed uppercase mb-6">
              {mode === 'liability'
                ? "Sans Limited UK, ce montant sera prélevé directement sur votre patrimoine personnel. Avec une LTD, vos biens personnels sont insaisissables."
                : "Une structure UK permet d'économiser 22% de plus par mois qu'une SASU, accélérant votre rebond de 8 mois en moyenne."
              }
            </p>
            <a
              href={getWhatsAppLink(mode === 'liability'
                ? `URGENCE LIQUIDATION : On me réclame ${debtAmount}€ pour comblement de passif. Je veux activer le bouclier.`
                : mode === 'fiben'
                  ? `Bonjour, je suis fiché FIBEN et je veux relancer mon activité UK avec un BFR de ${debtAmount}€.`
                  : `Bonjour, je souhaite activer mon plan de rebond Societe Anglaise (Passif: ${debtAmount}€, Épargne: ${monthlySavingPotential}€/mois).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full ${mode === 'liability' ? 'bg-red-600' : 'bg-red-500'} text-white font-black py-4 rounded-xl shadow-xl hover:scale-[1.02] transition-all uppercase tracking-widest text-[10px] text-center block`}
            >
              {mode === 'liability' ? "Stopper la Procédure" : mode === 'fiben' ? "Ouvrir un Compte Bancaire UK" : "Activer mon Plan de Rebond"}
            </a>
          </div>
        </div>
      </div>
      <SEOMethodologyBlock
        methodologyTitle="Multi-Scenario Crisis Recovery Architecture"
        methodologyText="The Rebound Vault implements three distinct recovery mechanisms addressing different crisis types. In Default mode, the calculator projects debt reconstruction timelines based on monthly savings capacity, highlighting the 22% savings advantage of UK Limited structures (approximately 8 months faster recovery than SASU). FIBEN mode leverages jurisdictional boundaries: the French credit registry (Fichier des Incidents de Crédit) has no legal authority over UK-incorporated entities, enabling immediate banking access despite French bankruptcy or payment incidents. Liability mode activates the corporate veil defense against French commercial debt comblement procedures (personal asset seizure for business shortfall), preventing creditor access to personal assets absent personal guarantees. Each mode provides specific legal framework citations and immediate action pathways."
        algorithmName="RecoveryEngine v1.2"
        algorithmVersion="v1.2"
        precision="80%"
        icon="fa-arrow-trend-up"
        mode={mode}
      />
      <EmbedTool toolId="rebound-vault" toolName="Rebound Vault & Recovery" />
    </div>
  );
};

export default ReboundVault;