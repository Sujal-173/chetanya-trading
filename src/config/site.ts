const clean = (value: string | undefined) => value?.trim() || "";

export const siteConfig = {
  name:
    clean(process.env.NEXT_PUBLIC_SITE_NAME) || "chaitanya Trading Consultancy",
  url: (
    clean(process.env.NEXT_PUBLIC_SITE_URL) || "https://example.com"
  ).replace(/\/$/, ""),
  googleSiteVerification: clean(
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  ),
  description:
    clean(process.env.NEXT_PUBLIC_SITE_DESCRIPTION) ||
    "Research-led market insights and practical trading consultancy focused on clarity, planning and risk awareness.",
  city: clean(process.env.NEXT_PUBLIC_CITY) || "Indore",
  region: clean(process.env.NEXT_PUBLIC_REGION) || "Madhya Pradesh",
  country: clean(process.env.NEXT_PUBLIC_COUNTRY) || "India",
  phone: clean(process.env.NEXT_PUBLIC_PHONE),
  email: clean(process.env.NEXT_PUBLIC_EMAIL),
  whatsapp: clean(process.env.NEXT_PUBLIC_WHATSAPP).replace(/\D/g, ""),
  social: {
    linkedin: clean(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    instagram: clean(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    youtube: clean(process.env.NEXT_PUBLIC_YOUTUBE_URL),
  },
  regulatoryNumber: clean(process.env.SEBI_REGISTRATION_NUMBER),
};

export const publicContactItems = [
  ...(siteConfig.phone
    ? [
        {
          label: "Phone",
          value: siteConfig.phone,
          href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
        },
      ]
    : []),
  ...(siteConfig.email
    ? [
        {
          label: "Email",
          value: siteConfig.email,
          href: `mailto:${siteConfig.email}`,
        },
      ]
    : []),
] as const;

export const socialItems = [
  ...(siteConfig.social.linkedin
    ? [{ label: "LinkedIn", href: siteConfig.social.linkedin }]
    : []),
  ...(siteConfig.social.instagram
    ? [{ label: "Instagram", href: siteConfig.social.instagram }]
    : []),
  ...(siteConfig.social.youtube
    ? [{ label: "YouTube", href: siteConfig.social.youtube }]
    : []),
] as const;
