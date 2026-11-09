"use client";

import type { ReactNode } from "react";
import { useConsultation } from "./consultation-provider";

type Props = {
  source: string;
  children: ReactNode;
  className?: string;
};

/** Opens the enquiry popup. `source` is recorded with the lead. */
export function ConsultationButton({ source, children, className = "btn btn--primary" }: Props) {
  const { open } = useConsultation();
  return (
    <button type="button" className={className} onClick={() => open(source)}>
      {children}
    </button>
  );
}
