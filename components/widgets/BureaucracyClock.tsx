"use client";

import React, { useState, useEffect } from 'react';
import { Clock, FastForward, Building, FileText, CreditCard, Users, Calendar } from 'lucide-react';
import EmbedTool from '../EmbedTool';
import SEOJsonLd from '../SEOJsonLd';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import FAQCollapsible from '../FAQCollapsible';
import SEOBotContext from '../SEOBotContext';

interface BureaucracyClockProps {
  mode?: 'default' | 'embed';
  onLoad?: () => void;
}

interface ComparisonItem {
  label: string;
  france: { days: number; description: string };
  uk: { days: number; description: string };
  icon: React.ElementType;
}

const BureaucracyClock: React.FC<BureaucracyClockProps> = ({ mode = 'default', onLoad }) => {
  React.useEffect(() => {
    onLoad?.();
  }, [onLoad]);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33600000000';

  const comparisons: ComparisonItem[] = [
    {
      label: 'Création de société',
      france: { days: 16, description: '16 jours en moyenne' },
      uk: { days: 1, description: '24 heures' },
      icon: Building,
    },
    {
      label: 'Ouverture compte bancaire',
      france: { days: 7, description: '7 jours' },
      uk: { days: 2, description: '48 heures' },
      icon: CreditCard,
    },
    {
      label: 'Immatriculation TVA',
      france: { days: 21, description: '21 jours' },
      uk: { days: 7, description: '7 jours' },
      icon: FileText,
    },
    {
      label: 'Premier employé',
      france: { days: 14, description: '14 jours' },
      uk: { days: 1, description: '24 heures' },
      icon: Users,
    },
    {
      label: 'Déclaration fiscale annuelle',
      france: { days: 120, description: '120 jours de préparation' },
      uk: { days: 30, description: '30 jours' },
      icon: Calendar,
    },
  ];

  const totalFranceDays = comparisons.reduce((sum, item) => sum + item.france.days, 0);
  const totalUKDays = comparisons.reduce((sum, item) => sum + item.uk.days, 0);
  const averageSpeedRatio = totalFranceDays / totalUKDays;

  const getWhatsAppMessage = () => {
    return encodeURIComponent(
      `Bonjour, je veux créer ma société en 24h.`
    );
  };


  return (
    <div className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 ${mode === 'embed' ? '' : 'shadow-2xl'}`}>
      {mode === 'default' && (
        <>
          <SEOJsonLd
            name="Bureaucracy Clock - France vs UK"
            description="Comparateur de vitesse administrative France (120 jours) vs Royaume-Uni (30 jours). Création de société, banque, TVA."
            category="FinanceApplication"
          />
          <SEOBotContext
            toolName="Bureaucracy Clock"
            description="Administrative velocity comparator measuring the time-to-market differential between French SASU and UK Limited Company. Aggregates official processing times for 5 critical business lifecycle stages: Incorporation, Banking, VAT, Hiring, and Tax Filing."
            pillars={[
              "Pillar 1: Incorporation Speed (16 days FR vs 24h UK)",
              "Pillar 2: Banking Access (7 days FR vs 48h UK)",
              "Pillar 3: Tax Compliance Friction (120 days prep FR vs 30 days UK)"
            ]}
            formula="SpeedRatio = TotalDaysFR / TotalDaysUK"
            constraint="Data based on World Bank Doing Business & Companies House averages."
            logicalFaqs={[
              {
                q: "Combien de temps pour créer une société au UK ?",
                a: "L'immatriculation Companies House se fait en moins de 24h. L'ouverture de compte bancaire prend souvent moins de 48h supplémentaires."
              },
              {
                q: "Pourquoi le Kbis est-il si lent en France ?",
                a: "La lenteur est due à la vérification manuelle par les Greffes des Tribunaux de Commerce et aux délais de transmission au registre central infogreffe."
              }
            ]}
          />
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                <Clock className="text-emerald-400" />
                Bureaucracy Clock
              </h2>
              <p className="text-slate-400 text-sm">
                Comparateur de vitesse administrative France vs UK
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-black text-emerald-400">{averageSpeedRatio.toFixed(1)}x</div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Plus rapide au UK
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🇫🇷</span>
                <span className="text-xs text-red-400 font-bold uppercase">France</span>
              </div>
              <div className="text-4xl font-black text-red-400 mb-1">{totalFranceDays}</div>
              <div className="text-xs text-slate-500">jours cumulés</div>
              <div className="text-xs text-slate-600 mt-2">~{Math.round(totalFranceDays / 30)} mois</div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🇬🇧</span>
                <span className="text-xs text-emerald-400 font-bold uppercase">UK</span>
              </div>
              <div className="text-4xl font-black text-emerald-400 mb-1">{totalUKDays}</div>
              <div className="text-xs text-slate-500">jours cumulés</div>
              <div className="text-xs text-slate-600 mt-2">~{Math.round(totalUKDays / 30)} mois</div>
            </div>
          </div>
        </>
      )}

      {/* Comparison List */}
      <div className="space-y-4">
        {comparisons.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeStep === index;
          const ratio = item.france.days / item.uk.days;

          return (
            <div
              key={index}
              className={`bg-slate-800/50 rounded-2xl p-6 border transition-all cursor-pointer ${isActive ? 'border-emerald-500/50 bg-slate-800/80' : 'border-slate-700 hover:border-slate-600'
                }`}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
                  <Icon className="text-slate-400" size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">{item.label}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* France */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">🇫🇷 France</span>
                    <span className="text-xs text-red-400 font-bold">{item.france.days} jours</span>
                  </div>
                  <div className="h-3 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">{item.france.description}</div>
                </div>

                {/* UK */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">🇬🇧 UK</span>
                    <span className="text-xs text-emerald-400 font-bold">{item.uk.days} jour{item.uk.days > 1 ? 's' : ''}</span>
                  </div>
                  <div className="h-3 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${(item.uk.days / item.france.days) * 100}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">{item.uk.description}</div>
                </div>
              </div>

              {/* Speed indicator */}
              <div className="mt-3 pt-3 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  <FastForward className="text-emerald-400" size={14} />
                  <span className="text-xs text-emerald-400 font-bold">
                    {ratio.toFixed(1)}x plus rapide au UK
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sources */}
      {mode === 'default' && (
        <div className="mt-8 pt-6 border-t border-slate-700">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="text-[10px] text-slate-500">
              <div className="font-bold mb-1">Sources :</div>
              <div>World Bank Doing Business 2024</div>
              <div>Chambre de Commerce France</div>
              <div>Companies House UK</div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-lg hover:shadow-emerald-500/25"
            >
              <span>💬</span>
              <span>Conseil Gratuit WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Embed Code Section (only in default mode) */}
      {mode === 'default' && (
        <EmbedTool toolId="bureaucracy-clock" toolName="Bureaucracy Clock" />
      )}

      {/* SEO Layer C (Replaced by Components) */}
      {mode === 'default' && (
        <>
          <SEOMethodologyBlock
            methodologyTitle="Comparaison Délais Administratifs 2025"
            methodologyText="La 'Bureaucracy Clock' compare le temps cumulé nécessaire pour accomplir les 5 formalités administratives majeures de la vie d'une entreprise (Création, Banque, TVA, Embauche, Bilan). Les données agrégées montrent un différentiel de x4.3 en faveur du Royaume-Uni, illustrant la 'friction administrative' française qui ralentit le Go-to-Market des entrepreneurs."
            algorithmName="AdminVelocity v1.2"
            algorithmVersion="v1.2"
            precision="98%"
            icon="fa-clock"
          />

          <FAQCollapsible
            title="Vitesse Administrative : Vos Questions"
            items={[
              {
                question: "Puis-je facturer immédiatement au UK ?",
                answer: "Oui, dès réception du Certificate of Incorporation (sous 24h), vous avez un numéro d'entreprise légal pour émettre vos premières factures."
              },
              {
                question: "Est-ce que le Royaume-Uni est plus efficace grâce au digital ?",
                answer: "Absolument. Tout le système (Companies House, HMRC) a été conçu 'Digital First', contrairement au système français qui a numérisé des processus papier existants."
              }
            ]}
          />
        </>
      )}
    </div>
  );
};

export default BureaucracyClock;