import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { ServicesOverview } from "@/components/sections/services-overview";
import { AboutPreview } from "@/components/sections/about-preview";
import { Methodology } from "@/components/sections/methodology";
import { Philosophy } from "@/components/sections/philosophy";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";

const description =
  "Research-led market perspectives, structured trading discussions and risk-aware planning from CHAITANYA Trading Consultancy. No signals, no guaranteed returns.";

export const metadata: Metadata = {
  title: { absolute: siteConfig.seo.defaultTitle },
  description,
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: siteConfig.seo.defaultTitle, description, path: "/" })} />
      <Hero />
      <Intro />
      <ServicesOverview />
      <AboutPreview />
      <Methodology />
      <Philosophy />
      <InsightsPreview />
      <FaqSection />
      <ContactSection />
    </>
  );
}
