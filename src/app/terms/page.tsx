import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms for using the chaitanya Trading Consultancy website and its general information content.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Terms and Conditions"
        description="Please read these terms before using the website or submitting an enquiry."
      />
      <section className="section">
        <div className="container legal-content">
          <p className="legal-updated">Last updated: November 2026</p>
          <h2>1. Website information</h2>
          <p>
            This website provides general information about chaitanya Trading
            Consultancy, its stated areas of work and ways to contact the
            business. Website content may be updated, changed or removed without
            notice.
          </p>
          <h2>2. No guarantee of outcome</h2>
          <p>
            Trading and investing involve risk. No statement on this website
            guarantees profits, capital protection, a particular return or a
            successful outcome. Past market behaviour does not determine future
            results.
          </p>
          <h2>3. No reliance on general content</h2>
          <p>
            Articles, descriptions and market-related explanations are general
            information. They are not a substitute for advice based on your
            circumstances. You remain responsible for your own decisions and
            should seek independent professional guidance where appropriate.
          </p>
          <h2>4. Enquiries and communications</h2>
          <p>
            Submitting an enquiry does not create a client relationship, mandate
            or obligation to provide a service. Any engagement must be
            separately agreed, including its scope, fees, disclosures and
            applicable terms.
          </p>
          <h2>5. Permitted use</h2>
          <p>
            You agree not to misuse the website, attempt unauthorised access,
            submit malicious code or provide false information through its
            forms.
          </p>
          <h2>6. Intellectual property</h2>
          <p>
            Unless otherwise stated, the website design, logo, original copy and
            other materials are owned by or used with permission by the
            business. Do not reproduce them for commercial use without
            permission.
          </p>
          <h2>7. Applicable law</h2>
          <p>
            These terms are intended to be governed by the laws applicable in
            India, subject to review and finalisation by the business&apos;s
            legal adviser before launch.
          </p>
        </div>
      </section>
    </>
  );
}
