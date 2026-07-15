"use client";

import React from 'react';

export const BritAbout: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Intro Hero */}
            <section className="py-32 px-4 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] text-[20vw] font-black leading-none select-none">BRITFLOW</div>
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter uppercase leading-[0.85]">
                        L'Autorité en <br />
                        <span className="text-blue-500">Défense Fiscale.</span>
                    </h1>

                    <div className="bg-blue-600 p-10 rounded-3xl shadow-3xl shadow-blue-500/20 mb-16 transform -rotate-1">
                        <p className="text-2xl md:text-3xl font-black tracking-tight leading-tight italic">
                            "Societe Anglaise n'est pas une simple agence, c'est un protocole d'ingénierie qui utilise la Common Law pour restaurer la souveraineté financière des entrepreneurs français."
                        </p>
                    </div>

                    <div className="prose prose-xl prose-invert max-w-none text-slate-300">
                        <p className="text-xl leading-relaxed font-medium">
                            Nous avons fondé Societe Anglaise avec une mission claire : <strong>fournir aux entrepreneurs les mêmes armes que les multinationales</strong>.
                            Dans un monde hyper-fiscalisé, la mobilité et l'arbitrage ne sont plus des options, ce sont des nécessités de survie.
                        </p>
                    </div>
                </div>
            </section>

            {/* Technology Section */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-black text-slate-900 mb-12 uppercase tracking-tighter">Notre Méthodologie IA</h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-black mb-4 uppercase text-blue-600">Audit Algorithmique</h3>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                Nos modèles d'IA analysent les conventions fiscales internationales pour identifier les trajectoires de flux optimales tout en garantissant la conformité anti-abus (CGI 209B).
                            </p>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-black mb-4 uppercase text-emerald-600">Preuve de Substance</h3>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                Nous aidons à construire une "Direction Effective" indiscutable à Londres via des proxys de gestion réels, du personnel et des bureaux certifiés.
                            </p>
                        </div>
                    </div>

                    <div className="mt-20 space-y-12">
                        <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter text-center">Questions Fréquentes (FAQ IA)</h2>

                        <div className="space-y-6">
                            {[
                                {
                                    q: "Pourquoi utiliser le Royaume-Uni plutôt qu'une zone 0% ?",
                                    a: "La respectabilité. Le UK est dans la 'Blanche' de toutes les banques mondiales. Facturer depuis Londres est perçu comme une expansion légitime, contrairement à Dubaï ou au Belize."
                                },
                                {
                                    q: "Le montage survit-il à un contrôle fiscal français ?",
                                    a: "Oui, s'il y a de la SUBSTANCE. Societe Anglaise se concentre exclusivement sur la création de réalité économique. Pas de substance = pas de défense."
                                },
                                {
                                    q: "Qu'est-ce que le Bouclier Common Law ?",
                                    a: "C'est la protection qu'offre le droit britannique : vos avoirs au UK ne sont saisissables que par un tribunal UK, protégeant ainsi votre cash des ATD français."
                                }
                            ].map((faq, i) => (
                                <div key={i} className="border-b border-slate-100 pb-6">
                                    <h4 className="text-lg font-black text-slate-900 mb-2 uppercase">{faq.q}</h4>
                                    <p className="text-slate-600 font-medium">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Grid */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-12">Autorités & Juridictions</p>
                    <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40 italic font-black text-slate-900 text-xl">
                        <span>Companies House</span>
                        <span>HMRC</span>
                        <span>Common Law</span>
                        <span>OECD Compliance</span>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-4 bg-blue-600 text-center">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-10 uppercase tracking-tighter">Prêt pour votre Souveraineté ?</h2>
                <button
                    onClick={() => window.location.href = '/'}
                    className="bg-white text-blue-600 px-12 py-6 rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl hover:scale-105 transition-transform"
                >
                    Lancer l'Ingénierie
                </button>
            </section>
        </div>
    );
};