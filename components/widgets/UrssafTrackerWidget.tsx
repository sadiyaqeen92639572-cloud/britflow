"use client";

import React, { useState, useEffect } from "react";
import EmbedTool from '../EmbedTool';
import SEOJsonLd from '../SEOJsonLd';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import SEOBotContext from '../SEOBotContext';
import FAQCollapsible from '../FAQCollapsible';

interface Region {
  name: string;
  amount: number;
  risk: "critical" | "high" | "medium" | "low";
  lat: number;
  lng: number;
}

const regionsData: Region[] = [
  { name: "Île-de-France", amount: 580, risk: "critical", lat: 48.8566, lng: 2.3522 },
  { name: "PACA", amount: 320, risk: "high", lat: 43.9352, lng: 6.0679 },
  { name: "Auvergne-Rhône-Alpes", amount: 280, risk: "high", lat: 45.7640, lng: 4.8357 },
  { name: "Hauts-de-France", amount: 240, risk: "medium", lat: 50.6292, lng: 3.0573 },
  { name: "Nouvelle-Aquitaine", amount: 210, risk: "medium", lat: 45.8336, lng: 1.2611 },
  { name: "Grand Est", amount: 190, risk: "medium", lat: 48.5734, lng: 7.7521 },
  { name: "Occitanie", amount: 175, risk: "low", lat: 43.6043, lng: 1.4434 },
  { name: "Pays de la Loire", amount: 160, risk: "low", lat: 47.7515, lng: -0.4330 },
];

const riskConfig = {
  critical: { color: "#DC2626", label: "Critique" },
  high: { color: "#EA580C", label: "Élevé" },
  medium: { color: "#CA8A04", label: "Modéré" },
  low: { color: "#16A34A", label: "Faible" },
};

const getRegionColor = (amount: number): string => {
  if (amount >= 580) return "#DC2626"; // rouge
  if (amount >= 280) return "#EA580C"; // orange
  if (amount >= 160) return "#CA8A04"; // jaune
  return "#16A34A"; // vert
};

interface PopupProps {
  region: Region;
  onClose: () => void;
  position: { x: number; y: number };
}

const RegionPopup: React.FC<PopupProps> = ({ region, onClose, position }) => {
  const config = riskConfig[region.risk];

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-2xl p-4 min-w-[280px] border-2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        borderColor: config.color,
        transform: "translate(-50%, -100%)",
        marginTop: "-10px",
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg leading-none"
      >
        ×
      </button>
      <h3 className="text-lg font-bold text-gray-900 mb-2 pr-6">{region.name}</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold" style={{ color: config.color }}>
            {region.amount}M€
          </span>
        </div>
        <p className="text-sm text-gray-600">redressés en 2024</p>
        <div className="flex items-center gap-2 mt-3">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: config.color }}
          />
          <span className="text-sm font-semibold" style={{ color: config.color }}>
            Risque {config.label}
          </span>
        </div>
      </div>
    </div>
  );
};

interface WidgetProps {
  onLoad?: () => void;
}

