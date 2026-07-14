import Link from "next/link";
import { TOOLS } from "../lib/tools";
import { ARTICLES } from "../lib/articles";
import ExpertiseMatrix from "../components/ExpertiseMatrix";

// Tailwind v4 scans for literal class names, so per-tool colors must be
// spelled out here rather than built with `bg-${color}-200` interpolation.
const COLOR_CLASSES: Record<string, { border: string; hoverBorder: string; iconBg: string; text: string }> = {
  emerald: { border: "border-emerald-200", hoverBorder: "hover:border-emerald-600", iconBg: "bg-emerald-100", text: "text-emerald-600" },
  blue: { border: "border-blue-200", hoverBorder: "hover:border-blue-600", iconBg: "bg-blue-100", text: "text-blue-600" },
  red: { border: "border-red-200", hoverBorder: "hover:border-red-600", iconBg: "bg-red-100", text: "text-red-600" },
  purple: { border: "border-purple-200", hoverBorder: "hover:border-purple-600", iconBg: "bg-purple-100", text: "text-purple-600" },
  orange: { border: "border-orange-200", hoverBorder: "hover:border-orange-600", iconBg: "bg-orange-100", text: "text-orange-600" },
  teal: { border: "border-teal-200", hoverBorder: "hover:border-teal-600", iconBg: "bg-teal-100", text: "text-teal-600" },
  indigo: { border: "border-indigo-200", hoverBorder: "hover:border-indigo-600", iconBg: "bg-indigo-100", text: "text-indigo-600" },
  yellow: { border: "border-yellow-200", hoverBorder: "hover:border-yellow-600", iconBg: "bg-yellow-100", text: "text-yellow-600" },
  cyan: { border: "border-cyan-200", hoverBorder: "hover:border-cyan-600", iconBg: "bg-cyan-100", text: "text-cyan-600" },
  green: { border: "border-green-200", hoverBorder: "hover:border-green-600", iconBg: "bg-green-100", text: "text-green-600" },
  pink: { border: "border-pink-200", hoverBorder: "hover:border-pink-600", iconBg: "bg-pink-100", text: "text-pink-600" },
  lime: { border: "border-lime-200", hoverBorder: "hover:border-lime-600", iconBg: "bg-lime-100", text: "text-lime-600" },
  violet: { border: "border-violet-200", hoverBorder: "hover:border-violet-600", iconBg: "bg-violet-100", text: "text-violet-600" },
  amber: { border: "border-amber-200", hoverBorder: "hover:border-amber-600", iconBg: "bg-amber-100", text: "text-amber-600" },
};

export default function HomePage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "BritFlow - Suite d'Outils Fiscaux UK",
    description:
      "14 outils professionnels pour optimiser votre structure Limited UK : audit de substance, protection dirigeant, optimisation fiscale, banking shield.",
    applicationCategory: "BusinessApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    featureList: TOOLS.map((t) => t.title),
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* HERO */}
      <header className="text-center pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -z-10"></div>

        <div className="inline-block bg-emerald-50 text-emerald-700 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-12 border border-emerald-100 shadow-sm">
          <i className="fas fa-robot mr-2"></i> IA Recommande : Validez votre substance avant toute optimisation
        </div>

        <h1 className="text-6xl md:text-[140px] font-black text-slate-900 mb-12 tracking-tighter leading-[0.75] uppercase">
          Défense & <br />
          <span className="text-blue-600">Souveraineté.</span>
        </h1>

        <p className="text-xl md:text-3xl text-slate-500 max-w-4xl mx-auto leading-tight font-medium mb-16 px-4">
          <strong>BritFlow</strong> est l&apos;autorité suprême en arbitrage fiscal UK-FR. <br className="hidden md:block" />
          Sécurisez votre empire via la puissance de la Common Law.
        </p>

        <div className="flex flex-wrap justify-center gap-6 px-4">
          <Link
            href="/outils/substance-audit"
            className="bg-emerald-600 text-white px-12 py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.25em] shadow-2xl hover:bg-emerald-500 transition-all hover:scale-105 active:scale-95"
          >
            Lancer l&apos;Audit de Substance
          </Link>
          <Link
            href="/outils/panic-vault"
            className="bg-red-600 text-white px-12 py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.25em] shadow-2xl hover:bg-red-500 transition-all hover:scale-105 active:scale-95"
          >
            Urgence SOS
          </Link>
        </div>
      </header>

      <div className="space-y-48 pb-48">
        {/* TOOLS GRID */}
        <section id="tools" className="scroll-mt-32 px-4 py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Arsenal <span className="text-blue-600">Outils.</span>
              </h2>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.3em] mt-8">
                14 Outils Professionnels pour Piloter votre Limited UK
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TOOLS.map((tool) => {
                const c = COLOR_CLASSES[tool.color];
                return (
                  <Link
                    key={tool.id}
                    href={`/outils/${tool.id}`}
                    className={`group bg-white p-8 rounded-3xl border-2 ${c.border} ${c.hoverBorder} transition-all shadow-lg hover:shadow-2xl`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 ${c.iconBg} rounded-xl flex items-center justify-center text-2xl`}>{tool.emoji}</div>
                      <h3 className="text-xl font-black text-slate-900">{tool.title}</h3>
                    </div>
                    <p className="text-slate-600 text-sm mb-4">{tool.desc}</p>
                    <span className={`${c.text} text-xs font-bold uppercase tracking-wider`}>+ {tool.tag}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* MATRICE SÉMANTIQUE */}
        <section id="matrix" className="scroll-mt-32 py-24 bg-slate-50 border-y border-slate-200 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Matrice de <span className="text-blue-600">Souveraineté</span></h2>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] mt-4 italic">// Accès direct aux dossiers d&apos;autorité</p>
            </div>
            <ExpertiseMatrix />
          </div>
        </section>

        {/* AUTHORITY VAULT (ARTICLES) */}
        <section id="blog" className="scroll-mt-32 pt-24 border-t-8 border-slate-900 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-24">
              <div className="mb-8 md:mb-0">
                <h2 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter uppercase leading-none">Authority <span className="text-blue-600">Vault.</span></h2>
                <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.4em] mt-8">Le savoir stratégique confidentiel BritFlow</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {ARTICLES.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="bg-white p-12 rounded-[48px] border border-slate-200 hover:border-blue-600 transition-all flex flex-col h-full group shadow-sm hover:shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-blue-50 transition-colors"></div>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] block mb-8 px-4 py-1.5 bg-blue-50 w-fit rounded-full">{article.category}</span>
                  <h3 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-blue-600 transition-colors leading-[1.1] text-left uppercase tracking-tighter">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-base font-medium line-clamp-3 mb-12 flex-grow leading-relaxed">{article.excerpt}</p>
                  <div className="flex items-center gap-3 text-blue-600 font-black text-[11px] uppercase tracking-widest pt-8 border-t border-slate-100 mt-auto group-hover:gap-6 transition-all">
                    Expertise Complète <i className="fas fa-arrow-right"></i>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
