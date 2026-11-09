import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { approachSteps } from "@/content/approach";
import { ProcessTimeline } from "./process-timeline";

export function Methodology() {
  return (
    <section className="section section--dark theme-dark" aria-labelledby="method-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="method-title" className="section-head__title">
            How a consultation works
          </h2>
          <p className="section-head__text">
            We start with your question, look at the information that matters and finish by reviewing the
            reasoning. You will know what each stage involves before we begin.
          </p>
        </Reveal>
        <ProcessTimeline steps={approachSteps} />
        <p className="section-foot">
          <Link href="/approach" className="text-link">
            Read about our approach in full
          </Link>
        </p>
      </div>
    </section>
  );
}
