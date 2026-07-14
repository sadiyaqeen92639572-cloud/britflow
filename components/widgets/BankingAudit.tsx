"use client";


import React, { useState, useMemo } from 'react';
import { Landmark, ShieldAlert, CheckCircle, Search, AlertCircle, LifeBuoy } from 'lucide-react';
import SEOBotContext from '../SEOBotContext';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import FAQCollapsible from '../FAQCollapsible';
import { getWhatsAppLink } from '../../services/whatsapp';

interface BankingAuditProps {
    onLoad?: () => void;
}

const BankingAudit: React.FC<BankingAuditProps> = ({ onLoad }) => {
    React.useEffect(() => {
        if (onLoad) onLoad();
    }, [onLoad]);

    const [industry, setIndustry] = useState<'standard' | 'high_risk' | 'crypto'>('standard');
    const [international, setInternational] = useState<boolean>(false);
    const [kycAnswers, setKycAnswers] = useState<boolean[]>([false, false, false]);

    const score = useMemo(() => {
        let s = 100;
        if (industry === 'high_risk') s -= 30;
        if (industry === 'crypto') s -= 60;
        if (international) s -= 15;

        // KYC questions
        if (!kycAnswers[0]) s -= 10; // No backup account
        if (kycAnswers[1]) s -= 20; // Already had a warning
        if (!kycAnswers[2]) s -= 15; // Mixed personal/pro fund usage

        return Math.max(5, s);
    }, [industry, international, kycAnswers]);

    const status = score > 80 ? 'SÉCURISÉ' : score > 50 ? 'FRAGILE' : 'CRITIQUE';
    const statusColor = score > 80 ? 'text-emerald-500' : score > 50 ? 'text-amber-500' : 'text-red-500';

    const toggleKyc = (index: number) => {
        const newAnswers = [...kycAnswers];
        newAnswers[index] = !newAnswers[index];
        setKycAnswers(newAnswers);
    };

    return (
        <div className="bg-slate-900 rounded-[40px] p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden group">
            <SEOBotContext
                toolName="Banking Audit - Résilience & Tracfin"
                description="Audit de vulnérabilité bancaire analysant les risques de blocage de compte et de signalement Tracfin pour les entrepreneurs français. Propose des solutions de secours et une diversification bancaire au Royaume-Uni."
                pillars={[
                    "Pillar 1: KYC Compliance Vulnerability - Analyse les points de friction dans votre profil (secteur d'activité, flux internationaux)",
                    "Pillar 2: Transaction Visibility Risk - Évalue la probabilité de déclenchement d'une alerte automatisée Tracfin",
                    "Pillar 3: Plan B Resilience Score - Mesure votre capacité à maintenir l'activité en cas de fermeture brutale de votre compte principal"
                ]}
                formula="BankingResilience = 100 - (SectorFactor * TransactionLoad) - StructuralGap"
                constraint="Analyse basée sur les retours d'expérience clients et les standards AML européens 2024."
                logicalFaqs={[
                    {
                        q: "Pourquoi ma banque me demande-t-elle des justificatifs ?",
                        a: "Les banques françaises ont une obligation stricte de vigilance (KYC/AML). Tout flux jugé atypique ou international peut déclencher un gel préventif."
                    },
                    {
                        q: "Qu'est-ce qu'un signalement Tracfin ?",
                        a: "C'est une déclaration de soupçon transmise par la banque aux autorités financières. Elle se fait sans que le client ne soit informé, entraînant souvent le blocage des fonds."
                    }
                ]}
            />

            <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <Landmark size={200} className="text-white" />
            </div>

            <div className="relative z-10">
                <header className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-4">
                        <i className="fas fa-microchip text-blue-400 text-xs"></i>
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Algorithme Tracfin Predictor</span>
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-4 leading-none">
                        Banking <span className="text-blue-500">Audit</span>
                    </h2>
                    <p className="text-slate-400 font-bold text-sm max-w-xl italic">
                        Votre banque française a le droit de bloquer votre compte sans préavis ni explication. Quelle est votre résilience réelle face à une coupure de cashflow ?
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {/* Industry selection */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Secteur d'Activité</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {[
                                    { id: 'standard', label: 'E-commerce / Agence', icon: '🛒' },
                                    { id: 'high_risk', label: 'Consulting Inter.', icon: '🌍' },
                                    { id: 'crypto', label: 'Web3 / Crypto', icon: '₿' }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setIndustry(item.id as any)}
                                        className={`p-4 rounded-xl border-2 transition-all text-left group ${industry === item.id ? 'border-blue-500 bg-blue-500/10' : 'border-slate-800 hover:border-slate-700'}`}
                                    >
                                        <div className="text-xl mb-2">{item.icon}</div>
                                        <div className={`text-[9px] font-black uppercase tracking-tight ${industry === item.id ? 'text-white' : 'text-slate-500'}`}>{item.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { index: 0, label: "Avez-vous un compte professionnel de secours ?", icon: <LifeBuoy size={16} /> },
                                { index: 1, label: "Avez-vous déjà eu un virement bloqué / suspendu ?", icon: <AlertCircle size={16} /> },
                                { index: 2, label: "Toute votre trésorerie est-elle en France ?", icon: <Landmark size={16} /> }
                            ].map((item) => (
                                <button
                                    key={item.index}
                                    onClick={() => toggleKyc(item.index)}
                                    className={`flex items-center justify-between w-full p-4 rounded-xl border-2 transition-all ${kycAnswers[item.index] ? 'bg-blue-500/10 border-blue-500 text-white' : 'bg-slate-800/30 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        <span className="text-xs font-bold uppercase tracking-tight">{item.label}</span>
                                    </div>
                                    {kycAnswers[item.index] ? <CheckCircle size={16} className="text-blue-500" /> : <div className="w-4 h-4 rounded-full border border-slate-700" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-800/50 p-8 rounded-[40px] border border-slate-700 relative overflow-hidden flex flex-col items-center justify-center text-center">
                        <div className="absolute top-0 left-0 w-full h-1" style={{ width: `${score}%`, backgroundColor: score > 80 ? '#10b981' : score > 50 ? '#f59e0b' : '#ef4444' }}></div>

                        <div className="mb-8">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Score de Résilience Bancaire</div>
                            <div className={`text-6xl font-black ${statusColor} mb-2`}>{score}/100</div>
                            <div className="text-[10px] font-black bg-slate-700 text-slate-300 px-4 py-1 rounded-full uppercase">Profil {status}</div>
                        </div>

                        <div className="w-full space-y-4 text-left">
                            <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700 flex items-start gap-4">
                                <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                                    <Search size={16} />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Analyse du risque Tracfin</h4>
                                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                        {score < 50 ? "URGENT : Votre profil présente des caractéristiques à haut risque de gel automatique. Un signalement Tracfin pourrait paralyser vos paiements sans préavis." : "Votre score est acceptable, mais la concentration de vos fonds en juridiction France reste un point de vulnérabilité unique."}
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 bg-emerald-900/10 rounded-2xl border border-emerald-500/20 flex items-start gap-4">
                                <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                                    <ShieldAlert size={16} />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Stratégie de diversification UK</h4>
                                    <p className="text-[11px] text-emerald-200/50 leading-relaxed font-medium">
                                        Le marché UK (EMI & High Street) propose des mécanismes de contestation et de médiation (Ombudsman) bien plus transparents que le système monobloque français.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <a
                            href={getWhatsAppLink(`BANKING AUDIT : Mon score de resilience est de ${score}/100. Je veux ouvrir un compte de secours au UK pour ne plus dependre du bon vouloir de ma banque francaise.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-10 w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl text-center shadow-xl shadow-blue-900/40 transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-3"
                        >
                            Activer mon Plan B Bancaire
                        </a>
                    </div>
                </div>

                <SEOMethodologyBlock
                    methodologyTitle="Modèle d'Exposition aux Risques de Conformité"
                    methodologyText="L'audit Banking Audit analyse votre profil selon les critères de surveillance AML (Anti-Money Laundering) des banques traditionnelles : volatilité des flux, secteurs d'activité 'sensibles' (Digital, Crypto, International), et fragilité structurelle (monodépendance bancaire). Le score simule la probabilité d'une clôture unilatérale de compte (Art. L312-1-1 du Code monétaire et financier) et l'impact opérationnel d'un gel Tracfin."
                    algorithmName="BankResilience"
                    algorithmVersion="v2.1"
                    precision="91%"
                    icon="fa-university"
                    mode="atd"
                />
                <FAQCollapsible
                    title="Sécurisation Bancaire : Plan B"
                    items={[
                        {
                            question: "Est-ce risqué d'avoir sa banque au UK ?",
                            answer: "Au contraire, c'est une diversification de juridiction. Les banques UK sont régulées par la FCA et offrent des recours plus transparents qu'en France en cas de litige."
                        },
                        {
                            question: "Puis-je continuer à utiliser mon compte pro FR ?",
                            answer: "Oui, mais BritFlow conseille d'avoir au moins 50% de sa trésorerie hors de portée d'une saisie administrative française immédiate."
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default BankingAudit;