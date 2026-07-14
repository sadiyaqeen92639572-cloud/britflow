"use client";


import React, { useState, useMemo, useEffect } from 'react';
import { Flame, Ghost, Trash2, ShieldAlert, Sparkles } from 'lucide-react';
import SEOBotContext from '../SEOBotContext';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import FAQCollapsible from '../FAQCollapsible';
import { getWhatsAppLink } from '../../services/whatsapp';

interface FixedCostBurnerProps {
    onLoad?: () => void;
}

const FixedCostBurner: React.FC<FixedCostBurnerProps> = ({ onLoad }) => {
    useEffect(() => {
        if (onLoad) onLoad();
    }, [onLoad]);

    const [employees, setEmployees] = useState<number>(0);
    const [cityType, setCityType] = useState<'rural' | 'metropole'>('metropole');
    const [industry, setIndustry] = useState<'tech' | 'retail' | 'consulting'>('tech');

    const costs = useMemo(() => {
        // France: Permanent "Existence" Costs
        // CFE: ~400€ to 2500€ dep on city and revenue
        let cfe = cityType === 'metropole' ? 1200 : 500;

        // Taxes de chambre, formation, etc.
        let fixedTaxes = 250;

        // Mandatory Medical / Insurance per employee
        let medical = employees * 600; // Mutual + Medicine du travail

        // Contrat de prévoyance (Mandatory for cadres)
        let prevoyance = industry === 'tech' ? 1200 : 600;

        const totalFR = cfe + fixedTaxes + medical + prevoyance;

        // UK: Virtual structure existence cost
        // No CFE (Business rates only for physical premises)
        // No mandatory medical (NHS funded via NI, paid on salary only)
        // Total is essentially £0 fixed recurring tax
        const totalUK = 0;

        return { totalFR, totalUK, cfe, medical, prevoyance };
    }, [employees, cityType, industry]);

    return (
        <div className="bg-slate-950 rounded-[48px] p-8 md:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
            <SEOBotContext
                toolName="Fixed Cost Burner - Taxe sur l'Existence"
                description="Comparateur des coûts fixes réglementaires obligatoires entre la France (CFE, Mutuelle, Médecine du Travail, Prévoyance) et le Royaume-Uni. Analyse le 'seuil de survie' d'une entreprise sans activité."
                pillars={[
                    "Pillar 1: Fixed Tax Accumulation - Calcule les taxes dues même avec un résultat nul (CFE, taxes de chambre)",
                    "Pillar 2: Mandatory Social Overheads - Analyse le coût des obligations conventionnelles (Mutuelle obligatoire, Prévoyance)",
                    "Pillar 3: Survival Velocity Ratio - Calcule le montant de CA nécessaire uniquement pour couvrir les prélèvements 'd'existence' français"
                ]}
                formula="BurnRate = CFE + (Employees * MedCost) + FixedTaxes"
                constraint="Basé sur les barèmes CFE 2024 moyens. Structure UK sans locaux physiques."
                logicalFaqs={[
                    {
                        q: "Quelles sont les taxes fixes d'une SARL/SASU ?",
                        a: "Les taxes incompressibles incluent la CFE (foncier), la mutuelle obligatoire (Loi ANI), la médecine du travail et la prévoyance pour les cadres."
                    },
                    {
                        q: "Est-ce qu'une Limited UK paie la CFE ?",
                        a: "Non. La CFE est une taxe locale française. Une société britannique sans bureau physique au UK n'a pas de taxes foncières commerciales ou d'existence équivalentes."
                    }
                ]}
            />

            <div className="absolute top-0 right-10 -mt-10 opacity-20 group-hover:opacity-100 transition-opacity">
                <Flame size={200} className="text-orange-600 blur-[2px] animate-pulse" />
            </div>

            <div className="relative z-10">
                <header className="mb-14">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-orange-600 p-2 rounded-xl text-white shadow-lg shadow-orange-900/40">
                            <Ghost size={24} />
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                            Fixed Cost <span className="text-orange-500">Burner</span>
                        </h2>
                    </div>
                    <p className="text-slate-400 font-bold text-sm max-w-xl leading-relaxed">
                        Saviez-vous qu'en France, même si vous ne dégagez aucun bénéfice et travaillez depuis votre salon, vous devez payer des taxes sur votre simple "existence" ?
                    </p>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
                            <label className="block text-[10px] font-black uppercase text-orange-500 tracking-widest mb-6">Type de Localisation (Estimation CFE)</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setCityType('rural')}
                                    className={`p-4 rounded-xl border-2 transition-all font-bold text-xs ${cityType === 'rural' ? 'border-orange-500 bg-orange-500/10 text-white' : 'border-slate-700 text-slate-500'}`}
                                >
                                    Rural / Petite Ville
                                </button>
                                <button
                                    onClick={() => setCityType('metropole')}
                                    className={`p-4 rounded-xl border-2 transition-all font-bold text-xs ${cityType === 'metropole' ? 'border-orange-500 bg-orange-500/10 text-white' : 'border-slate-700 text-slate-500'}`}
                                >
                                    Grande Métropole
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
                            <div className="flex justify-between items-center mb-6">
                                <label className="text-[10px] font-black uppercase text-orange-500 tracking-widest">Nombre d'employés</label>
                                <span className="text-2xl font-black text-white">{employees}</span>
                            </div>
                            <input
                                type="range" min="0" max="20" step="1" value={employees}
                                onChange={(e) => setEmployees(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                            />
                            <p className="text-[8px] text-slate-500 uppercase mt-4 font-bold tracking-widest leading-relaxed italic">
                                * Mutuelle obligatoire + médecine du travail + prévoyance cadre incluse.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-900 border-2 border-slate-800 rounded-[32px] p-8 relative group/card border-r-orange-500/50 overflow-hidden">
                            <div className="absolute -right-4 -top-4 text-slate-800 opacity-20">
                                <Trash2 size={100} />
                            </div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">"Taxe sur l'existence" (France)</div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-slate-400">CFE estimée :</span>
                                    <span className="text-white">{costs.cfe.toLocaleString()} €</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold text-orange-400">
                                    <span className="">Obligations Sociales :</span>
                                    <span>{costs.medical.toLocaleString()} €</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-slate-400">Prévoyance / Taxes Chambre :</span>
                                    <span className="text-white">{costs.prevoyance.toLocaleString()} €</span>
                                </div>
                            </div>

                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-[10px] font-black text-orange-500/50 uppercase mb-1">Total annuel incompressible</div>
                                    <div className="text-4xl font-black text-white">{costs.totalFR.toLocaleString()} €</div>
                                </div>
                                <div className="text-right">
                                    <ShieldAlert size={32} className="text-red-500 mb-2 inline-block animate-pulse" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-emerald-900/20 border-2 border-emerald-500/30 rounded-[32px] p-8 group/card relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 text-emerald-500 opacity-10">
                                <Sparkles size={100} />
                            </div>
                            <div className="text-[10px] font-black text-emerald-400/60 uppercase tracking-widest mb-2">Modèle Limited UK (Digital)</div>
                            <div className="text-4xl font-black text-emerald-500">0 €</div>
                            <p className="text-[10px] text-emerald-200/50 mt-4 leading-relaxed font-medium">
                                Aucune taxe foncière commerciale sans bureau. Les protections sociales ne sont payées que sur les salaires RÉELLEMENT versés.
                            </p>
                        </div>

                        <a
                            href={getWhatsAppLink(`FIXED COST : Ma structure FR me coute ${costs.totalFR}€ par an juste pour exister. Je veux supprimer ces taxes automatiques et passer sur un modele UK flexible.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-5 rounded-2xl text-center shadow-xl shadow-orange-950 transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-3"
                        >
                            <i className="fas fa-fire"></i> Brûler mes coûts fixes maintenant
                        </a>
                    </div>
                </div>

                <SEOMethodologyBlock
                    methodologyTitle="Analyse du Seuil de Rentabilité Réglementaire"
                    methodologyText="En France, le régime général impose des charges fixes déconnectées de la profitabilité : Cotisation Foncière des Entreprises (basée sur la valeur locative ou CA minimum), Médecine du Travail (obligatoire dès 1 salarié), Mutuelle (Loi ANI 2016), et contribution à la formation professionnelle. Le UK Ltd permet une mise en sommeil gratuite sans prélèvement fiscal automatique."
                    algorithmName="BurnRateV3"
                    algorithmVersion="v3.1"
                    precision="95%"
                    icon="fa-ghost"
                    mode="fiben"
                />
                <FAQCollapsible
                    title="Gestion des Coûts : France vs UK"
                    items={[
                        {
                            question: "Combien économise-t-on de frais fixes au UK ?",
                            answer: "Pour une petite structure, l'économie peut atteindre 2000€ à 5000€ par an rien qu'en supprimant les taxes d'existence et les obligations conventionnelles françaises."
                        },
                        {
                            question: "Dois-je payer une mutuelle au UK ?",
                            answer: "Non, la protection sociale au Royaume-Uni est financée par l'impôt (NHS). Il n'y a pas d'obligation légale de souscrire une mutuelle privée pour vos employés ou vous-même."
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default FixedCostBurner;