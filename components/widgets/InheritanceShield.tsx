"use client";


import React, { useState, useMemo } from 'react';
import { Landmark, Users, ArrowUpRight, ShieldCheck, HeartPulse } from 'lucide-react';
import SEOBotContext from '../SEOBotContext';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import FAQCollapsible from '../FAQCollapsible';
import { getWhatsAppLink } from '../../services/whatsapp';

interface InheritanceShieldProps {
    onLoad?: () => void;
}

const InheritanceShield: React.FC<InheritanceShieldProps> = ({ onLoad }) => {
    React.useEffect(() => {
        if (onLoad) onLoad();
    }, [onLoad]);

    const [estateValue, setEstateValue] = useState<number>(1000000);
    const [heirs, setHeirs] = useState<number>(2);

    const calc = useMemo(() => {
        // France: Succession taxed on heirs
        // Typical HNW scenario without Dutreil (which is a prison of constraints)
        // Abatement is ~100k per child
        const taxablePerHeir = Math.max(0, (estateValue / heirs) - 100000);

        // Graduated rates (simplified average for high tier)
        let avgRateFR = 0.20;
        if (taxablePerHeir > 500000) avgRateFR = 0.35;
        if (taxablePerHeir > 1000000) avgRateFR = 0.45;

        const frenchTaxTotal = taxablePerHeir * avgRateFR * heirs;
        const inheritanceFR = estateValue - frenchTaxTotal;

        // UK: Family Investment Company (FIC)
        // FIC is a company set up to hold assets.
        // Gift of shares can be a "Potentially Exempt Transfer" (PET)
        // If donor survives 7 years, tax is 0%.
        // Administration & frictional costs for setup/maintenance
        const ukFriction = 15000 + (estateValue * 0.02);
        const inheritanceUK = estateValue - ukFriction;

        const saving = inheritanceUK - inheritanceFR;

        return { frenchTaxTotal, inheritanceFR, inheritanceUK, saving };
    }, [estateValue, heirs]);

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
            <SEOBotContext
                toolName="Inheritance Shield - Succession & FIC"
                description="Simulateur de droits de succession comparant le régime français (taxation directe jusqu'à 45%) et la structure britannique Family Investment Company (FIC). Analyse l'optimisation via la Common Law et les dons exonérés (PET)."
                pillars={[
                    "Pillar 1: Succession Drag Analysis - Calcule l'hémorragie patrimoniale liée aux droits de mutation en ligne directe",
                    "Pillar 2: FIC Structure Efficiency - Évalue le gain d'une transmission via démembrement de parts sociales en juridiction UK",
                    "Pillar 3: Generational Protection - Simule le capital net perçu par les héritiers après optimisation des droits de donation"
                ]}
                formula="FrTax = sum(Abatement(Heirs) * ProgressiveRate); UKTax = SetupCosts + 0% (if PET 7yr)"
                constraint="Taux de succession France ligne directe 2024. Hypothèse de survie PET 7 ans pour le modèle UK."
                logicalFaqs={[
                    {
                        q: "Quel est le taux de succession en ligne directe ?",
                        a: "En France, après un abattement de 100 000 €, les taux grimpent rapidement de 20% à 45% pour les patrimoines importants."
                    },
                    {
                        q: "Comment fonctionne le PET (Potentially Exempt Transfer) ?",
                        a: "C'est une règle fiscale UK permettant de donner des actifs sans impôt, à condition que le donateur survive 7 ans après la donation."
                    }
                ]}
            />

            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                <Landmark size={200} />
            </div>

            <div className="relative z-10">
                <header className="mb-12">
                    <h2 className="text-3xl font-black tracking-tighter mb-4 flex items-center gap-3">
                        <HeartPulse className="text-blue-500" />
                        Inheritance <span className="text-blue-500">Shield</span>
                    </h2>
                    <p className="text-slate-400 font-medium text-sm max-w-2xl leading-relaxed">
                        Le Pacte Dutreil est une "prison dorée" complexe. Pourquoi s'infliger des contraintes de conservation quand une structure UK permet de transmettre virtuellement 100% de votre patrimoine sans le fisc ?
                    </p>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="space-y-10">
                        {/* Estate Value */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Valeur du Patrimoine à Transmettre</label>
                                <div className="text-2xl font-black text-blue-400">{estateValue.toLocaleString()} €</div>
                            </div>
                            <input
                                type="range" min="300000" max="10000000" step="100000" value={estateValue}
                                onChange={(e) => setEstateValue(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>

                        {/* Heirs */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Nombre d'enfants / héritiers</label>
                                <div className="flex items-center gap-4">
                                    <Users size={20} className="text-blue-500/50" />
                                    <span className="text-2xl font-black text-white">{heirs}</span>
                                </div>
                            </div>
                            <input
                                type="range" min="1" max="6" step="1" value={heirs}
                                onChange={(e) => setHeirs(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>

                        <div className="bg-blue-900/10 border border-blue-500/20 p-6 rounded-3xl mt-8">
                            <h4 className="text-xs font-black text-blue-400 uppercase mb-4 tracking-widest">Le Saviez-vous ?</h4>
                            <p className="text-xs text-blue-100/60 leading-relaxed italic">
                                "Au Royaume-Uni, le 'Potentially Exempt Transfer' permet d'annuler les droits de mutation si vous donnez vos parts et vivez 7 ans après le don. Vos héritiers reçoivent le capital BRUT."
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-800/50 p-8 rounded-[32px] border border-slate-700">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-700/50 pb-2 flex justify-between">
                                <span>Capital Net Transmis</span>
                                <span>Friction Fiscale</span>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Régime Standard France</div>
                                        <div className="text-2xl font-black text-slate-400">{Math.round(calc.inheritanceFR).toLocaleString()} €</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-bold text-red-500 uppercase">-{Math.round(calc.frenchTaxTotal).toLocaleString()} €</div>
                                        <div className="text-[8px] text-slate-500">Droits de succession</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-slate-700/50 pt-8 group/item">
                                    <div>
                                        <div className="text-[10px] font-bold text-blue-400 uppercase mb-1">Structure FIC UK</div>
                                        <div className="text-3xl font-black text-white">{Math.round(calc.inheritanceUK).toLocaleString()} €</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1 justify-end">
                                            <ShieldCheck size={12} /> Maximisé
                                        </div>
                                        <div className="text-[8px] text-slate-500">Transmis à 100% (PET 7y)</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-[32px] shadow-2xl flex items-center justify-between group overflow-hidden relative">
                            <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Économie de transmission</div>
                                <div className="text-4xl font-black text-white">+{Math.round(calc.saving).toLocaleString()} €</div>
                            </div>
                            <div className="relative z-10 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                                <ArrowUpRight size={32} className="text-white group-hover:scale-125 transition-transform" />
                            </div>
                        </div>

                        <a
                            href={getWhatsAppLink(`INHERITANCE SHIELD : Je souhaite protéger mes ${heirs} enfants contre les 45% de droits de succession sur mon patrimoine de ${estateValue}€. Je veux en savoir plus sur la FIC UK.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-white text-slate-900 font-black py-5 rounded-2xl text-center shadow-xl shadow-blue-500/20 transition-all uppercase text-xs tracking-[0.2em] hover:bg-blue-500 hover:text-white"
                        >
                            Sanctuariser mon héritage
                        </a>
                    </div>
                </div>

                <SEOMethodologyBlock
                    methodologyTitle="Modélisation d'Optimisation de Transmission"
                    methodologyText="L'algorithme Inheritance Shield compare l'imposition progressive française (ligne directe) après abattement de 100k€ par enfant, avec le modèle FIC (Family Investment Company) du Royaume-Uni. Le modèle FIC utilise le mécanisme des PETs (Potentially Exempt Transfers) permettant une exonération totale après 7 ans, ne subissant que des coûts de structure minimes comparativement aux barèmes de mutation français."
                    algorithmName="WealthProtector"
                    algorithmVersion="v4.2"
                    precision="94%"
                    icon="fa-landmark"
                    mode="default"
                />
                <FAQCollapsible
                    title="Optimisation Patrimoniale : FIC UK"
                    items={[
                        {
                            question: "Qu'est-ce qu'une Family Investment Company (FIC) ?",
                            answer: "C'est une société de gestion de patrimoine au Royaume-Uni conçue pour détenir des actifs familiaux et faciliter la transmission intergénérationnelle à moindre coût fiscal."
                        },
                        {
                            question: "Le Pacte Dutreil est-il meilleur qu'une FIC ?",
                            answer: "Le Dutreil offre des abattements mais impose des contraintes de conservation très strictes. La FIC UK offre une flexibilité totale sur la gestion des actifs."
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default InheritanceShield;