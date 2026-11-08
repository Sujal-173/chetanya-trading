"use client";

import { ArrowUpRight } from "lucide-react";
import { useConsultation } from "@/components/consultation-provider";

export function FooterConsultationButton() {
  const { openConsultation } = useConsultation();
  return (
    <button type="button" className="button button--primary button--wide" onClick={() => openConsultation("footer_cta")}>
      Get in Touch <ArrowUpRight size={16} aria-hidden="true" />
    </button>
  );
}
