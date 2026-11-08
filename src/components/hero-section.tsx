import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { heroContent } from "@/content/site-content";
import { ConsultationTrigger } from "@/components/consultation-trigger";

export function HeroSection() {
  return (
    <section className="hero-section">
      <Image
        src="/images/hero-trading-office.webp"
        alt="A professional trading workspace with market charts on desktop monitors"
        fill
        priority
        sizes="100vw"
        className="hero-section__image"
      />
      <div className="hero-section__overlay" />
      <div className="container hero-section__inner">
        <div className="hero-copy">
          <span className="eyebrow eyebrow--light"><span className="eyebrow__line" />{heroContent.eyebrow}</span>
          <h1>{heroContent.title} <em>{heroContent.highlight}</em></h1>
          <p>{heroContent.description}</p>
          <div className="hero-actions">
            <Link href="/approach" className="button button--primary">Our Approach <ArrowRight size={17} /></Link>
            <ConsultationTrigger variant="outline" source="hero_cta">Get in Touch</ConsultationTrigger>
          </div>
          <div className="hero-caption"><span className="hero-caption__dot" />A clear perspective. A considered process. Risk always in view.</div>
        </div>
        <div className="hero-side-note" aria-hidden="true">
          <span className="hero-side-note__number">01</span>
          <span>Research</span><i />
          <span>Plan</span><i />
          <span>Review</span>
        </div>
      </div>
    </section>
  );
}
