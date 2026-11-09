import { ConsultationButton } from "@/components/consultation/consultation-button";

type Props = {
  title: string;
  text: string;
  source: string;
  label?: string;
};

export function CtaBand({ title, text, source, label = "Discuss your requirements" }: Props) {
  return (
    <section className="cta-band theme-dark">
      <div className="container cta-band__inner">
        <div>
          <h2 className="cta-band__title">{title}</h2>
          <p className="cta-band__text">{text}</p>
        </div>
        <ConsultationButton source={source}>{label}</ConsultationButton>
      </div>
    </section>
  );
}
