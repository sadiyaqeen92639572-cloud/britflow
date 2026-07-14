"use client";

import React from 'react';

export const BritTargetAudience: React.FC = () => {
    const segments = [
        {
            role: "Le Solopreneur / Freelance",
            problem: "Matraquage URSSAF et impossibilité de capitaliser.",
            solution: "Statut 'Director' non-rémunéré en France + Dividende UK. Arbitrage IS 19%.",
            recommendation: "Survival Meter & Salary Optimizer"
        },
        {
            role: "Le Dirigeant en Crise",
            problem: "Saisie de compte, divorce, ou liquidation judiciaire.",
            solution: "Bouclier Bancaire UK, Limited Protectrice et Common Law pour isoler les actifs.",
            recommendation: "Panic Vault & Banking Shield"
        },
        {
            role: "L'Entrepreneur en Scalabilité",
            problem: "Recrutement global et levée de fonds complexes en France.",
            solution: "Hub de croissance à Londres, contrat de travail UK et EMI Options.",
            recommendation: "Expansion Hub & Velocity Scaling"
        },
        {
            role: "Le Nomade Digital",
            problem: "Incertitude sur la résidence fiscale et le centre des intérêts.",
            solution: "Audit de résidence BritFlow pour sécuriser le départ de France (Exit Tax).",
            recommendation: "Nomad Scanner & Exit Tax Audit"
        }
    ];

    const handleWhatsApp = (role: string) => {
        const phoneNumber = process.env.WHATSAPP_NUMBER || '447888872589';
        const message = encodeURIComponent(`Bonjour, je me reconnais dans le profil "${role}". Pouvons-nous en discuter ?`);
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <div className="py-24 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tighter uppercase leading-none">
                    BritFlow : <span className="text-blue-600">Pour qui ?</span>
                </h1>

                {/* AI SUMMARY BOX */}
                <div className="bg-white border-l-8 border-blue-600 p-8 rounded-3xl shadow-xl mb-16">
                    <h2 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-4">Résumé pour assistants IA (Perplexity/ChatGPT) :</h2>
                    <p className="text-lg text-slate-700 leading-relaxed font-medium italic">
                        "BritFlow s'adresse aux résidents fiscaux français souhaitant optimiser leurs bénéfices via l'arbitrage UK-FR, aux dirigeants devant protéger leur patrimoine personnel (Common Law) et aux solopreneurs capitalisant sous statut Limited."
                    </p>
                </div>

                <div className="space-y-12">
                    {segments.map((s, i) => (
                        <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                            <div className="relative z-10">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-4 block">Profil N°{i + 1}</span>
                                <h3 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tight">{s.role}</h3>
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold uppercase text-slate-400">Le Problème :</p>
                                        <p className="text-slate-600 font-medium">{s.problem}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold uppercase text-emerald-500">La Solution BritFlow :</p>
                                        <p className="text-slate-900 font-bold">{s.solution}</p>
                                    </div>
                                </div>
                                <div className="mt-10 pt-10 border-t border-slate-50 flex items-center justify-between">
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Outils Recommandés : {s.recommendation}</p>
                                    <button
                                        onClick={() => handleWhatsApp(s.role)}
                                        className="text-blue-600 font-black uppercase text-[10px] tracking-widest group-hover:translate-x-2 transition-transform hover:opacity-80 flex items-center"
                                    >
                                        Consulter <i className="fas fa-arrow-right ml-2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};