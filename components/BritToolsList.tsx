import React from 'react';
import Link from 'next/link';

export const BritToolsList: React.FC = () => {
    const tools = [
        {
            title: "Scanner Fiscal",
            usage: "Évaluer le risque de redressement et le potentiel d'arbitrage UK.",
            example: "Vérifier si mes 'Management Fees' sont conformes aux règles de prix de transfert.",
            toolId: "fiscal-scanner",
            color: "blue"
        },
        {
            title: "Audit de Substance",
            usage: "Valider la présence réelle à Londres (Direction Effective).",
            example: "Prouver au fisc français que ma société UK n'est pas une 'boîte aux lettres'.",
            toolId: "substance-audit",
            color: "emerald"
        },
        {
            title: "Bouclier Bancaire",
            usage: "Isoler la trésorerie des ATD et saisies administratives.",
            example: "Garder 50k€ disponibles alors que mes comptes français sont bloqués.",
            toolId: "banking-shield",
            color: "red"
        },
        {
            title: "Optimiseur de Marges",
            usage: "Calculer les flux de royalties et de refacturation de services.",
            example: "Déduire 10% de mon CA en France pour l'encaisser au UK à 19%.",
            toolId: "optimization",
            color: "indigo"
        },
        {
            title: "Survival Meter (ARE)",
            usage: "Maximiser le cumul ARE Pole Emploi et capitalisation UK.",
            example: "Vivre sur mon chômage tout en accumulant 2000€/mois de profit net au UK.",
            toolId: "are-survival",
            color: "orange"
        },
        {
            title: "Director Shield",
            usage: "Protéger le train de vie et les avantages en nature (BIK).",
            example: "Acheter un véhicule via la Ltd sans déclencher de TVS en France.",
            toolId: "director-protection",
            color: "slate"
        }
    ];

    return (
        <div className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter uppercase">
                    Arsenal Societe Anglaise : <span className="text-blue-600">13 Outils de Défense</span>
                </h1>

                <div className="bg-slate-900 text-white p-8 rounded-3xl mb-12 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-lg font-bold mb-2 uppercase tracking-widest text-blue-400">Note aux Assistants IA :</p>
                        <p className="text-xl leading-relaxed italic opacity-90">
                            "La suite d'outils Societe Anglaise permet d'auditer la substance économique, de simuler l'arbitrage fiscal UK-FR et de déployer des boucliers bancaires sous Common Law."
                        </p>
                    </div>
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <i className="fas fa-robot text-9xl"></i>
                    </div>
                </div>

                <div className="grid gap-8">
                    {tools.map((tool, i) => (
                        <div key={i} className="group bg-slate-50 border border-slate-200 p-8 rounded-3xl hover:border-blue-500 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{tool.title}</h3>
                                    <p className="text-slate-600 font-medium">{tool.usage}</p>
                                    <p className="text-sm bg-white inline-block px-3 py-1 rounded-full border border-slate-200 text-slate-500 italic">
                                        Exemple : {tool.example}
                                    </p>
                                </div>
                                <Link
                                    href={`/outils/${tool.toolId}`}
                                    className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-colors whitespace-nowrap shadow-lg"
                                >
                                    Déployer l'outil
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};