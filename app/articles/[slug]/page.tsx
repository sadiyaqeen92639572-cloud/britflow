import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES, getArticleBySlug } from "../../../lib/articles";
import { SITE_URL } from "../../../lib/config";
import ArticleDetail from "../../../components/ArticleDetail";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const url = `${SITE_URL}/articles/${article.slug}`;
  const title = `${article.title} | Expertise BritFlow`;
  return {
    title: { absolute: title }, // bypass layout's `%s | BritFlow` template — already has its own suffix
    description: article.excerpt,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: article.excerpt,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const url = `${SITE_URL}/articles/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url,
    author: { "@type": "Organization", name: "BritFlow" },
  };

  const related = article.relatedSlugs
    .map((s) => getArticleBySlug(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleDetail article={article} related={related} />
    </main>
  );
}
