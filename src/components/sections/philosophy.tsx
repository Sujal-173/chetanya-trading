import Image from "next/image";
import chart from "@/assets/images/chart-detail.webp";
import { Reveal } from "@/components/ui/reveal";
import { homeContent } from "@/content/home";

export function Philosophy() {
  const { philosophy } = homeContent;
  return (
    <section className="section section--alt" aria-labelledby="philosophy-title">
      <div className="container philosophy">
        <Reveal className="philosophy__copy">
          <h2 id="philosophy-title" className="display">
            {philosophy.statement}
          </h2>
          {philosophy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="principles">
            {philosophy.principles.map((principle) => (
              <p key={principle.title}>
                <strong>{principle.title}.</strong> {principle.text}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal className="philosophy__media" delay={100}>
          <Image
            src={chart}
            alt="Two monitors showing candlestick price charts with volume bars"
            placeholder="blur"
            sizes="(max-width: 1023px) 100vw, 36vw"
            className="photo"
          />
        </Reveal>
      </div>
    </section>
  );
}
