"use client";

import { useId, useRef } from "react";
import { AnimatePresence, LazyMotion, m, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/brand/chaitanya-horizontal.png";
import { siteConfig } from "@/config/site";
import { useDialog } from "@/lib/use-dialog";
import { LeadForm } from "@/components/forms/lead-form";

const loadFeatures = () => import("@/lib/motion-dom").then((module) => module.default);

type Props = { open: boolean; source: string; onClose: () => void };

function Panel({ source, onClose }: Omit<Props, "open">) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const reduceMotion = useReducedMotion();
  useDialog(ref, onClose);

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="modal" role="presentation">
      <m.div
        className="modal__backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
        onClick={onClose}
      />
      <m.div
        ref={ref}
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        transition={transition}
      >
        <div className="modal__top theme-dark">
          <Image src={logo} alt={siteConfig.name} className="modal__logo" sizes="150px" />
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close enquiry form">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="modal__body">
          <h2 id={titleId} className="modal__title">
            Discuss your requirements
          </h2>
          <p className="modal__intro">
            Tell us what you would like to talk through. We will reply to confirm what a consultation
            can cover.
          </p>
          <LeadForm source={source} variant="modal" onFinished={onClose} />
        </div>
      </m.div>
    </div>
  );
}

export default function ConsultationModal({ open, source, onClose }: Props) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <AnimatePresence>{open ? <Panel source={source} onClose={onClose} /> : null}</AnimatePresence>
    </LazyMotion>
  );
}
