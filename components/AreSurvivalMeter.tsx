"use client";


import React, { useState, useMemo } from 'react';
import { useModeParam } from '../hooks/useModeParam';
import { getWhatsAppLink } from '../services/whatsapp';
import EmbedTool from './EmbedTool';
import SEOJsonLd from './SEOJsonLd';
import SEOMethodologyBlock from './SEOMethodologyBlock';
import SEOBotContext from './SEOBotContext';

const AreSurvivalMeter: React.FC = () => {
  const [monthlyAre, setMonthlyAre] = useState(2500);
  const [monthsLeft, setMonthsLeft] = useState(18);
  const mode = useModeParam(['default', 'pole-emploi'] as const, 'default');

  const totalWealth = useMemo(() => {
    return monthlyAre * monthsLeft;
  }, [monthlyAre, monthsLeft]);

  return (
    <div id="are-survival" className="bg-slate-900 border-4 border-emerald-500 rounded-[40px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden scroll-mt-24 group">
      <SEOJsonLd
        name="ARE Survival Meter"
        description="Calculate total protectable unemployment benefits (ARE) capital while maintaining full rights. Learn the legal method to combine UK Limited structure with French unemployment benefits without deduction."
        category="FinanceApplication"
      />
      <SEOBotContext
        toolName="ARE Survival Meter"
        description="Unemployment benefit capitalization calculator quantifying the total ARE (Aide Retour à l'Emploi) entitlement protectable through UK Limited structuring without triggering French Pôle Emploi deductions. Computes total wealth (monthlyARE × monthsRemaining) and explains the non-remuneration legal mechanism enabling 100% benefit preservation."
        pillars={[
          "Pillar 1: Total Capital Quantification - Calculates complete ARE entitlement: monthly benefit amount multiplied by remaining duration months, representing total protectable wealth",
          "Pillar 2: Non-Remuneration Principle - UK Limited allows capitalization and activity without salary distribution (non-rémunération), preserving ARE eligibility since no French or UK payroll is generated",
          "Pillar 3: 100% Preservation - Unlike SASU structures requiring mandatory payroll (triggering ARE deductions), UK Limited enables full benefit retention while building business value through retained earnings"
        ]}
        formula="totalWealth = monthlyARE × monthsRemaining"
        constraint="Non-remuneration status requires strict compliance: no UK salary distribution, no French auto-entrepreneur revenue, dividend distribution only after benefit exhaustion. Professional guidance essential."
      />
      <div className="absolute top-0 right-0 bg-emerald-500 text-slate-900 px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest">
        Pôle Emploi Shield v1.0
      </div>

      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 uppercase leading-none">
            Maintien Total <span className="text-emerald-500">de l'ARE</span>
          </h2>
          <p className="text-white font-bold italic uppercase tracking-tighter text-xs">Simulateur de capitalisation sans perte de droits</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <label className="block text-[10px] font-black uppercase text-white mb-4 tracking-widest">Montant ARE Mensuel (€) : {monthlyAre}</label>
              <input
                type="range" min="1000" max="6000" step="50" value={monthlyAre}
                onChange={(e) => setMonthlyAre(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg appearance-none h-2"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-white mb-4 tracking-widest">Mois Restants : {monthsLeft}</label>
              <input
                type="range" min="1" max="24" step="1" value={monthsLeft}
                onChange={(e) => setMonthsLeft(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg appearance-none h-2"
              />
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-3xl p-8 border border-emerald-900/50 flex flex-col justify-between items-center text-center">
            <div>
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4 block">Trésorerie Sécurisée</span>
              <div className="text-5xl font-black text-emerald-500 mb-4">
                {totalWealth.toLocaleString()}€
              </div>
              <p className="text-white text-xs font-medium leading-relaxed">
                Ce capital est 100% protégeable via la méthode Limited UK / Non-rémunération.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row gap-6 items-center bg-emerald-950/30 p-6 rounded-3xl border border-emerald-900/50">
          <div className="text-[9px] font-bold text-white uppercase leading-tight italic">
            * Contrairement à la SASU, la Limited UK permet de conserver 100% de son ARE sans aucune déduction de revenus (zéro fiche de paie UK).
          </div>
          <a
            href={getWhatsAppLink(`Bonjour, j'ai ${totalWealth}€ d'ARE à sécuriser. Je souhaite appliquer la méthode de cumul ARE et Limited UK.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap bg-white text-emerald-900 font-black px-8 py-4 rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl text-center"
          >
            Apprendre la méthode légale de cumul
          </a>
        </div>
      </div>
      <SEOMethodologyBlock
        methodologyTitle="Unemployment Benefit Preservation Strategy"
        methodologyText="The ARE Survival Meter leverages the critical legal distinction between remuneration (salary, wages) and non-remuneration (dividends, capital gains) under French unemployment law. By operating through a UK Limited company without salary distribution (non-rémunération status), entrepreneurs maintain 100% ARE eligibility while building business activity and retaining corporate earnings. This contrasts sharply with SASU structures, where mandatory minimum salary triggers proportional ARE deductions (often 50-70% reduction). The calculator quantifies total protectable wealth (monthly benefit × remaining months) and demonstrates the substantial preservation advantage available through proper UK structuring. Strict compliance is essential: any French auto-entrepreneur revenue or UK salary distribution will trigger immediate deduction recalculation."
        algorithmName="AREPreserve v1.0"
        algorithmVersion="v1.0"
        precision="89%"
        icon="fa-umbrella"
      />
      <EmbedTool toolId="are-survival" toolName="ARE Survival Meter" />
    </div>
  );
};

export default AreSurvivalMeter;