import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <nav data-header="main" className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-blue-600 p-2 rounded-lg shadow-blue-200 shadow-lg">
            <i className="fas fa-bridge text-white"></i>
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
            BRIT<span className="text-blue-600">FLOW</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
          <Link href="/#tools" className="hover:text-blue-600 transition-colors">Arsenal Outils</Link>
          <Link href="/observatoire" className="hover:text-purple-600 transition-colors text-purple-600 flex items-center gap-2">
            <i className="fas fa-chart-line"></i> Observatoire
          </Link>
          <Link href="/pour-qui" className="hover:text-blue-600 transition-colors">Pour qui ?</Link>

          <Link href="/outils/substance-audit" className="hover:text-emerald-600 transition-colors text-emerald-600 flex items-center gap-2">
            <i className="fas fa-shield-check"></i> Audit Substance
          </Link>
          <Link href="/outils/director-protection" className="hover:text-emerald-600 transition-colors uppercase">
            Protection
          </Link>
          <Link href="/#blog" className="hover:text-blue-600 transition-colors uppercase">
            Dossiers
          </Link>
          <Link href="/outils/panic-vault" className="bg-red-600 text-white px-5 py-2.5 rounded-xl hover:bg-red-700 transition-all shadow-xl font-black uppercase text-[10px] tracking-widest text-center">
            Urgence SOS
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
