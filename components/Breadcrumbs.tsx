"use client";


import React from 'react';
import Link from 'next/link';

interface Props {
  category?: string;
  title?: string;
}

const Breadcrumbs: React.FC<Props> = ({ category, title }) => {
  return (
    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
      <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
        <i className="fas fa-home"></i> Accueil
      </Link>
      {category && (
        <>
          <i className="fas fa-chevron-right text-[6px]"></i>
          <span className="text-slate-300">{category}</span>
        </>
      )}
      {title && (
        <>
          <i className="fas fa-chevron-right text-[6px]"></i>
          <span className="text-blue-600 truncate max-w-[200px]">{title}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;