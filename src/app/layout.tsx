import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppShortcut } from "@/components/whatsapp-shortcut";
import {
  ConsultationProvider,
  AutoOpenConsultation,
} from "@/components/consultation-provider";
import { StructuredData } from "@/components/structured-data";
import { getOrganizationSchema } from "@/lib/utils";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: `${siteConfig.name} | Practical Market Guidance`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "trading consultancy",
    "market research insights",
    "trading strategy discussion",
    "risk-aware trading approach",
    "market analysis consultancy",
    "trading guidance India",
    "chaitanya Trading Consultancy",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Practical Market Guidance`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "chaitanya Trading Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Practical Market Guidance`,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  category: "finance",
  ...(siteConfig.googleSiteVerification
    ? { verification: { google: siteConfig.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07172b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${dmSans.variable}`}>
      <body>
        <StructuredData
          data={[
            getOrganizationSchema(),
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
              inLanguage: "en-IN",
            },
          ]}
        />
        <ConsultationProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <SiteHeader />
          <AutoOpenConsultation />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <WhatsAppShortcut />
        </ConsultationProvider>
      </body>
    </html>
  );
}
