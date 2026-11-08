import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { insights } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Trading Insights and Market Research",
  description:
    "Read practical explainers from chaitanya Trading Consultancy on risk planning, market context and building a more disciplined trading process.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="INSIGHTS & PERSPECTIVES"
        title="Clear thinking for complex markets."
        description="Practical explainers on market research, trading preparation and risk awareness. These articles are general information, not personalised investment recommendations."
        image="/images/workspace-detail.webp"
        imageAlt="Notebook and market research workspace"
      />
      <section className="section">
        <div className="container">
          <div className="insight-grid">
            {insights.map((article, index) => (
              <article className="insight-card" key={article.slug}>
                <div
                  className={`insight-card__art insight-card__art--${index + 1}`}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div className="insight-card__chart" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <div className="insight-card__body">
                  <span className="insight-category">{article.category}</span>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
                  <div className="insight-card__meta">
                    <span>
                      <Clock3 size={14} />
                      {article.readTime}
                    </span>
                    <Link
                      href={`/insights/${article.slug}`}
                      aria-label={`Read ${article.title}`}
                    >
                      Read article <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="insights-disclaimer">
            Market commentary and educational content can become outdated as
            conditions change. Always assess current information and your own
            circumstances before making financial decisions.
          </p>
        </div>
      </section>
    </>
  );
}
