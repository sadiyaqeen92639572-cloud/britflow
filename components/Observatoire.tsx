"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import FiscalWatchWidget from './widgets/FiscalWatchWidget';
import UrssafTrackerWidget from './widgets/UrssafTrackerWidget';
import FiscalExodusSimulator from './widgets/FiscalExodusSimulator';
import BureaucracyClock from './widgets/BureaucracyClock';
import TVAShockSimulator from './widgets/TVAShockSimulator';
import DividendOptimizer from './widgets/DividendOptimizer';
import PrivacyScorecard from './widgets/PrivacyScorecard';
import BankMatchmaker from './widgets/BankMatchmaker';
import LiquidationCostCalculator from './widgets/LiquidationCostCalculator';
import LiabilityRadar from './widgets/LiabilityRadar';
import ExpenseShredder from './widgets/ExpenseShredder';
import FixedCostBurner from './widgets/FixedCostBurner';
import InheritanceShield from './widgets/InheritanceShield';
import RHFrictionMeter from './widgets/RHFrictionMeter';
import BankingAudit from './widgets/BankingAudit';
import FlatTaxTrap from './widgets/FlatTaxTrap';
import SEOJsonLd from './SEOJsonLd';
import { useScrollToSection } from '../hooks/useScrollToSection';
import { calculateHeaderOffset } from '../services/scrollUtils';
import { SITE_URL } from '../lib/config';

/**
 * Observatoire - Page centralisée pour l'autorité de domaine sur la fiscalité France vs UK
 */
