export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getOrganizationSchema() {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
    "https://example.com";
  const name =
    process.env.NEXT_PUBLIC_SITE_NAME?.trim() ||
    "chaitanya Trading Consultancy";
  const description =
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION?.trim() ||
    "Research-led market insights and practical trading consultancy focused on clarity, planning and risk awareness.";
  const city = process.env.NEXT_PUBLIC_CITY?.trim() || "Indore";
  const region = process.env.NEXT_PUBLIC_REGION?.trim() || "Madhya Pradesh";
  const country = process.env.NEXT_PUBLIC_COUNTRY?.trim() || "India";
  const email = process.env.NEXT_PUBLIC_EMAIL?.trim();
  const telephone = process.env.NEXT_PUBLIC_PHONE?.trim();
  const sameAs = [
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    process.env.NEXT_PUBLIC_YOUTUBE_URL,
  ].filter((value): value is string => Boolean(value?.trim()));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo: `${url}/brand/chaitanya-horizontal.png`,
    description,
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${city}, ${region}, ${country}`,
    },
    ...(email || telephone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer enquiries",
            ...(email ? { email } : {}),
            ...(telephone ? { telephone } : {}),
            availableLanguage: ["English", "Hindi"],
          },
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
