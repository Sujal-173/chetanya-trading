import type { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay in milliseconds, for staggering siblings. */
  delay?: number;
};

/**
 * Marks an element for the scroll reveal. This is a plain server component:
 * it renders visible HTML, and a single RevealController in the layout adds the
 * animation after hydration, so there is no per-element client JavaScript.
 */
export function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: Props) {
  return (
    <Tag
      data-reveal=""
      className={`reveal ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
