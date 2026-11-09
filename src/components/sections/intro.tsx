import { Reveal } from "@/components/ui/reveal";
import { homeContent } from "@/content/home";

export function Intro() {
  const { intro } = homeContent;
  return (
    <section className="section" aria-labelledby="intro-title">
      <div className="container intro">
        <Reveal className="intro__lead">
          <h2 id="intro-title" className="display">
            {intro.statement}
          </h2>
        </Reveal>
        <div className="intro__body">
          <Reveal>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          <Reveal className="intro__lists" delay={80}>
            <div className="ruled-list ruled-list--do">
              <h3>What we do</h3>
              <ul>
                {intro.weDo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="ruled-list ruled-list--dont">
              <h3>What we do not do</h3>
              <ul>
                {intro.weDoNot.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
