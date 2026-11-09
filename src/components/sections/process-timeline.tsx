"use client";

import { LazyMotion, m, useReducedMotion } from "motion/react";
import type { ApproachStep } from "@/content/approach";

const loadFeatures = () => import("@/lib/motion-dom").then((module) => module.default);

type Props = {
  steps: ApproachStep[];
  /** "detailed" adds the longer description and the checklist for each step. */
  variant?: "compact" | "detailed";
  /** Use "h2" when the timeline directly follows the page H1. */
  headingLevel?: "h2" | "h3";
};

/**
 * The four-step process as a timeline. Text is always visible; only the line
 * and markers animate, once, when the timeline scrolls into view.
 */
export function ProcessTimeline({ steps, variant = "compact", headingLevel = "h3" }: Props) {
  const Heading = headingLevel;
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.9;
  const view = { once: true, amount: 0.25 } as const;

  return (
    <LazyMotion features={loadFeatures} strict>
    <ol className={`timeline timeline--${variant}`}>
      <m.span
        className="timeline__line timeline__line--h"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={view}
        transition={{ duration: duration * 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <m.span
        className="timeline__line timeline__line--v"
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={view}
        transition={{ duration: duration * 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      {steps.map((step, index) => (
        <li key={step.number} className="timeline__step">
          <m.span
            className="timeline__marker"
            aria-hidden="true"
            initial={{ scale: reduceMotion ? 1 : 0.5, backgroundColor: "rgba(21,149,255,0)" }}
            whileInView={{ scale: 1, backgroundColor: "rgba(21,149,255,1)" }}
            viewport={view}
            transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.2 + index * 0.28 }}
          />
          <span className="timeline__number">Step {step.number}</span>
          <Heading className="timeline__title">{step.title}</Heading>
          <p className="timeline__summary">{variant === "detailed" ? step.detail : step.summary}</p>
          {variant === "detailed" ? (
            <ul className="timeline__points">
              {step.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
    </LazyMotion>
  );
}
