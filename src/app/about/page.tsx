import Image from "next/image";
import desk from "@/assets/images/desk-detail.webp";
import { aboutContent as about } from "@/content/about";
import { siteConfig } from "@/config/site";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBand } from "@/components/ui/cta-band";
import { Reveal } from "@/components/ui/reveal";

const title = "About";
const description =
  "Learn what guides CHAITANYA Trading Consultancy, how we approach market questions and the boundaries we keep around our work.";

export const metadata = buildMetadata({ title, description, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: "/about", type: "AboutPage" })} />
      <PageHeader
        title="A thoughtful place to discuss the markets."
        intro={about.intro[0]}
        trail={[{ name: "About", path: "/about" }]}
      />

      <section className="section" aria-labelledby="philosophy-title">
        <div className="container two-col">
          <Reveal>
            <h2 id="philosophy-title" className="section-title">
              {about.philosophy.title}
            </h2>
          </Reveal>
          <Reveal className="prose" delay={60}>
            <p>{about.intro[1]}</p>
            {about.philosophy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--alt" aria-label="Vision and mission">
        <div className="container statements">
          <Reveal className="statements__item">
            <h2 className="statements__label">Vision</h2>
            <p className="statements__text">{about.vision}</p>
          </Reveal>
          <Reveal className="statements__item" delay={80}>
            <h2 className="statements__label">Mission</h2>
            <p className="statements__text">{about.mission}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <Reveal className="section-head">
            <h2 id="values-title" className="section-head__title">
              Core values
            </h2>
            <p className="section-head__text">The principles that guide the way we prepare, explain and discuss our work.</p>
          </Reveal>
          <dl className="values">
            {about.values.map((value, index) => (
              <Reveal key={value.title} className="values__item" delay={(index % 2) * 70}>
                <dt>{value.title}</dt>
                <dd>{value.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="research-title">
        <div className="container split">
          <Reveal className="split__media">
            <Image
              src={desk}
              alt="A notebook and pen on a desk in front of a keyboard, with a market chart on the monitor behind"
              placeholder="blur"
              sizes="(max-width: 1023px) 100vw, 46vw"
              className="photo"
            />
          </Reveal>
          <Reveal className="split__copy prose" delay={80}>
            <h2 id="research-title" className="section-title">
              {about.research.title}
            </h2>
            {about.research.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h3 className="prose__subhead">{about.transparency.title}</h3>
            {about.transparency.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {siteConfig.team.length > 0 ? (
        <section className="section" aria-labelledby="team-title">
          <div className="container">
            <h2 id="team-title" className="section-head__title">
              The people behind the consultancy
            </h2>
            <dl className="values">
              {siteConfig.team.map((person) => (
                <div key={person.name} className="values__item">
                  <dt>
                    {person.name}, {person.role}
                  </dt>
                  {person.bio ? <dd>{person.bio}</dd> : null}
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      <CtaBand
        title="Want to know how we would approach your questions?"
        text="Tell us what you are working on and we will confirm what a consultation can cover."
        source="about_cta"
      />
    </>
  );
}
