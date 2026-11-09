import { buildMetadata, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { ContactDetails } from "@/components/sections/contact-details";

const title = "Contact";
const description =
  "Send an enquiry to CHAITANYA Trading Consultancy. Tell us what you would like to discuss and we will reply to confirm what a consultation can cover.";

export const metadata = buildMetadata({ title, description, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: "/contact", type: "ContactPage" })} />
      <PageHeader
        title="Start with a short note about what you have in mind."
        intro="You do not need to have everything worked out. Tell us the market, the question or the decision you are weighing, and we will reply to confirm what a consultation can and cannot cover."
        trail={[{ name: "Contact", path: "/contact" }]}
      />
      <section className="section">
        <div className="container contact">
          <Reveal className="contact__copy">
            <h2 className="section-title">Contact details</h2>
            <ContactDetails />
            <h3 className="prose__subhead">What happens after you send the form</h3>
            <ol className="steps">
              <li>Your enquiry is recorded and given a reference number.</li>
              <li>We reply to confirm what you would like to discuss and what a consultation covers.</li>
              <li>You decide whether to go ahead. Nothing starts until the scope is clear.</li>
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
