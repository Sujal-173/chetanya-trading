"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useConsultation } from "@/components/consultation/consultation-provider";
import { Logo } from "./logo";

const SiteDrawer = dynamic(() => import("./site-drawer"), { ssr: false });

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const { open } = useConsultation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerLoaded, setDrawerLoaded] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  // An IntersectionObserver avoids a scroll handler: the header compacts when
  // the invisible sentinel near the top of the page leaves the viewport.
  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <div ref={sentinel} className="header-sentinel" aria-hidden="true" />
      <div className="header-slot">
        <header className={`site-header theme-dark${scrolled ? " is-compact" : ""}`}>
          <div className="container site-header__inner">
            <Logo priority />
            <nav aria-label="Main" className="site-nav">
              <ul className="site-nav__list">
                {siteConfig.navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="site-nav__link"
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="site-header__actions">
              <button type="button" className="btn btn--primary site-header__cta" onClick={() => open("header")}>
                Discuss your requirements
              </button>
              <button
                ref={toggle}
                type="button"
                className="icon-button site-header__toggle"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="site-menu"
                onClick={() => {
                  setDrawerLoaded(true);
                  setMenuOpen(true);
                }}
              >
                <Menu size={24} aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>
      </div>
      {drawerLoaded ? <SiteDrawer open={menuOpen} pathname={pathname} onClose={closeMenu} /> : null}
    </>
  );
}
