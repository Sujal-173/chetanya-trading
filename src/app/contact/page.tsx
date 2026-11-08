import type { Metadata } from "next";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { LeadForm } from "@/components/lead-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact chaitanya Trading Consultancy",
  description:
    "Contact chaitanya Trading Consultancy to enquire about market insights, trading consultation, strategy discussions and risk-aware planning.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="GET IN TOUCH"
        title="Start with a clear conversation."
        description="Share what you would like to discuss. The team can review your enquiry and respond using the contact details you provide."
        image="/images/office-market-research.webp"
        imageAlt="Professional workspace for market research and consultation"
      />
      <section className="section">
        <div className="container contact-layout">
          <div className="contact-copy">
            <span className="eyebrow">
              <span className="eyebrow__line" />
              CONTACT chaitanya
            </span>
            <h2>Let&apos;s understand what you need.</h2>
            <p>
              Use the form to share your requirements. Please do not include
              account passwords, trading login credentials, bank details or
              other sensitive financial information.
            </p>
            <div className="contact-methods">
              {siteConfig.phone ? (
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}>
                  <span>
                    <Phone size={19} />
                  </span>
                  <div>
                    <small>Call us</small>
                    <strong>{siteConfig.phone}</strong>
                  </div>
                </a>
              ) : null}
              {siteConfig.email ? (
                <a href={`mailto:${siteConfig.email}`}>
                  <span>
                    <Mail size={19} />
                  </span>
                  <div>
                    <small>Email</small>
                    <strong>{siteConfig.email}</strong>
                  </div>
                </a>
              ) : null}
              <div>
                <span>
                  <MapPin size={19} />
                </span>
                <div>
                  <small>Service area</small>
                  <strong>
                    {siteConfig.city}, {siteConfig.region}, {siteConfig.country}
                  </strong>
                </div>
              </div>
            </div>
            <div className="contact-assurance">
              <ShieldCheck size={20} />
              <p>
                Your enquiry is sent securely to the website&apos;s
                lead-processing endpoint and, when configured, saved to the
                business&apos;s private Google Sheet.
              </p>
            </div>
          </div>
          <div className="contact-form-card">
            <div className="contact-form-card__heading">
              <span className="eyebrow">
                <span className="eyebrow__line" />
                SEND AN ENQUIRY
              </span>
              <h2>How can we help?</h2>
              <p>Fields marked with * are required.</p>
            </div>
            <LeadForm source="contact_page" />
          </div>
        </div>
      </section>
    </>
  );
}
