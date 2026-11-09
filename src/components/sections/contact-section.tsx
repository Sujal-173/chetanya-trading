import { Reveal } from "@/components/ui/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { ContactDetails } from "./contact-details";

export function ContactSection({ source = "home_contact" }: { source?: string }) {
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container contact">
        <Reveal className="contact__copy">
          <h2 id="contact-title" className="section-title">
            What would you like to talk through?
          </h2>
          <p>
            Send us a few details about the market, strategy or decision on your mind. We will review your
            enquiry and get back to you about the next step.
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
