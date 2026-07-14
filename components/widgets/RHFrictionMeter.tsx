"use client";


import React, { useState, useMemo } from 'react';
import { UserMinus, Gavel, Scale, Coins, Info, ShieldAlert, ArrowRight } from 'lucide-react';
import SEOBotContext from '../SEOBotContext';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import FAQCollapsible from '../FAQCollapsible';
import { getWhatsAppLink } from '../../services/whatsapp';

interface RHFrictionMeterProps {
    onLoad?: () => void;
}

const RHFrictionMeter: React.FC<RHFrictionMeterProps> = ({ onLoad }) => {
    React.useEffect(() => {
        if (onLoad) onLoad();
    }, [onLoad]);

    const [salary, setSalary] = useState<number>(4000); // Gross monthly salary
    const [seniority, setSeniority] = useState<number>(3); // Years
    const [riskType, setRiskType] = useState<'low' | 'high'>('low');

    const calc = useMemo(() => {
        // France: Licenciement / Rupture Conventionnelle
        // Pro-rata indemnity + Notice (Préavis) + Paid leaves (Congés)
        // Plus the social charges (CSG/CRDS + Specific contribution)
        const frIndemnity = (salary / 4) * seniority;
        const frPreavis = salary * 3; // Standard for cadres
        const frConges = (salary / 10) * seniority; // Simplified approximation
        const frSocialFees = (frIndemnity + frPreavis) * 0.30;

        // Risk of Prudhommes (Arbitrary but likely cost if settling)
        const frPrudhommeRisk = riskType === 'high' ? salary * 6 : 0;

        const totalFR = frIndemnity + frPreavis + frConges + frSocialFees + frPrudhommeRisk;

        // UK: Redundancy / Dismissal
        // Statutory Redundancy is CAPPED.
        // £700/week approx cap for redundancy pay.
        const weeklyPay = Math.min(salary / 4, 700);
        const ukRedundancy = weeklyPay * 1.5 * seniority; // Approx multiplier for age > 41
        const ukNotice = (salary / 4) * seniority; // 1 week per year up to 12
        const ukTotal = ukRedundancy + ukNotice;

        const saving = totalFR - ukTotal;

        return { totalFR, ukTotal, saving, frIndemnity, frPrudhommeRisk };
    }, [salary, seniority, riskType]);

    return (
        <div className="bg-white rounded-[40px] p-8 md:p-12 border-4 border-red-100 shadow-2xl relative overflow-hidden group">
            <SEOBotContext
                toolName="RH Friction Meter - Coût du Licenciement"
                description="Comparateur du coût réel de rupture de contrat de travail entre la France (Indemnités, Préavis, Prud'hommes, Charges Sociales) et le Royaume-Uni (Statutory Redundancy Pay). Analyse de la flexibilité RH."
                pillars={[
                    "Pillar 1: Separation Liability Calculation - Évalue le coût total d'une fin de collaboration incluant les charges sociales sur indemnités",
                    "Pillar 2: Legal Conflict Risk - Modélise l'impact financier d'un contentieux prud'homal basé sur les barèmes Macron",
                    "Pillar 3: UK Redundancy Ceiling - Compare avec le système britannique dont l'indemnité légale est plafonnée par la loi"
                ]}
                formula="FrCost = Indemnity + Notice + SocialTax + Risk; UKCost = Min(Salary, Cap) * Seniority"
                constraint="Barèmes légaux 2024. Exclusion des conventions collectives spécifiques plus favorables."
                logicalFaqs={[
                    {
                        q: "Combien coûte un licenciement en France en 2025 ?",
                        a: "Le coût inclut l'indemnité légale (1/4 de mois par an), 3 mois de préavis, les congés payés et une taxe patronale de 30% sur l'indemnité de rupture."
                    },
                    {
                        q: "Pourquoi le contrat UK est-il plus flexible ?",
                        a: "Le 'Statutory Redundancy Pay' est plafonné par la loi (env. £700/semaine) et les procédures de séparation sont beaucoup moins fertiles en contentieux prud'homaux."
                    }
                ]}
            />

            <div className="absolute top-0 right-0 p-12 opacity-5 scale-110">
                <Scale size={200} className="text-red-900" />
            </div>

            <div className="relative z-10">
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-red-600 p-2 rounded-xl text-white shadow-lg shadow-red-200">
                            <UserMinus size={24} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                            RH Friction <span className="text-red-600">Meter</span>
                        </h2>
                    </div>
                    <p className="text-slate-500 font-bold text-sm max-w-xl leading-relaxed">
                        Le licenciement en France est un risque systémique pour la petite entreprise. Un seul contentieux peut briser votre trésorerie pour les 3 prochaines années.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-10">
                        {/* Salary */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Salaire Mensuel Brut (€)</label>
                                <div className="text-xl font-black text-slate-900">{salary.toLocaleString()} €</div>
                            </div>
                            <input
                                type="range" min="1766" max="10000" step="100" value={salary}
                                onChange={(e) => setSalary(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-600"
                            />
                        </div>

                        {/* Seniority */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Ancienneté (Années)</label>
                                <div className="text-xl font-black text-slate-900">{seniority} ans</div>
                            </div>
                            <input
                                type="range" min="1" max="25" step="1" value={seniority}
                                onChange={(e) => setSeniority(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-600"
                            />
                        </div>

                        {/* Risk Toggle */}
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Potentiel de Contentieux (Prud'hommes)</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setRiskType('low')}
                                    className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${riskType === 'low' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200'}`}
                                >
                                    Amiable / Rupture
                                </button>
                                <button
                                    onClick={() => setRiskType('high')}
                                    className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${riskType === 'high' ? 'bg-red-600 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200'}`}
                                >
                                    Conflictuel / Risqué
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="bg-white border-2 border-slate-100 p-8 rounded-[32px] shadow-sm relative overflow-hidden group/card hover:border-red-500 transition-colors">
                            <div className="absolute top-4 right-4 text-slate-100 group-hover/card:text-red-50 transition-colors">
                                <Gavel size={50} />
                            </div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b pb-2">Coût de sortie (France)</div>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-xs font-bold text-slate-600">
                                    <span>Indemnité légale :</span>
                                    <span>{calc.frIndemnity.toLocaleString()} €</span>
                                </div>
                                {calc.frPrudhommeRisk > 0 && (
                                    <div className="flex justify-between text-xs font-bold text-red-600">
                                        <span>Provision Prud'hommes :</span>
                                        <span>{calc.frPrudhommeRisk.toLocaleString()} €</span>
                                    </div>
                                )}
                            </div>
                            <div className="text-4xl font-black text-slate-900">{Math.round(calc.totalFR).toLocaleString()} €</div>
                            <p className="text-[9px] text-slate-400 mt-4 leading-relaxed italic">
                                "Inclut le préavis de 3 mois et les cotisations sociales sur les indemnités (Contribution patronale 30% depuis 2023)."
                            </p>
                        </div>

                        <div className="bg-slate-900 p-8 rounded-[32px] text-white relative group/card overflow-hidden">
                            <div className="absolute top-4 right-4 text-white opacity-10">
                                <ShieldAlert size={50} />
                            </div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Modèle Redundancy UK</div>
                            <div className="text-4xl font-black text-white">{Math.round(calc.ukTotal).toLocaleString()} €</div>
                            <div className="mt-4 flex items-center gap-2 text-emerald-400 font-black text-xs uppercase">
                                <Coins size={14} /> Économie : {Math.round(calc.saving).toLocaleString()} €
                            </div>
                        </div>

                        <a
                            href={getWhatsAppLink(`RH FRICTION : Mon coût de licenciement pour un profil à ${salary}€ est de ${calc.totalFR}€. Je veux basculer mon recrutement futur sur un contrat UK plus flexible.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between bg-red-600 text-white p-6 rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-red-200"
                        >
                            <div className="text-left font-black uppercase text-[10px] tracking-widest">
                                <span>Flexibiliser mes RH</span>
                            </div>
                            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </a>
                    </div>
                </div>

                <SEOMethodologyBlock
                    methodologyTitle="Modèle de Friction de Rupture de Contrat"
                    methodologyText="L'algorithme RH Friction Meter calcule le coût global de sortie d'un salarié incluant les indemnités légales de licenciement (base 1/4 de mois par année), le préavis (cadre standard 3 mois), et la taxe forfaitaire patronale de 30% sur les indemnités de rupture conventionnelle. Le comparatif UK se base sur le Statutory Redundancy Pay dont le salaire pris en compte est plafonné légalement (autour de £700/semaine), limitant drastiquement l'exposition financière."
                    algorithmName="RHFrictionV1"
                    algorithmVersion="v1.0"
                    precision="90%"
                    icon="fa-gavel"
                    mode="control"
                />
                <FAQCollapsible
                    title="Flexibilité RH : Comparatif des Risques"
                    items={[
                        {
                            question: "Qu'est-ce que le Redundancy Pay au UK ?",
                            answer: "Il s'agit de l'indemnité légale de licenciement pour motif économique. Elle est calculée selon l'âge et l'ancienneté, avec un plafond hebdomadaire strict."
                        },
                        {
                            question: "Est-ce difficile de recruter au UK ?",
                            answer: "Au contraire, la flexibilité du marché attire les talents internationaux qui acceptent une protection moindre à la sortie en échange de salaires bruts plus élevés et de moins de bureaucratie."
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default RHFrictionMeter;