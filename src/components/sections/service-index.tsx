"use client";

import { useEffect, useState } from "react";

type Item = { slug: string; title: string };

/** Sticky index for the services page; marks the section currently being read. */
export function ServiceIndex({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.slug ?? "");

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.slug))
      .filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Services" className="service-index">
      <ul>
        {items.map((item) => (
          <li key={item.slug}>
            <a href={`#${item.slug}`} aria-current={active === item.slug ? "location" : undefined}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
