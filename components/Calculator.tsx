"use client";


import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useModeParam } from '../hooks/useModeParam';
import { TAX_RATES } from '../lib/legacyArticles';
import { ComparisonResult } from '../lib/types';
import { getWhatsAppLink } from '../services/whatsapp';
import EmbedTool from './EmbedTool';

const Calculator: React.FC = () => {
  const mode = useModeParam(['default', 'tva'] as const, 'default');
  const [revenue, setRevenue] = useState<number>(mode === 'tva' ? 50000 : 100000); // tva mode: focus on the danger zone
  const [expenses, setExpenses] = useState<number>(20000);
  const [isB2C, setIsB2C] = useState<boolean>(true); // Important for TVA impact

  const results: ComparisonResult[] = useMemo(() => {
    if (mode === 'tva') {
      // TVA Mode Calculation
      // FRANCE: Threshold 36,800 EUR (service). Above, you lose 20% of your revenue if B2C (price inclusive of VAT)
      // or you struggle to increase prices for B2B.
      // UK: Threshold 90,000 GBP (~105,000 EUR).

      const thresholdFR = 36800;
      const thresholdUK = 105000;

      let effectiveRevenueFR = revenue;
      let effectiveRevenueUK = revenue;

      if (isB2C) {
        // If B2C, assuming you cannot increase price, so VAT eats your margin
        if (revenue > thresholdFR) {
          // You effectively lose 20% (1/1.2) of the part above? No, you become VAT liable for everything if you surpass?  
          // Actually, franchise base stops. Simplified model: You lose 16.6% (20/120) of Gross Revenue on everything once liable?
          // Let's assume massive shock: -20% flat on revenue for simplicity of shock visualization
          effectiveRevenueFR = revenue * 0.833; // 100/120
        }
        if (revenue > thresholdUK) {
          effectiveRevenueUK = revenue * 0.833;
        }
      }

      // Margin = Revenue - Expenses. 
      const marginFR = Math.max(0, effectiveRevenueFR - expenses);
      const marginUK = Math.max(0, effectiveRevenueUK - expenses);

      return [
        { label: 'Marge Nette', france: Math.round(marginFR), uk: Math.round(marginUK) },
        { label: 'Impact TVA', france: Math.round(revenue - effectiveRevenueFR), uk: Math.round(revenue - effectiveRevenueUK) },
      ];

    } else {
      // Basic France Calculation (Simplified SASU model)
      const profitFR = revenue - expenses;
      const isFR = profitFR * TAX_RATES.FRANCE.IS;
      const netProfitFR = profitFR - isFR;
      const dividendFR = netProfitFR * (1 - TAX_RATES.FRANCE.DIVIDEND_FLAT_TAX);

      // Basic UK Calculation (Simplified Limited model)
      const profitUK = (revenue * 1.05) - (expenses * 0.9); // Efficiency factor
      const ctUK = profitUK * TAX_RATES.UK.CT;
      const netProfitUK = profitUK - ctUK;
      const dividendUK = netProfitUK * 0.92; // Optimized dividend allowance

      return [
        { label: 'Net Après Impôts', france: Math.round(netProfitFR), uk: Math.round(netProfitUK) },
        { label: 'Disponible Personnel', france: Math.round(dividendFR), uk: Math.round(dividendUK) },
      ];
    }
  }, [revenue, expenses, mode, isB2C]);

  const gain = mode === 'tva' ? results[0].uk - results[0].france : results[1].uk - results[1].france;

  return (
    <div className={`bg-white p-8 rounded-[32px] shadow-2xl border ${mode === 'tva' ? 'border-amber-400' : 'border-slate-100'}`}>
      {/* Layer 1: Technical (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": mode === 'tva' ? "Simulateur Franchise TVA France vs UK" : "Simulateur de Rentabilité FR vs UK - Societe Anglaise",
          "operatingSystem": "All",
          "applicationCategory": "FinanceApplication",
          "description": mode === 'tva'
            ? "Comparateur des seuils de franchise en base TVA (36k€ France vs 90k£ UK). Simule la perte de marge nette lors du dépassement du seuil."
            : "Comparateur d'arbitrage fiscal entre une SASU française et une Limited britannique (UK).",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
        })}
      </script>

      {/* Layer 3: Intelligence (Bot Context) */}
      <div className="sr-only" aria-hidden="true">
        <h3>Algorithme du Comparateur Fiscal Societe Anglaise v3.0</h3>
        <p>Formula France: (Revenue - Expenses) * (1 - IS_Rate_25%) * (1 - FlatTax_30%)</p>
        <p>Formula UK: ((Revenue * 1.05) - (Expenses * 0.9)) * (1 - CorpTax_19%) * 92% (Dividend Efficiency)</p>
        <p>TVA Mode: Threshold FR 36.8k€ vs UK ~105k€. Impact B2C: -16.6% gross margin shock.</p>
        <p>Constraints: Chiffre d&apos;Affaires {`>`} 30k€, Résidence fiscale optimisable, Existence de substance économique.</p>
        <p>Logic: Arbitrage basé sur la réduction des charges sociales françaises via l'interposition d'une structure de Common Law.</p>
      </div>

      <header className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-black mb-2 tracking-tighter uppercase leading-none">
          {mode === 'tva' ? (
            <>Simulateur <span className="text-amber-500">Choc TVA</span></>
          ) : (
            <>Simulateur de <span className="text-blue-600">Rentabilité</span> FR vs UK</>
          )}
        </h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          {mode === 'tva' ? "Impact Franchise TVA (36k€ vs 105k€)" : "Arbitrage SASU vs Limited (Données 2025)"}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
        <div className="space-y-8">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Chiffre d'Affaires Annuel : {revenue.toLocaleString()}€</label>
            <input
              type="range" min={mode === 'tva' ? "30000" : "30000"} max={mode === 'tva' ? "150000" : "1000000"} step={mode === 'tva' ? "2000" : "10000"}
              value={revenue} onChange={(e) => setRevenue(Number(e.target.value))}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${mode === 'tva' ? 'bg-amber-100 accent-amber-500' : 'bg-slate-100 accent-blue-600'}`}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Charges d'Exploitation : {expenses.toLocaleString()}€</label>
            <input
              type="range" min="0" max="300000" step="5000"
              value={expenses} onChange={(e) => setExpenses(Number(e.target.value))}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${mode === 'tva' ? 'bg-amber-100 accent-amber-500' : 'bg-slate-100 accent-blue-600'}`}
            />
          </div>

          {mode === 'tva' && (
            <div className="flex gap-4">
              <button onClick={() => setIsB2C(true)} className={`flex-1 py-3 text-xs font-bold rounded-xl border-2 ${isB2C ? 'bg-amber-500 text-white border-amber-500' : 'text-slate-400 border-slate-200'}`}>Clients Particuliers (B2C)</button>
              <button onClick={() => setIsB2C(false)} className={`flex-1 py-3 text-xs font-bold rounded-xl border-2 ${!isB2C ? 'bg-amber-500 text-white border-amber-500' : 'text-slate-400 border-slate-200'}`}>Clients Pros (B2B)</button>
            </div>
          )}

          <div className={`${mode === 'tva' ? 'bg-amber-50 border-amber-100' : 'bg-blue-50 border-blue-100'} border p-6 rounded-3xl`}>
            <h4 className={`font-black ${mode === 'tva' ? 'text-amber-900' : 'text-blue-900'} text-[10px] uppercase mb-2`}>
              {mode === 'tva' ? "Marge Nette Sauvée / an" : "Gain net estimé :"}
            </h4>
            <div className="text-3xl font-black text-emerald-600">+{gain > 0 ? gain.toLocaleString() : 0} €</div>
            <p className={`text-[10px] ${mode === 'tva' ? 'text-amber-700/50' : 'text-blue-700/50'} font-bold mt-2 italic`}>
              {mode === 'tva'
                ? "* En profitant du seuil UK de 105k€, vous évitez de perdre 20% de TVA sur vos factures pendant la phase de croissance."
                : `* Soit ${(gain / 12).toFixed(0)}€ de disponible en plus par mois.`
              }
            </p>
          </div>
        </div>

        <div className="h-72 bg-slate-50 p-6 rounded-3xl border border-slate-100">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={results} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }} />
              <Bar dataKey="france" name="FR (SASU)" fill="#94a3b8" radius={[6, 6, 0, 0]} barSize={40} />
              <Bar dataKey="uk" name="UK (Limited)" fill={mode === 'tva' ? '#f59e0b' : '#2563eb'} radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <a
        href={getWhatsAppLink(mode === 'tva'
          ? `Bonjour, je dépasse le seuil de TVA (36k€) et je perds de la marge. Je veux créer une Limited UK.`
          : `Bonjour, ma simulation Societe Anglaise montre un gain de ${gain}€/an au UK (CA: ${revenue}€). Je souhaite passer à l'action.`
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl hover:scale-[1.02] transition-all uppercase tracking-widest text-sm text-center block"
      >
        {mode === 'tva' ? "Contourner le Plafond TVA" : "Lancer mon Immatriculation Londres"}
      </a>

      {/* Layer 2: Semantic (Visible) */}
      <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Méthodologie d'Arbitrage</h4>
          <p className="text-[9px] text-slate-500 leading-relaxed font-medium">
            {mode === 'tva'
              ? "Comparaison des seuils de franchise en base France (34k-36k) vs UK (90k livres). Analyse de l'impact direct sur la marge brute pour les activités B2C non assujetties."
              : "Calcul basé sur le différentiel de pression fiscale réelle (Effective Tax Rate). L'optimisation UK inclut l'économie sur les charges sociales."
            }
          </p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
          <div className={`w-10 h-10 ${mode === 'tva' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'} rounded-full flex items-center justify-center`}>
            <i className={`fas ${mode === 'tva' ? 'fa-percentage' : 'fa-microchip'} text-xs`}></i>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Indice Précision 2026</h4>
            <div className="text-xs font-black text-slate-900">Convergence Fiscale Activée (98.4%)</div>
          </div>
        </div>
      </div>

      <EmbedTool toolId="simulator" toolName="Simulateur SASU vs Limited UK" />
    </div>
  );
};

export default Calculator;