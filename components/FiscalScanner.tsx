"use client";


import React, { useState, useMemo } from 'react';
import { useModeParam } from '../hooks/useModeParam';
import { getTaxInsight } from '../services/aiClient';
import { getWhatsAppLink } from '../services/whatsapp';
import FormattedText from './FormattedText';
import EmbedTool from './EmbedTool';
import SEOJsonLd from './SEOJsonLd';
import SEOMethodologyBlock from './SEOMethodologyBlock';
import SEOBotContext from './SEOBotContext';
import FAQCollapsible from './FAQCollapsible';

const FiscalScanner: React.FC = () => {
  const [revenue, setRevenue] = useState(100000);
  const [taxPaid, setTaxPaid] = useState(25000);
  const [adminStress, setAdminStress] = useState(5); // 1-10
  const [loading, setLoading] = useState(false);
  const [prescription, setPrescription] = useState<string | null>(null);
  const mode = useModeParam(['default', 'lifestyle', 'urssaf', 'watch'] as const, 'default');
  const [region, setRegion] = useState('IDF'); // For URSSAF mode

  const handleScan = async () => {
    setLoading(true);
    let context = "";

    if (mode === 'lifestyle') {
      context = `Personne avec ${revenue}€ de revenus déclarés mais ${taxPaid}€ de dépenses réelles (risque ESFP). Stress: ${adminStress}/10`;
    } else if (mode === 'urssaf') {
      context = `Entrepreneur en région ${region} craignant un contrôle URSSAF. CA: ${revenue}€.`;
    } else if (mode === 'watch') {
      context = `Entrepreneur inquiet des défaillances (66k+). Cherche protection. CA: ${revenue}€.`;
    } else {
      context = `Entrepreneur payant ${taxPaid}€ d'impôts avec un niveau de stress administratif de ${adminStress}/10`;
    }

    const result = await getTaxInsight(revenue, context);
    setPrescription(result);
    setLoading(false);
  };

  const getHeaderColor = () => {
    if (mode === 'lifestyle') return 'text-amber-500';
    if (mode === 'urssaf') return 'text-purple-600';
    if (mode === 'watch') return 'text-red-700'; // Dark red for panic/watch
    return 'text-blue-600';
  };

  const getBorderColor = () => {
    if (mode === 'lifestyle') return 'border-amber-500';
    if (mode === 'urssaf') return 'border-purple-600';
    if (mode === 'watch') return 'border-slate-800'; // Dark theme implied
    return 'border-blue-600';
  };

  // Dynamic SEO Configuration
  const seoConfig = useMemo(() => {
    switch (mode) {
      case 'lifestyle':
        return {
          title: "Diagnostic Train de Vie & ESFP Scanner",
          desc: "Audit IA de cohérence fiscale (Revenus vs Dépenses). Anticipez les contrôles sur signes extérieurs de richesse.",
          algoName: "LifestyleCheck v3.0",
          methText: "Analyse du 'Reste à Vivre' théorique en croisant vos revenus déclarés avec une estimation statistique de vos dépenses visibles (logement, véhicules, train de vie). Un delta négatif déclenche une alerte ESFP (Examen de Situation Fiscale Personnelle).",
          pillar: "Delta Revenu/Dépense",
          icon: "fa-eye"
        };
      case 'urssaf':
        return {
          title: "Radar Risque URSSAF Régional",
          desc: "Cartographie prédictive des contrôles URSSAF par région et secteur d'activité.",
          algoName: "UrssafRadar v4.0",
          methText: "Algorithme prédictif basé sur les statistiques régionales de redressement. L'outil pondère le risque selon la localisation (IDF/PACA étant des zones à haute intensité de contrôle) et la typologie de revenus (indépendant vs salarié).",
          pillar: "Géolocalisation du Risque",
          icon: "fa-map-marker-alt"
        };
      case 'watch':
        return {
          title: "Observatoire Défaillances & Faillites",
          desc: "Monitoring temps réel de la santé économique des TPE/PME et risques de liquidation.",
          algoName: "BankruptcyWatch v1.0",
          methText: "Agrégation des données de sinistralité (Greffes, Bodacc) pour évaluer l'exposition sectorielle aux défaillances d'entreprises. Permet d'anticiper les effets domino sur la trésorerie.",
          pillar: "Indice de Sinistralité Sectorielle",
          icon: "fa-chart-line"
        };
      default:
        return {
          title: "Scanner de Fuite Fiscale IA",
          desc: "Détectez les inefficacités de votre structure fiscale FR vs options internationales.",
          algoName: "FiscScanner v2.5",
          methText: "Comparatif en temps réel de la pression fiscale effective (Taux Effectif d'Imposition) entre une structure française standard et une architecture optimisée UK, prenant en compte l'impôt sur les sociétés, les dividendes et les charges sociales.",
          pillar: "Taux Effectif d'Imposition (TEI)",
          icon: "fa-robot"
        };
    }
  }, [mode]);

  return (
    <div id="fiscal-scanner" className={`bg-white border-4 ${getBorderColor()} rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden scroll-mt-24`}>
      <SEOJsonLd
        name={seoConfig.title}
        description={seoConfig.desc}
        category="FinanceApplication"
      />

      <SEOBotContext
        toolName={seoConfig.title}
        description={seoConfig.desc}
        pillars={[
          `Pillar 1: ${seoConfig.pillar}`,
          "Pillar 2: Compliance Pattern Recognition",
          "Pillar 3: Fiscal Resilience Score"
        ]}
        formula={mode === 'lifestyle' ? "Delta = Revenues - (Expenses * 1.5)" : "RiskScore = f(Region, Sector, History)"}
        constraint="Analysis based on declarative data. Valid for preliminary risk assessment only."
      />

      <div className={`absolute top-0 right-0 ${mode === 'lifestyle' ? 'bg-amber-500' : mode === 'urssaf' ? 'bg-purple-600' : mode === 'watch' ? 'bg-slate-900' : 'bg-blue-600'} text-white px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest`}>
        {mode === 'lifestyle' ? 'Audit Cohérence ESFP' : mode === 'urssaf' ? 'Urssaf Radar v4.0' : mode === 'watch' ? 'Observatoire Faillite' : 'Scanner E-E-A-T v2.5'}
      </div>

      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 uppercase">
            {mode === 'lifestyle' ? (
              <>Diagnostic <span className="text-amber-500">Train de Vie</span></>
            ) : mode === 'urssaf' ? (
              <>Radar <span className="text-purple-600">Risque URSSAF</span></>
            ) : mode === 'watch' ? (
              <>Alerte <span className="text-red-600">Défaillances</span></>
            ) : (
              <>Scanner de <span className="text-blue-600">Fuite Fiscale</span></>
            )}
          </h2>
          <p className="text-slate-500 font-bold italic uppercase tracking-tighter text-xs">
            {mode === 'lifestyle' ? "Anticipez les questions du fisc sur vos signes extérieurs de richesse."
              : mode === 'urssaf' ? "Évaluez la probabilité de contrôle dans votre région."
                : mode === 'watch' ? "Analyse en temps réel de la sinistralité des entreprises françaises (+66k faillites)."
                  : "Outil de diagnostic intelligent recommandé par Societe Anglaise IA"
            }
          </p>
        </header>

        {!prescription ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">

              {mode === 'urssaf' ? (
                // URSSAF INPUTS
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-4 tracking-widest">Votre Région</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['IDF', 'PACA', 'Rhône', 'Autre'].map(r => (
                      <button key={r} onClick={() => setRegion(r)} className={`py-4 rounded-xl font-bold border-2 ${region === r ? 'bg-purple-600 text-white border-purple-600' : 'bg-white border-slate-200 text-slate-500'}`}>{r}</button>
                    ))}
                  </div>
                </div>
              ) : mode === 'watch' ? (
                // WATCH INPUTS (Minimalist fear based)
                <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                  <h4 className="text-red-800 font-black uppercase text-xs mb-2">Bulletin d'Alerte 2025</h4>
                  <p className="text-red-600 text-sm font-medium mb-4">Le mur des faillites est atteint. +24% de liquidations dans le BTP et le Conseil.</p>
                  <p className="text-slate-900 font-bold text-xs">Vérifiez si votre secteur est touché :</p>
                </div>
              ) : (
                // DEFAULT INPUTS
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-4 tracking-widest">
                    {mode === 'lifestyle' ? "Revenus Déclarés (€)" : "CA Annuel (€)"}
                  </label>
                  <input
                    type="number" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              )}

              {mode !== 'watch' && mode !== 'urssaf' && (
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-4 tracking-widest">
                    {mode === 'lifestyle' ? "Dépenses Réelles / an (€)" : "Impôt + Charges / an (€)"}
                  </label>
                  <input
                    type="number" value={taxPaid} onChange={(e) => setTaxPaid(Number(e.target.value))}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              )}

              {(mode === 'default' || mode === 'lifestyle') && (
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-4 tracking-widest">
                    {mode === 'lifestyle' ? "Stress Contrôle (1-10)" : "Pression Administrative (1-10)"}
                  </label>
                  <input
                    type="range" min="1" max="10" value={adminStress} onChange={(e) => setAdminStress(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              )}

              <button
                onClick={handleScan}
                disabled={loading}
                className={`w-full ${mode === 'lifestyle' ? 'bg-amber-500 hover:bg-amber-600' : mode === 'urssaf' ? 'bg-purple-600 hover:bg-purple-500' : mode === 'watch' ? 'bg-red-700 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'} text-white font-black py-6 rounded-2xl shadow-xl transition-all uppercase tracking-widest flex items-center justify-center gap-3`}
              >
                {loading ? <i className="fas fa-sync animate-spin"></i> : <i className="fas fa-search-dollar"></i>}
                {mode === 'urssaf' ? "Scanner le Risque Régional" : mode === 'watch' ? "Vérifier mon Exposition" : "Lancer l'analyse"}
              </button>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-slate-100">
                <i className={`fas ${seoConfig.icon} ${mode === 'lifestyle' ? 'text-amber-500' : mode === 'urssaf' ? 'text-purple-500' : mode === 'watch' ? 'text-red-600' : 'text-blue-600'} text-2xl`}></i>
              </div>
              <h4 className="font-black text-slate-900 mb-3 uppercase tracking-tight text-lg">Pourquoi cet outil ?</h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {mode === 'lifestyle'
                  ? "Si vos dépenses dépassent vos revenus déclarés, le fisc déclenchera un ESFP. Ce scanner évalue votre 'Delta' injustifié."
                  : mode === 'urssaf' ? "L'URSSAF cible différemment selon les régions. L'IDF et PACA sont en zone rouge (Risque Maximisé)."
                    : mode === 'watch' ? "En période de crise, savoir si votre secteur est visé par les défaillances est vital pour anticiper votre protection."
                      : "Identifiez vos \"hémorragies fiscales\" invisibles. Ce scanner compare votre imposition réelle FR vs UK."
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className={`bg-blue-50 border-2 ${mode === 'lifestyle' ? 'border-amber-200 bg-amber-50' : mode === 'urssaf' ? 'border-purple-200 bg-purple-50' : mode === 'watch' ? 'border-red-200 bg-red-50' : 'border-blue-200'} rounded-3xl p-8 mb-8`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 ${mode === 'lifestyle' ? 'bg-amber-500' : mode === 'urssaf' ? 'bg-purple-600' : mode === 'watch' ? 'bg-red-700' : 'bg-blue-600'} rounded-full flex items-center justify-center text-white`}>
                  <i className="fas fa-file-alt"></i>
                </div>
                <h3 className={`text-xl font-black ${mode === 'lifestyle' ? 'text-amber-900' : mode === 'urssaf' ? 'text-purple-900' : mode === 'watch' ? 'text-red-900' : 'text-blue-900'} uppercase tracking-tighter`}>Votre Analyse IA</h3>
              </div>
              <FormattedText text={prescription} />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setPrescription(null)}
                className="flex-1 py-4 bg-white border-2 border-slate-200 rounded-xl font-black text-slate-500 uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors"
              >
                Refaire un test
              </button>
              <a
                href={getWhatsAppLink(mode === 'lifestyle'
                  ? `URGENCE ESFP : Mes dépenses (${taxPaid}€) dépassent mes revenus déclarés (${revenue}€). Je dois justifier mon train de vie.`
                  : `Bonjour, je souhaite obtenir mon Audit Complet de Fuite Fiscale suite à ma simulation Societe Anglaise (CA: ${revenue}€, Impôt: ${taxPaid}€).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-widest text-center block shadow-xl flex items-center justify-center"
              >
                {mode === 'lifestyle' ? "Sécuriser mon Train de Vie" : "Obtenir mon Audit Complet"}
              </a>
            </div>
          </div>
        )}

        <SEOMethodologyBlock
          methodologyTitle={`Méthodologie : ${seoConfig.title}`}
          methodologyText={seoConfig.methText}
          algorithmName={seoConfig.algoName}
          algorithmVersion="1.0"
          precision="88%"
          icon={seoConfig.icon}
          mode={mode}
        />

        <EmbedTool toolId="fiscal-scanner" toolName="Fiscal Scanner & Arbitrage" />

        <FAQCollapsible
          title="Foire Aux Questions : Expatriation & Fiscalité"
          items={[
            {
              question: "Est-il légal de créer une Limited UK en étant résident fiscal français ?",
              answer: "Oui, c'est parfaitement légal en vertu de la liberté d'établissement (Traité TFUE). Cependant, pour éviter la requalification en établissement stable (Art 209-I CGI), la société doit avoir une substance économique réelle à Londres (bureaux, direction locale, décisions prises au UK)."
            },
            {
              question: "Quelle est la différence entre une LLC US et une Limited UK ?",
              answer: "La Limited UK est une société de capitaux européenne (reconnue par l'UE même post-Brexit via des accords bilatéraux) avec un taux d'IS faible (19-25%). La LLC US est souvent une entité 'transparente' (Pass-Through) qui peut entraîner une double imposition complexe pour un résident français. La Limited est généralement plus simple à gérer depuis la France."
            },
            {
              question: "Comment puis-je récupérer l'argent de ma Limited en France ?",
              answer: "Vous avez deux options principales : le versement de dividendes (taxés à la Flat Tax de 30% en France après abattement éventuel) ou la facturation de services (Management Fees) si vous avez une holding. Le salaire est déconseillé car il déclencherait les charges sociales françaises."
            },
            {
              question: "L'administration fiscale peut-elle saisir mon compte UK ?",
              answer: "Non, une saisie administrative à tiers détenteur (ATD) française ne s'applique pas automatiquement au Royaume-Uni. Le fisc doit engager une procédure internationale complexe d'assistance au recouvrement, ce qui est rare pour les montants courants."
            }
          ]}
        />
      </div>
    </div>
  );
};

export default FiscalScanner;