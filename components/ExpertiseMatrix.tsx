"use client";


import React from 'react';
import Link from 'next/link';

const ExpertiseMatrix: React.FC = () => {
  const categories = [
    {
      title: "Protection & Survie",
      icon: "fa-shield-heart",
      color: "border-red-500 text-red-600",
      links: [
        { label: "Maintien ARE / Chômage", href: "/outils/are-survival" },
        { label: "Bloquer les ATD/Saisies", href: "/articles/bouclier-atd-compte-bancaire-londres" },
        { label: "Rebond après Liquidation", href: "/articles/rebond-apres-liquidation-judiciaire-france" }
      ]
    },
    {
      title: "Souveraineté Privée",
      icon: "fa-user-lock",
      color: "border-emerald-500 text-emerald-600",
      links: [
        { label: "Protection Divorce", href: "/articles/divorce-protection-parts-societe-uk" },
        { label: "Abus de Bien Social", href: "/articles/abus-bien-social-directors-loan-account" },
        { label: "Insaisissabilité Parts", href: "/articles/insaisissabilite-parts-sociales-londres" }
      ]
    },
    {
      title: "Optimisation de Flux",
      icon: "fa-chart-line",
      color: "border-blue-500 text-blue-600",
      links: [
        { label: "Facturer clients USA ($)", href: "/articles/facturation-usa-w8ben-convention-uk" },
        { label: "TVA & Dropshipping", href: "/articles/ecommerce-tva-brexit-londres" },
        { label: "Royalties & IP", href: "/articles/management-fees-justification-fiscale" }
      ]
    },
    {
      title: "Scaling & Global",
      icon: "fa-rocket",
      color: "border-purple-500 text-purple-600",
      links: [
        { label: "Hyper-Croissance Londres", href: "/articles/velocity-scaling-solopreneur-agence" },
        { label: "Levée de Fonds VC", href: "/articles/levee-de-fonds-vc-advantages-uk" },
        { label: "Recrutement Global", href: "/articles/recrutement-global-talent-international" }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-20">
      {categories.map((cat, idx) => (
        <div key={idx} className="bg-white border-t-4 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border-slate-100 group">
          <div className={`${cat.color} mb-6 flex items-center gap-3 font-black uppercase text-xs tracking-widest`}>
            <i className={`fas ${cat.icon} text-xl`}></i>
            {cat.title}
          </div>
          <ul className="space-y-4">
            {cat.links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-left text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center gap-2 group/btn"
                >
                  <i className="fas fa-arrow-right text-[8px] opacity-0 group-hover/btn:opacity-100 transition-all"></i>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExpertiseMatrix;