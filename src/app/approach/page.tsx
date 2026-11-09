import { approachSteps } from "@/content/approach";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBand } from "@/components/ui/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { FaqSection } from "@/components/sections/faq-section";

const title = "Our Approach";
const description =
  "A look at how a CHAITANYA consultation moves from your initial question to a review of market context, possible scenarios and risk.";

export const metadata = buildMetadata({ title, description, path: "/approach" });

export default function ApproachPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: "/approach" })} />
      <PageHeader
        title="A clear process for working through a market question."
        intro="We begin with the question you bring, look at the information that matters and talk through possible outcomes. The scope is clear before the consultation moves ahead."
        trail={[{ name: "Approach", path: "/approach" }]}
      />

      <section className="section" aria-label="The four steps">
        <div className="container">
          <ProcessTimeline steps={approachSteps} variant="detailed" headingLevel="h2" />
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="principles-title">
        <div className="container two-col">
          <Reveal>
            <h2 id="principles-title" className="section-title">
              What stays the same in every step
            </h2>
          </Reveal>
          <Reveal className="prose" delay={60}>
            <p>
              <strong>Evidence is separated from assumption.</strong> We say what can be observed and what
              is being inferred, and we say where the information runs out.
            </p>
            <p>
              <strong>Risk is discussed alongside ideas.</strong> Every scenario comes with what it would
              cost if it is wrong.
            </p>
            <p>
              <strong>Scope is stated up front.</strong> You will know what a consultation covers and what
              it does not before it starts.
            </p>
            <p>
              <strong>Outcomes are never promised.</strong> Markets are uncertain, and a careful process
              reduces surprises without removing loss.
            </p>
          </Reveal>
        </div>
      </section>

      <FaqSection alt={false} />
      <CtaBand
        title="Start with a conversation about your requirements."
        text="Tell us what you would like to work through. We will reply to confirm the scope."
        source="approach_cta"
      />
    </>
  );
}
