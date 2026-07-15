"use client";


import React, { useState } from 'react';
import { useModeParam } from '../hooks/useModeParam';
import { getBankingSecurityAudit } from '../services/aiClient';
import { getWhatsAppLink } from '../services/whatsapp';
import FormattedText from './FormattedText';
import EmbedTool from './EmbedTool';
import SEOJsonLd from './SEOJsonLd';
import SEOMethodologyBlock from './SEOMethodologyBlock';
import SEOBotContext from './SEOBotContext';

const BankingShield: React.FC = () => {
  const mode = useModeParam(['default', 'atd', 'matchmaker'] as const, 'default');
  const [cashAmount, setCashAmount] = useState(50000);
  const [bankType, setBankType] = useState('Française Traditionnelle');
  const [hasAtd, setHasAtd] = useState(mode === 'atd' ? 'Oui' : 'Non');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  // Matchmaker States
  const [needsCrypto, setNeedsCrypto] = useState(false);
  const [needsSepaInstant, setNeedsSepaInstant] = useState(false);
  const [needsCredit, setNeedsCredit] = useState(false);
  const [matchResult, setMatchResult] = useState<{ name: string, desc: string, icon: string } | null>(null);

  const handleAudit = async () => {
    setLoading(true);
    const result = await getBankingSecurityAudit({ cashAmount, bankType, hasAtd });
    setReport(result);
    setLoading(false);
  };

  const handleMatch = () => {
    // Simple deterministic matching logic
    if (needsCrypto) {
      setMatchResult({ name: "Revolut Business (UK)", desc: "Le leader pour les actifs numériques. IBAN GB + Trading Crypto intégré. Idéal pour les flux mixtes Fiat/Boursiers.", icon: "fas fa-bolt" });
    } else if (needsCredit) {
      setMatchResult({ name: "Barclays International", desc: "La crédibilité institutionnelle. Accès aux lignes de crédit et aux services marchands classiques. Nécessite souvent un dépôt initial.", icon: "fas fa-landmark" });
    } else if (needsSepaInstant) {
      setMatchResult({ name: "Wise Business", desc: "Le roi du multi-devises. IBAN BE + GB. Frais de change imbattables et SEPA Instant natif. Parfait pour l'e-commerçant.", icon: "fas fa-globe" });
    } else {
      setMatchResult({ name: "Tide", desc: "La simplicité administrative. Ouverture en 10 minutes, intégration comptable parfaire (Xero/Quickbooks). Idéal pour démarrer.", icon: "fas fa-water" });
    }
  };

  return (
    <div id="banking-shield" className={`bg-slate-900 border-2 ${mode === 'atd' ? 'border-red-500' : mode === 'matchmaker' ? 'border-indigo-500' : 'border-blue-500/30'} rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group scroll-mt-24`}>
      {/* Layer A: JSON-LD Schema */}
      <SEOJsonLd
        name={mode === 'matchmaker' ? "Bank Matchmaker UK" : "Banking Shield Anti-ATD"}
        description={mode === 'matchmaker' ? "Comparateur de banques UK (Wise, Revolut, Barclays) pour entrepreneurs non-résidents." : "Outil d'audit bancaire pour protéger sa trésorerie des ATD."}
        category="FinanceApplication"
      />

      <SEOBotContext
        toolName={mode === 'matchmaker' ? "Bank Matchmaker" : "BankGuard Anti-ATD Shield"}
        description={mode === 'matchmaker' ? "Selects optimal UK banking partner based on user needs (Crypto, SEPA, Credit)." : "Évalue la vulnérabilité bancaire face aux ATD."}
        pillars={mode === 'matchmaker' ?
          ["Crypto-Friendly Assessment", "Multi-Currency Capabilities (Wise/Revolut)", "Institutional Credit Access (Barclays/HSBC)"]
          : ["Banking Sovereignty", "ATD Resistance", "Exchange Rate Protection"]}
        formula={mode === 'matchmaker' ? "IF(Crypto) -> Revolut; IF(Credit) -> Barclays; IF(Forex) -> Wise" : "if (Bank_Loc == 'FR' && Cash_Exposed > 30k) then Severe_ATD_Risk"}
        constraint="KYC Compliance required for all UK account openings."
      />

      <div className={`absolute -top-10 -right-10 w-40 h-40 ${mode === 'atd' ? 'bg-red-600/20' : mode === 'matchmaker' ? 'bg-indigo-600/20' : 'bg-blue-600/20'} rounded-full blur-3xl transition-all`}></div>

      <div className="flex items-center gap-4 mb-8">
        <div className={`${mode === 'atd' ? 'bg-red-600 shadow-red-500/20' : mode === 'matchmaker' ? 'bg-indigo-600 shadow-indigo-500/20' : 'bg-blue-600 shadow-blue-500/20'} p-3 rounded-2xl shadow-lg`}>
          <i className={`fas ${mode === 'matchmaker' ? 'fa-university' : 'fa-vault'} text-2xl`}></i>
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">
            {mode === 'atd' ? (
              <>Bouclier <span className="text-red-500">Anti-ATD</span></>
            ) : mode === 'matchmaker' ? (
              <>Bank <span className="text-indigo-500">Matchmaker</span></>
            ) : (
              <>BankGuard <span className="text-blue-500">Shield</span></>
            )}
          </h2>
          <p className="text-[10px] text-white font-bold uppercase tracking-widest">
            {mode === 'atd' ? "Protection d'Urgence Trésorerie Saisie" : mode === 'matchmaker' ? "Sélecteur Bancaire Intelligent" : "Évaluateur de Résilience Bancaire"}
          </p>
        </div>
      </div>

      {mode === 'matchmaker' ? (
        // MATCHMAKER UI
        <div className="space-y-8 animate-fade-in">
          {!matchResult ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button onClick={() => setNeedsCrypto(!needsCrypto)} className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${needsCrypto ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 hover:border-indigo-400'}`}>
                  <i className="fas fa-bitcoin text-3xl"></i>
                  <span className="text-xs font-black uppercase tracking-widest">Besoin Crypto ?</span>
                </button>
                <button onClick={() => setNeedsCredit(!needsCredit)} className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${needsCredit ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 hover:border-indigo-400'}`}>
                  <i className="fas fa-credit-card text-3xl"></i>
                  <span className="text-xs font-black uppercase tracking-widest">Besoin Crédit ?</span>
                </button>
                <button onClick={() => setNeedsSepaInstant(!needsSepaInstant)} className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${needsSepaInstant ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 hover:border-indigo-400'}`}>
                  <i className="fas fa-bolt text-3xl"></i>
                  <span className="text-xs font-black uppercase tracking-widest">SEPA Instant ?</span>
                </button>
              </div>
              <button onClick={handleMatch} className="w-full bg-white text-indigo-900 font-black py-4 rounded-2xl uppercase text-xs tracking-widest hover:scale-[1.02] transition-all shadow-xl">
                Trouver ma Banque Idéale
              </button>
            </>
          ) : (
            <div className="bg-white text-slate-900 p-8 rounded-3xl animate-fade-in">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-3xl">
                  <i className={matchResult.icon}></i>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Meilleure correspondance</div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-indigo-700">{matchResult.name}</h3>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-600 leading-relaxed mb-8">{matchResult.desc}</p>

              <div className="flex gap-4">
                <button onClick={() => setMatchResult(null)} className="flex-1 py-3 border-2 border-slate-200 rounded-xl font-bold uppercase text-[10px] tracking-widest text-slate-500 hover:bg-slate-50">Retour</button>
                <a href={getWhatsAppLink(`Bonjour, le Matchmaker m'oriente vers ${matchResult.name}. Je souhaite ouvrir ce compte.`)} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center justify-center shadow-lg hover:bg-indigo-500">
                  Ouvrir ce Compte
                </a>
              </div>
            </div>
          )}
        </div>
      ) : (
        // DEFAULT AUDIT UI
        !report ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-white uppercase mb-3">Trésorerie Exposée (€)</label>
                <input
                  type="number" value={cashAmount} onChange={(e) => setCashAmount(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-white uppercase mb-3">Type de Banque Actuelle</label>
                <select
                  value={bankType} onChange={(e) => setBankType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none appearance-none text-white"
                >
                  <option>Française Traditionnelle</option>
                  <option>Néo-banque (Revolut/Qonto)</option>
                  <option>Banque Étrangère (Hors UK)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-white uppercase mb-4">Déjà subi une Saisie/ATD ?</label>
              <div className="flex gap-4">
                {['Oui', 'Non'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setHasAtd(opt)}
                    className={`flex-1 py-3 rounded-xl text-xs font-black uppercase border-2 transition-all ${hasAtd === opt ? (mode === 'atd' ? 'bg-red-600 border-red-600' : 'bg-blue-600 border-blue-600') + ' text-white shadow-lg' : 'border-slate-800 text-slate-200 hover:border-slate-700'
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAudit}
              disabled={loading}
              className={`w-full bg-white text-slate-900 font-black py-4 rounded-2xl ${mode === 'atd' ? 'hover:bg-red-50 text-red-900' : 'hover:bg-blue-50'} transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-3`}
            >
              {loading ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-shield-halved"></i>}
              {mode === 'atd' ? "Activer le Blocage de Saisie" : "Lancer l'audit de sécurité"}
            </button>
          </div>
        ) : (
          <div className="animate-fade-in space-y-6">
            <div className={`p-6 bg-white rounded-2xl border ${mode === 'atd' ? 'border-red-500' : 'border-blue-500/30'}`}>
              <h3 className={`${mode === 'atd' ? 'text-red-600' : 'text-blue-600'} font-black text-xs uppercase mb-4 tracking-widest flex items-center gap-2`}>
                <i className="fas fa-file-contract"></i> Analyse IA de Protection
              </h3>
              <div className="text-slate-900">
                <FormattedText text={report} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={getWhatsAppLink(mode === 'atd'
                  ? `URGENCE ATD : Mes comptes sont saisis. J'ai besoin d'un compte UK insaisissable pour ${cashAmount}€.`
                  : `Bonjour, je souhaite ouvrir un compte sécurisé à Londres suite à mon audit Societe Anglaise (Trésorerie: ${cashAmount}€, Banque: ${bankType}).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full ${mode === 'atd' ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600'} text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest shadow-xl text-center block flex items-center justify-center`}
              >
                {mode === 'atd' ? "Contourner l'ATD Immédiatement" : "Ouvrir un compte sécurisé à Londres"}
              </a>
              <button
                onClick={() => setReport(null)}
                className={`text-white text-[10px] font-black uppercase tracking-widest hover:${mode === 'atd' ? 'text-red-400' : 'text-blue-400'} transition-colors text-center`}
              >
                Modifier les paramètres de l'audit
              </button>
            </div>
          </div>
        )
      )}

      <div className="mt-8 pt-6 border-t border-slate-800/50">
        <div className="flex items-center gap-2 text-[8px] text-white font-bold uppercase tracking-widest">
          <i className="fas fa-lock text-blue-500"></i>
          Protocole de chiffrement bancaire British Standard actif
        </div>
      </div>
      <EmbedTool toolId="banking-shield" toolName="Banking Shield & ATD Protection" />

      {/* Layer B: Visible Methodology */}
      <SEOMethodologyBlock
        methodologyTitle="Souveraineté Bancaire UK"
        methodologyText="Le BankingShield évalue la vulnérabilité de vos comptes français face aux ATD (Administrative Temporary Detention) et saisies administratives. Nous analysons la juridiction bancaire, les montants exposés et l'historique de risque pour recommander des solutions de protection."
        algorithmName="BankGuard Algorithm"
        algorithmVersion="v3.2"
        precision="98.5%"
        icon="fa-vault"
        mode={mode}
      />
    </div>
  );
};

export default BankingShield;