import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <span className="eyebrow"><span className="eyebrow__line" />{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
      {children}
    </div>
  );
}
