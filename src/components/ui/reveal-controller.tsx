"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One shared IntersectionObserver for every [data-reveal] element on the page.
 * Elements already on screen are never hidden. Elements below the fold are
 * hidden once, then revealed the first time they scroll into view. Visitors who
 * prefer reduced motion see everything immediately.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-ready])");
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const node = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            node.classList.remove("is-hidden");
            observer.unobserve(node);
          } else if (!node.hasAttribute("data-reveal-ready")) {
            node.classList.add("is-hidden");
          }
          node.setAttribute("data-reveal-ready", "");
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
