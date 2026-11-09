import Link from "next/link";
import { notFound } from "next/navigation";
import {
  articleCategories,
  getArticlesByCategory,
  usedCategories,
  type ArticleCategoryId,
} from "@/content/insights";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { ArticleList } from "@/components/sections/article-list";

export const dynamicParams = false;

export function generateStaticParams() {
  return usedCategories().map((category) => ({ category }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const info = articleCategories[category as ArticleCategoryId];
  if (!info) return {};
  return buildMetadata({
    title: `${info.label} insights`,
    description: info.description,
    path: `/insights/category/${category}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const info = articleCategories[category as ArticleCategoryId];
  if (!info) notFound();
  const path = `/insights/category/${category}`;

  return (
    <>
      <JsonLd data={webPageSchema({ name: info.label, description: info.description, path, type: "CollectionPage" })} />
      <PageHeader
        title={info.label}
        intro={info.description}
        trail={[
          { name: "Insights", path: "/insights" },
          { name: info.label, path },
        ]}
      />
      <section className="section">
        <div className="container">
          <nav aria-label="Insight categories" className="chips">
            <Link href="/insights">All</Link>
            {usedCategories().map((id) =>
              id === category ? (
                <span key={id} aria-current="page">
                  {articleCategories[id].label}
                </span>
              ) : (
                <Link key={id} href={`/insights/category/${id}`}>
                  {articleCategories[id].label}
                </Link>
              ),
            )}
          </nav>
          <ArticleList items={getArticlesByCategory(category as ArticleCategoryId)} headingLevel="h2" />
        </div>
      </section>
    </>
  );
}
