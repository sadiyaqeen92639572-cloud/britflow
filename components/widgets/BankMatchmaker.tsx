"use client";

import React, { useState, useEffect } from 'react';
import { Building2, Star, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import EmbedTool from '../EmbedTool';
import SEOJsonLd from '../SEOJsonLd';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import SEOBotContext from '../SEOBotContext';
import FAQCollapsible from '../FAQCollapsible';

interface BankMatchmakerProps {
  mode?: 'default' | 'embed';
  onLoad?: () => void;
}

interface Bank {
  name: string;
  logo: string;
  type: 'neobank' | 'traditional' | 'business';
  cryptoScore: number;
  fees: string;
  openingTime: string;
  onlineOnly: boolean;
  apiIntegration: boolean;
  features: string[];
  rating: number;
  link: string;
}

const BankMatchmaker: React.FC<BankMatchmakerProps> = ({ mode = 'default', onLoad }) => {
  React.useEffect(() => {
    onLoad?.();
  }, [onLoad]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33600000000';
  const [answers, setAnswers] = useState<any>({});
  const [results, setResults] = useState<Bank[] | null>(null);

  const questions = [
    {
      id: 'activityType',
      question: 'Quel est votre type d\'activité ?',
      options: [
        { value: 'ecommerce', label: 'E-commerce', icon: '🛒' },
        { value: 'freelance', label: 'Freelance / Consulting', icon: '💼' },
        { value: 'crypto', label: 'Crypto / Web3', icon: '₿' },
        { value: 'agency', label: 'Agence / Team', icon: '👥' },
        { value: 'investor', label: 'Investisseur', icon: '📈' },
      ],
    },
    {
      id: 'annualRevenue',
      question: 'Quel est votre CA annuel prévisionnel ?',
      options: [
        { value: 'low', label: '< 50k£', icon: '💰' },
        { value: 'medium', label: '50k£ - 200k£', icon: '💰💰' },
        { value: 'high', label: '200k£ - 1M£', icon: '💰💰💰' },
        { value: 'enterprise', label: '> 1M£', icon: '💎' },
      ],
    },
    {
      id: 'cryptoNeed',
      question: 'Avez-vous besoin d\'acheter/ventre des crypto ?',
      options: [
        { value: 'essential', label: 'Oui, essentiel pour mon activité', icon: '✅' },
        { value: 'nice', label: 'Oui, ce serait bien', icon: '👍' },
        { value: 'no', label: 'Non, pas besoin', icon: '❌' },
      ],
    },
    {
      id: 'financing',
      question: 'Avez-vous besoin de financement ?',
      options: [
        { value: 'yes', label: 'Oui, crédit ou financement', icon: '🏦' },
        { value: 'maybe', label: 'Peut-être à l\'avenir', icon: '🤔' },
        { value: 'no', label: 'Non, je suis autofinancé', icon: '💪' },
      ],
    },
    {
      id: 'multiCurrency',
      question: 'Besoin de comptes multi-devises ?',
      options: [
        { value: 'essential', label: 'Oui, essentiel (€, $, £)', icon: '🌍' },
        { value: 'useful', label: 'Ce serait utile', icon: '✈️' },
        { value: 'no', label: 'Non, juste £', icon: '🇬🇧' },
      ],
    },
  ];

  const banks: Bank[] = [
    {
      name: 'Monzo',
      logo: '🟠',
      type: 'neobank',
      cryptoScore: 5,
      fees: '0€',
      openingTime: '24h',
      onlineOnly: true,
      apiIntegration: true,
      features: ['Excellent app', 'Multi-devises', 'API top'],
      rating: 5,
      link: 'https://monzo.com',
    },
    {
      name: 'Revolut',
      logo: '⚫',
      type: 'neobank',
      cryptoScore: 5,
      fees: '0€',
      openingTime: '24h',
      onlineOnly: true,
      apiIntegration: true,
      features: ['Crypto intégrée', 'Multi-devises', ' Excellente app'],
      rating: 5,
      link: 'https://revolut.com',
    },
    {
      name: 'Starling',
      logo: '🟢',
      type: 'neobank',
      cryptoScore: 4,
      fees: '0€',
      openingTime: '24h',
      onlineOnly: true,
      apiIntegration: true,
      features: ['Très stable', 'API Marketplace', 'Bon support'],
      rating: 4.5,
      link: 'https://starlingbank.com',
    },
    {
      name: 'Countingup',
      logo: '🔵',
      type: 'business',
      cryptoScore: 2,
      fees: '0€',
      openingTime: '24h',
      onlineOnly: true,
      apiIntegration: true,
      features: ['Comptabilité intégrée', 'Idéal freelances', 'Automatisé'],
      rating: 4.5,
      link: 'https://countingup.com',
    },
    {
      name: 'Mettle',
      logo: '🟣',
      type: 'business',
      cryptoScore: 2,
      fees: '0€',
      openingTime: '24h',
      onlineOnly: true,
      apiIntegration: true,
      features: ['Backed by Barclays', 'Free pour startups', 'Bon interface'],
      rating: 4,
      link: 'https://mettle.co.uk',
    },
    {
      name: 'Tide',
      logo: '🔷',
      type: 'business',
      cryptoScore: 2,
      fees: '0€',
      openingTime: '24h',
      onlineOnly: true,
      apiIntegration: true,
      features: ['Ouverture rapide', 'Intégration comptabilité', 'Support réactif'],
      rating: 4,
      link: 'https://tide.co',
    },
    {
      name: 'HSBC',
      logo: '🔴',
      type: 'traditional',
      cryptoScore: 2,
      fees: '10£/mois',
      openingTime: '2-3 semaines',
      onlineOnly: false,
      apiIntegration: false,
      features: ['Banque établie', 'International', 'Services complets'],
      rating: 3,
      link: 'https://hsbc.co.uk',
    },
    {
      name: 'Barclays',
      logo: '🔷',
      type: 'traditional',
      cryptoScore: 1,
      fees: '8£/mois',
      openingTime: '2-3 semaines',
      onlineOnly: false,
      apiIntegration: false,
      features: ['Trusted', 'Support business', 'Physical branches'],
      rating: 3,
      link: 'https://barclays.co.uk',
    },
  ];

  const calculateMatches = () => {
    let scores = banks.map((bank) => ({ ...bank, matchScore: 0 }));

    scores.forEach((bank) => {
      // Crypto need
      if (answers.cryptoNeed === 'essential') {
        bank.matchScore += bank.cryptoScore * 20;
      } else if (answers.cryptoNeed === 'nice') {
        bank.matchScore += bank.cryptoScore * 10;
      }

      // Online only preference
      if (bank.onlineOnly) {
        bank.matchScore += 15;
      }

      // API integration
      if (bank.apiIntegration) {
        bank.matchScore += 10;
      }

      // Fees
      if (bank.fees === '0€') {
        bank.matchScore += 15;
      }

      // Opening time
      if (bank.openingTime === '24h') {
        bank.matchScore += 10;
      }

      // Type of activity
      if (answers.activityType === 'crypto' && bank.cryptoScore >= 4) {
        bank.matchScore += 25;
      } else if (answers.activityType === 'freelance' && bank.type === 'business') {
        bank.matchScore += 20;
      } else if (answers.activityType === 'ecommerce' && bank.apiIntegration) {
        bank.matchScore += 15;
      }

      // Revenue
      if (answers.annualRevenue === 'enterprise' && bank.type === 'traditional') {
        bank.matchScore += 20;
      } else if (answers.annualRevenue !== 'enterprise' && bank.onlineOnly) {
        bank.matchScore += 10;
      }
    });

    // Sort by match score
    return scores.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const matches = calculateMatches();
      setResults(matches);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults(null);
  };

  const getWhatsAppMessage = () => {
    return encodeURIComponent(
      `Bonjour, j'ai besoin d'une banque UK pour ma Limited. Quelle est la plus rapide ?`
    );
  };


  return (
    <div className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 ${mode === 'embed' ? '' : 'shadow-2xl'}`}>
      {mode === 'default' && (
        <>
          <SEOJsonLd
            name="Bank Matchmaker UK"
            description="Trouvez la banque britannique idéale pour votre Limited (Revolut, Wise, Monzo, Barclays). Comparatif frais, crypto-friendly, et délais d'ouverture."
            category="FinanceApplication"
          />
          <SEOBotContext
            toolName="Bank Matchmaker"
            description="Algorithmic bank selector for UK Limited companies matching entrepreneur profile (Crypto, E-commerce, Freelance) with optimal banking partners (Neobanks vs Traditional). Evaluates 'Crypto-Friendliness', 'API Capabilities', and 'Non-Resident Acceptance'."
            pillars={[
              "Pillar 1: Risk Appetite Matching (Crypto/High-Risk vs Standard)",
              "Pillar 2: Technical Integration (API for Accounting vs Branch Access)",
              "Pillar 3: Cost/Speed Efficiency (Free/24h vs Paid/Weeks)"
            ]}
            formula="MatchScore = Sum(Weight * Criteria(Crypto, Speed, Forex))"
            constraint="Banking is subjective; final approval depends on KYC/AML checks."
            logicalFaqs={[
              {
                q: "Quelle est la meilleure banque pour une Limited UK ?",
                a: "Pour 95% des entrepreneurs, les néobanques comme Revolut Business, Wise ou Monzo Business sont idéales car elles s'ouvrent en 24h et sont gratuites."
              },
              {
                q: "Une banque UK peut-elle refuser un non-résident ?",
                a: "Les banques traditionnelles (HSBC, Barclays) sont très sélectives. Les néobanques acceptent les non-résidents si la structure Limited est propre et l'activité légitime."
              }
            ]}
          />
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
              <Building2 className="text-blue-500" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white mb-1">Bank Matchmaker</h2>
              <p className="text-slate-400 text-sm">
                Trouvez la banque UK idéale pour votre Limited
              </p>
            </div>
          </div>
        </>
      )}

      {!results ? (
        <>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Question {currentStep + 1}/{questions.length}</span>
              <span className="text-sm font-bold text-emerald-400">{Math.round(((currentStep) / questions.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-6">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              {questions[currentStep].question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentStep].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="bg-slate-900 hover:bg-slate-700 border-2 border-slate-600 hover:border-emerald-500 rounded-xl p-6 text-left transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{option.icon}</span>
                    <span className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {option.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
              disabled={currentStep === 0}
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-slate-800 text-slate-400 hover:bg-slate-700"
            >
              ← Précédent
            </button>

            <div className="flex items-center gap-2">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentStep
                    ? 'bg-emerald-500 w-8'
                    : i < currentStep
                      ? 'bg-emerald-500/50'
                      : 'bg-slate-700'
                    }`}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Results */}
          <div className="bg-slate-800/50 border border-emerald-500/30 rounded-2xl p-8 mb-6">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-black text-white mb-2">Vos Meilleures Options</h3>
              <p className="text-slate-400">
                Basé sur vos réponses, voici le top 3 des banques recommandées
              </p>
            </div>

            <div className="space-y-4">
              {results.map((bank, index) => (
                <div
                  key={bank.name}
                  className={`bg-slate-900 rounded-2xl p-6 border-2 transition-all ${index === 0
                    ? 'border-emerald-500 shadow-lg shadow-emerald-500/20'
                    : 'border-slate-700'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{bank.logo}</div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-white flex items-center gap-2">
                            {bank.name}
                            {index === 0 && (
                              <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded">
                                RECOMMANDÉ
                              </span>
                            )}
                          </h4>
                          <span className="text-xs text-slate-500 uppercase">
                            {bank.type === 'neobank'
                              ? 'Néobanque'
                              : bank.type === 'business'
                                ? 'Spécialisée Business'
                                : 'Banque Traditionnelle'}
                          </span>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star size={16} fill="currentColor" />
                            <span className="text-lg font-black">{bank.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-slate-800 rounded-lg">
                          <div className="text-xs text-slate-500 mb-1">Frais</div>
                          <div className="text-lg font-bold text-white">{bank.fees}</div>
                        </div>

                        <div className="text-center p-3 bg-slate-800 rounded-lg">
                          <div className="text-xs text-slate-500 mb-1">Ouverture</div>
                          <div className="text-lg font-bold text-white">{bank.openingTime}</div>
                        </div>

                        <div className="text-center p-3 bg-slate-800 rounded-lg">
                          <div className="text-xs text-slate-500 mb-1">Crypto</div>
                          <div className="text-lg font-bold">
                            {Array(bank.cryptoScore).fill('₿').join('')}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {bank.features.map((feature, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* France vs UK Comparison Section */}
          <div className="bg-slate-800/80 border border-blue-500/30 rounded-2xl p-8 mb-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Building2 className="text-blue-400" />
              Pourquoi le système bancaire UK ?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🇫🇷</span>
                  <h4 className="font-bold text-red-400 uppercase tracking-wider text-sm">Système Français</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <XCircle className="text-red-500 mt-1 shrink-0" size={14} />
                    <span><strong>Risque de clôture :</strong> Fermetures de compte sans préavis (KYC excessif).</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <XCircle className="text-red-500 mt-1 shrink-0" size={14} />
                    <span><strong>Anti-Crypto :</strong> Banques traditionnelles méfiantes envers les actifs numériques.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <XCircle className="text-red-500 mt-1 shrink-0" size={14} />
                    <span><strong>Lenteur :</strong> 2 à 3 semaines pour ouvrir un compte business.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🇬🇧</span>
                  <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-sm">Système UK</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle className="text-emerald-500 mt-1 shrink-0" size={14} />
                    <span><strong>Fintech Friendly :</strong> Wise, Revolut et Starling comprennent votre business model.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle className="text-emerald-500 mt-1 shrink-0" size={14} />
                    <span><strong>Vitesse :</strong> Ouverture de compte souvent validée en moins de 24 heures.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle className="text-emerald-500 mt-1 shrink-0" size={14} />
                    <span><strong>Multi-devises :</strong> Gérez vos $, € et £ nativement sans frais prohibitifs.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700 text-center italic text-sm text-slate-400">
              "Travaillez avec des banques qui comprennent réellement la modernité de votre business."
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all"
            >
              🔄 Recommencer
            </button>

            {mode === 'default' && (
              <a
                href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-lg"
              >
                <span>💬</span>
                <span>Conseil Gratuit WhatsApp</span>
              </a>
            )}
          </div>
        </>
      )}

      {/* Info Box */}
      {mode === 'default' && !results && (
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-400 mt-0.5" size={16} />
            <div className="text-xs text-slate-400">
              <p className="font-bold text-blue-400 mb-1">Note importante :</p>
              <p>
                Les néobanques (Monzo, Revolut, Starling) sont recommandées pour 95% des entrepreneurs.
                Elles s'ouvrent en 24h, sont gratuites et ont d'excellentes APIs.
                Les banques traditionnelles sont recommandées uniquement pour les CA &gt; 1M£.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Embed Code */}
      {mode === 'default' && results && (
        <EmbedTool toolId="bank-matchmaker" toolName="Bank Matchmaker" />
      )}

      {/* SEO Layer C (Replaced by Components) */}
      {mode === 'default' && (
        <SEOMethodologyBlock
          methodologyTitle="Méthodologie de Sélection Bancaire"
          methodologyText="Le Bank Matchmaker analyse 9 banques britanniques (Néobanques et Traditionnelles) selon 5 axes critiques : tolérance aux crypto-actifs, frais de tenue de compte, rapidité d'ouverture (KYC), ergonomie API et fonctionnalités multi-devises. L'algorithme pondère ces critères selon votre profil (Freelance, E-commerçant, Investisseur) pour recommander la solution minimisant les frictions opérationnelles."
          algorithmName="BankSelect v2.4"
          algorithmVersion="v2.4"
          precision="96%"
          icon="fa-university"
        />
      )}

      {mode === 'default' && (
        <FAQCollapsible
          title="Questions Fréquentes : Banque & Trésorerie"
          items={[
            {
              question: "Une banque française peut-elle clôturer mon compte sans motif ?",
              answer: "Oui. En France, le droit bancaire autorise la rupture unilatérale de relation sans justification, avec un préavis de 60 jours. De nombreux entrepreneurs du web ou crypto subissent ce 'de-risking'. Avoir un compte UK de secours est une mesure de prudence élémentaire."
            },
            {
              question: "Est-ce que l'argent déposé sur Wise/Revolut est protégé ?",
              answer: "Oui. Les établissements de monnaie électronique (EMI) comme Wise ou Revolut UK sont régulés par la FCA (Financial Conduct Authority). Ils ont l'obligation de 'cantonner' (ségréguer) les fonds clients dans des banques tierces systémiques (Barclays, JP Morgan). En cas de faillite de la fintech, vos fonds vous sont restitués."
            },
            {
              question: "Puis-je avoir un IBAN FR avec une société anglaise ?",
              answer: "C'est possible avec certaines fintechs (comme Qonto ou Revolut Business qui peuvent fournir des IBAN locaux pour les succursales), mais c'est déconseillé si votre but est la sécurité. Utiliser un IBAN GB permet de facturer en £ ou en € via SWIFT/SEPA tout en restant hors de la juridiction de saisie immédiate française."
            },
            {
              question: "Comment payer mes dépenses personnelles en France ?",
              answer: "La société UK vous verse des dividendes (sur votre compte perso) ou vous rembourse des frais. Vous utilisez ensuite votre carte personnelle française. Vous pouvez aussi avoir une carte corporate UK pour les frais professionnels engagés en France (déplacements, repas)."
            }
          ]}
        />
      )}
    </div>
  );
};

export default BankMatchmaker;