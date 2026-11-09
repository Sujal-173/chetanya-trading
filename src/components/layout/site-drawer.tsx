"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { AnimatePresence, LazyMotion, m, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import logo from "@/assets/brand/chaitanya-horizontal.png";
import { siteConfig } from "@/config/site";
import { useDialog } from "@/lib/use-dialog";
import { useConsultation } from "@/components/consultation/consultation-provider";

const loadFeatures = () => import("@/lib/motion-dom").then((module) => module.default);

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function Panel({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { open } = useConsultation();
  useDialog(ref, onClose);
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="drawer" role="presentation">
      <m.div
        className="drawer__backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
        onClick={onClose}
      />
      <m.div
        ref={ref}
        id="site-menu"
        className="drawer__panel theme-dark"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        tabIndex={-1}
        initial={reduceMotion ? false : { x: "100%" }}
        animate={{ x: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
        transition={transition}
      >
        <div className="drawer__top">
          <Image src={logo} alt={siteConfig.name} className="drawer__logo" sizes="140px" />
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close menu">
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Main">
          <ul className="drawer__list">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="drawer__link"
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="btn btn--primary drawer__cta"
          onClick={() => {
            onClose();
            window.setTimeout(() => open("mobile_menu"), 320);
          }}
        >
          Discuss your requirements
        </button>
      </m.div>
    </div>
  );
}

export default function SiteDrawer({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <AnimatePresence>{open ? <Panel pathname={pathname} onClose={onClose} /> : null}</AnimatePresence>
    </LazyMotion>
  );
}
