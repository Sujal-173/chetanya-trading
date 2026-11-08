import type { Metadata } from "next";
import { Compass, Eye, ShieldCheck, Target } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { MediaFrame } from "@/components/media-frame";
import { SectionHeading } from "@/components/section-heading";
import { CtaPanel } from "@/components/cta-panel";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about chaitanya Trading Consultancy and its research-led, disciplined and risk-aware approach to market discussions.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Our Vision",
    text: "Build a consultancy known for clear communication, thoughtful research and a disciplined way of looking at markets.",
    icon: Eye,
  },
  {
    title: "Our Purpose",
    text: "Help market participants approach decisions with better context, structured thinking and awareness of risk.",
    icon: Target,
  },
  {
    title: "Our Values",
    text: "Maintain transparency, respect uncertainty and keep the quality of the process ahead of promises.",
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT chaitanya"
        title="A measured view of the markets. A disciplined way to think."
        description="chaitanya Trading Consultancy was established with a focus on practical market research, clear discussion and a considered approach to trading decisions."
        image="/images/office-market-research.webp"
        imageAlt="Modern professional workspace with market charts"
      />
      <section className="section">
        <div className="container split-layout split-layout--about-page">
          <MediaFrame
            src="/images/workspace-detail.webp"
            alt="Trading research desk with written notes and market charts"
            className="about-page-image"
          />
          <div className="about-page-copy">
            <span className="eyebrow">
              <span className="eyebrow__line" />
              WHO WE ARE
            </span>
            <h2>Research first. Clarity always. Risk in view.</h2>
            <p>
              chaitanya Trading Consultancy is a market-focused consultancy
              built around the idea that better decisions start with better
              preparation. Market movements can be complex, fast and uncertain.
              A clear process helps bring structure to the information being
              considered.
            </p>
            <p>
              Our work is centred on research perspectives, trading process
              discussions, strategy review and risk-aware planning. We aim to
              communicate in plain language and make the scope of each
              engagement clear from the beginning.
            </p>
            <p>
              We do not use guaranteed-return claims or manufactured performance
              statistics to build trust. A responsible market conversation
              should acknowledge uncertainty as clearly as it discusses
              opportunity.
            </p>
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="WHAT GUIDES US"
            title="The principles behind our work."
            description="A consistent set of values shapes how we research, communicate and approach market decisions."
            align="center"
          />
          <div className="principle-grid">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <article className="principle-card" key={item.title}>
                  <span className="principle-card__icon">
                    <Icon size={25} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container commitment-panel">
          <span className="commitment-panel__icon">
            <Compass size={28} />
          </span>
          <div>
            <span className="eyebrow eyebrow--light">
              <span className="eyebrow__line" />
              OUR COMMITMENT
            </span>
            <h2>Make the process clearer, not the promise bigger.</h2>
            <p>
              Markets cannot be controlled. Preparation, transparency and risk
              awareness can be part of every decision.
            </p>
          </div>
        </div>
      </section>
      <section className="section section--cta">
        <div className="container">
          <CtaPanel
            title="Start with a conversation."
            description="Tell us about the market topic or trading process you would like to discuss."
          />
        </div>
      </section>
    </>
  );
}
