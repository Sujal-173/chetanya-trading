import Link from "next/link";
import { breadcrumbSchema, type Crumb } from "@/lib/seo";
import { JsonLd } from "./json-ld";

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...trail];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {all.map((crumb, index) => {
            const last = index === all.length - 1;
            return (
              <li key={crumb.path}>
                {last ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <Link href={crumb.path}>{crumb.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
