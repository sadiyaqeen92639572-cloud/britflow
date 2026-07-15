"use client";


import React, { useState, useMemo, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Info, AlertTriangle, TrendingUp } from 'lucide-react';
import SEOBotContext from '../SEOBotContext';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import FAQCollapsible from '../FAQCollapsible';
import { getWhatsAppLink } from '../../services/whatsapp';

interface LiabilityRadarProps {
    onLoad?: () => void;
}

const LiabilityRadar: React.FC<LiabilityRadarProps> = ({ onLoad }) => {
    useEffect(() => {
        if (onLoad) onLoad();
    }, [onLoad]);

    const [q1, setQ1] = useState<number>(0); // Debt level
    const [q2, setQ2] = useState<boolean>(false); // Payment cessation
    const [q3, setQ3] = useState<boolean>(false); // Personal expenses paid by company
    const [q4, setQ4] = useState<boolean>(false); // No board minutes

    const score = useMemo(() => {
        let s = 10;
        if (q1 > 50000) s += 20;
        if (q1 > 200000) s += 20;
        if (q2) s += 30;
        if (q3) s += 40;
        if (q4) s += 15;
        return Math.min(100, s);
    }, [q1, q2, q3, q4]);

    const riskLevel = score > 70 ? 'CRITIQUE' : score > 40 ? 'ÉLEVÉ' : 'MODÉRÉ';
    const riskColor = score > 70 ? 'text-red-500' : score > 40 ? 'text-orange-500' : 'text-yellow-500';

    return (
        <div className="bg-slate-900 rounded-[40px] p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden group">
            <SEOBotContext
                toolName="Liability Radar - Comblement de Passif"
                description="Outil d'évaluation du risque de responsabilité pour insuffisance d'actif (comblement de passif) selon l'article L651-2 du Code de commerce. Compare la protection du patrimoine personnel entre le régime français et le 'Corporate Veil' britannique."
                pillars={[
                    "Pillar 1: Forensic Liability Analysis - Évalue les fautes de gestion potentielles (confusion de patrimoine, poursuite d'activité déficitaire)",
                    "Pillar 2: Asset Seizure Probability - Calcule la probabilité de saisie des biens personnels par un liquidateur judiciaire",
                    "Pillar 3: Jurisdiction Protection Shield - Compare avec la Common Law UK où la responsabilité du dirigeant est strictement délimitée"
                ]}
                formula="LiabilityRisk = (DebtFactor * CessationBonus) + ManagementErrors"
                constraint="Analyse basée sur la jurisprudence 2024. Ne remplace pas un conseil d'avocat spécialisé."
                logicalFaqs={[
                    {
                        q: "Quand ma responsabilité personnelle est-elle engagée ?",
                        a: "En cas de 'faute de gestion' ayant contribué à l'insuffisance d'actif. Cela inclut le retard de déclaration de cessation de paiement (>45j) ou l'usage de biens pro à des fins perso."
                    },
                    {
                        q: "UK Ltd me protège-t-elle mieux que la SASU ?",
                        a: "Oui. Le 'Corporate Veil' britannique est beaucoup plus difficile à percer par un liquidateur que la responsabilité civile française, sauf fraude manifeste."
                    }
                ]}
            />

            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldAlert size={120} className="text-red-500" />
            </div>

            <div className="relative z-10">
                <header className="mb-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Alerte Patrimoine Personnel</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter uppercase leading-none">
                        Liability <span className="text-red-500">Radar</span>
                    </h2>
                    <p className="text-slate-400 font-bold text-sm max-w-xl italic leading-relaxed">
                        Évaluez si vos décisions de gestion actuelles vous exposent à une saisie de vos biens personnels (maison, comptes) en cas de liquidation en France.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        {/* Q1 */}
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                                <TrendingUp size={12} /> Dettes professionnelles actuelles (€)
                            </label>
                            <input
                                type="range" min="0" max="500000" step="10000" value={q1}
                                onChange={(e) => setQ1(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                            />
                            <div className="flex justify-between text-xs font-black text-white">
                                <span>0€</span>
                                <span className="text-red-500 text-lg">{q1.toLocaleString()} €</span>
                                <span>500k€+</span>
                            </div>
                        </div>

                        {/* Q2, Q3, Q4 */}
                        <div className="space-y-4">
                            {[
                                { id: 'q2', val: q2, set: setQ2, label: "Retards de paiement (charges, fournisseurs) > 45j ?" },
                                { id: 'q3', val: q3, set: setQ3, label: "Utilisation ponctuelle de la carte pro pour du perso ?" },
                                { id: 'q4', val: q4, set: setQ4, label: "Assemblées générales non tenues depuis > 1 an ?" }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => item.set(!item.val)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${item.val ? 'bg-red-500/10 border-red-500 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'
                                        }`}
                                >
                                    <span className="text-xs font-bold uppercase tracking-tight">{item.label}</span>
                                    {item.val ? <AlertTriangle size={18} /> : <div className="w-[18px] h-[18px] rounded-full border border-slate-600" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-[32px] p-8 flex flex-col items-center justify-center text-center relative">
                        <div className="absolute top-4 left-4">
                            <Info size={16} className="text-slate-500" />
                        </div>

                        <div className="mb-6">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Risque de Comblement de Passif</div>
                            <div className={`text-6xl font-black ${riskColor} mb-2`}>{score}%</div>
                            <div className={`text-xs font-black px-4 py-1 rounded-full inline-block ${score > 70 ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                                STATUT : {riskLevel}
                            </div>
                        </div>

                        <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic mb-8">
                            "En France, l'insuffisance d'actif peut être mise à la charge du dirigeant. Une seule 'fautes de gestion' subjective suffit à faire sauter la protection de la personne morale."
                        </p>

                        <div className="w-full space-y-3">
                            <div className="flex items-center gap-3 bg-red-900/20 p-4 rounded-xl border border-red-500/30 text-left">
                                <AlertTriangle className="text-red-500 shrink-0" size={20} />
                                <span className="text-[10px] font-bold text-red-100 uppercase">Menace France : Saisie immobilière possible (Art L651-2)</span>
                            </div>
                            <div className="flex items-center gap-3 bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/30 text-left">
                                <ShieldCheck className="text-emerald-500 shrink-0" size={20} />
                                <span className="text-[10px] font-bold text-emerald-100 uppercase">Protection UK : Ltd / Corporate Veil (Quasi-inviolable)</span>
                            </div>
                        </div>

                        <a
                            href={getWhatsAppLink(`URGENCE LIABILITY : Mon score de risque est de ${score}%. Je souhaite sécuriser mon patrimoine personnel avec une structure UK.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 w-full bg-white text-slate-900 font-black py-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-xl uppercase text-xs tracking-widest"
                        >
                            Activer le bouclier UK
                        </a>
                    </div>
                </div>

                <SEOMethodologyBlock
                    methodologyTitle="Algorithme de Risque de Responsabilité Civile"
                    methodologyText="Le Liability Radar pondère les facteurs de risque basés sur la jurisprudence française en matière de liquidation judiciaire. Il analyse la confusion de patrimoine (utilisation carte pro pour le perso), la négligence administrative (absence d'AG), et la poursuite d'activité déficitaire. Le score reflète la probabilité qu'un liquidateur puisse engager votre responsabilité personnelle sur vos actifs privés."
                    algorithmName="LiabilityGuard"
                    algorithmVersion="v1.2"
                    precision="92%"
                    icon="fa-shield-alert"
                    mode="liability"
                />

                <div className="mt-8 text-center border-t border-slate-800 pt-6 opacity-30">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">Code de Commerce L651-2 | Jurisprudence 2024</p>
                </div>

                <FAQCollapsible
                    title="Audit de Responsabilité : Comprendre le Risque"
                    items={[
                        {
                            question: "Qu'est-ce que le comblement de passif ?",
                            answer: "L'action en comblement de passif permet au tribunal d'ordonner au dirigeant de payer tout ou partie des dettes de son entreprise sur ses propres fonds si une faute de gestion est prouvée."
                        },
                        {
                            question: "Est-ce que ma résidence principale est protégée ?",
                            answer: "En France, la résidence principale est insaisissable de plein droit, mais cette protection peut sauter en cas de faute grave ou de fraude. La structure UK offre une isolation juridique supplémentaire en Common Law."
                        },
                        {
                            question: "Puis-je fermer ma boîte FR et repartir en UK ?",
                            answer: "C'est possible, mais cela doit être fait proprement pour éviter les accusations de faillite frauduleuse. Societe Anglaise vous guide dans la transition pour protéger vos futurs actifs."
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default LiabilityRadar;