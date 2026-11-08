"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { X, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/logo";
import { LeadForm } from "@/components/lead-form";

type ConsultationContextValue = {
  isOpen: boolean;
  openConsultation: (source?: string) => void;
  closeConsultation: () => void;
};

const ConsultationContext = createContext<ConsultationContextValue | null>(
  null,
);
const DISMISSED_KEY = "chaitanya-consultation-dismissed-v1";

export function useConsultation() {
  const context = useContext(ConsultationContext);
  if (!context)
    throw new Error("useConsultation must be used within ConsultationProvider");
  return context;
}

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("website_cta");

  const openConsultation = useCallback((nextSource = "website_cta") => {
    setSource(nextSource);
    setIsOpen(true);
  }, []);

  const closeConsultation = useCallback(() => {
    setIsOpen(false);
    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Storage can be unavailable in private browsing; closing still works.
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = document.querySelector<HTMLElement>(
      "[role='dialog'][aria-modal='true']",
    );
    const firstFocusable = dialog?.querySelector<HTMLElement>(
      "button, input, select, textarea, a[href], [tabindex]:not([tabindex='-1'])",
    );
    firstFocusable?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeConsultation();
      if (event.key === "Tab" && dialog) {
        const items = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            "button, input, select, textarea, a[href], [tabindex]:not([tabindex='-1'])",
          ),
        ).filter((item) => !item.hasAttribute("disabled"));
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeConsultation]);

  return (
    <ConsultationContext.Provider
      value={{ isOpen, openConsultation, closeConsultation }}
    >
      {children}
      {isOpen ? (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeConsultation();
          }}
        >
          <section
            className="consultation-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-modal-title"
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Close enquiry form"
              onClick={closeConsultation}
            >
              <X size={20} />
            </button>
            <div className="consultation-modal__top">
              <BrandLogo compact />
              <span className="modal-kicker">START A CONVERSATION</span>
            </div>
            <div className="consultation-modal__body">
              <span className="eyebrow">
                <span className="eyebrow__line" />
                LET&apos;S CONNECT
              </span>
              <h2 id="consultation-modal-title">
                Let&apos;s discuss your trading approach.
              </h2>
              <p>
                Share a few details and the team can get in touch to understand
                what you would like to discuss.
              </p>
              <LeadForm source={source} compact onSuccess={closeConsultation} />
              <div className="modal-privacy">
                <ShieldCheck size={15} aria-hidden="true" /> Your information is
                handled with care.
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </ConsultationContext.Provider>
  );
}

export function AutoOpenConsultation() {
  const { isOpen, openConsultation } = useConsultation();
  const attempted = useRef(false);

  useEffect(() => {
    if (isOpen || attempted.current) return;
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(DISMISSED_KEY) === "1";
    } catch {
      dismissed = false;
    }
    if (dismissed) {
      attempted.current = true;
      return;
    }
    attempted.current = true;
    const timer = window.setTimeout(
      () => openConsultation("first_visit_popup"),
      4200,
    );
    return () => window.clearTimeout(timer);
  }, [isOpen, openConsultation]);

  return null;
}
