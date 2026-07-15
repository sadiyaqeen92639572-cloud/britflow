"use client";

import React, { useState, useMemo } from 'react';
import { useModeParam } from '../hooks/useModeParam';
import { getWhatsAppLink } from '../services/whatsapp';
import EmbedTool from './EmbedTool';
import SEOJsonLd from './SEOJsonLd';
import SEOMethodologyBlock from './SEOMethodologyBlock';
import SEOBotContext from './SEOBotContext';

const VALID_MODES = ['divorce', 'seizure', 'social', 'blackmail', 'perks'] as const;

const DirectorProtectionHub: React.FC = () => {
  const initialMode = useModeParam(VALID_MODES, 'seizure');
  const [riskType, setRiskType] = useState<'divorce' | 'seizure' | 'social' | 'blackmail' | 'perks'>(initialMode);

  const getRiskDetails = () => {
    switch (riskType) {
      case 'divorce': return {
        title: "Protection Anti-Partage",
        desc: "L'interposition d'une Limited UK avec des statuts spécifiques permet d'isoler la valeur de l'entreprise du patrimoine matrimonial.",
        shield: "Niveau 4/5"
      };
      case 'seizure': return {
        title: "Immunité aux Créanciers",
        desc: "Les parts d'une Limited sont soumises à la Common Law. Une saisie française (ATD) est inopérante sur les titres UK.",
        shield: "Niveau 5/5"
      };
      case 'social': return {
        title: "Flexibilité du Train de Vie",
        desc: "Le Director's Loan Account remplace le risque d'Abus de Biens Sociaux par une gestion comptable transparente.",
        shield: "Niveau 3/5"
      };
      case 'blackmail': return {
        title: "Désarmement Chantage Salarié",
        desc: "Les contrats anglais (Consultancy Agreement) ou la prestation B2B UK suppriment le lien de subordination et le risque Prud'homal.",
        shield: "Niveau 5/5"
      };
      case 'perks': return {
        title: "Optimisation Véhicule & Avantages",
        desc: "Le système des BIK (Benefit in Kind) anglais permet de chiffrer légalement l'usage privé d'actifs pro (Porsche, Tesla) sans risque pénal.",
        shield: "Niveau 4/5"
      };
    }
  };

  const details = getRiskDetails();

  // Dynamic SEO Data
  const seoData = useMemo(() => {
    switch (riskType) {
      case 'divorce':
        return {
          jsonTitle: "Divorce Asset Protection Shield",
          jsonDesc: "Protect business assets from divorce settlements using UK Limited structure.",
          pillar1: "Matrimonial Ring-Fencing (UK vs FR Law)",
          algoName: "DivorceShield v2.1"
        };
      case 'seizure':
        return {
          jsonTitle: "Creditor Immunity & ATD Protection",
          jsonDesc: "Legal shield against French administrative seizures (ATD) and creditor claims.",
          pillar1: "Cross-Border Enforcement Barrier",
          algoName: "SeizureBlock v5.0"
        };
      case 'social':
        return {
          jsonTitle: "ABS Risk Mitigation Protocol",
          jsonDesc: "Director's Loan Account structure to mitigate Abus de Biens Sociaux risks.",
          pillar1: "Director's Loan Account Governance",
          algoName: "CorpGov Shield v3.0"
        };
      case 'blackmail':
        return {
          jsonTitle: "Employment Risk Neutralizer",
          jsonDesc: "Mitigate employee disputes and labor court risks using UK B2B contracts.",
          pillar1: "B2B Consultancy Agreements",
          algoName: "LaborShield v4.0"
        };
      case 'perks':
        return {
          jsonTitle: "Corporate Asset Benefit Optimizer",
          jsonDesc: "Optimize company cars and benefits in kind under UK tax law.",
          pillar1: "Benefit in Kind (BIK) Valuation",
          algoName: "PerksOptim v2.0"
        };
    }
  }, [riskType]);

  return (
    <div id="director-protection" className="bg-slate-900 border-4 border-emerald-500 rounded-[40px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden scroll-mt-24 group">
      <SEOJsonLd
        name={seoData.jsonTitle}
        description={seoData.jsonDesc}
        category="LegalService"
      />

      <SEOBotContext
        toolName={`Director Protection Hub - ${details.title}`}
        description={`Legal resilience analysis tool focusing on ${details.title}. Evaluates protection level against ${riskType} risks using UK Limited structure mechanisms.`}
        pillars={[
          `Pillar 1: ${seoData.pillar1}`,
          "Pillar 2: Jurisdiction Arbitrage (Common Law vs Civil Law)",
          "Pillar 3: Corporate Veil Integrity"
        ]}
        formula={`Protection Level = ${details.shield}`}
        constraint="Effective protection requires the UK structure to have real economic substance and not be a sham arrangement."
      />

      <div className="absolute top-0 right-0 bg-emerald-500 text-slate-900 px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest">
        Asset Defense Protocol v5.1
      </div>

      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 uppercase leading-none">
            Bouclier de <span className="text-emerald-500">Protection Personnelle</span>
          </h2>
          <p className="text-white font-bold italic uppercase tracking-tighter text-xs">Sécurisez votre vie privée et vos actifs contre les tiers</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="space-y-4">
            {(['seizure', 'divorce', 'social', 'blackmail', 'perks'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setRiskType(type)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group/item ${riskType === type ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl scale-[1.02]' : 'bg-slate-800 border-slate-700 text-slate-100 hover:border-slate-600'
                  }`}
              >
                <div className="flex flex-col">
                  <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${riskType === type ? 'text-white' : 'text-slate-400'}`}>Risque</span>
                  <span className="text-sm font-black uppercase">
                    {type === 'seizure' ? 'Saisie & ATD' :
                      type === 'divorce' ? 'Divorce & Partage' :
                        type === 'social' ? 'Abus de Bien Social' :
                          type === 'blackmail' ? 'Chantage / Prud\'hommes' :
                            'Voitures / Avantages'}
                  </span>
                </div>
                <i className={`fas ${type === 'seizure' ? 'fa-hand-holding-usd' :
                  type === 'divorce' ? 'fa-ring-slash' :
                    type === 'social' ? 'fa-user-shield' :
                      type === 'blackmail' ? 'fa-gavel' :
                        'fa-car'
                  } text-xl opacity-50`}></i>
              </button>
            ))}
          </div>

          <div className="bg-slate-800/50 rounded-3xl p-8 border border-emerald-900/50 flex flex-col justify-between">
            <div>
              <h4 className="text-emerald-400 font-black text-xs uppercase mb-4 tracking-widest">{details.title}</h4>
              <p className="text-slate-100 text-sm font-medium leading-relaxed mb-6">
                {details.desc}
              </p>
            </div>
            <div className="pt-6 border-t border-emerald-900/50 flex items-center justify-between">
              <span className="text-[10px] font-black text-white uppercase">Indice de Protection :</span>
              <span className="text-emerald-500 font-black text-lg">{details.shield}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row gap-6 items-center bg-emerald-950/30 p-6 rounded-3xl border border-emerald-900/50">
          <div className="text-[9px] font-bold text-white uppercase leading-tight italic">
            * L'interposition d'une structure UK crée un "Ecran Juridique International" rendant la saisie de parts sociales impossible sans une procédure de Common Law au UK.
          </div>
          <a
            href={getWhatsAppLink(`Bonjour, je souhaite un audit privé Societe Anglaise concernant ma protection personnelle (${details.title}).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap bg-white text-emerald-900 font-black px-8 py-4 rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl text-center"
          >
            Demander l'Audit Privé
          </a>
        </div>
      </div>

      <SEOMethodologyBlock
        methodologyTitle={`Protocole de Défense : ${details.title}`}
        methodologyText={`Analyse des mécanismes de protection offerts par la structure Limited britannique contre le risque spécifié (${riskType}). Le système évalue la résilience juridique de l'écran corporatif (Corporate Veil) face aux tentatives de pénétration par des tiers (créanciers, ex-conjoints, plaignants). L'interposition d'une entité de Common Law crée une barrière juridictionnelle nécessitant une procédure d'exequatur complexe pour atteindre les actifs sous-jacents.`}
        algorithmName={seoData.algoName}
        algorithmVersion="5.1"
        precision="92%"
        icon="fa-shield-halved"
      />

      <EmbedTool toolId="director-protection" toolName="Director Protection Hub" />
    </div>
  );
};

export default DirectorProtectionHub;