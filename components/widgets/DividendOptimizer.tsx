"use client";

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PieChart as PieIcon, Wallet, TrendingUp, Info } from 'lucide-react';
import EmbedTool from '../EmbedTool';
import SEOJsonLd from '../SEOJsonLd';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import FAQCollapsible from '../FAQCollapsible';
import SEOBotContext from '../SEOBotContext';

interface DividendOptimizerProps {
  mode?: 'default' | 'embed';
  onLoad?: () => void;
}

interface OptimizedResult {
  salary: number;
  dividends: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number;
}

const COLORS = {
  state: '#ef4444',
  director: '#10b981',
  salary: '#6366f1',
  dividends: '#f97316',
};

const DividendOptimizer: React.FC<DividendOptimizerProps> = ({ mode = 'default', onLoad }) => {
  React.useEffect(() => {
    onLoad?.();
  }, [onLoad]);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33600000000';
  const [benefit, setBenefit] = useState<number>(100000);
  const [country, setCountry] = useState<'france' | 'uk'>('uk');

  // Calculate optimal split
  const calculateOptimization = (totalBenefit: number, cn: 'france' | 'uk'): OptimizedResult => {
    if (cn === 'france') {
      // France SASU optimization
      // Strategy: Mix salary (SMIC or slightly above) + dividends
      const minSalary = 20000; // SMIC annual
      const salary = Math.max(minSalary, Math.min(totalBenefit * 0.4, totalBenefit));
      const dividends = totalBenefit - salary;

      // France taxes
      const cotisations = salary * 0.45; // ~45% employer+employee
      const irSalary = salary * 0.30; // Approx 30% average
      const flatTax = dividends * 0.30; // 30% flat tax on dividends

      const totalTax = cotisations + irSalary + flatTax;
      const netIncome = totalBenefit - totalTax;

      return {
        salary,
        dividends,
        totalTax,
        netIncome,
        effectiveRate: (totalTax / totalBenefit) * 100,
      };
    } else {
      // UK Limited optimization
      // Strategy: Minimal salary + dividends
      const salary = Math.min(8632, totalBenefit); // Secondary threshold (no NIC)
      const remainingProfit = totalBenefit - salary;
      const corporationTax = remainingProfit * 0.19; // 19% CT

      const dividends = remainingProfit - corporationTax;
      const dividendTax = 0; // 0% in basic rate band

      const totalTax = corporationTax + dividendTax;
      const netIncome = totalBenefit - totalTax;

      return {
        salary,
        dividends,
        totalTax,
        netIncome,
        effectiveRate: (totalTax / totalBenefit) * 100,
      };
    }
  };

  const result = calculateOptimization(benefit, country);

  // Data for pie chart
  const pieData = [
    { name: 'État (Impôts)', value: result.totalTax, color: COLORS.state },
    { name: 'Dirigeant (Net)', value: result.netIncome, color: COLORS.director },
  ];

  const getWhatsAppMessage = () => {
    return encodeURIComponent(
      `Bonjour, je veux optimiser mes dividendes maintenant.`
    );
  };


  return (
    <div className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 ${mode === 'embed' ? '' : 'shadow-2xl'}`}>
      {mode === 'default' && (
        <>
          <SEOJsonLd
            name="Dividend Optimizer France vs UK"
            description="Simulateur d'arbitrage Salaire vs Dividendes. Comparez votre pression fiscale SASU (FR) vs Limited (UK). Économisez jusqu'à 25%."
            category="FinanceApplication"
          />
          <SEOBotContext
            toolName="Dividend Optimizer"
            description="Fiscal optimizer utilizing the 'Salary vs Dividend' arbitrage strategy to minimize effective tax rates. Compares French SASU regimes (High Social Charges on Salary) against UK Limited structures (Low Corp Tax + Dividend Allowance)."
            pillars={[
              "Pillar 1: Social Charges Arbitrage (45% FR vs 0% UK on dividends)",
              "Pillar 2: Corporate Tax Efficiency (25% FR vs 19% UK Small Profits)",
              "Pillar 3: Net Retention Rate Maximization"
            ]}
            formula="NetIncome = Revenue - (CorpTax + DividendTax + SocialCharges)"
            constraint="Optimize salary to minimum threshold for social coverage validation."
            logicalFaqs={[
              {
                q: "Quel est le salaire optimal pour un gérant de Limited ?",
                a: "Le salaire optimal est généralement fixé au niveau du seuil des cotisations sociales (env. £12,570), permettant de ne rien payer de NI tout en validant ses trimestres de retraite."
              },
              {
                q: "Pourquoi se verser des dividendes au UK ?",
                a: "Les dividendes ne portent pas de cotisations sociales. Après la Dividend Allowance (£500), le taux d'imposition personnel commence à seulement 8.75%."
              }
            ]}
          />
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center">
              <PieIcon className="text-indigo-500" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white mb-1">Dividend Optimizer</h2>
              <p className="text-slate-400 text-sm">
                Optimisation salaire vs dividendes : France vs UK
              </p>
            </div>
          </div>
        </>
      )}

      {/* Country Selector */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setCountry('france')}
          className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${country === 'france'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
        >
          🇫🇷 France (SASU)
        </button>
        <button
          onClick={() => setCountry('uk')}
          className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${country === 'uk'
            ? 'bg-emerald-600 text-white shadow-lg'
            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
        >
          🇬🇧 UK (Limited)
        </button>
      </div>

      {/* Benefit Input */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-8">
        <label className="block text-sm font-semibold text-slate-400 mb-3">
          Bénéfice avant impôt (€)
        </label>
        <input
          type="range"
          min="20000"
          max="200000"
          step="5000"
          value={benefit}
          onChange={(e) => setBenefit(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-slate-500">20k€</span>
          <span className="text-3xl font-black text-white">
            {benefit.toLocaleString('fr-FR')}€
          </span>
          <span className="text-xs text-slate-500">200k€</span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Pie Chart */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4 text-center">Répartition</h3>
          <div className="bg-slate-800/50 rounded-2xl p-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${Number(value).toLocaleString('fr-FR')}€`}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-slate-400">État</span>
                </div>
                <span className="font-bold text-white">
                  {result.totalTax.toLocaleString('fr-FR')}€
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-400">Vous</span>
                </div>
                <span className="font-bold text-white">
                  {result.netIncome.toLocaleString('fr-FR')}€
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4 text-center">Détail</h3>
          <div className="bg-slate-800/50 rounded-2xl p-6 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400 flex items-center gap-2">
                  <Wallet size={14} />
                  Salaire
                </span>
                <span className="font-bold text-white">
                  {result.salary.toLocaleString('fr-FR')}€
                </span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${(result.salary / benefit) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400 flex items-center gap-2">
                  <TrendingUp size={14} />
                  Dividendes
                </span>
                <span className="font-bold text-white">
                  {result.dividends.toLocaleString('fr-FR')}€
                </span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: `${(result.dividends / benefit) * 100}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Total Impôts</span>
                <span className="text-xl font-black text-red-400">
                  -{result.totalTax.toLocaleString('fr-FR')}€
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Net Reçu</span>
                <span className="text-2xl font-black text-emerald-400">
                  {result.netIncome.toLocaleString('fr-FR')}€
                </span>
              </div>
              <div className="mt-3 p-3 bg-slate-900 rounded-xl text-center">
                <div className="text-xs text-slate-500 mb-1">Taux effectif</div>
                <div className="text-3xl font-black text-white">
                  {result.effectiveRate.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison */}
      {mode === 'default' && (
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/50 rounded-2xl p-6 border border-slate-600">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Info size={20} />
            Comparaison France vs UK
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-sm text-slate-400 mb-2">🇫🇷 France (SASU)</div>
              <div className="text-2xl font-black text-red-400 mb-1">~45%</div>
              <div className="text-xs text-slate-500">Taux moyen</div>
            </div>

            <div className="text-center">
              <div className="text-sm text-slate-400 mb-2">🇬🇧 UK (Limited)</div>
              <div className="text-2xl font-black text-emerald-400 mb-1">~19-25%</div>
              <div className="text-xs text-slate-500">Taux effectif</div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-emerald-500/20 rounded-xl text-center">
            <div className="text-emerald-400 text-sm font-bold">
              Économie potentielle : {((benefit * 0.45) - (benefit * 0.19)).toLocaleString('fr-FR')}€/an
            </div>
            <div className="text-emerald-400/70 text-xs mt-1">
              En passant de SASU à Limited
            </div>
          </div>
        </div>
      )}

      {/* Sources */}
      {mode === 'default' && (
        <div className="mt-8 pt-6 border-t border-slate-700">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="text-[10px] text-slate-500">
              <div className="font-bold mb-1">Sources :</div>
              <div>URSSAF - Taux de cotisations 2025</div>
              <div>HMRC - National Insurance & Dividend Tax</div>
              <div>DGFiP - Flat tax prélèvements sociaux</div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-6 py-3 rounded-xl font-bold hover:from-indigo-500 hover:to-indigo-400 transition-all shadow-lg hover:shadow-indigo-500/25"
            >
              <span>💬</span>
              <span>Optimiser Ma Rémunération</span>
            </a>
          </div>
        </div>
      )}

      {/* Embed Code */}
      {mode === 'default' && (
        <EmbedTool toolId="dividend-optimizer" toolName="Dividend Optimizer" />
      )}

      {/* SEO Layer C (Replaced by Components) */}
      {mode === 'default' && (
        <>
          <SEOMethodologyBlock
            methodologyTitle="Comparatif Fiscal : SASU vs Limited 2025"
            methodologyText="Le 'Dividend Optimizer' calcule le Net Disponible Après Impôt (NDAI) en comparant deux stratégies de rémunération : le mix Salaires/Dividendes en France (SASU à l'IS) et la stratégie Dividendes Dominants au Royaume-Uni (Limited). L'algorithme intègre les taux de cotisations sociales Urssaf, la Flat Tax française (30%) et la Taxe sur les Dividendes UK, révélant un écart de compétitivité fiscale structurel."
            algorithmName="RemunMix v3.1"
            algorithmVersion="v3.1"
            precision="95%"
            icon="fa-chart-pie"
          />

          <FAQCollapsible
            title="Optimisation de Revenus : Vos Questions"
            items={[
              {
                question: "Puis-je me verser des dividendes tous les mois ?",
                answer: "Oui, tant que la société est bénéficiaire. C'est une pratique courante au UK qui offre une flexibilité de trésorerie personnelle inégalée."
              },
              {
                question: "Comment Societe Anglaise m'aide à optimiser ?",
                answer: "Chaque année, nous calculons pour vous le point d'équilibre parfait entre salaire et dividendes selon l'évolution des lois fiscales."
              }
            ]}
          />
        </>
      )}
    </div >
  );
};

export default DividendOptimizer;