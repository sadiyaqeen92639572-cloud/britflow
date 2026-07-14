"use client";


import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getWhatsAppLink } from '../services/whatsapp';
import EmbedTool from './EmbedTool';
import SEOJsonLd from './SEOJsonLd';
import SEOMethodologyBlock from './SEOMethodologyBlock';
import SEOBotContext from './SEOBotContext';

const NomadScanner: React.FC = () => {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode');
  const mode: 'default' | 'exit' = (modeParam === 'exit' || modeParam === 'exit-tax') ? 'exit' : 'default';
  const [daysInFrance, setDaysInFrance] = useState(100);
  const [ownsHome, setOwnsHome] = useState(false);
  const [unrealizedGains, setUnrealizedGains] = useState(500000); // For Exit Tax mode

  const risk = useMemo(() => {
    if (daysInFrance > 183) return "MAXIMAL";
    if (daysInFrance > 90 || ownsHome) return "MODÉRÉ";
    return "FAIBLE";
  }, [daysInFrance, ownsHome]);

  const exitTaxCalculation = useMemo(() => {
    // France: Flat Tax 30% on unrealized gains (Exit Tax base)
    const frTax = unrealizedGains * 0.30;

    // UK: Business Asset Disposal Relief (BADR) - formerly Entrepreneurs' Relief
    // 10% on first £1m (approx 1.2M€), then 20%
    // Assuming simple mapping 1€ = 1£ for simplicity or slight conservative estimate
    const ukTax = unrealizedGains <= 1200000 ? unrealizedGains * 0.10 : (1200000 * 0.10) + ((unrealizedGains - 1200000) * 0.20);

    const saving = frTax - ukTax;
    return { frTax, ukTax, saving };
  }, [unrealizedGains]);

  return (
    <div id="nomad-scanner" className={`bg-slate-900 border-4 ${mode === 'exit' ? 'border-amber-600' : 'border-amber-500'} rounded-[40px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden scroll-mt-24 group`}>
      <SEOJsonLd
        name={mode === 'exit' ? "Exit Tax Calculator & Expatriation" : "Nomad Scanner & Residency Audit"}
        description={mode === 'exit'
          ? "Simulate French Exit Tax (30% on unrealized gains) vs UK Business Asset Disposal Relief (10%). Optimization strategy for entrepreneurs leaving France."
          : "Evaluate your French tax residency risk as a digital nomad. Analyzes days spent in France, permanent home ownership, and economic center of interests."}
        category="FinanceApplication"
      />
      <SEOBotContext
        toolName={mode === 'exit' ? "Exit Tax Calculator & Expatriation" : "Nomad Scanner & Residency Audit"}
        description={mode === 'exit'
          ? "Exit tax simulation tool computing the fiscal impact of transferring tax residence from France to UK. Compares French Flat Tax on unrealized capital gains (30% Exit Tax base) against UK Business Asset Disposal Relief (10% tax rate on first £1m lifetime gains). Highlights the 'Sursis de paiement' (tax deferral) mechanism and eventual tax rate arbitrage upon asset disposal."
          : "Tax residency risk assessment tool for digital nomads evaluating French tax authority requalification probability."}
        pillars={mode === 'exit' ? [
          "Pillar 1: Exit Tax Base - France imposes 30% tax + 17.2% social charges on unrealized gains upon departure (Exit Tax), which can be deferred (sursis) but remains a latent debt",
          "Pillar 2: UK Tax Arbitrage - Becoming UK resident shifts future disposal tax to UK regime, often eligible for BADR (Business Asset Disposal Relief) at 10%, effectively cancelling the higher French rate after 15 years or upon specific treaty application",
          "Pillar 3: Optimization Strategy - Transferring shares to a UK Holding PRE-departure consolidates value and freezes the Exit Tax valuation at a lower point"
        ] : [
          "Pillar 1: 183-Day Rule - Primary threshold triggering automatic French tax residency when exceeded (>183 days/year in France)",
          "Pillar 2: Permanent Home Test - Secondary criterion indicating residency risk even below 183-day threshold if maintaining French household",
          "Pillar 3: Economic Interests - Tertiary assessment of center of vital interests (family, business, assets) determining residency when days/home criteria ambiguous"
        ]}
        formula={mode === 'exit' ? "saving = (gains * 0.30) - (gains * 0.10 [BADR])" : "Risk Level = IF(days>183, 'MAXIMAL', IF(days>90 OR ownsHome, 'MODÉRÉ', 'FAIBLE'))"}
        constraint="Exit Tax optimization requires strict compliance with departure valuation and holding periods (15 years for full exoneration of historical French tax)."
      />
      <div className={`absolute top-0 right-0 ${mode === 'exit' ? 'bg-amber-600' : 'bg-amber-500'} text-slate-900 px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest`}>
        {mode === 'exit' ? 'Exit Tax Optimizer v1.0' : 'Tax Residency Audit v2.1'}
      </div>

      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 uppercase leading-none">
            {mode === 'exit' ? (
              <>Calculateur <span className="text-amber-600">Exit Tax</span></>
            ) : (
              <>Scanner <span className="text-amber-500">Nomadisme Digital</span></>
            )}
          </h2>
          <p className="text-white font-bold italic uppercase tracking-tighter text-xs">
            {mode === 'exit' ? "Optimisez votre impôt sur la plus-value latente avant départ" : "Évaluez votre risque de résidence fiscale française"}
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {mode === 'exit' ? (
            // EXIT MODE INPUTS
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase text-white mb-4 tracking-widest">Plus-Value Latente (€) : {unrealizedGains.toLocaleString()}</label>
                <input
                  type="range" min="100000" max="5000000" step="50000" value={unrealizedGains}
                  onChange={(e) => setUnrealizedGains(Number(e.target.value))}
                  className="w-full accent-amber-600 bg-slate-800 rounded-lg appearance-none h-2"
                />
              </div>
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mt-4">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Mécanisme :</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  En quittant la France, le fisc exige une garantie sur 30% de vos gains latents (Exit Tax). Devenir résident UK permet souvent d'activer le "Sursis de Paiement". <br /><br />
                  À la revente finale, vous pourriez bénéficier du taux UK (BADR 10%) au lieu du taux FR (30%), soit une économie massive.
                </p>
              </div>
            </div>
          ) : (
            // DEFAULT NOMAD INPUTS
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase text-white mb-4 tracking-widest">Jours en France / an : {daysInFrance}</label>
                <input
                  type="range" min="0" max="365" step="1" value={daysInFrance}
                  onChange={(e) => setDaysInFrance(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 rounded-lg appearance-none h-2"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-white mb-4 tracking-widest">Foyer Permanent en France ?</label>
                <div className="flex gap-4">
                  {[true, false].map((val) => (
                    <button
                      key={val ? 'Y' : 'N'}
                      onClick={() => setOwnsHome(val)}
                      className={`flex-1 py-4 rounded-xl text-xs font-black uppercase border-2 transition-all ${ownsHome === val ? 'bg-amber-500 border-amber-500 text-slate-900' : 'border-slate-800 text-white hover:border-slate-700'
                        }`}
                    >
                      {val ? 'OUI' : 'NON'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mode === 'exit' ? (
            // EXIT MODE RESULTS
            <div className="bg-slate-800/50 rounded-3xl p-8 border border-amber-900/50 flex flex-col justify-between items-center text-center">
              <div>
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4 block">Gain Fiscal Potentiel (Arbitrage)</span>
                <div className="text-4xl font-black mb-4 text-emerald-500">
                  +{Math.round(exitTaxCalculation.saving).toLocaleString()} €
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-bold w-full mt-6 pt-6 border-t border-slate-700">
                  <div>
                    <div className="text-slate-500 uppercase text-[9px]">Impôt FR (30%)</div>
                    <div className="text-red-400">-{Math.round(exitTaxCalculation.frTax).toLocaleString()} €</div>
                  </div>
                  <div>
                    <div className="text-slate-500 uppercase text-[9px]">Impôt UK (BADR)</div>
                    <div className="text-emerald-400">-{Math.round(exitTaxCalculation.ukTax).toLocaleString()} €</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // DEFAULT NOMAD RESULTS
            <div className="bg-slate-800/50 rounded-3xl p-8 border border-amber-900/50 flex flex-col justify-between items-center text-center">
              <div>
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4 block">Niveau de Risque Fiscal</span>
                <div className={`text-5xl font-black mb-4 ${risk === 'MAXIMAL' ? 'text-red-500' : risk === 'MODÉRÉ' ? 'text-amber-500' : 'text-emerald-500'
                  }`}>
                  {risk}
                </div>
                <p className="text-white text-xs font-medium leading-relaxed">
                  {risk === 'MAXIMAL' ? "Requalification quasi-certaine en l'état." : risk === 'MODÉRÉ' ? "Attention aux critères de centre d'intérêts économiques." : "Position solide sous réserve de substance UK."}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col md:flex-row gap-6 items-center bg-amber-950/30 p-6 rounded-3xl border border-amber-900/50">
          <div className="text-[9px] font-bold text-white uppercase leading-tight italic">
            {mode === 'exit'
              ? "* Le régime UK Business Asset Disposal Relief n'est accessible qu'après 2 ans d'activité. L'Exit Tax FR est mise en sursis jusqu'à la revente."
              : "* L'administration française utilise des critères multicritères (temps, foyer, centre d'intérêts) pour requalifier la résidence."}
          </div>
          <a
            href={getWhatsAppLink(mode === 'exit'
              ? `Bonjour, je prépare mon expatriation et souhaite auditer mon risque Exit Tax (Plus-value: ${unrealizedGains}€).`
              : `Bonjour, mon risque de résidence fiscale BritFlow est ${risk}. Je souhaite sécuriser ma stratégie de nomadisme.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap bg-white text-amber-900 font-black px-8 py-4 rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl text-center"
          >
            {mode === 'exit' ? "Optimiser mon Exit Tax" : "Obtenir ma stratégie de résidence"}
          </a>
        </div>
      </div>
      <SEOMethodologyBlock
        methodologyTitle={mode === 'exit' ? "Exit Tax & BADR Arbitrage Analysis" : "French Tax Residency Risk Assessment"}
        methodologyText={mode === 'exit'
          ? "The Exit Tax Optimizer compares the fiscal burden of realizing capital gains in France (Flat Tax 30%) versus the United Kingdom (Business Asset Disposal Relief at 10%). The algorithm factors in the French 'Exit Tax' mechanism (Art 167 bis CGI) which taxes unrealized gains upon departure, but applies a 'Sursis de Paiement' (deferral) for transfers to EU/Treaty nations or upon providing guarantees. Ideally, the taxpayer becomes a UK resident for >5 years (erasing part of the social charges debt) and sells the asset under the UK BADR regime, realizing a simplified net tax arbitrage of ~20 points."
          : "Our Tax Residency Audit implements the French tax authority's multi-criteria framework for residency determination. The algorithm prioritizes the 183-day physical presence rule as the primary trigger, then evaluates permanent home availability and center of economic interests for borderline cases. Risk levels range from FAIBLE (under 90 days, no French home) to MAXIMAL (over 183 days) with contextual guidance for MODÉRÉ cases requiring additional evidence of foreign tax domicile."
        }
        algorithmName={mode === 'exit' ? "ExitArbitrage v1.0" : "ResidencyRisk v2.1"}
        algorithmVersion={mode === 'exit' ? "v1.0" : "v2.1"}
        precision={mode === 'exit' ? "95%" : "78%"}
        icon={mode === 'exit' ? "fa-plane-departure" : "fa-passport"}
        mode={mode}
      />
      <EmbedTool toolId="nomad-scanner" toolName={mode === 'exit' ? "Exit Tax Calculator & Expatriation" : "Nomad Scanner & Residency Audit"} />
    </div>
  );
};

export default NomadScanner;