import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/content/services";

export function ServicesOverview() {
  return (
    <section className="section section--alt" aria-labelledby="services-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="services-title" className="section-head__title">
            How we can help
          </h2>
          <p className="section-head__text">
            Choose the area closest to your question. Each service has a clear scope, so you know what to
            expect before you send an enquiry.
          </p>
        </Reveal>
        <ul className="service-rows">
          {services.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={index * 75}>
              <Link href={`/services#${service.slug}`} className="service-row">
                <h3 className="service-row__title">{service.title}</h3>
                <p className="service-row__text">{service.summary}</p>
                <span className="service-row__more">
                  Explore service<span className="sr-only">: {service.title}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
