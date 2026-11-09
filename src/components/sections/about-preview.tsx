import Image from "next/image";
import Link from "next/link";
import notes from "@/assets/images/research-notes.webp";
import { Reveal } from "@/components/ui/reveal";
import { homeContent } from "@/content/home";

export function AboutPreview() {
  const { about } = homeContent;
  return (
    <section className="section" aria-labelledby="about-title">
      <div className="container">
        <div className="split">
          <Reveal className="split__media">
            <Image
              src={notes}
              alt="An open notebook with hand-drawn price charts beside a laptop showing a market chart"
              placeholder="blur"
              sizes="(max-width: 1023px) 100vw, 46vw"
              className="photo"
            />
          </Reveal>
          <Reveal className="split__copy" delay={80}>
            <h2 id="about-title" className="section-title">
              {about.title}
            </h2>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              <Link href="/about" className="text-link">
                About CHAITANYA Trading Consultancy
              </Link>
            </p>
          </Reveal>
        </div>

        <div className="reasons">
          <h3 className="reasons__heading">Why clients may want to talk to us</h3>
          <dl className="reasons__list">
            {about.reasons.map((reason, index) => (
              <Reveal key={reason.title} className="reasons__item" delay={index * 70}>
                <dt>{reason.title}</dt>
                <dd>{reason.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
