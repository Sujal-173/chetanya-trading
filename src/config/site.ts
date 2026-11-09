/**
 * Central business configuration.
 *
 * Every business-specific value on the website is read from here. Public
 * values come from NEXT_PUBLIC_* environment variables so they can be changed
 * per deployment without touching components. Optional values stay `undefined`
 * until the business owner supplies them; the UI hides anything that is empty
 * and never invents contact details, addresses or registration numbers.
 *
 * NOTE: NEXT_PUBLIC_* variables must be referenced literally (not through a
 * dynamic key) so Next.js can inline them into client bundles.
 */

const clean = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

const toList = (value: string | undefined): string[] =>
  (value ?? "")
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);

const toNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

const resolveSiteUrl = (): string => {
  const explicit = clean(process.env.NEXT_PUBLIC_SITE_URL);
  const vercel = clean(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  const url = explicit ?? (vercel ? `https://${vercel}` : "http://localhost:3000");
  return url.replace(/\/+$/, "");
};

const phone = clean(process.env.NEXT_PUBLIC_PHONE);
const whatsapp = clean(process.env.NEXT_PUBLIC_WHATSAPP)?.replace(/\D/g, "");
const email = clean(process.env.NEXT_PUBLIC_EMAIL);

export const siteConfig = {
  /** Display name used in prose, titles and structured data. */
  name: "CHAITANYA Trading Consultancy",
  /** Brand name as it appears in the logo lockup. */
  brandName: "CHAITANYA TRADING CONSULTANCY",
  shortName: "CHAITANYA",
  tagline: "Clearer thinking for considered trading decisions",
  url: resolveSiteUrl(),
  locale: "en-IN",
  logo: {
    /** Absolute-URL-ready public path used in JSON-LD and the Open Graph card. */
    publicPath: "/brand/chaitanya-horizontal.png",
    width: 2172,
    height: 724,
  },
  description:
    "CHAITANYA Trading Consultancy provides market research discussions and practical conversations about trading decisions, strategy and risk. No signals or guaranteed returns.",
  googleSiteVerification: clean(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),

  contact: {
    email,
    phone,
    phoneHref: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : undefined,
    whatsapp,
    /** Lines of the public office address, separated by "|" in the env var. */
    addressLines: toList(process.env.NEXT_PUBLIC_ADDRESS_LINES),
    city: clean(process.env.NEXT_PUBLIC_CITY) ?? "Indore",
    region: clean(process.env.NEXT_PUBLIC_REGION) ?? "Madhya Pradesh",
    country: clean(process.env.NEXT_PUBLIC_COUNTRY) ?? "India",
    postalCode: clean(process.env.NEXT_PUBLIC_POSTAL_CODE),
    /** Free text, e.g. "Monday to Saturday, 10:00 to 18:00 IST". */
    hours: clean(process.env.NEXT_PUBLIC_BUSINESS_HOURS),
  },

  social: {
    linkedin: clean(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    instagram: clean(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    youtube: clean(process.env.NEXT_PUBLIC_YOUTUBE_URL),
    x: clean(process.env.NEXT_PUBLIC_X_URL),
  },

  legal: {
    legalName: clean(process.env.NEXT_PUBLIC_LEGAL_NAME),
    registeredAddress: clean(process.env.NEXT_PUBLIC_REGISTERED_ADDRESS),
    privacyEmail: clean(process.env.NEXT_PUBLIC_PRIVACY_EMAIL) ?? email,
    /**
     * Regulatory registration is displayed only when a number is supplied.
     * Never fill this in unless the registration has been verified.
     */
    regulatory: {
      authority: clean(process.env.NEXT_PUBLIC_REGULATORY_AUTHORITY) ?? "SEBI",
      registrationType: clean(process.env.NEXT_PUBLIC_REGULATORY_REGISTRATION_TYPE),
      registrationNumber:
        clean(process.env.NEXT_PUBLIC_REGULATORY_REGISTRATION_NUMBER) ??
        clean(process.env.SEBI_REGISTRATION_NUMBER),
    },
    /** Update when the policy pages are reviewed. ISO date. */
    policiesLastUpdated: "2026-11-08",
  },

  offerings: {
    /**
     * "Ongoing Market Guidance" is only listed when the business confirms that
     * it actually offers the service. Set NEXT_PUBLIC_OFFER_ONGOING_GUIDANCE=true.
     */
    ongoingGuidance: process.env.NEXT_PUBLIC_OFFER_ONGOING_GUIDANCE === "true",
  },

  /** People are listed only after the business supplies verified details. */
  team: [] as ReadonlyArray<{ name: string; role: string; bio?: string }>,

  consultationPopup: {
    enabled: process.env.NEXT_PUBLIC_POPUP_ENABLED !== "false",
    delayMs: toNumber(process.env.NEXT_PUBLIC_POPUP_DELAY_MS, 7000),
    /** Bump the version to show the popup again to visitors who dismissed an older one. */
    storageKey: "chaitanya-consultation-popup-v2",
  },

  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/approach", label: "Approach" },
    { href: "/insights", label: "Insights" },
    { href: "/contact", label: "Contact" },
  ],

  footerLinks: {
    legal: [
      { href: "/disclaimer", label: "Risk disclosure" },
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of use" },
    ],
  },

  seo: {
    titleTemplate: "%s | CHAITANYA Trading Consultancy",
    defaultTitle: "CHAITANYA Trading Consultancy | Market Research & Trading Consultation",
    keywords: [
      "trading consultancy",
      "market research India",
      "trading strategy discussion",
      "risk management for traders",
      "CHAITANYA Trading Consultancy",
    ],
    openGraphImage: "/opengraph-image",
  },

  leadStatus: {
    initial: "New",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const absoluteUrl = (path = "/"): string =>
  `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;

export const socialLinks = (
  [
    ["LinkedIn", siteConfig.social.linkedin],
    ["Instagram", siteConfig.social.instagram],
    ["YouTube", siteConfig.social.youtube],
    ["X", siteConfig.social.x],
  ] as const
).flatMap(([label, href]) => (href ? [{ label, href }] : []));

export const hasPublicContact = Boolean(
  siteConfig.contact.email || siteConfig.contact.phone,
);
