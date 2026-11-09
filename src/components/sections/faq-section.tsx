import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/ui/json-ld";
import { faqs } from "@/content/faqs";
import { faqSchema } from "@/lib/seo";
import { FaqList } from "./faq-list";

export function FaqSection({ alt = true }: { alt?: boolean }) {
  return (
    <section className={`section${alt ? " section--alt" : ""}`} aria-labelledby="faq-title">
      <JsonLd data={faqSchema(faqs)} />
      <div className="container faq-layout">
        <Reveal className="faq-layout__head">
          <h2 id="faq-title" className="section-title">
            Common questions
          </h2>
          <p>Straight answers about what we do, how it works and what we will not promise.</p>
        </Reveal>
        <Reveal delay={80}>
          <FaqList items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
