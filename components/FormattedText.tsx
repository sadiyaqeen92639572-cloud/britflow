
import React from 'react';

interface Props {
  text: string;
  isDark?: boolean;
}

const FormattedText: React.FC<Props> = ({ text, isDark = false }) => {
  if (!text) return null;

  const textColor = isDark ? 'text-zinc-300' : 'text-slate-600';
  const headerColor = isDark ? 'text-white' : 'text-slate-900';
  const accentColor = isDark ? 'text-red-500' : 'text-blue-600';
  const highlightBg = isDark ? 'bg-zinc-800 text-white' : 'bg-blue-50 text-slate-900';

  const format = (raw: string) => {
    return raw
      .replace(/^### (.*$)/gim, `<h3 class="text-lg font-black mt-6 mb-3 ${headerColor} border-l-4 border-red-600 pl-3 uppercase tracking-tight">$1</h3>`)
      .replace(/^## (.*$)/gim, `<h2 class="text-xl font-black mt-8 mb-4 ${headerColor} uppercase">$1</h2>`)
      .replace(/\*\*(.*?)\*\*/g, `<strong class="font-black ${isDark ? 'text-white' : 'text-slate-900'} ${highlightBg} px-1">$1</strong>`)
      .replace(/^\* (.*$)/gim, `<li class="ml-4 mb-2 list-none flex items-start gap-2"><span class="${accentColor} font-bold">→</span> <span>$1</span></li>`)
      .replace(/^\- (.*$)/gim, `<li class="ml-4 mb-2 list-none flex items-start gap-2"><span class="${accentColor} font-bold">→</span> <span>$1</span></li>`)
      .split('\n').join('<br />');
  };

  return (
    <div 
      className={`prose prose-slate max-w-none ${textColor} leading-relaxed text-sm md:text-base font-medium`}
      dangerouslySetInnerHTML={{ __html: format(text) }}
    />
  );
};

export default FormattedText;
