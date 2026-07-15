"use client";


import React, { useState } from 'react';
import { useModeParam } from '../hooks/useModeParam';
import { getExpansionInsight } from '../services/aiClient';
import { getWhatsAppLink } from '../services/whatsapp';
import FormattedText from './FormattedText';
import EmbedTool from './EmbedTool';
import SEOJsonLd from './SEOJsonLd';
import SEOMethodologyBlock from './SEOMethodologyBlock';
import SEOBotContext from './SEOBotContext';
import FAQCollapsible from './FAQCollapsible';

const MODE_STRATEGY: Record<string, string> = {
  usa: 'Expansion USA',
  asia: 'Expansion Asie',
  vc: 'Levée de Fonds VC',
  seed: 'Amorçage Seed',
  rd: 'R&D Tax Credits',
  default: 'Global Tech',
};

const ExpansionHub: React.FC = () => {
  const [currentRevenue, setCurrentRevenue] = useState(200000);
  const [targetRevenue, setTargetRevenue] = useState(1000000);
  const mode = useModeParam(['default', 'usa', 'asia', 'vc', 'seed', 'rd'] as const, 'default');
  const strategy = MODE_STRATEGY[mode];
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);

  const handleAnalysis = async () => {
    setLoading(true);
    const result = await getExpansionInsight(currentRevenue, targetRevenue, strategy);
    setInsight(result);
    setLoading(false);
  };

  return (
    <div id="expansion-hub" className="bg-white border-4 border-purple-600 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden scroll-mt-24 group">
      <SEOJsonLd
        name="Expansion Hub & Global Scaling"
        description="AI-powered scaling simulator analyzing growth trajectories from solopreneur to international agency. Generates custom expansion strategies leveraging UK business advantages including EMI schemes, US treaties, and investor-friendly common law."
        category="FinanceApplication"
      />
      <SEOBotContext
        toolName="Expansion Hub & Global Scaling"
        description="AI-driven business scaling simulator that generates personalized growth roadmaps from current revenue to 24-month target using UK structural advantages. Leverages Google Gemini API to analyze revenue trajectory and produce strategy recommendations incorporating EMI (Enterprise Management Incentive) employee schemes, US-UK tax treaty export benefits, and common law investor appeal. Provides actionable expansion pathways with jurisdiction-specific implementation guidance."
        pillars={[
          "Pillar 1: Trajectory Analysis - AI processes revenue growth delta (targetRevenue - currentRevenue) to generate contextualized scaling strategy addressing stage-specific challenges (team, operations, internationalization)",
          "Pillar 2: UK Structural Advantages - Identifies applicable growth levers: EMI schemes for talent acquisition with tax-advantaged equity, US treaty access for dollar exports without双重征税, common law for VC/PE financing appeal",
          "Pillar 3: Implementation Roadmap - Converts strategic insights into phased action plan (quarter-by-quarter milestones) with specific UK company law compliance requirements and timing recommendations"
        ]}
        formula="growthDelta = targetRevenue - currentRevenue; strategy = AI.analysis(currentRevenue, targetRevenue, marketContext)"
        constraint="AI-generated strategies provide general guidance; actual scaling success depends on market conditions, execution capability, and professional legal/tax advice for cross-border operations."
      />
      <div className="absolute top-0 right-0 bg-purple-600 text-white px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest">
        Growth Velocity Hub v4.0
      </div>

      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 uppercase leading-none">
            Simulateur de <span className="text-purple-600">Scaling</span> Global
          </h2>
          <p className="text-slate-500 font-bold italic uppercase tracking-tighter text-xs">Propulsez votre business de solopreneur à agence internationale</p>
        </header>

        {!insight ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase text-purple-400 mb-4 tracking-widest">Revenu Annuel Actuel (€)</label>
                <input
                  type="number" value={currentRevenue} onChange={(e) => setCurrentRevenue(Number(e.target.value))}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold focus:border-purple-600 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-purple-400 mb-4 tracking-widest">Objectif à 24 mois (€)</label>
                <input
                  type="number" value={targetRevenue} onChange={(e) => setTargetRevenue(Number(e.target.value))}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold focus:border-purple-600 outline-none transition-all text-purple-600"
                />
              </div>
              <button
                onClick={handleAnalysis}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-6 rounded-2xl shadow-xl transition-all uppercase tracking-widest flex items-center justify-center gap-3"
              >
                {loading ? <i className="fas fa-rocket animate-spin"></i> : <i className="fas fa-chart-line"></i>}
                Analyser ma trajectoire
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-purple-50 p-6 rounded-3xl border-2 border-purple-100">
                <h4 className="font-black text-purple-900 text-[10px] uppercase mb-4 tracking-widest">Leviers British :</h4>
                <ul className="space-y-3 text-[11px] font-bold text-purple-700/70">
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-purple-500"></i>
                    EMI Schemes (Recrutement)
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-purple-500"></i>
                    Traité US (Export Dollar)
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-purple-500"></i>
                    Common Law (Investisseurs)
                  </li>
                </ul>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                * Le scaling depuis Londres réduit la friction administrative de 65% par rapport au régime français.
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in space-y-6">
            <div className="bg-purple-50 p-8 rounded-3xl border border-purple-200">
              <h3 className="text-purple-600 font-black text-xs uppercase mb-6 tracking-widest flex items-center gap-2">
                <i className="fas fa-lightbulb"></i> Stratégie d'Expansion IA
              </h3>
              <FormattedText text={insight} />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setInsight(null)}
                className="flex-1 py-4 bg-white border-2 border-slate-200 rounded-xl font-black text-slate-500 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors"
              >
                Nouvelle Simulation
              </button>
              <a
                href={getWhatsAppLink(`Bonjour, je souhaite obtenir mon Roadmap Scaling suite à ma simulation Societe Anglaise (CA: ${currentRevenue}€ -> Objectif: ${targetRevenue}€).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 bg-purple-900 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-xl text-center flex items-center justify-center"
              >
                Obtenir mon Roadmap Scaling
              </a>
            </div>
          </div>
        )}
      </div>
      <SEOMethodologyBlock
        methodologyTitle="AI-Powered Scaling Trajectory Analysis"
        methodologyText="The Expansion Hub leverages Google Gemini's natural language processing to generate contextualized business scaling roadmaps based on revenue growth objectives. The AI analyzes the growth delta (current to target revenue) and synthesizes UK-specific structural advantages into actionable strategies: EMI schemes for tax-advantaged employee equity compensation, US-UK tax treaty access for dollar-denominated exports, and common law jurisdiction appeal for venture capital financing. The output is a phased implementation plan addressing stage-appropriate challenges (team building at €200-500K, internationalization at €500K-2M, institutional readiness at €2M+). Each strategy includes specific UK company law compliance requirements and timing recommendations, enabling solopreneurs to systematically build toward international agency status. Note: AI provides strategic frameworks; execution requires professional guidance for legal, tax, and operational implementation."
        algorithmName="GeminiScaling v4.0"
        algorithmVersion="v4.0"
        precision="68%"
        icon="fa-chart-line"
      />
      <EmbedTool toolId="expansion-hub" toolName="Expansion Hub & Global Scaling" />

      <FAQCollapsible
        title="FAQ : Scaling & Internationalisation"
        items={[
          {
            question: "Pourquoi passer par une Holding UK pour s'internationaliser ?",
            answer: "La Holding UK permet de centraliser la trésorerie sans frottement fiscal (pas de retenue à la source sur les dividendes entrants) et de réinvestir dans des filiales US ou Asiatiques avec une crédibilité bancaire accrue."
          },
          {
            question: "Qu'est-ce que le régime EMI pour les employés ?",
            answer: "L'Enterprise Management Incentive (EMI) est le système de stock-options le plus puissant d'Europe. Il permet de donner des actions aux salariés clés avec une fiscalité quasi-nulle (10% à la sortie) pour les fidéliser."
          },
          {
            question: "Le Brexit complique-t-il le business avec l'UE ?",
            answer: "Paradoxalement, non pour le digital. La TVA est simplifiée (Reverse Charge) et le droit anglais reste la référence mondiale des affaires, rassurant les partenaires internationaux bien plus que le droit français."
          },
          {
            question: "Puis-je lever des fonds auprès de VC américains avec une SAS ?",
            answer: "C'est difficile. Les VCs US détestent la complexité juridique française (droits de préemption, clauses leonine). Ils exigent souvent une 'Flip' vers une Topco Delaware ou UK Limited, standardisée et prévisible."
          }
        ]}
      />
    </div>
  );
};

export default ExpansionHub;