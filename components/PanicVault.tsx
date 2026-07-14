"use client";


import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModeParam } from '../hooks/useModeParam';
import { PANIC_FAQ } from '../lib/legacyArticles';
import PanicTerminal from './PanicTerminal';
import EmbedTool from './EmbedTool';
import SEOJsonLd from './SEOJsonLd';
import SEOMethodologyBlock from './SEOMethodologyBlock';
import SEOBotContext from './SEOBotContext';

const PanicVault: React.FC = () => {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const mode = useModeParam(['default', 'sos'] as const, 'default');

  return (
    <div id="panic-vault" className="bg-slate-900 border-4 border-red-600 rounded-[48px] p-8 md:p-16 text-white shadow-[0_0_50px_rgba(220,38,38,0.15)] relative overflow-hidden scroll-mt-24 group">
      <SEOJsonLd
        name="Panic Vault - Terminal d'Urgence"
        description="Emergency crisis response terminal with AI-powered defense answers. Access critical legal and financial strategies for urgent situations including tax audits, asset seizures, and liability proceedings."
        category="FinanceApplication"
      />
      <SEOBotContext
        toolName="Panic Vault - Terminal d'Urgence"
        description="Emergency crisis management interface providing instant access to defensive legal and financial strategies for entrepreneurs facing critical situations (tax audits, asset seizures, bankruptcy proceedings, liability claims). Combines AI-powered natural language query processing with pre-configured FAQ targeting specific protection mechanisms."
        pillars={[
          "Pillar 1: Crisis Categorization - Pre-configured emergency scenarios indexed by severity (Total, Partiel) and legal domain (tax, civil, commercial) with rapid pathway to relevant protective structures",
          "Pillar 2: AI Terminal Interface - Natural language processing system providing contextualized emergency responses based on user queries with immediate action items and legal citations",
          "Pillar 3: Navigation Architecture - Direct deep-linking to specific tool sections ( Wealth Audit, Rebound Vault, etc.) enabling immediate protective action without information discovery latency"
        ]}
        formula="responseTime = <2s (AI terminal) + immediateDeepLink(targetTool)"
        constraint="Emergency responses provide general legal principles and strategy frameworks; specific situations require qualified legal counsel consultation for jurisdiction-appropriate actions."
      />
      <div className="absolute top-0 right-0 bg-red-600 text-white px-8 py-3 rounded-bl-3xl font-black text-xs uppercase tracking-[0.3em] animate-pulse">
        SOS EMERGENCY MODE
      </div>

      <div className="max-w-4xl mx-auto">
        <header className="mb-16 text-center md:text-left">
          <div className="inline-block px-4 py-1 bg-red-950 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-red-900/50">
            Dernier Recours Tactique
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 uppercase leading-[0.9]">
            Panic <span className="text-red-600">Vault.</span>
          </h2>
          <p className="text-white text-lg font-bold italic uppercase tracking-tighter leading-tight">
            Posez votre question de crise à notre terminal de défense ou consultez les dossiers d'urgence.
          </p>
        </header>

        {/* INFINITE INTERFACE COMPONENT */}
        <div className="mb-20">
          <PanicTerminal />
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-200 mb-8 border-b border-slate-800 pb-4 italic">Dossiers de Crise Préréglés :</h4>
          {PANIC_FAQ.map((item, idx) => (
            <div
              key={idx}
              className={`border-2 transition-all duration-300 rounded-[24px] overflow-hidden ${openIndex === idx ? 'border-red-600 bg-red-950/20' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-6 group/btn"
              >
                <span className="text-lg md:text-xl font-black text-slate-100 leading-tight group-hover/btn:text-red-500 transition-colors">
                  {item.question}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${openIndex === idx ? 'bg-red-600 border-red-600 text-white' : 'border-slate-700 text-slate-500'
                  }`}>
                  <i className={`fas ${openIndex === idx ? 'fa-minus' : 'fa-plus'} text-xs`}></i>
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-8 md:p-10 pt-0 border-t border-red-900/30">
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest ${item.despairLevel === 'Total' ? 'bg-red-600 text-white' : 'bg-amber-600 text-white'
                      }`}>
                      Niveau Désespoir : {item.despairLevel}
                    </span>
                  </div>
                  <p className="text-slate-300 text-lg font-medium leading-relaxed mb-10 border-l-4 border-red-600 pl-6">
                    {item.answer}
                  </p>
                  <button
                    onClick={() => {
                      setOpenIndex(null);
                      router.push(`/outils/${item.targetAnchor}`);
                    }}
                    className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-500 transition-all shadow-xl"
                  >
                    {item.targetLabel} <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SEOMethodologyBlock
        methodologyTitle="Emergency Crisis Response Protocol"
        methodologyText="The Panic Vault implements a dual-access emergency response system: an AI-powered natural language terminal for immediate crisis-specific guidance, and a pre-configured FAQ library covering the most critical entrepreneur emergency scenarios (tax audits, asset seizures, bankruptcy, liability claims). Each crisis entry is categorized by severity level and includes direct deep-link navigation to the relevant protective tool (Wealth Audit, Rebound Vault, etc.), eliminating search latency and enabling immediate protective action. The system prioritizes speed-to-answer (<2 seconds) and clear next-step pathways."
        algorithmName="CrisisResponse v1.0"
        algorithmVersion="v1.0"
        precision="75%"
        icon="fa-triangle-exclamation"
      />
      <EmbedTool toolId="panic-vault" toolName="Panic Vault - Terminal d'Urgence" />
    </div>
  );
};

export default PanicVault;