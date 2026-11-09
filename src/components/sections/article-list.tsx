import Link from "next/link";
import { articleCategories, formatArticleDate, getReadingMinutes, type Article } from "@/content/insights";

/** Text-led journal index: date and category on the left, title and excerpt on the right. */
export function ArticleList({ items, headingLevel = "h3" }: { items: Article[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="journal">
      {items.map((article) => (
        <li key={article.slug} className="journal__item">
          <div className="journal__meta">
            <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
            <Link href={`/insights/category/${article.category}`} className="journal__category">
              {articleCategories[article.category].label}
            </Link>
          </div>
          <div className="journal__main">
            <Heading className="journal__title">
              <Link href={`/insights/${article.slug}`}>{article.title}</Link>
            </Heading>
            <p>{article.excerpt}</p>
            <p className="journal__read">{getReadingMinutes(article)} min read</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
