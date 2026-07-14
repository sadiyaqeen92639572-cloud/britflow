"use client";


import React, { useState } from 'react';
import { SITE_URL } from '../lib/config';

interface EmbedToolProps {
    toolId: string;
    toolName: string;
}

const TOOL_ARTICLE_MAPPING: Record<string, string> = {
    'substance-audit': 'audit-substance-defense-controle-fiscal',
    'fiscal-scanner': 'controle-fiscal-personnel-esfp-preparation',
    'simulator': 'arbitrage-fiscal-2025-is-19-vs-25',
    'banking-shield': 'bouclier-atd-compte-bancaire-londres',
    'wealth-audit': 'succession-heritage-holding-londres',
    'rebound-vault': 'rebond-apres-liquidation-judiciaire-france',
    'optimization': 'management-fees-justification-fiscale',
    'salary-optimizer': 'salary-dividend-mix-optimal',
    'are-survival': 'micro-entrepreneur-passage-ltd-uk-guide',
    'sci-shield': 'protection-sci-urssaf-holding-uk',
    'nomad-scanner': 'digital-nomad-francais-ltd-uk-residence-183-jours',
    'expansion-hub': 'facturation-usa-w8ben-convention-uk',
    'director-protection': 'divorce-protection-parts-societe-uk',
    'panic-vault': 'erreurs-creation-ltd-uk-resident-france-pieges'
};

const EmbedTool: React.FC<EmbedToolProps> = ({ toolId, toolName }) => {
    const [showModal, setShowModal] = useState(false);
    const siteUrl = SITE_URL;
    const articleSlug = TOOL_ARTICLE_MAPPING[toolId] || '';
    const articleUrl = articleSlug ? `${siteUrl}/articles/${articleSlug}` : siteUrl;

    const embedCode = `
<!-- BritFlow Tool Embed: ${toolName} -->
<div id="bf-container-${toolId}" style="width:100%;min-height:600px;position:relative;background:transparent;font-family:sans-serif;margin:20px 0;">
  <iframe
    id="bf-iframe-${toolId}"
    src="${siteUrl}/outils/${toolId}"
    style="width:100%;height:600px;border:none;border-radius:24px;overflow:hidden;background:transparent;"
    scrolling="no"
  ></iframe>
  <a 
    href="${articleUrl}" 
    id="bf-link-${toolId}" 
    rel="follow" 
    style="display:block;text-align:center;font-size:12px;color:#64748b;text-decoration:none;margin-top:10px;font-weight:bold;text-transform:uppercase;letter-spacing:0.05em;"
  >Optimisation Fiscale & Protection Dirigeant UK</a>
  <script>
    (function(i, u, a) {
      var d = document, w = window;
      var g = function() {
        var l = d.getElementById('bf-link-' + i);
        var t = d.getElementById('bf-container-' + i);
        if (!l || l.getAttribute('rel') !== 'follow' || l.href !== a || l.offsetHeight === 0) {
          if (!t) return;
          if (l) l.remove();
          var nl = d.createElement('a');
          nl.id = 'bf-link-' + i; nl.href = a; nl.rel = 'follow';
          nl.innerHTML = 'Optimisation Fiscale & Protection Dirigeant UK';
          nl.style.cssText = 'display:block;text-align:center;font-size:12px;color:#64748b;text-decoration:none;margin-top:10px;font-weight:bold;text-transform:uppercase;letter-spacing:0.05em;';
          t.appendChild(nl);
        }
      };
      // Guardian check every 2 seconds
      setInterval(g, 2000);
      // Auto-height adjustment
      w.addEventListener('message', function(e) {
        if (e.data && e.data.type === 'bf-height' && e.data.tool === i) {
          var f = d.getElementById('bf-iframe-' + i);
          if (f) f.style.height = e.data.height + 'px';
        }
      });
    })('${toolId}', '${siteUrl}', '${articleUrl}');
  </script>
</div>
`.trim();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(embedCode);
        alert('Code copié ! Ajoutez-le sur votre site.');
    };

    return (
        <div className="mt-8 flex justify-center">
            <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-blue-500 transition-all opacity-40 hover:opacity-100"
            >
                <i className="fas fa-code"></i> Intégrer cet outil sur votre site
            </button>

            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter">Exporter l'outil : {toolName}</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white transition-colors">
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Copiez le code ci-dessous et collez-le dans le code HTML de votre site web. L'outil apparaîtra automatiquement dans un conteneur sécurisé.
                        </p>

                        <div className="relative group">
                            <pre className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-[10px] text-blue-400 overflow-x-auto font-mono max-h-[300px]">
                                {embedCode}
                            </pre>
                            <button
                                onClick={copyToClipboard}
                                className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg"
                            >
                                <i className="fas fa-copy mr-2"></i> Copier
                            </button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-800 flex items-center gap-4 text-emerald-500">
                            <i className="fas fa-info-circle text-xl"></i>
                            <p className="text-[10px] font-bold uppercase tracking-widest leading-normal">
                                Backlink BritFlow inclus : Le lien de crédit est obligatoire pour maintenir l'outil actif.
                                Ne pas retirer la balise de crédit au risque de bloquer l'outil.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmbedTool;