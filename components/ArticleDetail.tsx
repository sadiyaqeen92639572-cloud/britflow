"use client";


import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { ArticleData } from '../lib/legacyArticles';
import Breadcrumbs from './Breadcrumbs';
import LiabilityRadar from './widgets/LiabilityRadar';
import ExpenseShredder from './widgets/ExpenseShredder';
import FixedCostBurner from './widgets/FixedCostBurner';
import InheritanceShield from './widgets/InheritanceShield';
import RHFrictionMeter from './widgets/RHFrictionMeter';
import BankingAudit from './widgets/BankingAudit';
import FlatTaxTrap from './widgets/FlatTaxTrap';
import FiscalExodusSimulator from './widgets/FiscalExodusSimulator';
// Import other existing widgets if needed for older articles

interface Props {
  article: ArticleData;
  related: ArticleData[];
}

function targetAnchorHref(targetAnchor: string): string {
  if (targetAnchor.startsWith('obs/')) {
    return `/observatoire#${targetAnchor.replace('obs/', '')}`;
  }
  return `/outils/${targetAnchor}`;
}

const ArticleDetail: React.FC<Props> = ({ article, related }) => {
  const router = useRouter();
  const [showSticky, setShowSticky] = React.useState(false);
  const [isBlinking, setIsBlinking] = React.useState(false);
  const mainCtaRef = React.useRef<HTMLDivElement>(null);

  const renderWidget = (widgetName: string) => {
    switch (widgetName) {
      case 'LiabilityRadar': return <div className="my-12"><LiabilityRadar /></div>;
      case 'ExpenseShredder': return <div className="my-12"><ExpenseShredder /></div>;
      case 'FixedCostBurner': return <div className="my-12"><FixedCostBurner /></div>;
      case 'InheritanceShield': return <div className="my-12"><InheritanceShield /></div>;
      case 'RHFrictionMeter': return <div className="my-12"><RHFrictionMeter /></div>;
      case 'BankingAudit': return <div className="my-12"><BankingAudit /></div>;
      case 'FlatTaxTrap': return <div className="my-12"><FlatTaxTrap /></div>;
      case 'FiscalExodusSimulator': return <div className="my-12"><FiscalExodusSimulator /></div>;
      default: return null;
    }
  };

  const getToolCTA = () => {
    switch (article.targetTool) {
      case 'calculator': return "Comparer SASU vs Limited";
      case 'substance': return "Lancer l'Audit de Substance";
      case 'wealth': return "Calculer mon Score de Liberté";
      case 'optimizer': return "Simuler mes Flux de Profits";
      case 'banking': return "Auditer ma Sécurité Bancaire";
      case 'scanner': return "Scanner ma Situation Fiscale";
      case 'are': return "Simuler mon Maintien ARE";
      case 'shield': return "Activer le Bouclier SCI";
      case 'salary': return "Optimiser mon Salaire UK";
      case 'nomad': return "Scanner ma Résidence Nomade";
      case 'rebound': return "Simuler mon Rebond Post-Crise";
      case 'expansion': return "Simuler ma Croissance Globale";
      case 'director-shield': return "Activer mon Bouclier Dirigeant";
      case 'bureaucracy': return "Comparer les Délais Admin";
      case 'liquidation': return "Calculer mon Coût de Sortie";
      case 'privacy': return "Auditer ma Confidentialité";
      case 'bank-matchmaker': return "Trouver ma Banque UK";
      case 'fiscal-watch': return "Consulter le Baromètre";
      case 'urssaf-tracker': return "Voir la Carte URSSAF";
      case 'flat-tax': return "Optimiser ma Flat Tax";
      case 'rh-friction': return "Comparer le Coût RH";
      case 'fixed-costs': return "Réduire mes Coûts Fixes";
      default: return "Utiliser l'Outil Tactique";
    }
  };

  const getCTAMetadata = () => {
    // Cas ultra-spécifiques par slug ou thématique
    if (article.slug.includes('crypto')) {
      return {
        title: "Pourquoi Professionnaliser votre Portefeuille ?",
        subtitle: "La détention perso est un piège fiscal. Passez à une gestion d'actifs institutionnelle.",
        benefits: [
          "Extraction de la Flat Tax 30%",
          "Réinvestissement brut (sans frottement)",
          "Reporting conforme aux standards bancaires"
        ]
      };
    }

    if (article.slug.includes('nomad') || article.slug.includes('expat') || article.slug.includes('exit-tax')) {
      return {
        title: "Pourquoi Préparer votre Liberté ?",
        subtitle: "Une expatriation mal préparée est un risque de redressement sur 10 ans. Sécurisez votre départ.",
        benefits: [
          "Audit de résidence fiscale (Art. 4B CGI)",
          "Stratégie de rupture d'attaches effective",
          "Setup international hors radar Bercy"
        ]
      };
    }

    if (article.slug.includes('substance') || article.slug.includes('stable') || article.slug.includes('esfp') || article.slug.includes('justification')) {
      return {
        title: "Pourquoi Armer votre Conformité ?",
        subtitle: "En cas de contrôle, seule la preuve de substance compte. Ne laissez aucune faille juridique.",
        benefits: [
          "Dossier de défense pré-constitué",
          "Validation de la réalité économique",
          "Zéro point d'accroche pour le vérificateur"
        ]
      };
    }

    // Variantes par catégories
    switch (article.category) {
      case 'Protection':
      case 'Urgence':
        return {
          title: "Pourquoi Sécuriser cette Stratégie ?",
          subtitle: "Un risque ignoré est une menace qui vous condamne. Ne restez pas dans l'incertitude.",
          benefits: [
            "Diagnostic de vulnérabilité immédiat",
            "Plan de protection des actifs (Asset Protection)",
            "Mise en conformité Common Law"
          ]
        };
      case 'Expansion':
        return {
          title: "Pourquoi Simuler votre Croissance ?",
          subtitle: "Passer de solopreneur à une agence globale demande une structure agile et scalable.",
          benefits: [
            "Projection de revenus à l'international",
            "Optimisation des coûts de recrutement",
            "Roadmap de scaling personnalisée"
          ]
        };
      case 'Patrimoine':
      case 'Stratégie':
        return {
          title: "Pourquoi Auditer votre Vision ?",
          subtitle: "La richesse se bâtit sur une décennie. Assurez la pérennité de votre empire.",
          benefits: [
            "Analyse de transmission successorale",
            "Optimisation de la capitalisation long terme",
            "Stratégie de sortie (Exit) sécurisée"
          ]
        };
      case 'Banque':
        return {
          title: "Pourquoi Auditer votre Sécurité ?",
          subtitle: "Le cash est le sang de votre entreprise. Ne laissez pas un tiers couper le flux.",
          benefits: [
            "Évaluation de la résilience bancaire",
            "Setup de trésorerie multi-devises",
            "Protection contre les saisies (ATD)"
          ]
        };
      case 'Optimisation':
      case 'Rémunération':
      case 'Gestion':
        return {
          title: "Pourquoi Chiffrer votre Gain ?",
          subtitle: "Ne laissez pas l'inertie fiscale drainer vos marges. Calculez votre potentiel.",
          benefits: [
            "Simulation de gain net réel",
            "Comparatif France vs UK",
            "Plan d'action immédiat"
          ]
        };
      default:
        return {
          title: "Pourquoi Chiffrer cette Stratégie ?",
          subtitle: "L'expertise théorique ne suffit pas. L'arbitrage fiscal est une science de précision.",
          benefits: [
            "Simulation de gain net réel sur 12 mois",
            "Audit d'efficience structurelle",
            "Plan d'action conforme & actionnable"
          ]
        };
    }
  };

  const cta = getCTAMetadata();

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(targetAnchorHref(article.targetAnchor));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 300;
      setShowSticky(scrollY > threshold);

      if (mainCtaRef.current) {
        const rect = mainCtaRef.current.getBoundingClientRect();
        const isOverlap = rect.top < window.innerHeight && rect.bottom > 0;
        if (isOverlap && scrollY > threshold) {
          setIsBlinking(true);
        } else {
          setIsBlinking(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden relative">
      {/* Sticky Top CTA */}
      <div
        className={`fixed top-[128px] left-1/2 -translate-x-1/2 w-full max-w-4xl z-30 px-6 transition-all duration-500 overflow-hidden ${showSticky && !isBlinking ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
          }`}
      >
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded-lg animate-pulse">
              <i className="fas fa-bolt text-white text-xs"></i>
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{article.category}</p>
              <p className="text-white text-xs font-bold truncate max-w-[200px] md:max-w-md">{article.title}</p>
            </div>
          </div>
          <button
            onClick={handleCtaClick}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
          >
            {article.ctaText || getToolCTA()}
          </button>
        </div>
      </div>

      <div className="p-6 md:p-16">
        <Breadcrumbs
          category={article.category}
          title={article.title}
        />

        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              {article.category}
            </span>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
              Lecture: 6 min
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 leading-[0.95] tracking-tighter uppercase text-left">
            {article.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-12">
            {article.keywords.map(kw => (
              <span key={kw} className="bg-slate-50 text-slate-500 px-4 py-2 rounded-xl text-[11px] font-black uppercase border border-slate-100 shadow-sm">
                #{kw}
              </span>
            ))}
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-[32px] p-8 md:p-12 mb-12">
            <p className="text-xl md:text-2xl text-slate-700 font-black italic leading-tight text-left">
              "{article.excerpt}"
            </p>
          </div>
        </header>

        <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed text-left">
          {(() => {
            const lines = article.content.split('\n');
            const blocks: React.ReactNode[] = [];
            let i = 0;

            while (i < lines.length) {
              const line = lines[i];
              if (line.trim() === '') {
                i++;
                continue;
              }

              // Widget detection
              const widgetMatch = line.match(/\[EMBED_WIDGET: (.*)\]/);
              if (widgetMatch) {
                blocks.push(<React.Fragment key={i}>{renderWidget(widgetMatch[1])}</React.Fragment>);
                i++;
                continue;
              }

              // Callout detection (baromètre / OBSERVATOIRE)
              if (line.startsWith('> [!IMPORTANT]') ||
                line.startsWith('> **OBSERVATOIRE**') ||
                line.startsWith('> OBSERVATOIRE') ||
                line.startsWith('> baromètre') ||
                line.startsWith('> **baromètre**')) {
                let calloutContent = line
                  .replace('> [!IMPORTANT]', '')
                  .replace('> **OBSERVATOIRE**', '')
                  .replace('> OBSERVATOIRE', '')
                  .replace('> baromètre', '')
                  .replace('> **baromètre**', '')
                  .trim();
                i++;
                while (i < lines.length && lines[i].startsWith('> ')) {
                  calloutContent += ' ' + lines[i].replace('> ', '').trim();
                  i++;
                }
                blocks.push(
                  <div key={i} className="my-12 p-8 bg-slate-900 rounded-[32px] border-l-8 border-blue-600 shadow-2xl relative overflow-hidden group text-left">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-bl-full -mr-16 -mt-16 group-hover:bg-blue-600/20 transition-all"></div>
                    <div className="flex items-center gap-3 mb-4">
                      <i className="fas fa-tower-observation text-blue-500 text-xl"></i>
                      <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">Observatoire Societe Anglaise 2026</span>
                    </div>
                    <div className="text-white font-bold text-lg leading-snug">
                      {calloutContent}
                    </div>
                  </div>
                );
                continue;
              }

              // Table detection
              if (line.startsWith('|')) {
                const tableRows: string[] = [];
                while (i < lines.length && lines[i].startsWith('|')) {
                  tableRows.push(lines[i]);
                  i++;
                }

                if (tableRows.length >= 3) {
                  const headerCells = tableRows[0].split('|').filter(c => c.trim() !== '');
                  const bodyRows = tableRows.slice(2);

                  blocks.push(
                    <div key={i} className="my-12 overflow-x-auto rounded-3xl border border-slate-200 shadow-xl">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-900 text-white">
                          <tr>
                            {headerCells.map((cell, ci) => (
                              <th key={ci} className="p-6 text-[10px] font-black uppercase tracking-widest">{cell.trim()}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {bodyRows.map((row, ri) => (
                            <tr key={ri} className="hover:bg-slate-50 transition-colors">
                              {row.split('|').filter(c => c.trim() !== '').map((cell, ci) => (
                                <td key={ci} className="p-6 font-bold text-slate-700 text-sm">{cell.trim()}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                continue;
              }

              // Section detection (##)
              if (line.startsWith('## ')) {
                blocks.push(
                  <h2 key={i} className="text-3xl md:text-4xl font-black text-slate-900 mt-16 mb-8 uppercase tracking-tighter border-b-4 border-blue-600 w-fit pb-1">
                    {line.replace('## ', '').trim()}
                  </h2>
                );
                i++;
                continue;
              }

              // List detection
              if (line.startsWith('* ') || line.startsWith('- ')) {
                blocks.push(
                  <div key={i} className="list-none flex items-start gap-4 mb-4 font-bold text-slate-800 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="fas fa-check text-white text-[10px]"></i>
                    </div>
                    <span>{line.substring(2)}</span>
                  </div>
                );
                i++;
                continue;
              }

              // Standard Paragraph
              blocks.push(
                <p key={i} className="mb-8 font-medium text-lg leading-relaxed first-letter:text-4xl first-letter:font-black first-letter:text-blue-600 first-letter:mr-1">
                  {line}
                </p>
              );
              i++;
            }
            return blocks;
          })()}
        </div>

        {/* CTA SECTION - Linked to the specific tool */}
        <div
          ref={mainCtaRef}
          className={`mt-32 p-10 md:p-16 bg-slate-900 rounded-[48px] text-white flex flex-col md:flex-row justify-between items-center gap-12 shadow-2xl relative overflow-hidden text-left transition-all duration-700 ${isBlinking ? 'scale-105 ring-8 ring-blue-600/30 shadow-[0_0_100px_rgba(37,99,235,0.4)]' : ''
            }`}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]"></div>

          <div className="relative z-10 text-center md:text-left flex-1">
            <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase leading-none text-blue-400">{cta.title}</h3>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em] mb-10 max-w-lg leading-relaxed">{cta.subtitle}</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90 text-[11px] font-black uppercase tracking-widest">
              {cta.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start justify-start gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 text-left">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[8px] flex-shrink-0 mt-0.5">
                    <i className="fas fa-check"></i>
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10">
            <button
              onClick={handleCtaClick}
              className={`bg-blue-600 text-white px-16 py-8 rounded-[32px] font-black shadow-2xl transition-all duration-300 transform active:scale-95 text-sm uppercase tracking-[0.3em] flex flex-col items-center gap-4 group ${isBlinking ? 'animate-pulse' : ''
                }`}
            >
              <span className="group-hover:translate-y-[-2px] transition-transform">{article.ctaText || getToolCTA()}</span>
              <div className="w-12 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white w-1/3 group-hover:translate-x-full transition-transform duration-500"></div>
              </div>
            </button>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-32 pt-16 border-t border-slate-100 text-left">
            <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-400 mb-12 italic text-center">// Maillage Stratégique & Expertise Complémentaire</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/articles/${r.slug}`}
                  className="text-left p-10 bg-white rounded-[40px] border border-slate-100 hover:border-blue-600 transition-all group shadow-sm hover:shadow-2xl hover:-translate-y-2 block"
                >
                  <span className="bg-slate-50 text-slate-500 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-block mb-6 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    {r.category}
                  </span>
                  <span className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-[1.1] block uppercase tracking-tighter mb-4">
                    {r.title}
                  </span>
                  <p className="text-slate-500 text-xs font-medium line-clamp-2 leading-relaxed">
                    {r.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;