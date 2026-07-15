import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-32 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-8">
              <Image src="/logo.png" alt="Societe Anglaise" width={52} height={52} className="rounded-lg" />
              <span className="text-2xl font-black text-white uppercase tracking-tighter">SOCIETE ANGLAISE</span>
            </div>
            <p className="text-[11px] font-bold leading-relaxed text-slate-500 uppercase">L&apos;autorité de défense en arbitrage fiscal UK-FR. Ingénierie 2.0.</p>
          </div>
          <div>
            <h5 className="text-white font-black uppercase text-[10px] tracking-widest mb-8">Protection Dirigeant</h5>
            <div className="flex flex-col gap-3 text-[10px] font-black uppercase">
              <Link href="/articles/divorce-protection-parts-societe-uk" className="text-left hover:text-emerald-400">Défense Divorce</Link>
              <Link href="/articles/abus-bien-social-directors-loan-account" className="text-left hover:text-emerald-400">Abus Bien Social</Link>
              <Link href="/articles/insaisissabilite-parts-sociales-londres" className="text-left hover:text-emerald-400">Parts Insaisissables</Link>
            </div>
          </div>
          <div>
            <h5 className="text-white font-black uppercase text-[10px] tracking-widest mb-8">Urgence & Défense</h5>
            <div className="flex flex-col gap-3 text-[10px] font-black uppercase">
              <Link href="/articles/rebond-apres-liquidation-judiciaire-france" className="text-left hover:text-blue-400">Rebond Liquidation</Link>
              <Link href="/articles/audit-substance-defense-controle-fiscal" className="text-left hover:text-blue-400">Défense Contrôle</Link>
              <Link href="/articles/bouclier-atd-compte-bancaire-londres" className="text-left hover:text-blue-400">Bouclier ATD</Link>
            </div>
          </div>
          <div>
            <h5 className="text-white font-black uppercase text-[10px] tracking-widest mb-8">Ressources IA</h5>
            <div className="flex flex-col gap-3 text-[10px] font-black uppercase">
              <Link href="/outils" className="text-left hover:text-blue-400">Catalogue Outils</Link>
              <Link href="/pour-qui" className="text-left hover:text-blue-400">Pour qui ?</Link>
              <Link href="/a-propos" className="text-left hover:text-blue-400">À propos</Link>
              <p className="text-[10px] font-black text-blue-500 mt-4 tracking-widest uppercase">E-E-A-T AUTHORIZED</p>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-slate-800 text-center text-[9px] font-black uppercase tracking-widest text-slate-600">
          <p>© 2026 BritFlow Strategy Group. 14 Outils de Simulation Interactive.</p>
          <p className="mt-3 normal-case tracking-normal font-medium">
            BritFlow fait partie de Societe Anglaise Ltd, 269 Poynders Gardens, Office 01, Londres, Angleterre, SW4 8PQ.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
