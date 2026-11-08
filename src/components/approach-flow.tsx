import { ArrowRight } from "lucide-react";
import { approachSteps } from "@/content/site-content";

export function ApproachFlow({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className={`approach-flow${detailed ? " approach-flow--detailed" : ""}`}>
      {approachSteps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div className="approach-step" key={step.number}>
            <span className="approach-step__icon"><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span>
            <span className="approach-step__number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            {index !== approachSteps.length - 1 ? <ArrowRight className="approach-step__arrow" size={18} aria-hidden="true" /> : null}
          </div>
        );
      })}
    </div>
  );
}
