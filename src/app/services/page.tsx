import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/content/site-content";
import { ConsultationTrigger } from "@/components/consultation-trigger";
import { StructuredData } from "@/components/structured-data";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Trading Consultancy Services",
  description:
    "Explore market insights, trading consultation, strategy discussions and risk-aware trade planning from chaitanya Trading Consultancy.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const servicesSchema = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: `${siteConfig.city}, ${siteConfig.region}, ${siteConfig.country}`,
  }));

  return (
    <>
      <StructuredData data={servicesSchema} />
      <PageHero
        eyebrow="OUR SERVICES"
        title="Focused support for a more considered trading process."
        description="Explore the areas where chaitanya Trading Consultancy can help you review information, discuss your approach and think carefully about risk."
        image="/images/hero-trading-office.webp"
        imageAlt="Professional desk setup with market charts"
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="HOW WE CAN HELP"
            title="Consultancy services, built around clarity."
            description="Each discussion starts with your requirements and a clear understanding of the scope. No fixed return claims. No artificial performance promises."
          />
          <div className="service-detail-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article className="service-detail-card" key={service.title}>
                  <div className="service-detail-card__top">
                    <span className="service-detail-card__icon">
                      <Icon size={26} />
                    </span>
                    <span>0{index + 1}</span>
                  </div>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <ConsultationTrigger
                    source={`service_${index + 1}`}
                    variant="text"
                  >
                    Discuss this service
                  </ConsultationTrigger>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container split-layout">
          <div>
            <span className="eyebrow">
              <span className="eyebrow__line" />A CLEAR START
            </span>
            <h2 className="section-title">
              What happens before a consultation?
            </h2>
            <p className="section-lead">
              We first understand the subject of your enquiry and whether it
              fits within the consultancy&apos;s stated service scope. The next
              step, fees if applicable, and any required disclosures should be
              agreed before work begins.
            </p>
            <ul className="check-list check-list--stacked">
              <li>
                <CheckCircle2 size={18} /> Your enquiry is reviewed.
              </li>
              <li>
                <CheckCircle2 size={18} /> The discussion scope is clarified.
              </li>
              <li>
                <CheckCircle2 size={18} /> Relevant limitations and risks are
                explained.
              </li>
              <li>
                <CheckCircle2 size={18} /> Next steps are shared transparently.
              </li>
            </ul>
          </div>
          <div className="service-note-card">
            <span className="service-note-card__number">01</span>
            <h3>Clear scope before action.</h3>
            <p>
              Service descriptions on this site are general. Any regulated
              investment advice or security-specific recommendation must only be
              provided where the firm and the person providing it are
              appropriately registered and permitted under applicable law.
            </p>
            <a className="text-link" href="/disclaimer">
              Read the disclaimer <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <section className="section section--cta">
        <div className="container">
          <div className="cta-inline">
            <div>
              <span className="eyebrow eyebrow--light">
                <span className="eyebrow__line" />
                HAVE A QUESTION?
              </span>
              <h2>Tell us what you want to understand.</h2>
              <p>
                Send an enquiry and outline the topic you would like to discuss.
              </p>
            </div>
            <ConsultationTrigger source="services_page_cta">
              Start an Enquiry
            </ConsultationTrigger>
          </div>
        </div>
      </section>
    </>
  );
}
