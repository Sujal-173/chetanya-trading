import type { ReactNode } from "react";
import { formatArticleDate } from "@/content/insights";
import { siteConfig } from "@/config/site";
import type { Crumb } from "@/lib/seo";
import { PageHeader } from "./page-header";

export type LegalSection = {
  heading: string;
  paragraphs?: ReactNode[];
  list?: ReactNode[];
};

export function LegalPage({
  title,
  intro,
  trail,
  sections,
}: {
  title: string;
  intro: string;
  trail: Crumb[];
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader title={title} intro={intro} trail={trail} />
      <section className="section">
        <div className="container legal">
          <p className="legal__updated">
            Last updated {formatArticleDate(siteConfig.legal.policiesLastUpdated)}
          </p>
          {sections.map((section) => (
            <section key={section.heading} className="legal__section">
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              {section.list ? (
                <ul className="plain-list">
                  {section.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
