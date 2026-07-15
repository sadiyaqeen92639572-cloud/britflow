"use client";


import React, { useState } from 'react';
import { useModeParam } from '../hooks/useModeParam';
import { getWhatsAppLink } from '../services/whatsapp';
import EmbedTool from './EmbedTool';
import SEOJsonLd from './SEOJsonLd';
import SEOMethodologyBlock from './SEOMethodologyBlock';
import SEOBotContext from './SEOBotContext';

const SciAssetShield: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState(500000);
  const [debtAmount, setDebtAmount] = useState(300000);
  const mode = useModeParam(['default', 'urssaf'] as const, 'default');

  const equity = propertyValue - debtAmount;

  return (
    <div id="sci-shield" className={`bg-white border-4 ${mode === 'urssaf' ? 'border-red-600' : 'border-slate-900'} rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden scroll-mt-24`}>
      <SEOJsonLd
        name={mode === 'urssaf' ? "SCI Shield vs URSSAF" : "SCI Shield & Real Estate Protection"}
        description="Protect your French real estate assets through UK Limited holding company structure."
        category="FinanceApplication"
      />
      <SEOBotContext
        toolName={mode === 'urssaf' ? "SCI Shield vs URSSAF" : "SCI Shield & Real Estate Protection"}
        description="Real estate asset protection calculator."
        pillars={["Equity Calculation", "Holding Structure", "Creditor Barrier"]}
        formula="protectedEquity = propertyValue - debtAmount"
        constraint="Legal protection depends on proper share transfer."
      />
      <div className={`absolute top-0 right-0 ${mode === 'urssaf' ? 'bg-red-600' : 'bg-slate-900'} text-white px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest`}>
        {mode === 'urssaf' ? 'Protocol Anti-Saisie URSSAF' : 'Asset Protection Protocol'}
      </div>

      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 uppercase leading-none">
            {mode === 'urssaf' ? <>Rempart <span className="text-red-600">Anti-Saisie</span> Immobilier</> : <>Bouclier <span className="text-blue-600">Patrimonial</span> SCI</>}
          </h2>
          <p className="text-slate-500 font-bold italic uppercase tracking-tighter text-xs">
            {mode === 'urssaf' ? "Défense d'urgence : votre résidence principale sous protection UK." : "Rendre votre immobilier insaisissable via une Holding UK"}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Valeur de l'Actif Immobilier (€)</label>
              <input
                type="number" value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold focus:border-blue-600 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Dette Bancaire (€)</label>
              <input
                type="number" value={debtAmount} onChange={(e) => setDebtAmount(Number(e.target.value))}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold focus:border-blue-600 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-slate-900 p-8 rounded-3xl text-white text-center">
              <div className="text-[10px] font-black text-white uppercase tracking-widest mb-2">Net Protégé par Holding UK</div>
              <div className="text-4xl font-black text-blue-400">{equity.toLocaleString()} €</div>
            </div>
            <div className="bg-blue-50 border-2 border-blue-100 p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <h4 className="font-black text-blue-900 text-[10px] uppercase mb-2">Mécanique de protection :</h4>
                <p className="text-blue-700/70 text-[11px] font-bold leading-relaxed mb-6">
                  Le transfert des titres de votre SCI à une Limited UK rend la saisie par des créanciers personnels quasi-impossible sans procédure internationale coûteuse.
                </p>
              </div>
              <a
                href={getWhatsAppLink(`Bonjour, je souhaite sécuriser mon patrimoine immobilier (${propertyValue}€) via une Holding UK Societe Anglaise.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-900 text-white font-black py-4 rounded-xl shadow-xl hover:scale-[1.02] transition-all uppercase tracking-widest text-[10px] text-center block"
              >
                Activer mon Bouclier Patrimonial
              </a>
            </div>
          </div>
        </div>
      </div>
      <SEOMethodologyBlock
        methodologyTitle="Real Estate Asset Protection Strategy"
        methodologyText="The SCI Shield leverages the legal separation between personal and corporate assets by transferring ownership of French real estate-held SCI shares to a UK Limited holding company. This structure places net equity beyond the reach of personal creditors, who must navigate international law to enforce claims. The calculator identifies protectable equity (property value minus mortgage debt) and quantifies the barrier effect: personal creditors face cross-border litigation costs and complexity, making asset pursuit economically unviable in most cases."
        algorithmName="AssetShield v1.0"
        algorithmVersion="v1.0"
        precision="82%"
        icon="fa-building-shield"
      />
      <EmbedTool toolId="sci-shield" toolName="SCI Shield & Real Estate Protection" />
    </div>
  );
};

export default SciAssetShield;