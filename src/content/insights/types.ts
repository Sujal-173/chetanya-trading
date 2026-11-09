export type ArticleCategoryId =
  | "risk-awareness"
  | "market-research"
  | "trading-process";

export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
  list?: string[];
};

export type ArticleAuthor = {
  name: string;
  role?: string;
};

export type Article = {
  slug: string;
  title: string;
  /** One or two sentences, used in listings and as the meta description. */
  excerpt: string;
  category: ArticleCategoryId;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt?: string;
  /**
   * Only set when an author's identity and credentials have been verified.
   * When omitted, the article is credited to the consultancy.
   */
  author?: ArticleAuthor;
  sections: ArticleSection[];
};
