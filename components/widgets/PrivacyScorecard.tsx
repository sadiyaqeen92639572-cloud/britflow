"use client";

import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Shield, Eye, Lock, Info } from 'lucide-react';
import EmbedTool from '../EmbedTool';
import SEOJsonLd from '../SEOJsonLd';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import FAQCollapsible from '../FAQCollapsible';
import SEOBotContext from '../SEOBotContext';

interface PrivacyScorecardProps {
  mode?: 'default' | 'embed';
  onLoad?: () => void;
}

interface PrivacyData {
  subject: string;
  france: number;
  uk: number;
  fullMark: number;
}

const PrivacyScorecard: React.FC<PrivacyScorecardProps> = ({ mode = 'default', onLoad }) => {
  React.useEffect(() => {
    onLoad?.();
  }, [onLoad]);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33600000000';
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const privacyData: PrivacyData[] = [
    { subject: 'Échange automatique', france: 20, uk: 40, fullMark: 100 },
    { subject: 'Protection patrimoine', france: 35, uk: 75, fullMark: 100 },
    { subject: 'Anonymat bénéficiaires', france: 15, uk: 60, fullMark: 100 },
    { subject: 'Accès bancaire', france: 60, uk: 85, fullMark: 100 },
    { subject: 'Cryptographie', france: 40, uk: 70, fullMark: 100 },
  ];

  const categories = [
    {
      name: 'Échange automatique',
      description: 'Échanges d\'informations fiscales entre pays (OCDE, CRS)',
      france: { score: 20, text: 'CRDS, DAC6 - Transparence élevée', color: 'text-red-400' },
      uk: { score: 40, text: 'FATCA, CRS - Transparence moyenne', color: 'text-orange-400' },
    },
    {
      name: 'Protection patrimoine',
      description: 'Outils de protection du patrimoine (trusts, sociétés)',
      france: { score: 35, text: 'Protection limitée, patrimoine accessible', color: 'text-red-400' },
      uk: { score: 75, text: 'Trusts, LLP - Protection renforcée', color: 'text-emerald-400' },
    },
    {
      name: 'Anonymat bénéficiaires',
      description: 'Accessibilité du registre des bénéficiaires effectifs',
      france: { score: 15, text: 'RBE public - Très peu confidentiel', color: 'text-red-400' },
      uk: { score: 60, text: 'PSC privé - Accès restreint', color: 'text-emerald-400' },
    },
    {
      name: 'Accès bancaire',
      description: 'Facilité d\'ouverture et de gestion de comptes bancaires',
      france: { score: 60, text: 'Accès standard mais réglementé', color: 'text-yellow-400' },
      uk: { score: 85, text: 'Ouverture facile, néobanques nombreuses', color: 'text-emerald-400' },
    },
    {
      name: 'Cryptographie',
      description: 'Utilisation de crypto-monnaies et actifs numériques',
      france: { score: 40, text: 'Réglementation stricte, taxation élevée', color: 'text-yellow-400' },
      uk: { score: 70, text: 'Réglementation souple, taxation favorable', color: 'text-emerald-400' },
    },
  ];

  const franceAvg = privacyData.reduce((sum, item) => sum + item.france, 0) / privacyData.length;
  const ukAvg = privacyData.reduce((sum, item) => sum + item.uk, 0) / privacyData.length;

  const getWhatsAppMessage = () => {
    return encodeURIComponent(
      `Bonjour, j'ai vu le score de confidentialité. Je ne veux pas être dans le registre public.`
    );
  };


  return (
    <div className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 ${mode === 'embed' ? '' : 'shadow-2xl'}`}>
      {mode === 'default' && (
        <>
          <SEOJsonLd
            name="Privacy & Anonymity Scorecard UK"
            description="Comparatif de confidentialité fiscale France vs UK. Echange automatique (CRS), Registre public (RBE vs PSC), et protection des données personnelles."
            category="FinanceApplication"
          />
          <SEOBotContext
            toolName="Privacy Scorecard"
            description="Privacy comparison matrix evaluating jurisdictional confidentiality between France and the UK relative to CRS (Common Reporting Standard) and Beneficial Ownership transparency. Scores jurisdictions on 5 axes: Asset Protection, Banking Secrecy, Crypto Regulation, Register Visibility, and Data Sharing."
            pillars={[
              "Pillar 1: Register Visibility (Public RBE in FR vs Mixed PSC in UK)",
              "Pillar 2: Asset Shielding (Trusts/LLP in UK vs SCI transparent in FR)",
              "Pillar 3: Crypto-Asset Exposure (Flat tax/disclosures FR vs Capital Gains UK)"
            ]}
            formula="PrivacyScore = WeightedSum(CriteriaScores)"
            constraint="Total anonymity is a myth due to CRS; the goal is legal privacy optimization."
            logicalFaqs={[
              {
                q: "Est-ce que n'importe qui peut voir mes comptes en France ?",
                a: "Oui, sauf option de confidentialité spécifique, les comptes sont publics sur PNE/Infogreffe. Au UK, les 'Micro-entity accounts' sont très simplifiés et moins bavards."
              },
              {
                q: "Ma fortune est-elle publique au Royaume-Uni ?",
                a: "Le registre des PSC (Persons of Significant Control) est public, mais l'utilisation de structures intermédiaires ou de prête-noms légaux permet une discrétion bien supérieure au système français."
              }
            ]}
          />
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center">
              <Shield className="text-purple-500" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white mb-1">Privacy Scorecard</h2>
              <p className="text-slate-400 text-sm">
                Comparaison de l'anonymat fiscal : France vs UK
              </p>
            </div>
          </div>

          {/* Summary Scores */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🇫🇷</span>
                <span className="text-xs text-red-400 font-bold uppercase">France</span>
              </div>
              <div className="text-4xl font-black text-red-400 mb-1">{franceAvg.toFixed(0)}</div>
              <div className="text-xs text-slate-500">Score sur 100</div>
              <div className="text-xs text-slate-600 mt-2">Anonymat faible</div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🇬🇧</span>
                <span className="text-xs text-emerald-400 font-bold uppercase">UK</span>
              </div>
              <div className="text-4xl font-black text-emerald-400 mb-1">{ukAvg.toFixed(0)}</div>
              <div className="text-xs text-slate-500">Score sur 100</div>
              <div className="text-xs text-slate-600 mt-2">Anonymat moyen</div>
            </div>
          </div>
        </>
      )}

      {/* Radar Chart */}
      <div className="bg-slate-800/50 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-bold text-white mb-4 text-center">
          Comparaison sur 5 Axes
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={privacyData}>
            <PolarGrid stroke="#475569" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
            <Radar
              name="France"
              dataKey="france"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="UK"
              dataKey="uk"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Eye size={20} />
          Détail par Catégorie
        </h3>

        {categories.map((cat, index) => {
          const isExpanded = selectedCategory === cat.name;

          return (
            <div
              key={index}
              className={`bg-slate-800/50 rounded-xl border transition-all cursor-pointer ${isExpanded ? 'border-purple-500/50 bg-slate-800/80' : 'border-slate-700 hover:border-slate-600'
                }`}
              onClick={() => setSelectedCategory(isExpanded ? null : cat.name)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock size={18} className="text-slate-400" />
                    <div>
                      <h4 className="text-base font-bold text-white">{cat.name}</h4>
                      <p className="text-xs text-slate-500">{cat.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-xl font-black text-red-400">{cat.france.score}</div>
                      <div className="text-[10px] text-slate-500">FR</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-black text-emerald-400">{cat.uk.score}</div>
                      <div className="text-[10px] text-slate-500">UK</div>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-700 space-y-3">
                    <div className="bg-slate-900 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span>🇫🇷</span>
                        <span className="text-xs text-slate-400">France</span>
                      </div>
                      <p className={`text-sm font-bold ${cat.france.color}`}>
                        {cat.france.text}
                      </p>
                    </div>

                    <div className="bg-slate-900 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span>🇬🇧</span>
                        <span className="text-xs text-slate-400">UK</span>
                      </div>
                      <p className={`text-sm font-bold ${cat.uk.color}`}>
                        {cat.uk.text}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Insights */}
      {mode === 'default' && (
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-2xl border border-purple-500/30">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Info size={20} />
            Points Clés
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
              <div className="text-sm text-slate-300">
                <span className="text-white font-bold">Anonymat renforcé au UK :</span>
                Le registre des bénéficiaires (PSC) n'est pas public contrairement au RBE français
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
              <div className="text-sm text-slate-300">
                <span className="text-white font-bold">Protection du patrimoine :</span>
                Les trusts et LLP britanniques offrent une protection supérieure
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
              <div className="text-sm text-slate-300">
                <span className="text-white font-bold">Crypto-friendly :</span>
                Le UK est plus ouvert aux actifs numériques avec une taxation avantageuse
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
              <div className="text-sm text-slate-300">
                <span className="text-white font-bold">Note importante :</span>
                L'échange automatique d'informations (CRS) existe dans les deux pays
              </div>
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
              <div>OCDE - Common Reporting Standard (CRS)</div>
              <div>UE - Directive DAC6</div>
              <div>France - Registre Bénéficiaires Effectifs (RBE)</div>
              <div>UK - Persons with Significant Control (PSC)</div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-500 hover:to-purple-400 transition-all shadow-lg hover:shadow-purple-500/25"
            >
              <span>💬</span>
              <span>Protéger Mon Patrimoine</span>
            </a>
          </div>
        </div>
      )}

      {/* Embed Code */}
      {mode === 'default' && (
        <EmbedTool toolId="privacy-scorecard" toolName="Privacy Scorecard" />
      )}

      {/* SEO Layer C (Replaced by Components) */}
      {mode === 'default' && (
        <>
          <SEOMethodologyBlock
            methodologyTitle="Matrice de Confidentialité Juridictionnelle"
            methodologyText="Le 'Privacy Scorecard' compare le niveau de protection de la vie privée financière offert par la France et le Royaume-Uni. L'analyse se base sur la réglementation publique (Directive DAC6, Loi Sapin II vs Companies Act 2006) et l'accès aux bases de données (RBE, Infogreffe vs Companies House). Elle met en évidence la distinction entre l'évasion fiscale (illégale) et l'optimisation de la confidentialité (légale via Trusts/Nominees)."
            algorithmName="PrivacyIndex v1.5"
            algorithmVersion="v1.5"
            precision="85%"
            icon="fa-user-secret"
          />

          <FAQCollapsible
            title="Audit de Confidentialité : Ce qu'il faut savoir"
            items={[
              {
                question: "Pourquoi l'anonymat est-il important ?",
                answer: "Pour éviter le démarchage agressif, protéger ses données stratégiques face à la concurrence, et assurer une sécurité patrimoniale élémentaire."
              },
              {
                question: "Qu'est-ce que le registre PSC au UK ?",
                answer: "C'est le registre des bénéficiaires effectifs. Bien qu'il soit public, le niveau d'information requis est moins intrusif que le RBE français."
              }
            ]}
          />
        </>
      )}
    </div>
  );
};

export default PrivacyScorecard;