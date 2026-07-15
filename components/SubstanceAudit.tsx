"use client";


import React, { useState, useMemo } from 'react';
import { useModeParam } from '../hooks/useModeParam';
import { getSubstanceAudit } from '../services/aiClient';
import { getWhatsAppLink } from '../services/whatsapp';
import FormattedText from './FormattedText';
import EmbedTool from './EmbedTool';
import SEOJsonLd from './SEOJsonLd';
import SEOMethodologyBlock from './SEOMethodologyBlock';
import SEOBotContext from './SEOBotContext';
import FAQCollapsible from './FAQCollapsible';

const SubstanceAudit: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const mode = useModeParam(['default', 'control'] as const, 'default');

  const questions = [
    "Avez-vous un bureau physique à Londres (ou une adresse de prestige avec service de gestion) ?",
    "Le directeur de la société est-il résident britannique ?",
    "Les décisions stratégiques sont-elles prises lors de réunions au Royaume-Uni ?",
    "La société dispose-t-elle d'un compte bancaire local (ex: Barclays, HSBC UK) ?"
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      generateReport(newAnswers);
    }
  };

  const generateReport = async (finalAnswers: string[]) => {
    setLoading(true);
    // If control mode, we might want to prompt Gemini differently, but let's stick to standard audit for now.
    // The visual reassurance is key.
    const result = await getSubstanceAudit(finalAnswers);
    setReport(result);
    setLoading(false);
  };

  // Dynamic SEO Configuration
  const seoConfig = useMemo(() => {
    if (mode === 'control') {
      return {
        title: "Bouclier Anti-Contrôle Fiscal & Substance",
        desc: "Préparez votre défense face à un contrôle fiscal en blindant votre substance économique (Mind & Management).",
        methTitle: "Défense d'Urgence : Test de Résilience",
        methText: "Analyse binaire des critères de matérialité utilisés par le fisc lors d'un contrôle (locaux, personnel, flux). Identification immédiate des 'Red Flags' pouvant entraîner une qualification d'établissement stable.",
        pillar: "Risk Mitigation Protocol",
        algoName: "ControlDefense v5.0",
        icon: "fa-siren-on"
      };
    }
    return {
      title: "Audit de Substance Économique UK",
      desc: "Vérifiez la conformité de votre société UK avec les critères de réalité économique (Substance) pour éviter la requalification.",
      methTitle: "Conformité Substance & Jurisprudence UK",
      methText: "Évaluation de la conformité aux principes de l'arrêt Cadbury Schweppes. Vérification de l'adéquation entre les actifs, les employés et le chiffre d'affaires généré par la structure.",
      pillar: "Cadbury Schweppes Compliance",
      algoName: "SubstanceValidator v3.2",
      icon: "fa-fingerprint"
    };
  }, [mode]);

  return (
    <div id="substance-audit" className={`bg-slate-950 text-white p-8 md:p-12 rounded-[48px] shadow-2xl border-4 ${mode === 'control' ? 'border-red-600' : 'border-emerald-500'} scroll-mt-24 relative overflow-hidden group`}>
      <SEOJsonLd
        name={seoConfig.title}
        description={seoConfig.desc}
        category="LegalService"
      />

      <SEOBotContext
        toolName={seoConfig.title}
        description={seoConfig.desc}
        pillars={[
          `Pillar 1: ${seoConfig.pillar}`,
          "Pillar 2: Management & Control Test",
          "Pillar 3: Physical Nexus Assessment"
        ]}
        formula="Risk = 1 - (SubstanceScore / MaxScore)"
        constraint="Critical Failure if Direction Effective is located in France."
      />

      <div className={`absolute top-0 right-0 ${mode === 'control' ? 'bg-red-600' : 'bg-emerald-500'} text-slate-900 px-6 py-2 rounded-bl-2xl font-black text-[10px] uppercase tracking-widest z-20`}>
        {mode === 'control' ? 'URGENCE FISCAL' : 'CONFORMITÉ IA'}
      </div>

      <div className={`absolute -top-24 -right-24 w-48 h-48 ${mode === 'control' ? 'bg-red-600/10 group-hover:bg-red-600/20' : 'bg-emerald-500/10 group-hover:bg-emerald-500/20'} rounded-full blur-3xl pointer-events-none transition-all duration-700`}></div>

      <h2 className="text-3xl font-black mb-2 flex items-center gap-3 uppercase tracking-tighter mt-4">
        <i className={`fas ${mode === 'control' ? 'fa-siren-on text-red-500' : 'fa-fingerprint text-emerald-400'}`}></i>
        {mode === 'control' ? (
          <>Bouclier <span className="text-red-500">Anti-Contrôle</span></>
        ) : (
          <>Audit de <span className="text-emerald-400">Substance</span></>
        )}
      </h2>
      <p className="text-white mb-8 font-bold uppercase text-[10px] tracking-widest">
        {mode === 'control'
          ? "Mise en place immédiate de la défense (ESFP/IS). Testez votre étanchéité."
          : "Le rempart n°1 contre la requalification fiscale (Art. 209-I CGI)"
        }
      </p>

      {!report && !loading && (
        <div className="space-y-8 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <span className={`text-[10px] font-black uppercase tracking-widest ${mode === 'control' ? 'text-red-500/50' : 'text-emerald-500/50'}`}>
              {mode === 'control' ? 'DÉFENSE NIVEAU' : 'SÉCURISATION NIVEAU'} {step + 1}
            </span>
            <div className="w-32 h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full ${mode === 'control' ? 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'} rounded-full transition-all duration-500`}
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="text-xl font-black leading-tight tracking-tight text-white h-16">{questions[step]}</p>
          <div className="flex gap-4">
            <button
              onClick={() => handleAnswer("Oui")}
              className={`flex-1 py-5 ${mode === 'control' ? 'bg-red-600 hover:bg-red-500 shadow-red-900/40' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/40'} text-white rounded-2xl font-black transition-all shadow-xl uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-95`}
            >
              Oui
            </button>
            <button
              onClick={() => handleAnswer("Non")}
              className="flex-1 py-5 bg-slate-900 hover:bg-slate-800 text-slate-400 rounded-2xl font-black transition-all border border-slate-800 uppercase text-xs tracking-widest"
            >
              Non / Doute
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 animate-pulse">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full border-2 ${mode === 'control' ? 'border-red-500/30' : 'border-emerald-500/30'} animate-ping`}></div>
            <i className={`fas fa-shield-virus text-4xl ${mode === 'control' ? 'text-red-500' : 'text-emerald-400'} mb-6 relative`}></i>
          </div>
          <p className={`text-[10px] font-black uppercase tracking-widest ${mode === 'control' ? 'text-red-500' : 'text-emerald-400'}`}>
            {mode === 'control' ? "Construction de la défense..." : "Analyse de conformité IA en cours..."}
          </p>
        </div>
      )}

      {report && (
        <div className="animate-fade-in">

          <div className={`bg-white p-8 rounded-3xl border-4 ${mode === 'control' ? 'border-red-600' : 'border-emerald-500'} shadow-2xl mb-8 relative`}>
            <div className={`absolute -top-4 -left-4 ${mode === 'control' ? 'bg-red-600' : 'bg-emerald-500'} text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg`}>
              <i className="fas fa-check-double"></i>
            </div>
            <h3 className={`text-xs font-black ${mode === 'control' ? 'text-red-700' : 'text-emerald-600'} mb-6 uppercase tracking-widest flex items-center gap-2`}>
              <i className="fas fa-shield-check"></i> {mode === 'control' ? "Stratégie de Défense" : "Rapport de Validité Juridique"}
            </h3>
            <div className="text-slate-900">
              <FormattedText text={report} />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <a
              href={getWhatsAppLink(mode === 'control'
                ? `URGENCE CONTROLE : J'ai fait l'audit, j'ai besoin d'un avocat fiscaliste immédiatement. Voici mes réponses...`
                : `Bonjour, j'ai terminé l'audit de substance Societe Anglaise et je souhaite obtenir mon certificat de conformité.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full ${mode === 'control' ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900'} font-black py-5 rounded-2xl text-xs uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 text-center`}
            >
              {mode === 'control' ? <><i className="fas fa-gavel"></i> Parler à un Avocat (Urgence)</> : <><i className="fas fa-download"></i> Obtenir mon Certificat</>}
            </a>
            <button
              onClick={() => { setStep(0); setAnswers([]); setReport(null); }}
              className={`text-white hover:${mode === 'control' ? 'text-red-400' : 'text-emerald-400'} transition-colors text-[10px] font-black uppercase tracking-widest text-center`}
            >
              Réinitialiser
            </button>
          </div>
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-slate-900/50 flex items-center justify-between opacity-50">
        <span className="text-[8px] font-black uppercase tracking-widest text-white">Societe Anglaise Compliance Standard 2025</span>
        <i className="fas fa-lock text-[8px]"></i>
      </div>
      <EmbedTool toolId="substance-audit" toolName="Substance Audit IA" />

      <SEOMethodologyBlock
        methodologyTitle={seoConfig.methTitle}
        methodologyText={seoConfig.methText}
        algorithmName={seoConfig.algoName}
        algorithmVersion="v5.0"
        precision="99.8%"
        icon={seoConfig.icon}
      />

      <FAQCollapsible
        title="FAQ : Substance & Contrôle Fiscal"
        items={[
          {
            question: "Qu'appelle-t-on 'Substance Économique' pour une société étrangère ?",
            answer: "La substance est la preuve matérielle que votre société exerce une activité réelle dans son pays d'immatriculation. Elle repose sur 3 piliers : des locaux (bureaux), des moyens humains (directeur, employés), et une prise de décision effective sur place (Conseil d'administration)."
          },
          {
            question: "Est-ce que louer un bureau virtuel (Virtual Office) suffit ?",
            answer: "Non. Une simple adresse de domiciliation (boîte aux lettres) est un 'Red Flag' immédiat pour le fisc français. Vous devez disposer d'un espace de travail réel (bureau privatif ou coworking dédié) et pouvoir prouver que vous y travaillez régulièrement."
          },
          {
            question: "Risque-t-on la prison pour une société sans substance ?",
            answer: "Le défaut de substance entraîne principalement une requalification fiscale (paiement de l'impôt en France + 80% de pénalités pour manœuvres frauduleuses). Le risque pénal (fraude fiscale) n'est enclenché que pour les montages complexes et intentionnels visant à éluder l'impôt massivement."
          },
          {
            question: "Le directeur (Nominee Director) peut-il habiter en France ?",
            answer: "C'est très risqué. Si le dirigeant de fait habite en France et prend toutes les décisions depuis son salon français, la société sera considérée comme fiscalement résidente en France (Siège de Direction Effective). L'idéal est un directeur résidant au UK ou des déplacements mensuels prouvés."
          }
        ]}
      />
    </div>
  );
};

export default SubstanceAudit;