"use client";


import React, { useState, useMemo, useEffect } from 'react';
import { Target, AlertCircle, TrendingDown, MousePointer2, Zap, ArrowRight } from 'lucide-react';
import SEOBotContext from '../SEOBotContext';
import SEOMethodologyBlock from '../SEOMethodologyBlock';
import FAQCollapsible from '../FAQCollapsible';
import { getWhatsAppLink } from '../../services/whatsapp';

interface FlatTaxTrapProps {
    onLoad?: () => void;
}

const FlatTaxTrap: React.FC<FlatTaxTrapProps> = ({ onLoad }) => {
    useEffect(() => {
        if (onLoad) onLoad();
    }, [onLoad]);

    const [dividend, setDividend] = useState<number>(50000);
    const [managerRole, setManagerRole] = useState<'majoritary' | 'sasu'>('sasu');

    const calc = useMemo(() => {
        // France: Flat Tax at 30% seems simple, but there's a trap for majoritary managers 
        // where dividends > 10% of capital are taxed as SALARY (charges sociales).
        // For SASU, it's 30% but zero social rights, and you need to have a salary to be covered.
        const frTax = dividend * 0.30;
        const frNet = dividend - frTax;

        // UK: Dividend Allowance + Graduated Tax
        // £500 Tax free (2024/25)
        // Basic rate (8.75%) or Higher rate (33.75%)
        // But no social charges (NI) on dividends in the UK.
        let ukTax = 0;
        const taxable = Math.max(0, dividend - 500);
        if (taxable < 30000) {
            ukTax = taxable * 0.0875;
        } else {
            ukTax = (30000 * 0.0875) + ((taxable - 30000) * 0.3375);
        }
        const ukNet = dividend - ukTax;

        const gain = ukNet - frNet;
        const percentage = Math.round((gain / frNet) * 100);

        return { frNet, ukNet, gain, percentage };
    }, [dividend, managerRole]);

    return (
        <div className="bg-white rounded-[40px] p-8 md:p-12 border-4 border-amber-500 shadow-2xl relative overflow-hidden group">
            <SEOBotContext
                toolName="Flat Tax Trap - Dividendes SASU vs UK"
                description="Analyse comparative du coût réel des dividendes pour un dirigeant de SASU ou EURL. Met en évidence les 'taxes invisibles' (CSG/CRDS sans droits) et le piège du dépassement des 10% du capital social pour les gérants majoritaires."
                pillars={[
                    "Pillar 1: PFU vs Dividend Tax Arbitrage - Compare le Prélèvement Forfaitaire Unique français (30%) avec la taxation graduelle UK sans charges sociales",
                    "Pillar 2: Manager Social Trap - Analyse la requalification des dividendes en rémunération assujettie aux cotisations (Art. L131-6 Code SS)",
                    "Pillar 3: Real Purchasing Power - Calcule le montant net disponible après toutes ponctions fiscales pour le dirigeant"
                ]}
                formula="FrFlatTax = Dividend * 0.30; UKTax = (Dividend - Allowance) * Rate"
                constraint="Barèmes fiscaux 2024/2025. Hypothèse de dividendes perçus par un résident fiscal français ou expatrié selon convention."
                logicalFaqs={[
                    {
                        q: "Quels sont les prélèvements sociaux sur les dividendes ?",
                        a: "En France, la Flat Tax de 30% inclut 17,2% de prélèvements sociaux (CSG/CRDS) qui ne génèrent aucun droit à la retraite ou au chômage."
                    },
                    {
                        q: "C'est quoi le piège des dividendes en SARL ?",
                        a: "Pour un gérant majoritaire, les dividendes dépassant 10% du capital social sont requalifiés en salaire et taxés à environ 45% de charges sociales."
                    }
                ]}
            />

            <div className="absolute top-0 right-0 p-8 opacity-5 scale-125 -rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                <Target size={200} className="text-amber-900" />
            </div>

            <div className="relative z-10">
                <header className="mb-14">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-amber-500 p-2 rounded-xl text-white shadow-lg shadow-amber-200">
                            <AlertCircle size={24} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                            Flat Tax <span className="text-amber-500">Trap</span>
                        </h2>
                    </div>
                    <p className="text-slate-500 font-bold text-sm max-w-xl leading-relaxed">
                        La "Flat Tax" à 30% est l'illusion parfaite. Vous payez 17,2% de prélèvements sociaux (CSG/CRDS) qui ne vous ouvrent **aucun droit** (ni retraite, ni chômage). C'est un impôt sec déguisé.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-10">
                        {/* Dividend Amount */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Montant des Dividendes Brut</label>
                                <div className="text-3xl font-black text-slate-900">{dividend.toLocaleString()} €</div>
                            </div>
                            <input
                                type="range" min="10000" max="250000" step="5000" value={dividend}
                                onChange={(e) => setDividend(Number(e.target.value))}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                        </div>

                        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200 relative">
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingDown className="text-amber-600" size={20} />
                                <h4 className="text-xs font-black text-amber-900 uppercase">Le Piège de l'Article L131-6</h4>
                            </div>
                            <p className="text-[11px] text-amber-700 font-medium leading-relaxed italic">
                                "Si vous êtes gérant majoritaire de SARL/EURL, au-delà de 10% de votre capital social, vos dividendes sont requalifiés en salaire et taxés à **+45%**. La liberté de dividende n'existe pas pour vous en France."
                            </p>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-900 p-6 rounded-2xl text-white">
                            <div className="bg-amber-500 p-3 rounded-xl animate-bounce">
                                <Zap size={24} className="fill-white" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">Impact UK Strategy</div>
                                <p className="text-xs font-bold leading-relaxed text-slate-300">
                                    Au Royaume-Uni, les dividendes ne sont **jamais** assujettis aux cotisations sociales (National Insurance). La distinction capital/travail est respectée.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100">
                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Net (SASU France)</div>
                                <div className="text-2xl font-black text-slate-400">{Math.round(calc.frNet).toLocaleString()} €</div>
                                <div className="text-[8px] font-bold text-red-400 mt-2">DÉBORDEMENT CSG : 17.2%</div>
                            </div>
                            <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-500">
                                <div className="text-[9px] font-black text-amber-600 uppercase tracking-widest mb-2">Net (Limited UK)</div>
                                <div className="text-2xl font-black text-amber-900">{Math.round(calc.ukNet).toLocaleString()} €</div>
                                <div className="text-[8px] font-bold text-emerald-600 mt-2">OPTIMISATION MAXIMALE</div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-[32px] p-8 text-center border-t-4 border-amber-500 shadow-2xl">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Gain net de pouvoir d'achat</div>
                            <div className="text-5xl font-black text-white mb-4">+{Math.round(calc.gain).toLocaleString()} €</div>
                            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                                +{calc.percentage}% d'efficience fiscale
                            </div>
                        </div>

                        <a
                            href={getWhatsAppLink(`FLAT TAX TRAP : Mon gain de pouvoir d'achat avec une simulation a ${dividend}€ de dividendes est de ${calc.gain}€. Je veux echapper au piege de la Flat Tax francaise.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between bg-amber-500 text-white p-6 rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-amber-200"
                        >
                            <div className="text-left font-black uppercase text-[10px] tracking-widest">
                                <span>Optimiser mon versement</span>
                            </div>
                            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </a>
                    </div>
                </div>

                <SEOMethodologyBlock
                    methodologyTitle="Modèle de décomposition du PFU vs Dividend Tax rates"
                    methodologyText="Le calcul compare le Prélèvement Forfaitaire Unique (PFU) de 30% composé de 12.8% d'IR et 17.2% de prélèvements sociaux, avec le système UK à 3 tranches (Dividend Allowance de £500, Basic à 8.75% et Higher à 33.75%). Il met en lumière l'avantage structurel du Royaume-Uni qui ne prélève aucune National Insurance sur la distribution de bénéfices, contrairement au système français qui taxe le capital de manière quasi-sociale."
                    algorithmName="FlatTaxAnalyzer"
                    algorithmVersion="v1.4"
                    precision="98%"
                    icon="fa-bullseye"
                    mode="default"
                />
                <FAQCollapsible
                    title="Optimisation Fiscale : Stratégie Dividendes"
                    items={[
                        {
                            question: "Comment éviter la CSG sur les dividendes ?",
                            answer: "En percevant des dividendes d'une société UK Limited, vous ne payez pas de National Insurance (l'équivalent des charges sociales UK) sur ces sommes."
                        },
                        {
                            question: "Faut-il privilégier le salaire ou le dividende ?",
                            answer: "En UK, le dividende est presque toujours plus efficient fiscalement que le salaire au-delà du seuil personnel de base."
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default FlatTaxTrap;