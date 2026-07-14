"use client";


import React, { useState, useMemo } from 'react';
import { Scissors, TrendingDown, PiggyBank, ArrowRight, Zap } from 'lucide-react';
import SEOBotContext from '../SEOBotContext';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import FAQCollapsible from '../FAQCollapsible';
import { getWhatsAppLink } from '../../services/whatsapp';

interface ExpenseShredderProps {
    onLoad?: () => void;
}

const ExpenseShredder: React.FC<ExpenseShredderProps> = ({ onLoad }) => {
    React.useEffect(() => {
        if (onLoad) onLoad();
    }, [onLoad]);

    const [revenue, setRevenue] = useState<number>(60000);
    const [expenses, setExpenses] = useState<number>(15000); // Annual expenses (SaaS, ads, etc.)

    const calculation = useMemo(() => {
        // France: Micro-entrepreneur (Service Libéral)
        // No deduction. Tax is on Revenue.
        // Cotisations: ~22%
        // Impôts (VFL): ~2.2% or bracket
        const frCotisations = revenue * 0.22;
        const frImpots = revenue * 0.022;
        const frNet = revenue - frCotisations - frImpots - expenses; // Expenses are paid from NET

        // UK: Limited
        // Deduct expenses first.
        const ukProfit = revenue - expenses;
        const ukIS = ukProfit * 0.19; // Small profit rate
        const ukNet = ukProfit - ukIS; // Simplified: profit after IS

        const delta = ukNet - frNet;
        const gainPercent = Math.round((delta / frNet) * 100);

        return { frNet, ukNet, delta, gainPercent };
    }, [revenue, expenses]);

    return (
        <div className="bg-white rounded-[40px] p-8 md:p-12 border-4 border-emerald-500 shadow-2xl relative overflow-hidden group">
            <SEOBotContext
                toolName="Expense Shredder - Micro vs Limited"
                description="Simulateur comparatif d'imposition entre le régime Micro-entreprise français (IS sur Chiffre d'Affaires) et le régime Limited britannique (IS sur Bénéfice Réel). Met en évidence l'impact de la déductibilité des charges (Ads, SaaS, IA)."
                pillars={[
                    "Pillar 1: Revenue vs Profit Arbitrage - Calcule la perte sèche liée à l'impossibilité de déduire les charges en Auto-entrepreneur",
                    "Pillar 2: Real Expense Multiplier - Analyse l'impact des dépenses opérationnelles sur le taux d'imposition effectif",
                    "Pillar 3: Net Cashflow Retention - Compare le 'Reste à vivre' réel après cotisations et investissements business"
                ]}
                formula="FrNet = Rev - (Rev * 0.24) - Expenses; UkNet = (Rev - Expenses) * 0.81"
                constraint="Taux cotisations France 2025. IS UK taux réduit PME."
                logicalFaqs={[
                    {
                        q: "Pourquoi la micro-entreprise est déconseillée avec des charges ?",
                        a: "En micro-entreprise, vous payez des cotisations sur le chiffre d'affaires. Si vous avez 20% de charges (Ads, SaaS), vous payez des taxes sur de l'argent déjà dépensé."
                    },
                    {
                        q: "Puis-je déduire mes frais d'IA en Limited UK ?",
                        a: "Oui, 100% des abonnements SaaS, APIs IA et serveurs sont déductibles du profit brut avant impôt sur les sociétés (Corporation Tax)."
                    }
                ]}
            />

            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-all duration-700 -rotate-12">
                <Scissors size={240} className="text-emerald-500" />
            </div>

            <div className="relative z-10">
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-emerald-500 p-2 rounded-xl text-white">
                            <Scissors size={20} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                            Expense <span className="text-emerald-500">Shredder</span>
                        </h2>
                    </div>
                    <p className="text-slate-500 font-bold text-sm max-w-xl">
                        Le piège de la Micro-entreprise : Vous payez vos cotisations sur votre CA, pas sur votre profit. Plus vous investissez (Ads, IA, Softs), plus vous travaillez à perte.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-10">
                        {/* Revenue Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Chiffre d'Affaires Annuel</label>
                                <div className="text-xl font-black text-slate-900">{revenue.toLocaleString()} €</div>
                            </div>
                            <input
                                type="range" min="10000" max="150000" step="1000" value={revenue}
                                onChange={(e) => setRevenue(Number(e.target.value))}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                        </div>

                        {/* Expenses Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-emerald-600">
                                <label className="text-[10px] font-black uppercase tracking-widest">Dépenses Réelles (SaaS, Pub, Staff)</label>
                                <div className="text-xl font-black">{expenses.toLocaleString()} €</div>
                            </div>
                            <input
                                type="range" min="0" max={revenue * 0.6} step="500" value={expenses}
                                onChange={(e) => setExpenses(Number(e.target.value))}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                            <p className="text-[10px] text-slate-400 italic">En UK Limited, ces {expenses.toLocaleString()}€ sont 100% déductibles avant impôt.</p>
                        </div>

                        <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-100">
                            <div className="flex items-center gap-4 mb-3">
                                <TrendingDown className="text-emerald-600" size={24} />
                                <h4 className="text-sm font-black text-emerald-900 uppercase">Verdict du "Plafond de Verre"</h4>
                            </div>
                            <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                                Avec {Math.round((expenses / revenue) * 100)}% de charges, votre structure française devient un gouffre. Vous payez des cotisations sur de l'argent que vous ne 'gagnez' pas réellement.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="bg-slate-50 p-8 rounded-[32px] border-2 border-slate-100 relative group/card overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/card:scale-110 transition-transform">
                                <i className="fas fa-flag-fr text-4xl"></i>
                            </div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Net dans votre poche (Micro-FR)</div>
                            <div className="text-3xl font-black text-slate-400">{Math.round(calculation.frNet).toLocaleString()} €</div>
                            <div className="mt-4 h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-300" style={{ width: '60%' }}></div>
                            </div>
                        </div>

                        <div className="bg-emerald-600 p-8 rounded-[32px] shadow-2xl shadow-emerald-200 relative group/card overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover/card:scale-110 transition-transform">
                                <i className="fas fa-flag-uk text-4xl"></i>
                            </div>
                            <div className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-2">Net dans votre poche (Limited-UK)</div>
                            <div className="text-3xl font-black text-white">{Math.round(calculation.ukNet).toLocaleString()} €</div>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-[14px] font-black text-emerald-200 uppercase tracking-widest">
                                    +{calculation.gainPercent}% de cashflow
                                </div>
                                <Zap size={20} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                            </div>
                        </div>

                        <a
                            href={getWhatsAppLink(`BYE BYE MICRO : J'ai ${expenses}€ de frais pour ${revenue}€ de CA. Je veux arreter de payer des cotisations sur mes charges et passer en Limited.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between bg-slate-900 text-white p-6 rounded-2xl hover:bg-emerald-600 transition-all shadow-xl"
                        >
                            <div className="text-left font-black uppercase text-[10px] tracking-widest">
                                <span>Déchiqueter mes charges maintenant</span>
                                <div className="text-emerald-400 text-[8px] mt-1">Gain potentiel : +{calculation.delta.toLocaleString()} € / an</div>
                            </div>
                            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </a>
                    </div>
                </div>

                <FAQCollapsible
                    title="Analyse de Rentabilité : Micro vs Limited"
                    items={[
                        {
                            question: "Quel est le seuil pour quitter la micro-entreprise ?",
                            answer: "Dès que vos frais réels (publicité, outils, sous-traitance) dépassent 10% de votre CA, le régime Limited devient mathématiquement plus avantageux."
                        },
                        {
                            question: "Est-ce légal d'utiliser une Limited au UK ?",
                            answer: "Oui, c'est parfaitement légal tant que vous respectez les règles de substance et déclarez vos dividendes dans votre pays de résidence fiscale."
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default ExpenseShredder;