import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/images/hero-trading-office.webp";
import { ConsultationButton } from "@/components/consultation/consultation-button";
import { homeContent } from "@/content/home";

export function Hero() {
  const { hero } = homeContent;
  const [titleFirstLine, titleSecondLine] = hero.titleLines;
  return (
    <section className="hero theme-dark" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">{titleFirstLine}</span>
            <span className="hero__line hero__line--2">{titleSecondLine}</span>
          </h1>
          <p className="hero__text">{hero.description}</p>
          <div className="hero__actions">
            <ConsultationButton source="hero">{hero.primaryCta}</ConsultationButton>
            <Link href="/approach" className="btn btn--secondary">
              {hero.secondaryCta}
            </Link>
          </div>
          <p className="hero__note">{hero.note}</p>
        </div>
        <div className="hero__media">
          <Image
            src={heroImage}
            alt="A trading desk in a quiet office, with two monitors showing market charts, a notebook and a pen"
            priority
            fetchPriority="high"
            placeholder="blur"
            sizes="(max-width: 1023px) 100vw, 55vw"
            className="hero__image"
          />
        </div>
      </div>
      <div className="container hero__trust" role="group" aria-label="Our working principles">
        {hero.principles.map((principle) => (
          <div className="hero__trust-item" key={principle.number}>
            <span className="hero__trust-mark" aria-hidden="true">{principle.number}</span>
            <span className="hero__trust-copy">
              <strong>{principle.title}</strong>
              <span>{principle.description}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
