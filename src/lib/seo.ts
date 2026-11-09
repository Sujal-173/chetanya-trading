import type { Metadata } from "next";
import { absoluteUrl, siteConfig, socialLinks } from "@/config/site";
import type { Article } from "@/content/insights/types";
import type { Service } from "@/content/services";
import type { Faq } from "@/content/faqs";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
};

/** Metadata for a page: unique title/description, canonical, Open Graph and X cards. */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = siteConfig.seo.titleTemplate.replace("%s", title);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: "en_IN",
      images: [{ url: siteConfig.seo.openGraphImage, width: 1200, height: 630, alt: siteConfig.name }],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [siteConfig.seo.openGraphImage],
    },
  };
}

const orgId = () => `${absoluteUrl("/")}#organization`;
const siteId = () => `${absoluteUrl("/")}#website`;

export function organizationSchema() {
  const { contact, legal } = siteConfig;
  const sameAs = socialLinks.map((link) => link.href);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId(),
    name: siteConfig.name,
    ...(legal.legalName ? { legalName: legal.legalName } : {}),
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.logo.publicPath),
      width: siteConfig.logo.width,
      height: siteConfig.logo.height,
    },
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      ...(contact.addressLines.length ? { streetAddress: contact.addressLines.join(", ") } : {}),
      addressLocality: contact.city,
      addressRegion: contact.region,
      ...(contact.postalCode ? { postalCode: contact.postalCode } : {}),
      addressCountry: "IN",
    },
    ...(contact.email || contact.phone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            ...(contact.email ? { email: contact.email } : {}),
            ...(contact.phone ? { telephone: contact.phone } : {}),
            availableLanguage: ["English", "Hindi"],
          },
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteId(),
    url: absoluteUrl("/"),
    name: siteConfig.name,
    inLanguage: siteConfig.locale,
    publisher: { "@id": orgId() },
  };
}

export function webPageSchema(input: { name: string; description: string; path: string; type?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    "@id": `${absoluteUrl(input.path)}#webpage`,
    url: absoluteUrl(input.path),
    name: input.name,
    description: input.description,
    inLanguage: siteConfig.locale,
    isPartOf: { "@id": siteId() },
    about: { "@id": orgId() },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl("/services")}#${service.slug}`,
    name: service.title,
    description: service.summary,
    serviceType: "Trading consultancy",
    provider: { "@id": orgId() },
    url: `${absoluteUrl("/services")}#${service.slug}`,
  };
}

export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: siteConfig.locale,
    mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`),
    image: absoluteUrl("/opengraph-image"),
    author: article.author
      ? { "@type": "Person", name: article.author.name }
      : { "@id": orgId() },
    publisher: { "@id": orgId() },
  };
}

/** Only render this alongside the same FAQs as visible page content. */
export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: `${faq.answer} ${faq.detail}` },
    })),
  };
}
