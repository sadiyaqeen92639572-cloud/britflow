"use client";


import React, { useState, useMemo } from 'react';
import { useModeParam } from '../hooks/useModeParam';
import { TAX_RATES } from '../lib/legacyArticles';
import { getWhatsAppLink } from '../services/whatsapp';
import EmbedTool from './EmbedTool';
import SEOJsonLd from './SEOJsonLd';
import SEOMethodologyBlock from './SEOMethodologyBlock';
import SEOBotContext from './SEOBotContext';

const ProfitOptimizer: React.FC = () => {
  const [frenchProfit, setFrenchProfit] = useState(100000);
  const [shiftPercentage, setShiftPercentage] = useState(25); // Percentage of profit to shift
  const initialStrategy = useModeParam(['royalties', 'management', 'license'] as const, 'royalties');
  const [strategy, setStrategy] = useState<'royalties' | 'management' | 'license'>(initialStrategy);

  const analysis = useMemo(() => {
    const amountToShift = (frenchProfit * shiftPercentage) / 100;
    const taxFRBase = frenchProfit * TAX_RATES.FRANCE.IS;
    const remainingProfitFR = frenchProfit - amountToShift;
    const taxFROptimized = remainingProfitFR * TAX_RATES.FRANCE.IS;
    const taxUK = amountToShift * TAX_RATES.UK.CT;
    const totalTaxNew = taxFROptimized + taxUK;
    const taxSaved = taxFRBase - totalTaxNew;

    let risk: "Faible" | "Modéré" | "Élevé" = "Faible";
    if (shiftPercentage > 35) risk = "Élevé";
    else if (shiftPercentage > 15) risk = "Modéré";

    return { taxSaved: Math.round(taxSaved), amountShifted: Math.round(amountToShift), risk };
  }, [frenchProfit, shiftPercentage]);

  // Dynamic SEO Data based on Strategy
  const seoData = useMemo(() => {
    switch (strategy) {
      case 'royalties':
        return {
          title: "IP Box Royalties Optimization",
          desc: "Calculate tax arbitrage by shifting Intellectual Property royalties from high-tax France to UK Patent Box/IP regime.",
          methTitle: "Propriété Intellectuelle & Redevances",
          methText: "Cette stratégie repose sur la concession de licence de marque ou de brevet détenu par la Limited UK à la société française. Les redevances (royalties) sont déductibles en France (réduisant l'IS) et imposées au Royaume-Uni, souvent à taux réduit si le régime Patent Box s'applique.",
          pillar: "IP Valuation & Transfer Pricing"
        };
      case 'management':
        return {
          title: "Management Fees Allocator",
          desc: "Optimize cross-border management fees billing between FR operating co and UK holding.",
          methTitle: "Convention de Management Fees",
          methText: "La refacturation de services de direction (Management Fees) permet de rémunérer le savoir-faire de la holding UK. Attention, cela nécessite une réalité économique tangible (substance) pour éviter la fictivité.",
          pillar: "Service Level Agreement (SLA)"
        };
      case 'license':
        return {
          title: "Software Licensing Arbitrage",
          desc: "SaaS and software licensing model for cross-border tax optimization.",
          methTitle: "Licence Logicielle & SaaS",
          methText: "Pour les entreprises tech, la détention du code source par la Limited UK permet de facturer des frais de licence à la filiale française distributrice, déplaçant ainsi légitimement la marge vers la juridiction de création du logiciel.",
          pillar: "Software Copyright & Licensing"
        };
    }
  }, [strategy]);

  return (
    <div className="bg-slate-900 border-2 border-slate-800 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group text-white">
      <SEOJsonLd
        name={seoData.title}
        description={seoData.desc}
        category="FinanceApplication"
      />

      <SEOBotContext
        toolName="Profit Optimizer & Flux Arbitrage"
        description={`Interactive simulator for cross-border profit shifting using ${strategy} mechanisms. Calculates tax savings by comparing French IS (25%) vs UK CT (19-25%) on shifted amounts.`}
        pillars={[
          `Pillar 1: ${seoData.pillar}`,
          "Pillar 2: Tax Differential Arbitrage (FR 25% vs UK 19%)",
          "Pillar 3: Transfer Pricing Compliance (Shift % Monitoring)"
        ]}
        formula="taxSaved = (shiftedAmount * 0.25) - (shiftedAmount * UK_Rate)"
        constraint="Requires strict adherence to Arm's Length Principle. Risk increases significantly above 15% turnover shift."
      />

      <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>

      <div className="flex items-center gap-4 mb-8">
        <div className="bg-slate-800 text-white p-3 rounded-2xl border border-slate-700">
          <i className="fas fa-exchange-alt text-xl"></i>
        </div>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Simulateur de Flux <span className="text-blue-500">Offshore</span></h2>
          <p className="text-xs text-white font-bold uppercase tracking-widest">Stratégie de {strategy === 'royalties' ? 'Royalties IP' : strategy === 'management' ? 'Management Fees' : 'Licensing Tech'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <label className="block text-xs font-black uppercase text-white mb-4">Bénéfice Annuel France : {frenchProfit.toLocaleString()}€</label>
            <input
              type="range" min="30000" max="1000000" step="10000" value={frenchProfit}
              onChange={(e) => setFrenchProfit(Number(e.target.value))}
              className="w-full accent-blue-600 bg-slate-800 rounded-lg appearance-none h-2"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-white mb-4">Volume de Flux (%) : {shiftPercentage}%</label>
            <input
              type="range" min="5" max="50" step="5" value={shiftPercentage}
              onChange={(e) => setShiftPercentage(Number(e.target.value))}
              className="w-full accent-blue-600 bg-slate-800 rounded-lg appearance-none h-2"
            />
            <div className={`mt-2 text-xs font-black uppercase ${analysis.risk === 'Élevé' ? 'text-red-500' : analysis.risk === 'Modéré' ? 'text-amber-500' : 'text-emerald-500'}`}>
              Risque Fiscal : {analysis.risk}
            </div>
          </div>

          <div className="flex gap-2">
            {(['royalties', 'management', 'license'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStrategy(s)}
                className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase border-2 transition-all ${strategy === s ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
              >
                {s === 'royalties' ? 'Royalties IP' : s === 'management' ? 'Mgt Fees' : 'Licensing'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-[24px] p-6 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-white">Cash Shifté vers UK</span>
              <span className="text-xl font-black text-white">{analysis.amountShifted.toLocaleString()}€</span>
            </div>
            <div className="flex justify-between items-center border-t border-slate-700 pt-4 mb-6">
              <span className="text-sm font-bold text-white">Économie d'Impôt Réelle</span>
              <span className="text-2xl font-black text-emerald-500">+{analysis.taxSaved.toLocaleString()}€ / an</span>
            </div>
            <a
              href={getWhatsAppLink(`Bonjour, je souhaite optimiser mes flux offshore suite à ma simulation Societe Anglaise (Stratégie: ${strategy}, Shift: ${analysis.amountShifted}€).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-600 text-white font-black py-4 rounded-xl shadow-xl hover:bg-blue-500 transition-all uppercase tracking-widest text-[10px] text-center block"
            >
              Mettre en place ces flux
            </a>
          </div>
        </div>
      </div>

      <SEOMethodologyBlock
        methodologyTitle={`Méthodologie : ${seoData.methTitle}`}
        methodologyText={seoData.methText}
        algorithmName="InternalFlow.v2"
        algorithmVersion="2.4"
        precision="94%"
        icon="fa-money-bill-transfer"
      />

      <EmbedTool toolId="optimization" toolName="Profit Optimizer & Flux Arbitrage" />
    </div>
  );
};

export default ProfitOptimizer;