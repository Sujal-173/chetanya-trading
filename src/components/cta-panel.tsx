import Image from "next/image";
import { ConsultationTrigger } from "@/components/consultation-trigger";

export function CtaPanel({
  title = "Let's discuss your trading approach.",
  description = "Have a question or want to understand our consultancy services? Share a few details and start a conversation.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="cta-panel">
      <Image src="/images/hero-trading-office.webp" alt="" fill sizes="100vw" className="cta-panel__image" />
      <div className="cta-panel__shade" />
      <div className="cta-panel__content">
        <span className="eyebrow eyebrow--light"><span className="eyebrow__line" />LET&apos;S CONNECT</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <ConsultationTrigger source="cta_banner">Get in Touch</ConsultationTrigger>
      </div>
    </section>
  );
}
