import { Reveal } from "@/components/ui/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { ContactDetails } from "./contact-details";

export function ContactSection({ source = "home_contact" }: { source?: string }) {
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container contact">
        <Reveal className="contact__copy">
          <h2 id="contact-title" className="section-title">
            Tell us what you would like to discuss.
          </h2>
          <p>
            Share a few details and what you have in mind. We will reply to confirm what a consultation
            can cover before anything begins.
          </p>
          <ContactDetails />
        </Reveal>
        <Reveal className="contact__panel" delay={80}>
          <LeadForm source={source} />
        </Reveal>
      </div>
    </section>
  );
}
