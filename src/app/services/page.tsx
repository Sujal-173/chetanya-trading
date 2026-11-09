import Link from "next/link";
import { services } from "@/content/services";
import { buildMetadata, serviceSchema, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBand } from "@/components/ui/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { ServiceIndex } from "@/components/sections/service-index";

const title = "Services";
const description =
  "Explore market research, trading consultations, strategy discussions and risk-focused reviews. Find out what each service covers before getting in touch.";

export const metadata = buildMetadata({ title, description, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, description, path: "/services" }), ...services.map(serviceSchema)]} />
      <PageHeader
        title="A closer look at the questions behind your trades."
        intro="Choose the topic closest to what you want to work through. Each service page explains what we can discuss, how a session is handled and where its limits are."
        trail={[{ name: "Services", path: "/services" }]}
      />

      <section className="section section--tight" aria-label="Scope of our services">
        <div className="container">
          <p className="notice">
            <strong>Scope.</strong> Nothing offered here is a personalised recommendation to buy, sell or
            hold a security, and nothing is a promise of profit. We do not manage money or place trades
            for anyone. See the <Link href="/disclaimer">risk disclosure</Link>.
          </p>
        </div>
      </section>

      <section className="section section--flush" aria-label="Service details">
        <div className="container services-layout">
          <aside className="services-layout__index">
            <ServiceIndex items={services.map(({ slug, title: name }) => ({ slug, title: name }))} />
          </aside>
          <div className="services-layout__list">
            {services.map((service) => (
              <Reveal as="article" key={service.slug} className="service-detail">
                <div id={service.slug} className="service-detail__anchor" />
                <h2 className="service-detail__title">{service.title}</h2>
                <p className="lede">{service.summary}</p>
                <div className="service-detail__grid">
                  <section>
                    <h3>What it covers</h3>
                    <ul className="plain-list">
                      {service.covers.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h3>How the consultation works</h3>
                    <p>{service.howItWorks}</p>
                  </section>
                  <section>
                    <h3>What you can expect</h3>
                    <ul className="plain-list">
                      {service.expect.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                  <section className="service-detail__limits">
                    <h3>Limitations</h3>
                    <p>{service.limits}</p>
                  </section>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which service fits?"
        text="Describe what you are trying to work out and we will suggest where a conversation could start."
        source="services_cta"
      />
    </>
  );
}
