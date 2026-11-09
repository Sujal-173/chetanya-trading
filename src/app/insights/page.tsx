import Link from "next/link";
import { articleCategories, getAllArticles, usedCategories } from "@/content/insights";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { ArticleList } from "@/components/sections/article-list";

const title = "Insights";
const description =
  "Original explainers from CHAITANYA Trading Consultancy on market research, risk awareness and building a consistent trading process. General information only.";

export const metadata = buildMetadata({ title, description, path: "/insights" });

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: "/insights", type: "CollectionPage" })} />
      <PageHeader
        title="Notes on markets, risk and process."
        intro="Original explainers written to help you think more clearly. They are general information, not personalised recommendations, and not commentary on current market conditions."
        trail={[{ name: "Insights", path: "/insights" }]}
      />
      <section className="section">
        <div className="container">
          <nav aria-label="Insight categories" className="chips">
            <span aria-current="page">All</span>
            {usedCategories().map((id) => (
              <Link key={id} href={`/insights/category/${id}`}>
                {articleCategories[id].label}
              </Link>
            ))}
          </nav>
          <ArticleList items={getAllArticles()} headingLevel="h2" />
        </div>
      </section>
    </>
  );
}
