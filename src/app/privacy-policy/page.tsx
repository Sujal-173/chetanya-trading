import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how chaitanya Trading Consultancy collects and uses information submitted through its website enquiry forms.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        description="How information submitted through this website is handled."
      />
      <section className="section">
        <div className="container legal-content">
          <p className="legal-updated">Last updated: November 2026</p>
          <h2>1. Information we collect</h2>
          <p>
            When you submit an enquiry, the website may collect your name, email
            address, phone number, selected enquiry topic and the message you
            choose to provide. Do not submit passwords, trading account
            credentials, bank details or sensitive financial information through
            this form.
          </p>
          <h2>2. How information is used</h2>
          <p>
            Information is used to review and respond to your enquiry,
            understand the service area you are interested in and maintain a
            record of incoming enquiries. It is not used to make promises about
            market outcomes.
          </p>
          <h2>3. Lead storage</h2>
          <p>
            When the website owner has configured the Google Sheets integration,
            enquiry details are written to a spreadsheet controlled by the
            business. Access to that spreadsheet should be restricted to
            authorised people. The business owner is responsible for setting an
            appropriate retention period and managing access.
          </p>
          <h2>4. Sharing and service providers</h2>
          <p>
            Website hosting, security and spreadsheet services may process
            information to operate the website and its enquiry workflow. The
            business should not sell enquiry information. Information may be
            disclosed where required by applicable law.
          </p>
          <h2>5. Browser storage</h2>
          <p>
            The site uses browser storage to remember that the first-visit
            enquiry popup has been dismissed. No advertising or analytics
            cookies are enabled by this starter project unless the business
            owner adds and discloses those tools.
          </p>
          <h2>6. Your choices</h2>
          <p>
            You may choose not to submit the enquiry form. To ask about the
            information you have submitted or request correction or deletion,
            contact the business through the contact page. The business should
            respond in accordance with applicable law.
          </p>
          <h2>7. Contact</h2>
          <p>
            Privacy enquiries can be sent through the{" "}
            <a href="/contact">Contact page</a>
            {siteConfig.email ? ` or to ${siteConfig.email}` : ""}.
          </p>
        </div>
      </section>
    </>
  );
}
