import type { Metadata } from "next";
import { Compass, ShieldCheck, ClipboardList, Search } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ApproachFlow } from "@/components/approach-flow";
import { CtaPanel } from "@/components/cta-panel";

export const metadata: Metadata = {
  title: "Our Trading Consultancy Approach",
  description:
    "See how chaitanya Trading Consultancy structures market analysis, planning, discussion and review with risk awareness at every stage.",
  alternates: { canonical: "/approach" },
};

const habits = [
  {
    title: "Separate facts from assumptions",
    text: "Identify the information available and distinguish it from the interpretation being placed on it.",
    icon: Search,
  },
  {
    title: "Define the plan",
    text: "Be clear about the scenario being considered, the conditions that matter and what would invalidate the view.",
    icon: ClipboardList,
  },
  {
    title: "Respect risk",
    text: "Consider possible loss, exposure, volatility and the consequences of an adverse outcome.",
    icon: ShieldCheck,
  },
  {
    title: "Review without bias",
    text: "Look at the decision process honestly instead of judging everything only by the result.",
    icon: Compass,
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR APPROACH"
        title="A structured process for uncertain markets."
        description="The aim is not to predict every market move. It is to organise research, clarify the plan and keep risk visible before making decisions."
        image="/images/hero-trading-office.webp"
        imageAlt="Market research monitors in a modern workspace"
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="THE PROCESS"
            title="Four steps. One disciplined mindset."
            description="A practical sequence keeps the conversation focused and makes assumptions easier to examine."
            align="center"
          />
          <ApproachFlow detailed />
        </div>
      </section>
      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="PRACTICAL HABITS"
            title="What a considered process pays attention to."
            description="These habits support better preparation. They do not remove market risk or guarantee a particular outcome."
          />
          <div className="habit-grid">
            {habits.map((habit) => {
              const Icon = habit.icon;
              return (
                <article className="habit-card" key={habit.title}>
                  <span>
                    <Icon size={24} />
                  </span>
                  <h3>{habit.title}</h3>
                  <p>{habit.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container risk-callout">
          <span>
            <ShieldCheck size={28} />
          </span>
          <div>
            <h2>Risk is part of the discussion from the start.</h2>
            <p>
              Trading can result in losses, including losses that may be
              substantial. Any decision to trade remains subject to your own
              circumstances, applicable rules and independent judgement.
            </p>
          </div>
        </div>
      </section>
      <section className="section section--cta">
        <div className="container">
          <CtaPanel
            title="Discuss the process behind your decisions."
            description="Use the enquiry form to tell us what you would like to review."
          />
        </div>
      </section>
    </>
  );
}
