import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { FeatureStrip } from "@/components/feature-strip";
import { MediaFrame } from "@/components/media-frame";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { ApproachFlow } from "@/components/approach-flow";
import { CtaPanel } from "@/components/cta-panel";
import { ConsultationTrigger } from "@/components/consultation-trigger";
import { FAQList } from "@/components/faq-list";
import { StructuredData } from "@/components/structured-data";
import { faqs, services } from "@/content/site-content";

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <HeroSection />
      <FeatureStrip />

      <section className="section section--about-preview">
        <div className="container split-layout split-layout--about">
          <MediaFrame
            src="/images/office-market-research.webp"
            alt="A calm, professional office workspace used for market research and planning"
            className="about-preview__image"
            position="center"
          />
          <div className="about-preview__copy">
            <span className="eyebrow">
              <span className="eyebrow__line" />
              ABOUT chaitanya
            </span>
            <h2>A trading consultancy built on research and discipline.</h2>
            <p>
              chaitanya Trading Consultancy is focused on practical market
              analysis, structured trading discussions and risk-aware planning.
              Our aim is to bring clarity to the decision process through
              thoughtful research and straightforward communication.
            </p>
            <p>
              We believe a considered approach starts with understanding the
              market context, defining a plan and respecting the uncertainty
              that comes with trading.
            </p>
            <Link href="/about" className="button button--primary">
              Know More <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--services">
        <div className="container">
          <SectionHeading
            eyebrow="OUR SERVICES"
            title="Practical support for a more structured market approach."
            description="Focused consultancy services to help you review the market, discuss your process and think clearly about risk."
          />
          <div className="service-grid">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
              />
            ))}
          </div>
          <div className="section-link-row">
            <Link href="/services" className="text-link">
              Explore all services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--why">
        <div className="container why-layout">
          <MediaFrame
            src="/images/workspace-detail.webp"
            alt="Trading workspace with notes, a laptop and market charts"
            className="why-layout__image"
            position="center"
          />
          <div className="why-layout__copy">
            <span className="eyebrow">
              <span className="eyebrow__line" />
              WHY chaitanya
            </span>
            <h2>Clarity in the process. Discipline in the decisions.</h2>
            <p>
              We focus on a practical framework that respects research,
              preparation and risk rather than promises or shortcuts.
            </p>
            <ul className="check-list">
              <li>
                <CheckCircle2 size={18} /> Research-led market perspective
              </li>
              <li>
                <CheckCircle2 size={18} /> Clear and structured discussion
              </li>
              <li>
                <CheckCircle2 size={18} /> Risk awareness throughout planning
              </li>
              <li>
                <CheckCircle2 size={18} /> Transparent scope and communication
              </li>
            </ul>
            <Link href="/approach" className="text-link">
              Understand our approach <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--approach">
        <div className="container">
          <SectionHeading
            eyebrow="OUR APPROACH"
            title="A simple and structured process."
            description="Good decisions need context, preparation, discussion and a willingness to review what happened."
            align="center"
          />
          <ApproachFlow />
          <div className="approach-note">
            <ShieldCheck size={18} /> Risk awareness is part of the process, not
            an afterthought.
          </div>
        </div>
      </section>

      <section className="statement-band">
        <div className="container statement-band__inner">
          <span className="statement-band__mark">“</span>
          <p>
            Our focus is on clarity, discipline and a practical understanding of
            the market.
          </p>
          <span className="statement-band__mark statement-band__mark--end">
            ”
          </span>
        </div>
        <div className="statement-band__chart" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="section section--faq">
        <div className="container faq-layout">
          <div className="faq-intro">
            <span className="eyebrow">
              <span className="eyebrow__line" />
              COMMON QUESTIONS
            </span>
            <h2>Good decisions begin with clear information.</h2>
            <p>
              Here are answers to some common questions about the consultancy
              and its approach.
            </p>
            <ConsultationTrigger source="faq_cta">
              Ask a Question
            </ConsultationTrigger>
          </div>
          <FAQList items={faqs} />
        </div>
      </section>

      <section className="section section--cta">
        <div className="container">
          <CtaPanel />
        </div>
      </section>
    </>
  );
}
