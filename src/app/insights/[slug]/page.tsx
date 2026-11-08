import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import { insights } from "@/content/site-content";
import { siteConfig } from "@/config/site";
import { StructuredData } from "@/components/structured-data";

export function generateStaticParams() {
  return insights.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) return { title: "Insight not found" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `${siteConfig.url}/insights/${article.slug}`,
    },
  };
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/brand/chaitanya-horizontal.png`,
      },
    },
    mainEntityOfPage: `${siteConfig.url}/insights/${article.slug}`,
  };

  return (
    <>
      <StructuredData data={articleSchema} />
      <article className="article-page">
        <div className="article-hero">
          <div className="container article-hero__inner">
            <Link href="/insights" className="back-link">
              <ArrowLeft size={16} /> Back to insights
            </Link>
            <span className="insight-category">{article.category}</span>
            <h1>{article.title}</h1>
            <p>{article.excerpt}</p>
            <span className="article-readtime">
              <Clock3 size={15} /> {article.readTime}
            </span>
          </div>
        </div>
        <div className="container article-content">
          {article.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <aside className="article-note">
            <strong>Important:</strong> This article is for general
            informational purposes. It is not an instruction to buy, sell or
            hold any security or investment product. Trading involves risk.
          </aside>
          <Link href="/contact" className="button button--primary">
            Discuss an enquiry
          </Link>
        </div>
      </article>
    </>
  );
}