const Observatoire: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [loadedWidgets, setLoadedWidgets] = useState(0);
  const totalWidgets = 16;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33600000000';
  const [topOffset, setTopOffset] = useState(64);

  // Smart scroll hook
  useScrollToSection(isFullyLoaded);

  // Sections pour la navigation sticky
  const sections = [
    { id: 'resume', label: 'Chiffres Clés', icon: 'fa-chart-bar' },
    { id: 'sante-financiere', label: 'Santé Financière', icon: 'fa-heartbeat' },
    { id: 'menaces-admin', label: 'Menaces URSSAF', icon: 'fa-shield-halved' },
    { id: 'simulateur', label: 'Simulateur', icon: 'fa-calculator' },
    { id: 'bureaucracy', label: 'Délais Admin', icon: 'fa-clock' },
    { id: 'tva', label: 'Seuil TVA', icon: 'fa-percentage' },
    { id: 'dividendes', label: 'Salaire/Dividendes', icon: 'fa-coins' },
    { id: 'privacy', label: 'Anonymat', icon: 'fa-user-secret' },
    { id: 'banques', label: 'Banques UK', icon: 'fa-university' },
    { id: 'liquidation', label: 'Fermeture', icon: 'fa-door-closed' },
    { id: 'liability', label: 'Risque Saisie', icon: 'fa-shield-alert' },
    { id: 'micro-trap', label: 'Piège Micro', icon: 'fa-scissors' },
    { id: 'fixed-costs', label: 'Coûts Fixes', icon: 'fa-ghost' },
    { id: 'inheritance', label: 'Succession', icon: 'fa-landmark' },
    { id: 'rh-friction', label: 'Risque RH', icon: 'fa-user-minus' },
    { id: 'banking-audit', label: 'Audit Bancaire', icon: 'fa-search-dollar' },
    { id: 'flat-tax', label: 'Piège Flat Tax', icon: 'fa-bullseye' },
  ];

  const handleWidgetLoad = useCallback(() => {
    setLoadedWidgets(prev => {
      const next = prev + 1;
      if (next >= totalWidgets) {
        setIsFullyLoaded(true);
      }
      return next;
    });
  }, []);

  // Gestion du scroll spy pour la navigation active
  useEffect(() => {
    const handleScroll = () => {
      const hOffset = calculateHeaderOffset();
      const scrollPosition = window.scrollY + hOffset + 10;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    const updateOffset = () => {
      const mainHeader = document.querySelector('[data-header="main"]');
      if (mainHeader) {
        setTopOffset(mainHeader.getBoundingClientRect().height);
      }
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);

    // Initial check for scrollspy
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateOffset);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent | null, sectionId: string) => {
    if (e) e.preventDefault();
    setActiveSection(sectionId);
    window.history.pushState(null, '', `#obs/${sectionId}`);

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = calculateHeaderOffset();
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      {!isFullyLoaded && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex flex-col items-center justify-center text-white p-8">
          <div className="bg-blue-600 p-4 rounded-3xl shadow-2xl shadow-blue-500/50 mb-8 animate-bounce">
            <i className="fas fa-bridge text-4xl"></i>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-[0.2em] mb-4">Initialisation du Baromètre</h2>
          <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-blue-500 transition-all duration-500 rounded-full"
              style={{ width: `${(loadedWidgets / totalWidgets) * 100}%` }}
            ></div>
          </div>
          <p className="mt-4 text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">
            Analyse des données sectorielles... {loadedWidgets}/{totalWidgets}
          </p>
        </div>
      )}

      <SEOJsonLd
        name="Observatoire BritFlow | Baromètre Fiscal 2025"
        description="Données exclusives sur les faillites, l'URSSAF et l'exode fiscal. Analyse comparative France vs Royaume-Uni."
        url={`${SITE_URL}/observatoire`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          "name": "Baromètre Faillites et Fiscalité France 2025",
          "description": "Données comparatives sur les faillites d'entreprises et la pression fiscale France vs UK. Observatoire indépendant de la compétitivité des entreprises françaises face au modèle anglo-saxon.",
          "url": `${SITE_URL}/observatoire`,
          "creator": {
            "@type": "Organization",
            "name": "BritFlow",
            "url": SITE_URL
          },
          "keywords": ["fiscalité France", "fiscalité UK", "faillites entreprises", "exode fiscal", "URSSAF", "impôt sociétés"],
          "datePublished": "2025-01-01",
          "variableMeasured": [
            {
              "@type": "PropertyValue",
              "name": "Taux de faillites",
              "description": "Évolution des faillites d'entreprises en France",
              "unitText": "entreprises"
            },
            {
              "@type": "PropertyValue",
              "name": "Pression fiscale",
              "description": "Comparaison des taux d'imposition France vs UK",
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Redressements URSSAF",
              "description": "Montant des redressements par région",
              "unitText": "euros"
            },
            {
              "@type": "PropertyValue",
              "name": "Délais administratifs",
              "description": "Temps de création et gestion d'entreprise France vs UK",
              "unitText": "jours"
            },
            {
              "@type": "PropertyValue",
              "name": "Seuils de TVA",
              "description": "Seuils de franchise de TVA comparés",
              "unitText": "euros"
            },
            {
              "@type": "PropertyValue",
              "name": "Optimisation Dividendes",
              "description": "Répartition optimale salaire vs dividendes",
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Confidentialité Fiscal",
              "description": "Score d'anonymat et protection du patrimoine",
              "unitText": "score/100"
            },
            {
              "@type": "PropertyValue",
              "name": "Accessibilité Bancaire",
              "description": "Vitesse d'ouverture de comptes professionnels",
              "unitText": "heures"
            },
            {
              "@type": "PropertyValue",
              "name": "Coûts de Liquidation",
              "description": "Frais de fermeture d'entreprise comparés",
              "unitText": "euros"
            },
            {
              "@type": "PropertyValue",
              "name": "Risque Liability",
              "description": "Probabilité de comblement de passif sur biens personnels",
              "unitText": "score/100"
            },
            {
              "@type": "PropertyValue",
              "name": "Efficience Micro",
              "description": "Comparaison CA vs Bénéfice réel micro-entrepreneur",
              "unitText": "euros"
            },
            {
              "@type": "PropertyValue",
              "name": "Taxes Existence",
              "description": "Montant des taxes fixes CFE et sociales incompressibles",
              "unitText": "euros"
            },
            {
              "@type": "PropertyValue",
              "name": "Transmission Patrimoine",
              "description": "Optimisation des droits de succession via FIC UK",
              "unitText": "euros"
            },
            {
              "@type": "PropertyValue",
              "name": "Friction RH",
              "description": "Coût de licenciement et risque prud'homal comparé",
              "unitText": "euros"
            },
            {
              "@type": "PropertyValue",
              "name": "Résilience Bancaire",
              "description": "Risque de blocage Tracfin et KYC",
              "unitText": "score/100"
            },
            {
              "@type": "PropertyValue",
              "name": "Trap Flat Tax",
              "description": "Analyse des cotisations cachées sur dividendes",
              "unitText": "%"
            }
          ]
        }}
      />


      {/* Sticky Navigation - Placed top dynamically to sit below main site header */}
      <nav
        data-header="observatoire"
        className="sticky z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
        style={{ top: `${topOffset}px` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-slate-900 p-2 rounded-lg">
                <i className="fas fa-tower-observation text-white text-lg"></i>
              </div>
              <span className="font-bold text-slate-900 text-sm md:text-base whitespace-nowrap">
                Observatoire BritFlow
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-1 overflow-x-auto max-w-[70vw]">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#obs/${section.id}`}
                  onClick={(e) => scrollToSection(e, section.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeSection === section.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-gray-500 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                >
                  <i className={`fas ${section.icon} mr-1.5 opacity-70`}></i>
                  {section.label}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <select
                value={activeSection}
                onChange={(e) => scrollToSection(null, e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-xs font-bold bg-white text-slate-700 focus:ring-2 focus:ring-slate-900 outline-none"
              >
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="bg-slate-50 min-h-screen">
        {/* HERO HEADER */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 mb-6">
                <i className="fas fa-chart-line text-blue-400"></i>
                <span className="text-sm font-bold text-blue-300 uppercase tracking-widest">
                  Observatoire Indépendant 2025
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
                Baromètre de <span className="text-blue-400">Compétitivité Fiscale</span> et Entrepreneuriale 2025
              </h1>

              <p className="text-lg md:text-xl text-blue-100/80 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
                Indicateurs de performance structurelle et analyse des disparités fiscales entre la France et le Royaume-Uni.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-blue-200/60 font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <i className="fas fa-database text-blue-400"></i>
                  <span>Sources Officielles : Banque de France / INSEE / Gov.uk</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-blue-400 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-sync text-blue-400"></i>
                  <span>Mise à jour Janvier 2025</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-blue-400 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-newspaper text-purple-400"></i>
                  <span>Source presse libre</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RÉSUMÉ EXÉCUTIF - Key Metrics */}
        <section id="resume" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Chiffres Clés 2024-2025
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Une analyse des indicateurs majeurs impactant la compétitivité des entreprises françaises
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Carte 1 - Faillites */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200">
                    <i className="fas fa-chart-line-down text-slate-700 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                      Indice de Défaillance
                    </h3>
                    <p className="text-xs font-bold text-slate-900">Banque de France</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-5xl font-black text-red-600 mb-2">
                    +17.6%
                  </div>
                  <p className="text-gray-600 font-medium">
                    de faillites en 2024 vs 2019
                  </p>
                </div>

                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="fas fa-arrow-trend-up text-red-600"></i>
                    <span className="text-sm font-bold text-red-800">
                      Tendance alarmante
                    </span>
                  </div>
                  <p className="text-xs text-red-700">
                    Plus de 66 000 défaillances en 2024, un niveau inédit depuis la crise financière
                  </p>
                </div>
              </div>

              {/* Carte 2 - Redressements URSSAF */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200">
                    <i className="fas fa-gavel text-slate-700 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                      Pression Contrôle
                    </h3>
                    <p className="text-xs font-bold text-slate-900">Rapports URSSAF</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-5xl font-black text-slate-900 mb-2 leading-none">
                    1.6 Md€
                  </div>
                  <p className="text-gray-600 font-medium text-sm">
                    de redressements en 2024
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-wide">
                      Risque Sectoriel
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    L'Île-de-France et la PACA concentrent 65% des redressements sur les PME de services.
                  </p>
                </div>
              </div>

              {/* Carte 3 - Délocalisation */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200">
                    <i className="fas fa-vault text-slate-700 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                      Fuite de Capitaux
                    </h3>
                    <p className="text-xs font-bold text-slate-900">Analyses de Place</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-5xl font-black text-slate-900 mb-2 leading-none">
                    10 Md€
                  </div>
                  <p className="text-gray-600 font-medium text-sm">
                    délocalisés par an
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-wide">
                      Arbitrage Territorial
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    Augmentation de 12% des flux de dividendes vers les holdings britanniques en 2024.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1 - Santé Financière */}
        <section id="sante-financiere" className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-heartbeat"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 1</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Corrélation Pression Fiscale / Faillites
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Analyse de la corrélation historique entre les taux d'imposition et les faillites d'entreprises en France
              </p>
            </div>

            {/* Embed Widget Title */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-code text-blue-600 text-xl"></i>
                <div>
                  <h3 className="text-sm font-bold text-blue-900">Intégrer ce widget sur votre site</h3>
                  <p className="text-xs text-blue-700">Code d'intégration disponible ci-dessous</p>
                </div>
              </div>
              <a
                href="#fiscal-watch-widget"
                className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-2"
              >
                Voir le code
                <i className="fas fa-arrow-down"></i>
              </a>
            </div>

            <FiscalWatchWidget onLoad={handleWidgetLoad} />

            <div className="mt-8 text-center">
              <a
                href="/articles/faillites-entreprises-france-2025"
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
              >
                Lire l'analyse complète sur les faillites 2025
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 2 - Menaces Administratives */}
        <section id="menaces-admin" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-shield-halved"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 2</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Carte des Redressements par Région
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Visualisation géographique des montants de redressements URSSAF par région française en 2024
              </p>
            </div>

            <div className="flex justify-center">
              <UrssafTrackerWidget onLoad={handleWidgetLoad} />
            </div>

            <div className="mt-8 text-center">
              <a
                href="/articles/carte-controles-urssaf-france"
                className="inline-flex items-center gap-2 text-orange-600 font-bold hover:underline"
              >
                Découvrir la méthodologie des contrôles URSSAF
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 3 - Calculateur d'Exode */}
        <section id="simulateur" className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-calculator"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 3</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Simulateur: France vs Royaume-Uni
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Calculez les économies potentielles en délocalisant votre activité au Royaume-Uni
              </p>
            </div>

            <div className="flex justify-center">
              <FiscalExodusSimulator className="w-full max-w-4xl" onLoad={handleWidgetLoad} />
            </div>

            <div className="mt-8 text-center">
              <a
                href="/articles/is-15-vs-25-impact-benefices"
                className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:underline"
              >
                Pourquoi l'IS UK est un levier de croissance massif
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 4 - Bureaucracy Clock */}
        <section id="bureaucracy" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-clock"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 4</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Bureaucracy Clock: Délais Administratifs
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comparaison de la vitesse administrative : France vs Royaume-Uni
              </p>
            </div>

            <div className="flex justify-center">
              <BureaucracyClock onLoad={handleWidgetLoad} />
            </div>

            <div className="mt-8 text-center">
              <a
                href="/articles/delais-administratifs-france-vs-uk"
                className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
              >
                Pourquoi le Kbis français est-il si lent ?
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 5 - TVA Shock Simulator */}
        <section id="tva" className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-percentage"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 5</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                TVA Shock: Le Piège du Seuil de Franchise
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Simulez l'impact financier du dépassement du seuil de franchise de TVA
              </p>
            </div>

            <div className="flex justify-center">
              <TVAShockSimulator onLoad={handleWidgetLoad} />
            </div>

            <div className="mt-8 text-center">
              <a
                href="/articles/seuil-franchise-tva-36k"
                className="inline-flex items-center gap-2 text-orange-600 font-bold hover:underline"
              >
                Comprendre le piège du seuil de TVA à 36k€
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 6 - Dividend Optimizer */}
        <section id="dividendes" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-coins"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 6</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Optimisation Salaire vs Dividendes
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Trouvez la répartition optimale pour maximiser vos revenus
              </p>
            </div>

            <div className="flex justify-center">
              <DividendOptimizer onLoad={handleWidgetLoad} />
            </div>

            <div className="mt-8 text-center">
              <a
                href="/articles/salaire-ou-dividende-optimisation"
                className="inline-flex items-center gap-2 text-purple-600 font-bold hover:underline"
              >
                Le guide de l'optimisation Dividendes vs Salaire
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 7 - Privacy Scorecard */}
        <section id="privacy" className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-user-secret"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 7</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Privacy Scorecard: Anonymat Fiscal
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comparaison de la confidentialité fiscale : France vs UK
              </p>
            </div>

            <div className="flex justify-center">
              <PrivacyScorecard onLoad={handleWidgetLoad} />
            </div>

            <div className="mt-8 text-center">
              <a
                href="/articles/anonymat-fiscal-protection-patrimoine"
                className="inline-flex items-center gap-2 text-red-600 font-bold hover:underline"
              >
                Protéger votre vie privée face au registre public
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 8 - Bank Matchmaker */}
        <section id="banques" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-university"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 8</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Sélecteur de Banques UK
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Trouvez la banque idéale pour votre Limited Company
              </p>
            </div>

            <div className="flex justify-center">
              <BankMatchmaker onLoad={handleWidgetLoad} />
            </div>

            <div className="mt-8 text-center">
              <a
                href="/articles/meilleure-banque-uk-entrepreneur"
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
              >
                Comment ouvrir un compte bancaire au UK sans résider
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 9 - Liquidation Cost Calculator */}
        <section id="liquidation" className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-door-closed"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 9</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Coût de Fermeture d'Entreprise
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comparez les coûts de liquidation : France vs UK
              </p>
            </div>

            <div className="flex justify-center">
              <LiquidationCostCalculator onLoad={handleWidgetLoad} />
            </div>

            <div className="mt-8 text-center">
              <a
                href="/articles/cout-liquidation-france-vs-uk"
                className="inline-flex items-center gap-2 text-slate-600 font-bold hover:underline"
              >
                Pourquoi fermer une SASU coûte 3x plus cher au UK
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 10 - Liability Radar */}
        <section id="liability" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-shield-alert"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 10</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Liability Radar: Risque de Saisie Personnelle
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Évaluez si votre patrimoine personnel est réellement protégé en cas de liquidation judiciaire.
              </p>
            </div>

            <div className="flex justify-center">
              <LiabilityRadar onLoad={handleWidgetLoad} />
            </div>
          </div>
        </section>

        {/* SECTION 11 - Expense Shredder */}
        <section id="micro-trap" className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-scissors"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 11</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Expense Shredder: Le Piège de la Micro-entreprise
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Découvrez comment vos frais réels (Ads, SaaS) détruisent votre rentabilité en auto-entrepreneur.
              </p>
            </div>

            <div className="flex justify-center">
              <ExpenseShredder onLoad={handleWidgetLoad} />
            </div>
          </div>
        </section>

        {/* SECTION 12 - Fixed Cost Burner */}
        <section id="fixed-costs" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-ghost"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 12</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Fixed Cost Burner: La Taxe sur l'Existence
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Calculez le montant des taxes fixes (CFE, Mutuelle) que vous payez avant même de faire 1€ de profit.
              </p>
            </div>

            <div className="flex justify-center">
              <FixedCostBurner onLoad={handleWidgetLoad} />
            </div>
          </div>
        </section>

        {/* SECTION 13 - Inheritance Shield */}
        <section id="inheritance" className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-landmark"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 13</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Inheritance Shield: Protéger vos Enfants
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Simulez la transmission de votre patrimoine sans les 45% de droits de succession français.
              </p>
            </div>

            <div className="flex justify-center">
              <InheritanceShield onLoad={handleWidgetLoad} />
            </div>
          </div>
        </section>

        {/* SECTION 14 - RH Friction Meter */}
        <section id="rh-friction" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-user-minus"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 14</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                RH Friction Meter: Coût du Licenciement
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comparez le risque juridique et financier d'une séparation salarié en France vs UK.
              </p>
            </div>

            <div className="flex justify-center">
              <RHFrictionMeter onLoad={handleWidgetLoad} />
            </div>
          </div>
        </section>

        {/* SECTION 15 - Banking Audit */}
        <section id="banking-audit" className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-search-dollar"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 15</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Banking Audit: Risque de Blocage Tracfin
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Évaluez la résilience de vos comptes bancaires face à la compliance française et activez votre Plan B.
              </p>
            </div>

            <div className="flex justify-center">
              <BankingAudit onLoad={handleWidgetLoad} />
            </div>
          </div>
        </section>

        {/* SECTION 16 - Flat Tax Trap */}
        <section id="flat-tax" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-bullseye"></i>
                <span className="text-sm font-bold uppercase tracking-wider">Section 16</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Flat Tax Trap: Le Piège du Dividende
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Découvrez les cotisations sociales cachées derrière les 30% de la Flat Tax.
              </p>
            </div>

            <div className="flex justify-center">
              <FlatTaxTrap onLoad={handleWidgetLoad} />
            </div>
          </div>
        </section>

        {/* MÉTHODOLOGIE & SOURCES */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-slate-100 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Méthodologie & Sources
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Notre observatoire s'appuie sur des données officielles et des sources vérifiables
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Source 1 - Banque de France */}
              <a
                href="https://www.banque-france.fr/fr/statistiques/entreprises/defaillances-dentreprises"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <i className="fas fa-university text-blue-600 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Banque de France</h3>
                    <p className="text-xs text-gray-500">Statistiques officielles</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Données sur les défaillances d'entreprises et indicateurs économiques
                </p>
              </a>

              {/* Source 2 - URSSAF */}
              <a
                href="https://www.urssaf.fr"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <i className="fas fa-file-invoice-dollar text-orange-600 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">URSSAF</h3>
                    <p className="text-xs text-gray-500">Rapports annuels</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Montants des redressements et cotisations par région
                </p>
              </a>

              {/* Source 3 - Hiscox */}
              <a
                href="https://www.hiscox.fr"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-red-100 p-3 rounded-lg group-hover:bg-red-200 transition-colors">
                    <i className="fas fa-shield-alt text-red-600 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Hiscox</h3>
                    <p className="text-xs text-gray-500">Études sectorielles</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Baromètres de la compétitivité et fiscalité des entreprises
                </p>
              </a>

              {/* Source 4 - EY */}
              <a
                href="https://www.ey.com/fr"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-yellow-100 p-3 rounded-lg group-hover:bg-yellow-200 transition-colors">
                    <i className="fas fa-chart-pie text-yellow-600 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">EY</h3>
                    <p className="text-xs text-gray-500">Études fiscales</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Analyses comparatives des systèmes fiscaux internationaux
                </p>
              </a>
            </div>

            {/* Méthodologie */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <i className="fas fa-microscope text-blue-600"></i>
                Méthodologie d'Analyse
              </h3>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  L'Observatoire Fiscal BritFlow agrège des données provenant de sources officielles et publiques pour offrir une vision comparative de la compétitivité fiscale entre la France et le Royaume-Uni.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-emerald-500 mt-1"></i>
                    <span><strong>Collecte de données:</strong> Rassemblement de statistiques officielles (Banque de France, URSSAF, rapports gouvernementaux)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-emerald-500 mt-1"></i>
                    <span><strong>Normalisation:</strong> Harmonisation des données pour permettre des comparaisons temporelles (2019-2025) et géographiques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-emerald-500 mt-1"></i>
                    <span><strong>Calculs fiscaux:</strong> Application des taux officiels d'imposition (IS France: 25%, IS UK: 25%) aux données réelles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-emerald-500 mt-1"></i>
                    <span><strong>Vérification:</strong> Cross-checking avec des études indépendantes (Hiscox, EY, cabinets d'audit)</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-500 italic">
                  Note: Les calculs présentés sont des estimations basées sur les taux en vigueur au 1er janvier 2025. Consultez un expert fiscal pour une analyse personnalisée de votre situation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER - Kit Presse & WhatsApp */}
        <footer className="bg-slate-900 text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Kit Presse */}
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-600 p-3 rounded-xl">
                    <i className="fas fa-newspaper text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Kit Presse</h3>
                    <p className="text-sm text-slate-400">Ressources pour les journalistes</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="/kit-presse/DOSSIER_PRESSE.html"
                    target="_blank"
                    className="flex items-center justify-between bg-slate-700 hover:bg-slate-600 rounded-xl p-4 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <i className="fas fa-file-invoice text-red-400"></i>
                      <span className="font-semibold">Dossier de presse (HTML)</span>
                    </div>
                    <i className="fas fa-external-link-alt text-slate-400 group-hover:text-white transition-colors"></i>
                  </a>

                  <a
                    href="/kit-presse/INFOS_GRAPHIQUES.md"
                    target="_blank"
                    className="flex items-center justify-between bg-slate-700 hover:bg-slate-600 rounded-xl p-4 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <i className="fas fa-chart-pie text-purple-400"></i>
                      <span className="font-semibold">Données & Graphiques</span>
                    </div>
                    <i className="fas fa-external-link-alt text-slate-400 group-hover:text-white transition-colors"></i>
                  </a>

                  <a
                    href="/kit-presse/CODE_INTEGRATION.md"
                    target="_blank"
                    className="flex items-center justify-between bg-slate-700 hover:bg-slate-600 rounded-xl p-4 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <i className="fas fa-code text-blue-400"></i>
                      <span className="font-semibold">Codes d'intégration</span>
                    </div>
                    <i className="fas fa-external-link-alt text-slate-400 group-hover:text-white transition-colors"></i>
                  </a>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-slate-900 p-3 rounded-xl">
                    <i className="fab fa-whatsapp text-white text-3xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Audit de Résilience</h3>
                    <p className="text-sm text-slate-500 font-medium">Réponse spécialisée sous 24h</p>
                  </div>
                </div>

                <p className="mb-6 text-slate-600 text-sm leading-relaxed font-medium">
                  Vous souhaitez auditer la résilience de votre structure face aux indicateurs présentés ou optimiser votre flexibilité internationale ?
                </p>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Bonjour, j'ai consulté le Baromètre 2025. Je souhaite un Audit de Résilience.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                  Initier l'Audit
                </a>

                <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                  Confidentialité Strictement Garantie
                </p>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-slate-800 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">BritFlow</span>
                  <span>•</span>
                  <span>Observatoire Fiscal 2025</span>
                </div>

                <div className="flex items-center gap-6">
                  <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
                  <a href="#" className="hover:text-white transition-colors">CGU</a>
                  <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>

                <div className="flex items-center gap-3">
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    <i className="fab fa-linkedin text-xl"></i>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    <i className="fab fa-twitter text-xl"></i>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    <i className="fab fa-youtube text-xl"></i>
                  </a>
                </div>
              </div>

              <p className="mt-6 text-xs text-center text-slate-500">
                © 2025 BritFlow. Tous droits réservés. Les données présentées sont à titre informatif et ne constituent pas un conseil fiscal personnalisé.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Sticky WhatsApp Button (Mobile) */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Bonjour, je viens de voir l'Observatoire Fiscal.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center"
        aria-label="Contact WhatsApp"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
      </a>
    </div>
  );
};

export default Observatoire;