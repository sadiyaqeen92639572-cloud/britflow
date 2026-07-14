"use client";


import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getEmergencySolution } from '../services/aiClient';
import { getWhatsAppLink } from '../services/whatsapp';
import FormattedText from './FormattedText';

const PanicTerminal: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Gérer l'arrivée directe via URL /outils/panic-vault?q=votre-question
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
      handleSearch(urlQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    // Mise à jour de l'URL pour SEO et partage
    router.replace(`?q=${encodeURIComponent(searchQuery)}`, { scroll: false });
    const result = await getEmergencySolution(searchQuery);
    setResponse(result);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  useEffect(() => {
    if (response && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [response]);

  return (
    <div className="bg-black border-4 border-red-600 rounded-[32px] p-6 md:p-12 shadow-[0_0_80px_rgba(220,38,38,0.2)]">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-4 h-4 rounded-full bg-red-600 animate-pulse"></div>
        <h3 className="text-xl font-black text-white uppercase tracking-widest">BritFlow Emergency Terminal</h3>
      </div>

      <div className="mb-10 text-red-400 text-xs font-mono">
        {">"} SYSTEM STATUS: READY<br />
        {">"} ENCRYPTION: MILITARY GRADE (256-BIT)<br />
        {">"} SEO INDEXING: AUTO-GENERATING URL<br />
        {">"} PRIVACY: NO DATA LOGGING ACTIVE
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="EX: Comment protéger ma maison d'un huissier URSSAF ?"
          className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-red-600 rounded-2xl px-8 py-6 text-white text-lg font-bold outline-none transition-all placeholder:text-zinc-500 shadow-inner"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-4 top-4 bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all disabled:opacity-50"
        >
          {loading ? 'ANALYSING...' : 'GET SOLUTION'}
        </button>
      </form>

      {response && (
        <div ref={scrollRef} className="mt-12 animate-fade-in">
          <div className="bg-zinc-900 border border-red-600/30 rounded-2xl p-8 relative">
            <div className="absolute top-0 right-0 p-4">
              <i className="fas fa-shield-alt text-red-600 text-2xl opacity-20"></i>
            </div>
            <div className="prose prose-invert max-w-none">
              <FormattedText text={response} isDark={true} />
            </div>
            <div className="mt-10 pt-8 border-t border-zinc-800 flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-[10px] text-white font-bold uppercase tracking-widest">Réponse certifiée par BritFlow IA • Solution Souveraine</p>
                <p className="text-[8px] text-slate-300 font-mono">URL UNIQUE SEO : britflow.com/#panic/{encodeURIComponent(query).slice(0, 20)}...</p>
              </div>
              <a
                href={getWhatsAppLink(`Bonjour, j'aimerais appliquer la structure BritFlow d'urgence suite à ma question : "${query}".`)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all text-center"
              >
                Appliquer cette structure
              </a>
            </div>
          </div>
        </div>
      )}

      {!response && !loading && (
        <div className="mt-8 flex flex-wrap gap-2">
          {["Saisie Immobilière", "Blocage Compte", "Divorce Imminent", "Abus de Bien Social", "Prud'hommes"].map(tag => (
            <button
              key={tag}
              onClick={() => { setQuery(tag); handleSearch(tag); }}
              className="px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-800 hover:border-red-600 hover:text-red-500 text-[10px] font-black uppercase transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PanicTerminal;