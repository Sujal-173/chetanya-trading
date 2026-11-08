"use client";

import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useConsultation } from "@/components/consultation-provider";

export function ConsultationTrigger({
  children = "Get in Touch",
  source = "website_cta",
  variant = "primary",
  arrow = true,
  className = "",
}: {
  children?: ReactNode;
  source?: string;
  variant?: "primary" | "outline" | "light" | "text";
  arrow?: boolean;
  className?: string;
}) {
  const { openConsultation } = useConsultation();
  return (
    <button type="button" className={`button button--${variant} ${className}`} onClick={() => openConsultation(source)}>
      {children}
      {arrow ? (variant === "text" ? <ArrowRight size={16} /> : <ArrowUpRight size={16} />) : null}
    </button>
  );
}
