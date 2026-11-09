import type { ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import { Breadcrumbs } from "./breadcrumbs";

type Props = {
  title: string;
  intro: string;
  trail: Crumb[];
  children?: ReactNode;
};

/** Header band for inner pages: breadcrumb, a plain heading, and a short introduction. */
export function PageHeader({ title, intro, trail, children }: Props) {
  return (
    <section className="page-header">
      <div className="container">
        <Breadcrumbs trail={trail} />
        <div className="page-header__grid">
          <h1 className="page-header__title">{title}</h1>
          <div className="page-header__side">
            <p className="lede">{intro}</p>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
