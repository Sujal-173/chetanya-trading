import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { getAllArticles } from "@/content/insights";
import { ArticleList } from "./article-list";

export function InsightsPreview() {
  const latest = getAllArticles().slice(0, 3);
  return (
    <section className="section" aria-labelledby="insights-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="insights-title" className="section-head__title">
            From our insights
          </h2>
          <p className="section-head__text">
            Original explainers on market research, risk and process. General information only, never
            personalised recommendations.
          </p>
        </Reveal>
        <ArticleList items={latest} />
        <p className="section-foot">
          <Link href="/insights" className="text-link">
            All insights
          </Link>
        </p>
      </div>
    </section>
  );
}
