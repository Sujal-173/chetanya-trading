"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/content/site-content";
import { useConsultation } from "@/components/consultation-provider";
import { BrandLogo } from "@/components/logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { openConsultation } = useConsultation();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <BrandLogo />
        <nav id="mobile-navigation" className={`main-nav${menuOpen ? " main-nav--open" : ""}`} aria-label="Main navigation">
          {navigation.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                href={item.href}
                key={item.href}
                className={`main-nav__link${active ? " is-active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            className="button button--primary main-nav__mobile-cta"
            type="button"
            onClick={() => { closeMenu(); openConsultation("mobile_navigation"); }}
          >
            Get in Touch <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </nav>
        <div className="site-header__actions">
          <button className="button button--primary site-header__cta" type="button" onClick={() => openConsultation("header")}>Get in Touch <ArrowUpRight size={16} aria-hidden="true" /></button>
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
    </header>
  );
}
