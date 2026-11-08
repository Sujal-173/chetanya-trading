import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceItem } from "@/content/site-content";

export function ServiceCard({ service, index = 0 }: { service: ServiceItem; index?: number }) {
  const Icon = service.icon;
  return (
    <article className="service-card">
      <span className="service-card__index">0{index + 1}</span>
      <span className="service-card__icon"><Icon size={25} strokeWidth={1.7} aria-hidden="true" /></span>
      <h3>{service.title}</h3>
      <p>{service.short}</p>
      <Link href="/services" className="service-card__link" aria-label={`Read about ${service.title}`}>
        Explore service <ArrowUpRight size={15} />
      </Link>
    </article>
  );
}
