import Link from "next/link";
import { articleCategories, getAllArticles, usedCategories } from "@/content/insights";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { ArticleList } from "@/components/sections/article-list";

const title = "Insights";
const description =
  "Straightforward articles from CHAITANYA Trading Consultancy about reading markets, thinking about risk and reviewing a trading process. For general information only.";

export const metadata = buildMetadata({ title, description, path: "/insights" });

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: "/insights", type: "CollectionPage" })} />
      <PageHeader
        title="Ideas to help you think through the markets."
        intro="Read practical explainers on market context, risk and trading habits. These articles are for general information and are not personal recommendations or live market calls."
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
