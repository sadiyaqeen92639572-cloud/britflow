import { ARTICLES as LEGACY_ARTICLES, ArticleData } from "./legacyArticles";
import { MD_ARTICLES } from "./mdArticles.generated";

// MD_ARTICLES is generated at build time from content/articles/*.md by
// scripts/generate-md-articles.mjs — no runtime fs access here, so this
// module works identically in Node and in the Cloudflare Workers runtime.
export const ARTICLES: ArticleData[] = [...LEGACY_ARTICLES, ...MD_ARTICLES];

export function getArticleBySlug(slug: string): ArticleData | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export type { ArticleData };
