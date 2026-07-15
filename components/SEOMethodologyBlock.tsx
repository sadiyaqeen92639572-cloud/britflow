import React from 'react';

interface SEOMethodologyBlockProps {
  methodologyTitle: string;
  methodologyText: string;
  algorithmName?: string;
  algorithmVersion?: string;
  precision?: string;
  icon?: string;
  mode?: string;
}

/**
 * Layer B: Visible Methodology Block
 * Displays technical information about the tool's algorithm
 * with an icon and detailed explanation
 *
 * Usage:
 * <SEOMethodologyBlock
 *   methodologyTitle="Doctrine de Substance UK"
 *   methodologyText="L'audit Societe Anglaise évalue la réalité de la gestion..."
 *   algorithmName="Algorithme Substance"
 *   algorithmVersion="v5.0"
 *   precision="99.8%"
 *   icon="fa-fingerprint"
 * />
 */
const SEOMethodologyBlock: React.FC<SEOMethodologyBlockProps> = ({
  methodologyTitle,
  methodologyText,
  algorithmName = "Algorithme Societe Anglaise",
  algorithmVersion = "v1.0",
  precision = "95%+",
  icon = "fa-cog",
  mode = 'default'
}) => {
  const getIconColor = () => {
    if (mode === 'control') return 'bg-red-500/20 text-red-500';
    if (mode === 'atd') return 'bg-indigo-500/20 text-indigo-500';
    if (mode === 'fiben') return 'bg-orange-500/20 text-orange-500';
    if (mode === 'liability') return 'bg-red-600/20 text-red-600';
    if (mode === 'crypto') return 'bg-yellow-500/20 text-yellow-500';
    return 'bg-emerald-500/20 text-emerald-500';
  };

  const getHoverBorder = () => {
    if (mode === 'control') return 'hover:border-red-500/50';
    if (mode === 'atd') return 'hover:border-indigo-500/50';
    if (mode === 'fiben') return 'hover:border-orange-500/50';
    if (mode === 'liability') return 'hover:border-red-600/50';
    if (mode === 'crypto') return 'hover:border-yellow-500/50';
    return 'hover:border-emerald-500/50';
  };

  const getIconHoverText = () => {
    if (mode === 'control') return 'group-hover:text-red-400';
    if (mode === 'atd') return 'group-hover:text-indigo-400';
    if (mode === 'fiben') return 'group-hover:text-orange-400';
    if (mode === 'liability') return 'group-hover:text-red-500';
    if (mode === 'crypto') return 'group-hover:text-yellow-400';
    return 'group-hover:text-emerald-400';
  };

  return (
    <div className="mt-12 pt-8 border-t border-slate-900/40 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Methodology Card */}
      <div className={`bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-xl group transition-all ${getHoverBorder()}`}>
        <h4 className={`text-[11px] font-black uppercase tracking-widest text-slate-100 mb-3 flex items-center gap-2 ${getIconHoverText()} transition-colors`}>
          <i className={`fas ${icon} text-xs`}></i> {methodologyTitle}
        </h4>
        <p className="text-[10px] text-slate-50 leading-relaxed font-semibold">
          {methodologyText}
        </p>
      </div>

      {/* Algorithm Card */}
      <div className={`bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center gap-6 group transition-all ${getHoverBorder()}`}>
        <div className={`w-14 h-14 ${getIconColor()} rounded-2xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform`}>
          <i className={`fas ${icon}`}></i>
        </div>
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-100 mb-1">{algorithmName}</h4>
          <div className="text-sm font-black text-white mb-1">{algorithmVersion}</div>
          <div className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter italic">
            Precision: {precision}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOMethodologyBlock;
