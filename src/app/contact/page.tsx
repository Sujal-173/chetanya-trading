import { buildMetadata, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { ContactDetails } from "@/components/sections/contact-details";

const title = "Contact";
const description =
  "Contact CHAITANYA Trading Consultancy with a question about market research, trading discussions or the services listed on this website.";

export const metadata = buildMetadata({ title, description, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: "/contact", type: "ContactPage" })} />
      <PageHeader
        title="Tell us what you would like to talk through."
        intro="Share the market, strategy or decision you have in mind. We will review your message and get back to you to discuss the next step and the scope of a consultation."
        trail={[{ name: "Contact", path: "/contact" }]}
      />
      <section className="section">
        <div className="container contact">
          <Reveal className="contact__copy">
            <h2 className="section-title">Contact details</h2>
            <ContactDetails />
            <h3 className="prose__subhead">What happens after you send the form</h3>
            <ol className="steps">
              <li>Your message is recorded so the enquiry can be reviewed.</li>
              <li>We contact you using the details you provided to clarify the topic and possible scope.</li>
              <li>You decide how to proceed. An enquiry does not commit you to a consultation.</li>
            </ol>
          </Reveal>
          <Reveal className="contact__panel" delay={80}>
            <LeadForm source="contact_page" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
