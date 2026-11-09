"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { siteConfig } from "@/config/site";

const ConsultationModal = dynamic(() => import("./consultation-modal"), { ssr: false });

type ConsultationContextValue = {
  isOpen: boolean;
  open: (source?: string) => void;
  close: () => void;
};

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

export function useConsultation(): ConsultationContextValue {
  const value = useContext(ConsultationContext);
  if (!value) throw new Error("useConsultation must be used inside ConsultationProvider");
  return value;
}

const { enabled, delayMs, storageKey } = siteConfig.consultationPopup;

function wasDismissed(): boolean {
  try {
    return window.localStorage.getItem(storageKey) === "1";
  } catch {
    return false;
  }
}

function rememberDismissal() {
  try {
    window.localStorage.setItem(storageKey, "1");
  } catch {
    // Private browsing: the provider's own state still prevents a repeat this session.
  }
}

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [source, setSource] = useState("website");

  const open = useCallback((nextSource = "website") => {
    setSource(nextSource);
    setHasOpened(true);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    rememberDismissal();
  }, []);

  // First-visit popup: configurable delay, never after a dismissal, never on the
  // contact page, and never on top of the mobile menu.
  useEffect(() => {
    if (!enabled || wasDismissed()) return;

    const isSmallScreen = window.matchMedia("(max-width: 639px)").matches;
    let attempts = 0;
    let timer: number;

    const tryOpen = () => {
      if (wasDismissed() || window.location.pathname.startsWith("/contact")) return;
      if (document.body.hasAttribute("data-dialog-open") && attempts < 3) {
        attempts += 1;
        timer = window.setTimeout(tryOpen, 8000);
        return;
      }
      if (!document.body.hasAttribute("data-dialog-open")) open("first_visit_popup");
    };

    // Phones get extra time before anything covers the screen.
    timer = window.setTimeout(tryOpen, delayMs + (isSmallScreen ? 5000 : 0));
    return () => window.clearTimeout(timer);
  }, [open]);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      {hasOpened ? <ConsultationModal open={isOpen} source={source} onClose={close} /> : null}
    </ConsultationContext.Provider>
  );
}
