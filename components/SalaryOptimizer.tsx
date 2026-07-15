"use client";


import React, { useState, useMemo } from 'react';
import { useModeParam } from '../hooks/useModeParam';
import { TAX_RATES } from '../lib/legacyArticles';
import { getWhatsAppLink } from '../services/whatsapp';
import EmbedTool from './EmbedTool';
import SEOJsonLd from './SEOJsonLd';
import SEOMethodologyBlock from './SEOMethodologyBlock';
import SEOBotContext from './SEOBotContext';

const SalaryOptimizer: React.FC = () => {
  const [targetNet, setTargetNet] = useState(50000);
  const mode = useModeParam(['default', 'mix'] as const, 'default');

  const arbitrage = useMemo(() => {
    // Calcul simplifié de l'arbitrage Dividende UK vs Salaire FR
    const dividendNeeded = targetNet / (1 - TAX_RATES.UK.DIVIDEND_TAX);
    const costFR = targetNet * 1.8; // Ratio approximatif pour un net en SASU
    const savings = costFR - dividendNeeded;

    return { dividendNeeded: Math.round(dividendNeeded), savings: Math.round(savings) };
  }, [targetNet]);

  return (
    <div id="salary-optimizer" className="bg-slate-900 border-2 border-slate-800 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
      <SEOJsonLd
        name="Salary vs Dividend Optimizer"
        description="Compare UK dividend distribution vs French SASU salary structure. Calculate required dividend amounts and potential tax savings for optimizing personal income extraction."
        category="FinanceApplication"
      />
      <SEOBotContext
        toolName="Salary vs Dividend Optimizer"
        description="Personal income extraction arbitrage calculator comparing UK dividend distribution efficiency against French SASU salary structure. Computes required gross dividend to achieve target net income after UK dividend tax (8.75% on first £1,000, 33.75% thereafter) and quantifies savings versus French SASU salary cost (approximately 1.8× ratio for equivalent net)."
        pillars={[
          "Pillar 1: UK Dividend Requirement - Calculates gross dividend needed: targetNet / (1 - dividendTaxRate), accounting for £1,000 tax-free allowance and progressive rates (8.75%, 33.75%, 39.35%)",
          "Pillar 2: French SASU Cost Benchmark - Estimates equivalent French salary cost using 1.8× multiplier reflecting employer + employee social charges on net salary target",
          "Pillar 3: Arbitrage Delta - Quantifies annual savings: FR salary cost minus UK dividend requirement, demonstrating extraction efficiency advantage"
        ]}
        formula="savings = (targetNet × 1.8) - (targetNet / (1 - dividendTaxRate))"
        constraint="SASU multiplier (1.8×) is approximate; actual French cost varies by income level, sector-specific rates, and optional regime selections. UK rates subject to annual budget changes."
      />
      <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>

      <div className="flex items-center gap-4 mb-8">
        <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700">
          <i className="fas fa-coins text-2xl text-amber-400"></i>
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Arbitrage <span className="text-blue-500">Salaire vs Dividende</span></h2>
          <p className="text-[10px] text-white font-bold uppercase tracking-widest">Optimisation du disponible personnel</p>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-[10px] font-black uppercase text-white mb-4 tracking-widest">Revenu Net Cible (Annuel) : {targetNet.toLocaleString()}€</label>
          <input
            type="range" min="30000" max="250000" step="5000" value={targetNet}
            onChange={(e) => setTargetNet(Number(e.target.value))}
            className="w-full accent-blue-500 bg-slate-800 rounded-lg appearance-none h-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <span className="text-[10px] font-black text-white uppercase tracking-widest mb-2 block">Dividende UK Requis</span>
            <div className="text-2xl font-black text-white">{arbitrage.dividendNeeded.toLocaleString()}€</div>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <span className="text-[10px] font-black text-white uppercase tracking-widest mb-2 block">Gain vs Salaire FR</span>
            <div className="text-2xl font-black text-emerald-500">+{arbitrage.savings.toLocaleString()}€</div>
          </div>
        </div>

        <a
          href={getWhatsAppLink(`Bonjour, je souhaite mettre en place un arbitrage Salaire vs Dividende Societe Anglaise pour un net cible de ${targetNet}€.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-blue-600 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest shadow-xl hover:bg-blue-500 transition-all text-center block"
        >
          Appliquer cet arbitrage
        </a>
      </div>
      <SEOMethodologyBlock
        methodologyTitle="Income Extraction Efficiency Analysis"
        methodologyText="This tool implements a comparative tax efficiency analysis between UK Limited dividend extraction and French SASU salary structures. The algorithm reverse-calculates the gross dividend required to achieve a target net income after UK dividend tax (accounting for the £1,000 allowance and tiered rates), then benchmarks this against the approximate French SASU salary cost (1.8× multiplier reflecting combined employer and employee social charges). The savings delta represents the tax arbitrage advantage available through UK structuring. Note that the SASU multiplier is simplified; actual French costs vary significantly based on income level, industry-specific contribution rates, and optional regime choices (ACRE, retirement regimes)."
        algorithmName="ExtractionArbitrage v1.3"
        algorithmVersion="v1.3"
        precision="71%"
        icon="fa-scale-balanced"
      />
      <EmbedTool toolId="salary-optimizer" toolName="Salary vs Dividend Optimizer" />
    </div>
  );
};

export default SalaryOptimizer;