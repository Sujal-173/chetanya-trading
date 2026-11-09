import type { Faq } from "@/content/faqs";

/** Native disclosure elements: accessible, keyboard-friendly and JavaScript-free. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="faq">
      {items.map((faq, index) => (
        <details key={faq.question} className="faq__item" open={index === 0}>
          <summary className="faq__question">
            <span>{faq.question}</span>
          </summary>
          <div className="faq__answer">
            <p className="faq__direct">{faq.answer}</p>
            <p>{faq.detail}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
