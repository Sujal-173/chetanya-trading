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
            Each service is a discussion, not a product. We explain what it covers, how it works and what
            it cannot do before you commit to anything.
          </p>
        </Reveal>
        <ul className="service-rows">
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={`/services#${service.slug}`} className="service-row">
                <h3 className="service-row__title">{service.title}</h3>
                <p className="service-row__text">{service.summary}</p>
                <span className="service-row__more">
                  Details<span className="sr-only"> about {service.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
