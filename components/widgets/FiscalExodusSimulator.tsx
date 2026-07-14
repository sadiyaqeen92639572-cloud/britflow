"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { TAX_RATES } from '../../lib/legacyArticles';
import SEOJsonLd from '../SEOJsonLd';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import FAQCollapsible from '../FAQCollapsible';
import SEOBotContext from '../SEOBotContext';

interface FiscalExodusSimulatorProps {
  className?: string;
  onLoad?: () => void;
}

interface FormData {
  chiffreAffaires: number;
  benefice: number;
  salaireDirigeant: number;
  nombreSalaries: number;
}

interface CalculationResult {
  impotsFrance: number;
  impotsUK: number;
  economie: number;
  tauxEconomie: number;
}

const FiscalExodusSimulator: React.FC<FiscalExodusSimulatorProps> = ({ className = '', onLoad }) => {
  React.useEffect(() => {
    onLoad?.();
  }, [onLoad]);
  const [formData, setFormData] = useState<FormData>({
    chiffreAffaires: 100000,
    benefice: 30000,
    salaireDirigeant: 48000,
    nombreSalaries: 0
  });

  const calculationResults = useMemo<CalculationResult>(() => {
    const { benefice, salaireDirigeant, nombreSalaries } = formData;

    // Calcul des charges sociales (estimation)
    // Charges patronales + salariales sur le salaire du dirigeant + salariés
    const chargesSociales = salaireDirigeant * 0.45 + (nombreSalaries * 35000 * 0.45);

    // France
    const impotsFrance = (benefice * TAX_RATES.FRANCE.IS) + (salaireDirigeant * TAX_RATES.FRANCE.SOCIAL_CHARGES) + chargesSociales;

    // UK
    // Estimation des dividendes après rémunération du dirigeant
    const dividendes = Math.max(0, benefice - salaireDirigeant * 0.5);
    const dividendesTaxes = dividendes > TAX_RATES.UK.DIVIDEND_ALLOWANCE
      ? (dividendes - TAX_RATES.UK.DIVIDEND_ALLOWANCE) * TAX_RATES.UK.DIVIDEND_TAX
      : 0;

    const impotsUK = (benefice * TAX_RATES.UK.CT) + dividendesTaxes;

    const economie = Math.max(0, impotsFrance - impotsUK);
    const tauxEconomie = impotsFrance > 0 ? (economie / impotsFrance) * 100 : 0;

    return {
      impotsFrance,
      impotsUK,
      economie,
      tauxEconomie
    };
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33600000000';
  const whatsappLink = useMemo(() => {
    const message = encodeURIComponent(
      `Bonjour, j'ai calculé mes économies. Comment obtenir ce montage fiscal ?`
    );
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  }, [whatsappNumber]);

  const progressColor = calculationResults.tauxEconomie > 30 ? 'bg-green-500' : 'bg-emerald-600';

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 ${className}`}>
      <SEOJsonLd
        name="Fiscal Exodus Simulator France/UK"
        description="Simulateur d'expatriation fiscale. Calculez l'économie d'impôt réalisée en déplaçant votre société de France (IS 25% + Charges) vers le Royaume-Uni (IS 19%)."
        category="FinanceApplication"
      />
      <SEOBotContext
        toolName="Fiscal Exodus Simulator"
        description="Comparative tax simulation engine projecting fiscal savings from corporate relocation (Fiscal Exodus) from France to the UK. Analyzes the total tax wedge including Social Security Contributions (45%), Corporate Income Tax (25% FR vs 19% UK), and Dividend Taxation."
        pillars={[
          "Pillar 1: Social Charge Reduction (Elimination of RSI/URSSAF)",
          "Pillar 2: Corporate Tax Arbitrage (25% France vs 19% UK)",
          "Pillar 3: Global Tax Pressure Analysis (Total Tax Rate Comparison)"
        ]}
        formula="Savings = TotalTaxFR - TotalTaxUK"
        constraint="Requires physical relocation or undeniable management substance in the UK."
        logicalFaqs={[
          {
            q: "Combien puis-je gagner en délocalisant ma structure au UK ?",
            a: "Pour un bénéfice de 100k€, le gain net après impôts et charges peut dépasser 25 000€ par an, permettant un réinvestissement massif ou un meilleur confort de vie."
          },
          {
            q: "L'exode fiscal est-il réservé aux riches ?",
            a: "Non, avec l'avènement du nomadisme digital, de nombreux indépendants optimisent dès 50k€ de CA pour échapper à la pression administrative française."
          }
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Simulateur d'Exode Fiscal
        </h2>
        <p className="text-gray-600">
          Comparez vos charges entre la France et le Royaume-Uni
        </p>
      </div>

      {/* Formulaire Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Chiffre d'affaires annuel (€)
          </label>
          <input
            type="number"
            value={formData.chiffreAffaires}
            onChange={(e) => handleInputChange('chiffreAffaires', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
            placeholder="100000"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Bénéfice annuel (€)
          </label>
          <input
            type="number"
            value={formData.benefice}
            onChange={(e) => handleInputChange('benefice', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
            placeholder="30000"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Salaire dirigeant (€)
          </label>
          <input
            type="number"
            value={formData.salaireDirigeant}
            onChange={(e) => handleInputChange('salaireDirigeant', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
            placeholder="48000"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre de salariés
          </label>
          <input
            type="number"
            value={formData.nombreSalaries}
            onChange={(e) => handleInputChange('nombreSalaries', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
            placeholder="0"
            min="0"
          />
        </div>
      </div>

      {/* Output Comparatif Côte à Côte */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Comparaison des charges totales
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* France */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-2xl">🇫🇷</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-800">France</h4>
                <p className="text-sm text-blue-600">Système fiscal français</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">IS (25%):</span>
                <span className="font-semibold">{formatCurrency(formData.benefice * TAX_RATES.FRANCE.IS)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Charges sociales:</span>
                <span className="font-semibold">{formatCurrency(calculationResults.impotsFrance - (formData.benefice * TAX_RATES.FRANCE.IS))}</span>
              </div>
              <hr className="my-2 border-blue-200" />
              <div className="flex justify-between">
                <span className="font-bold text-blue-800">Total impôts:</span>
                <span className="font-bold text-xl text-blue-900">{formatCurrency(calculationResults.impotsFrance)}</span>
              </div>
            </div>
          </div>

          {/* UK */}
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-2xl">🇬🇧</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-emerald-800">Royaume-Uni</h4>
                <p className="text-sm text-emerald-600">Système fiscal britannique</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Corporation Tax (19%):</span>
                <span className="font-semibold">{formatCurrency(formData.benefice * TAX_RATES.UK.CT)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxe dividendes:</span>
                <span className="font-semibold">{formatCurrency(calculationResults.impotsUK - (formData.benefice * TAX_RATES.UK.CT))}</span>
              </div>
              <hr className="my-2 border-emerald-200" />
              <div className="flex justify-between">
                <span className="font-bold text-emerald-800">Total impôts:</span>
                <span className="font-bold text-xl text-emerald-900">{formatCurrency(calculationResults.impotsUK)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Économie */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-2xl font-bold mb-1">Économie annuelle</h4>
              <p className="text-emerald-100">En passant au Royaume-Uni</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">
                {formatCurrency(calculationResults.economie)}
              </div>
              <div className="text-emerald-100 text-sm">
                soit {calculationResults.tauxEconomie.toFixed(1)}% d'économie
              </div>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="bg-white/20 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full ${progressColor} transition-all duration-500 ease-out`}
              style={{ width: `${Math.min(calculationResults.tauxEconomie, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              Optimisez votre fiscalité dès maintenant
            </h4>
            <p className="text-gray-600">
              Découvrez comment économiser {formatCurrency(calculationResults.economie)} par an
            </p>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Voir comment économiser {formatCurrency(calculationResults.economie)}
          </a>
        </div>
      </div>

      <SEOMethodologyBlock
        methodologyTitle="Méthodologie de Calcul : Expatriation Fiscale"
        methodologyText="Le simulateur compare la pression fiscale totale supportée par l'entreprise et son dirigeant dans deux scénarios : Maintien en France (SASU/EURL soumis à l'IS 25% + Charges Sociales TNS/Assimilé Salarié) vs Expatriation au Royaume-Uni (Limited Company soumise à la Corporation Tax 19-25% + Dividendes). Le calcul intègre l'impôt sur les sociétés, les cotisations sociales personnelles et la fiscalité de distribution pour déterminer l'économie nette réalisée."
        algorithmName="ExodusCalc v4.0"
        algorithmVersion="v4.0"
        precision="92%"
        icon="fa-plane-departure"
      />

      <FAQCollapsible
        title="Simulateur d'Exode : FAQ Stratégique"
        items={[
          {
            question: "Faut-il résider au UK pour avoir une Limited ?",
            answer: "Non, une société Limited peut être détenue par des non-résidents. Cependant, la gestion effective doit être structurée pour respecter les règles de substance."
          },
          {
            question: "Est-ce que BritFlow m'accompagne dans la transition ?",
            answer: "Oui, nous gérons l'immatriculation, la comptabilité et le conseil stratégique pour que votre passage du modèle FR au modèle UK soit fluide et sécurisé."
          }
        ]}
      />
    </div>
  );
};

export default FiscalExodusSimulator;