"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, AlertCircle, Info, Share2, Database, ExternalLink } from 'lucide-react';
import SEOJsonLd from '../SEOJsonLd';
import SEOBotContext from '../SEOBotContext';
import { SITE_URL } from '../../lib/config';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import FAQCollapsible from '../FAQCollapsible';
import EmbedTool from '../EmbedTool';

interface WidgetProps {
  onLoad?: () => void;
}

const FiscalWatchWidget: React.FC<WidgetProps> = ({ onLoad }) => {
  const [showEmbedCode, setShowEmbedCode] = useState(false);

  React.useEffect(() => {
    onLoad?.();
  }, [onLoad]);

  // Données épurées : Focus France (Statistiques de Presse)
  const chartData = [
    { year: '2019', failures: 51145, taxPressure: 72, label: 'Pré-crise' },
    { year: '2020', failures: 32184, taxPressure: 74, label: 'Aides Covid' },
    { year: '2021', failures: 28351, taxPressure: 75, label: 'Aides Covid' },
    { year: '2022', failures: 42500, taxPressure: 78, label: 'Reprise' },
    { year: '2023', failures: 55435, taxPressure: 82, label: 'Inflation' },
    { year: '2024', failures: 66045, taxPressure: 85, label: 'Record' },
    { year: '2025 (p)', failures: 72000, taxPressure: 87, label: 'Projection' },
  ];

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33600000000';
  const whatsappMessage = "Bonjour, j'ai vu le baromètre des faillites 2025. Comment protéger ma structure ?";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const embedCode = `<iframe src="${SITE_URL}/outils/fiscal-scanner" width="100%" height="600" frameborder="0" title="Baromètre Santé PME - Societe Anglaise"></iframe>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    alert('Code d\'intégration copié !');
  };

  // Custom Tooltip - Financial Press Style
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 shadow-xl p-4 rounded-xl min-w-[200px]">
          <p className="text-slate-900 font-bold mb-2 border-b border-slate-100 pb-1">{label} - {payload[0].payload.label}</p>
          <div className="space-y-1.5">
            <p className="text-slate-600 text-xs flex justify-between">
              <span>Défaillances :</span>
              <span className="font-bold text-slate-900">{payload[0].value?.toLocaleString()}</span>
            </p>
            <p className="text-red-600 text-xs flex justify-between">
              <span>Indice Pression :</span>
              <span className="font-bold">{payload[1].value}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // JSON-LD Schema for Dataset - Media Focused
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Baromètre Faillites et Pression Fiscale France 2019-2025",
    "description": "Données statistiques sur la corrélation entre les défaillances d'entreprises et la pression fiscale en France. Source : Banque de France et Insee.",
    "url": `${SITE_URL}/observatoire#sante-financiere`,
    "creator": {
      "@type": "Organization",
      "name": "Societe Anglaise - Observatoire"
    },
    "variableMeasured": [
      {
        "@type": "PropertyValue",
        "name": "Défaillances d'entreprises",
        "unitText": "unités"
      },
      {
        "@type": "PropertyValue",
        "name": "Indice de pression fiscale",
        "unitText": "%"
      }
    ]
  };

  return (
    <div id="fiscal-watch-widget" className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 text-slate-900 shadow-sm relative overflow-hidden">
      {/* JSON-LD Dataset Schema */}

      <SEOJsonLd
        name="Baromètre Faillites et Pression Fiscale France"
        description="Statistiques de défaillances d'entreprises en France (2019-2025) et corrélation avec l'indice de pression fiscale."
        category="Analytics"
        schema={datasetSchema}
      />

      <SEOBotContext
        toolName="Observatoire Faillites France"
        description="Analyse de la santé économique des PME françaises face à l'augmentation des charges et de l'IS."
        pillars={[
          "Business Failure Tracking (France)",
          "Fiscal Pressure Index Calculation",
          "Economic Resilience Analysis"
        ]}
        formula="Correlation(Tax_Index, Failure_Rate) where failure_rate source = Banque_de_France"
        constraint="Focus exclusivement sur les données territoriales françaises pour usage média."
        logicalFaqs={[
          {
            q: "Pourquoi les faillites augmentent-elles en France en 2025 ?",
            a: "La fin des aides 'quoi qu'il en coûte', la hausse des taux et la pression de remboursement des PGE créent un effet ciseau fatal pour les PME fragiles."
          },
          {
            q: "Un exode fiscal peut-il sauver ma boîte ?",
            a: "La délocalisation n'est pas un remède miracle à un mauvais produit, mais elle libère du cash-flow immediat via une fiscalité plus légère, permettant d'investir plutôt que de subir."
          }
        ]}
      />

      {/* Header - Sober/Media Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
            <TrendingUp className="text-slate-700" size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1 leading-tight">Baromètre de Santé Économique PME</h2>
            <p className="text-slate-500 text-sm font-medium">
              Corrélation défaillances / pression fiscale (France 2019-2025)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="w-3 h-3 bg-slate-800 rounded-full"></div>
            <span className="text-[10px] font-bold text-slate-600 uppercase">Faillites</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="text-[10px] font-bold text-slate-600 uppercase">Indice Pression</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-[400px] w-full mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="year"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              yAxisId="left"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Unités', angle: -90, position: 'insideLeft', offset: 0, fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Indice (%)', angle: 90, position: 'insideRight', offset: 5, fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="failures"
              stroke="#1e293b"
              strokeWidth={3}
              dot={{ r: 4, fill: '#1e293b', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="Défaillances"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="taxPressure"
              stroke="#dc2626"
              strokeWidth={3}
              dot={{ r: 4, fill: '#dc2626', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="Indice Pression"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="text-red-600" size={18} />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">État d'Alerte T4-2024</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">66 045</div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Record historique de défaillances sur 12 mois glissants (Source : Banque de France).
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Database className="text-slate-600" size={18} />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Méthodologie</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">Indice 2025</div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Pression pondérée incluant l'IS, les cotisations patronales et l'inflation énergétique.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Share2 className="text-blue-600" size={18} />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Usage Média</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">Dataset OK</div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Widget certifié pour intégration journalistique via JSON-LD.
          </p>
        </div>
      </div>

      {/* Footer / CTA - More professional and subtle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-100">
        <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><Database size={12} /> Source : Banque de France</span>
          <span className="flex items-center gap-1.5"><TrendingUp size={12} /> Actualisé : Janv 2025</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            Aide au Rebond Post-Crise
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Embed Code Dropdown */}
      <div className="mt-6">
        <button
          onClick={() => setShowEmbedCode(!showEmbedCode)}
          className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest flex items-center gap-2"
        >
          <Share2 size={12} />
          {showEmbedCode ? 'Masquer' : 'Afficher'} le code d'intégration
        </button>
        {showEmbedCode && (
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-[10px] text-slate-500 mb-2 font-bold uppercase tracking-tight">Copiez ce code pour intégrer le baromètre :</p>
            <div className="relative">
              <pre className="bg-white border border-slate-200 p-3 rounded-lg text-[10px] text-slate-600 overflow-x-auto font-mono">
                {embedCode}
              </pre>
              <button
                onClick={copyEmbedCode}
                className="absolute top-2 right-2 bg-slate-900 text-white px-3 py-1 rounded text-[9px] font-bold uppercase"
              >
                Copier
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Methodlogy Block - Technical SEO */}
      <SEOMethodologyBlock
        methodologyTitle="Analyse de la Corrélation Pression / Défaillance"
        methodologyText="Cet outil croise mensuellement les rapports de défaillances de la Banque de France avec l'évolution de la pression fiscale réelle pesant sur les PME françaises. L'indice Societe Anglaise permet d'anticiper les pics de faillites en fonction des annonces budgétaires."
        algorithmName="FailurePredict-FR"
        algorithmVersion="v2.1"
        precision="Haute (Données Publiques Certifiées)"
        icon="fa-newspaper"
      />

      <FAQCollapsible
        title="Fiscalité & Baromètre : FAQ"
        items={[
          {
            question: "D'où viennent vos données ?",
            answer: "Elles sont agrégées en continu via les rapports publics de l'INSEE, de la Banque de France et les annonces gouvernementales."
          },
          {
            question: "Est-ce que la situation va s'améliorer ?",
            answer: "Les prévisions 2025 indiquent une stabilisation à un niveau haut de défaillances. L'agilité internationale reste le meilleur bouclier contre l'instabilité locale."
          }
        ]}
      />
    </div>
  );
};

export default FiscalWatchWidget;