import { articles } from "./articles";
import { articleCategories } from "./categories";
import type { Article, ArticleCategoryId } from "./types";

export { articleCategories };
export type { Article, ArticleCategoryId };

const WORDS_PER_MINUTE = 200;

export function getReadingMinutes(article: Article): number {
  const text = article.sections
    .flatMap((section) => [
      section.heading ?? "",
      ...section.paragraphs,
      ...(section.list ?? []),
    ])
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function getAllArticles(): Article[] {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategoryId): Article[] {
  return getAllArticles().filter((article) => article.category === category);
}

/** Same-category articles first, then the most recent of the rest. */
export function getRelatedArticles(article: Article, limit = 2): Article[] {
  const others = getAllArticles().filter((item) => item.slug !== article.slug);
  const sameCategory = others.filter((item) => item.category === article.category);
  const rest = others.filter((item) => item.category !== article.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function usedCategories(): ArticleCategoryId[] {
  const used = new Set(articles.map((article) => article.category));
  return (Object.keys(articleCategories) as ArticleCategoryId[]).filter((id) =>
    used.has(id),
  );
}

export function formatArticleDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
