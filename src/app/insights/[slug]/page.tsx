import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import {
  articleCategories,
  formatArticleDate,
  getAllArticles,
  getArticle,
  getReadingMinutes,
  getRelatedArticles,
} from "@/content/insights";
import { articleSchema, buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CtaBand } from "@/components/ui/cta-band";
import { ArticleList } from "@/components/sections/article-list";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const category = articleCategories[article.category];
  const related = getRelatedArticles(article);

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      <article>
        <header className="article-head">
          <div className="container container--narrow">
            <Breadcrumbs
              trail={[
                { name: "Insights", path: "/insights" },
                { name: article.title, path: `/insights/${article.slug}` },
              ]}
            />
            <p className="article-head__category">
              <Link href={`/insights/category/${article.category}`}>{category.label}</Link>
            </p>
            <h1 className="article-head__title">{article.title}</h1>
            <p className="lede">{article.excerpt}</p>
            <p className="article-head__meta">
              <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
              {" · "}
              {getReadingMinutes(article)} min read
              {" · "}
              {article.author ? article.author.name : `Published by ${siteConfig.name}`}
            </p>
          </div>
        </header>

        <div className="container container--narrow article-body">
          {article.sections.map((section, index) => (
            <section key={section.heading ?? index}>
              {section.heading ? <h2>{section.heading}</h2> : null}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list ? (
                <ul className="plain-list">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          <p className="notice">
            This article is general information for education. It is not a recommendation to buy, sell or
            hold any security and does not consider your circumstances. Trading involves risk, including
            loss of capital. See our <Link href="/disclaimer">risk disclosure</Link>.
          </p>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="section section--alt" aria-labelledby="related-title">
          <div className="container">
            <h2 id="related-title" className="section-head__title">
              Related articles
            </h2>
            <ArticleList items={related} />
          </div>
        </section>
      ) : null}

      <CtaBand
        title="Want to talk this through for your own situation?"
        text="Send an enquiry and we will confirm what a consultation can cover."
        source={`article_${article.slug}`}
      />
    </>
  );
}
