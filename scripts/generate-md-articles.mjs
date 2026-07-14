// Pre-parses content/articles/*.md into a plain JS module at build time.
//
// Why this exists: lib/articles.ts used to call fs.readdirSync/readFileSync
// at module scope to parse markdown on demand. That works under Node (local
// dev, `next build`) but Cloudflare Workers have no real filesystem at
// runtime — even with the files copied into the Worker bundle via
// outputFileTracingIncludes, `fs.readFileSync` still fails there. Baking the
// parsed content into a generated .ts module removes the runtime fs
// dependency entirely, so the same code path works in Node and in Workers.
//
// Run via `npm run build` (wired as a "prebuild"-style step) whenever
// content/articles/*.md changes.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");
const OUT_FILE = path.join(process.cwd(), "lib/mdArticles.generated.ts");

const MD_METADATA = {
  "anonymat-fiscal-protection-patrimoine": { category: "Protection", targetTool: "privacy", targetAnchor: "panic-vault", relatedSlugs: ["privacy-directors-address-shield-service"] },
  "blocage-bancaire-tracfin-compte-pro-neobanque": { category: "Banque", targetTool: "banking", targetAnchor: "banking-audit", relatedSlugs: ["meilleure-banque-uk-entrepreneur"] },
  "carte-controles-urssaf-france": { category: "Fiscalité", targetTool: "urssaf-tracker", targetAnchor: "obs/urssaf", relatedSlugs: ["controle-fiscal-personnel-esfp-preparation"] },
  "comblement-passif-responsabilite-dirigeant-saisie": { category: "Protection", targetTool: "rebound", targetAnchor: "rebound-vault?mode=liability", relatedSlugs: ["rebond-apres-liquidation-judiciaire-france"] },
  "cout-licenciement-rupture-conventionnelle-uk-flexibilite": { category: "RH", targetTool: "director-shield", targetAnchor: "rh-friction", relatedSlugs: ["recrutement-global-talent-international"] },
  "cout-liquidation-france-vs-uk": { category: "Urgence", targetTool: "liquidation", targetAnchor: "obs/liquidation", relatedSlugs: ["rebond-apres-liquidation-judiciaire-france"] },
  "delais-administratifs-france-vs-uk": { category: "Gestion", targetTool: "bureaucracy", targetAnchor: "obs/bureaucratie", relatedSlugs: [] },
  "faillites-entreprises-france-2025": { category: "Urgence", targetTool: "fiscal-watch", targetAnchor: "obs/sante-financiere", relatedSlugs: ["rebond-apres-liquidation-judiciaire-france", "delais-administratifs-france-vs-uk"] },
  "flat-tax-dividendes-sasu-piege-cotisations": { category: "Rémunération", targetTool: "flat-tax", targetAnchor: "flat-tax", relatedSlugs: ["salaire-ou-dividende-optimisation"] },
  "is-15-vs-25-impact-benefices": { category: "Fiscalité", targetTool: "optimizer", targetAnchor: "optimization", relatedSlugs: ["arbitrage-fiscal-2025-is-19-vs-25"] },
  "meilleure-banque-uk-entrepreneur": { category: "Banque", targetTool: "bank-matchmaker", targetAnchor: "obs/banques", relatedSlugs: ["blocage-bancaire-tracfin-compte-pro-neobanque"] },
  "micro-entreprise-plafond-frais-reels-charges": { category: "Optimisation", targetTool: "calculator", targetAnchor: "simulator", relatedSlugs: ["micro-entrepreneur-passage-ltd-uk-guide"] },
  "salaire-ou-dividende-optimisation": { category: "Rémunération", targetTool: "salary", targetAnchor: "salary-optimizer", relatedSlugs: ["flat-tax-dividendes-sasu-piege-cotisations", "salary-dividend-mix-optimal"] },
  "seuil-franchise-tva-36k": { category: "Fiscalité", targetTool: "calculator", targetAnchor: "simulator?mode=tva", relatedSlugs: ["optimisation-tva-services-digitaux"] },
  "succession-pacte-dutreil-fic-uk-transmission": { category: "Patrimoine", targetTool: "wealth", targetAnchor: "wealth-audit?mode=inheritance", relatedSlugs: ["succession-dirigeant-holding-uk", "succession-heritage-holding-londres"] },
  "taxe-existence-cfe-frais-fixes-sasu": { category: "Gestion", targetTool: "fixed-costs", targetAnchor: "obs/couts-fixes", relatedSlugs: [] },
};

const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));

const articles = files.map((filename) => {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const slug = data.slug ?? filename.replace(/\.md$/, "");
  const meta = MD_METADATA[slug];
  if (!meta) {
    throw new Error(`No MD_METADATA mapping for article slug "${slug}" — add one in scripts/generate-md-articles.mjs`);
  }

  return {
    slug,
    title: data.title,
    excerpt: data.description,
    content: content.trim().replace(/^#\s+.+\n+/, ""),
    keywords: data.tags ?? [],
    category: meta.category,
    relatedSlugs: meta.relatedSlugs,
    targetTool: meta.targetTool,
    targetAnchor: meta.targetAnchor,
  };
});

const banner = `// GENERATED FILE — do not edit by hand.
// Regenerate with: node scripts/generate-md-articles.mjs
// Source: content/articles/*.md (see that script for the slug -> tool/category mapping)

import type { ArticleData } from './legacyArticles';

export const MD_ARTICLES: ArticleData[] = ${JSON.stringify(articles, null, 2)};
`;

fs.writeFileSync(OUT_FILE, banner);
console.log(`Generated ${OUT_FILE} with ${articles.length} articles.`);