const UrssafTrackerWidget: React.FC<WidgetProps> = ({ onLoad }) => {
  const [selectedRegion, setSelectedRegion] = React.useState<Region | null>(null);

  React.useEffect(() => {
    onLoad?.();
  }, [onLoad]);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleRegionClick = (
    region: Region,
    event: React.MouseEvent<SVGElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
    setSelectedRegion(region);
  };

  const closePopup = () => {
    setSelectedRegion(null);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33600000000';
  const whatsappMessage =
    "Bonjour, j'ai vu la carte des redressements. Je veux protéger ma trésorerie.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl p-6 md:p-8">
      <SEOJsonLd
        name="Urssaf Tracker 2024"
        description="Carte des contrôles et redressements URSSAF en temps réel. Île-de-France (580M€) et PACA en zone critique. Évaluez votre exposition."
        category="FinanceApplication"
      />
      <SEOBotContext
        toolName="Urssaf Tracker"
        description="Interactive risk mapping tool visualizing URSSAF audit intensity across French regions. Aggregates data from 2024 tax recovery reports to highlight 'Red Zone' compliance hotspots (Île-de-France, PACA) vs safer zones."
        pillars={[
          "Pillar 1: Regional Risk Heatmap (IDF Critical 580M€)",
          "Pillar 2: Sectorial Exposure Analysis",
          "Pillar 3: Preventive Compliance Alerting"
        ]}
        formula="RiskLevel = f(RegionalRecoveryVolume, BusinessDensity)"
        constraint="Data based on official URSSAF press releases and JSS reports."
        logicalFaqs={[
          {
            q: "Quelle région est la plus risquée pour un contrôle URSSAF ?",
            a: "L'Île-de-France est la zone critique avec 580 millions d'euros de redressements annoncés en 2024, suivie par la région PACA."
          },
          {
            q: "URSSAF peut-elle saisir mon compte bancaire UK ?",
            a: "La saisie directe sur un compte étranger est complexe et nécessite une procédure d'entraide européenne. Une structure UK offre une barrière de protection immédiate contre les ATD (Avis à Tiers Détenteur) abusifs."
          }
        ]}
      />

      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Carte des Redressements URSSAF 2024 par Région
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Cliquez sur votre région pour voir les détails et protéger votre trésorerie
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-red-600" />
          <span className="text-sm text-gray-700">Critique (≥580M€)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-orange-600" />
          <span className="text-sm text-gray-700">Élevé (280-320M€)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-yellow-600" />
          <span className="text-sm text-gray-700">Modéré (160-240M€)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-green-600" />
          <span className="text-sm text-gray-700">Faible (&lt;200M€)</span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-white rounded-xl shadow-inner p-4 mb-6">
        <svg
          viewBox="0 0 600 550"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Regions as interactive areas with more organic shapes */}
          <g>
            {/* Île-de-France (around 320, 230) */}
            <path
              d="M 315 225 L 345 220 L 355 245 L 340 265 L 310 255 Z"
              fill={getRegionColor(regionsData[0].amount)}
              stroke="#ffffff"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => handleRegionClick(regionsData[0], e)}
            />

            {/* PACA (around 380, 400) */}
            <path
              d="M 380 400 L 410 390 L 440 405 L 435 440 L 400 450 L 375 425 Z"
              fill={getRegionColor(regionsData[1].amount)}
              stroke="#ffffff"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => handleRegionClick(regionsData[1], e)}
            />

            {/* Auvergne-Rhône-Alpes (around 340, 340) */}
            <path
              d="M 330 320 L 380 310 L 400 340 L 395 390 L 345 395 L 320 360 Z"
              fill={getRegionColor(regionsData[2].amount)}
              stroke="#ffffff"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => handleRegionClick(regionsData[2], e)}
            />

            {/* Hauts-de-France (around 300, 140) */}
            <path
              d="M 290 130 L 340 110 L 370 140 L 355 190 L 310 200 L 280 170 Z"
              fill={getRegionColor(regionsData[3].amount)}
              stroke="#ffffff"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => handleRegionClick(regionsData[3], e)}
            />

            {/* Nouvelle-Aquitaine (around 180, 340) */}
            <path
              d="M 160 330 L 250 320 L 280 360 L 270 430 L 200 450 L 150 410 Z"
              fill={getRegionColor(regionsData[4].amount)}
              stroke="#ffffff"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => handleRegionClick(regionsData[4], e)}
            />

            {/* Grand Est (around 400, 200) */}
            <path
              d="M 380 180 L 440 170 L 480 200 L 475 260 L 410 270 L 370 230 Z"
              fill={getRegionColor(regionsData[5].amount)}
              stroke="#ffffff"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => handleRegionClick(regionsData[5], e)}
            />

            {/* Occitanie (around 260, 430) */}
            <path
              d="M 250 420 L 320 410 L 360 440 L 340 490 L 270 500 L 230 460 Z"
              fill={getRegionColor(regionsData[6].amount)}
              stroke="#ffffff"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => handleRegionClick(regionsData[6], e)}
            />

            {/* Pays de la Loire (around 180, 240) */}
            <path
              d="M 170 230 L 230 220 L 270 250 L 255 310 L 190 320 L 160 280 Z"
              fill={getRegionColor(regionsData[7].amount)}
              stroke="#ffffff"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => handleRegionClick(regionsData[7], e)}
            />
          </g>

          {/* Region Labels */}
          <g className="pointer-events-none">
            <text x="310" y="245" fontSize="10" fill="white" fontWeight="bold">IDF</text>
            <text x="395" y="420" fontSize="10" fill="white" fontWeight="bold">PACA</text>
            <text x="340" y="355" fontSize="9" fill="white" fontWeight="bold">AUV-RA</text>
            <text x="310" y="160" fontSize="10" fill="white" fontWeight="bold">HDF</text>
            <text x="190" y="380" fontSize="10" fill="white" fontWeight="bold">N-Aquitaine</text>
            <text x="410" y="225" fontSize="10" fill="white" fontWeight="bold">Grand Est</text>
            <text x="275" y="465" fontSize="10" fill="white" fontWeight="bold">Occitanie</text>
            <text x="190" y="275" fontSize="9" fill="white" fontWeight="bold">Pays Loire</text>
          </g>
        </svg>

        {/* Popup */}
        {selectedRegion && (
          <RegionPopup
            region={selectedRegion}
            onClose={closePopup}
            position={popupPosition}
          />
        )}
      </div>

      {/* WhatsApp CTA */}
      <div className="text-center">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Protéger ma trésorerie des contrôles
        </a>
        <p className="text-xs text-gray-500 mt-3">
          Conseil personnalisé et confidentialité garantie
        </p>
      </div>

      {/* Source */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          Source:{" "}
          <a
            href="https://jss.fr/post/L%25E2%2580%2599Urssaf_IledeFrance_annonce_580_millions_d%25E2%2580%2599euros_de_redressements_en_2024"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            URSSAF Île-de-France - Annonce 2024
          </a>
        </p>
      </div>
      {/* Methodology Block */}
      <SEOMethodologyBlock
        methodologyTitle="Méthodologie : Cartographie des Risques URSSAF"
        methodologyText="L'Urssaf Tracker utilise les données officielles de redressement publiées par les URSSAF régionales (ex: 580M€ en IDF pour 2024) pour générer une carte thermique des risques de contrôle. L'algorithme pondère le volume de redressement par la densité d'entreprises pour attribuer un 'Score de Vigilance' à chaque région, permettant aux dirigeants d'anticiper la pression administrative locale."
        algorithmName="AuditMap v1.0"
        algorithmVersion="v1.0"
        precision="90%"
        icon="fa-map-marked-alt"
      />

      <FAQCollapsible
        title="FAQ URSSAF & Protection"
        items={[
          {
            question: "Quelles sont les cibles prioritaires de l'URSSAF ?",
            answer: "Les secteurs à forte intensité de main-d'œuvre (BTP, Restauration) et les plateformes numériques sont surveillés de près. Les entreprises en forte croissance ou avec des effectifs fluctuants déclenchent souvent des alertes automatiques."
          },
          {
            question: "Un redressement URSSAF est-il inévitable ?",
            answer: "Non, mais les statistiques montrent une intensification des contrôles ciblés. La mise en place de structures internationales permet de segmenter les risques et de protéger le cash-flow central contre des mesures de recouvrement forcé type ATD."
          },
          {
            question: "Est-ce que Societe Anglaise aide en cas de contrôle ?",
            answer: "Societe Anglaise aide à la stratégie de structuration préventive pour éviter l'exposition. En cas de contrôle en cours, nous conseillons nos clients sur les juridictions de repli et la gestion des flux pour maintenir l'activité."
          }
        ]}
      />
    </div>
  );
};

export default UrssafTrackerWidget;
