import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/types/content";

export function FAQList({ items }: { items: FAQItem[] }) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details className="faq-item" key={item.question} open={index === 0}>
          <summary><span>{item.question}</span><ChevronDown size={18} aria-hidden="true" /></summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
