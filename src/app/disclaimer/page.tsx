import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Trading and Market Risk Disclaimer",
  description:
    "Important information about market risk, general website content and the regulatory scope of services described by chaitanya Trading Consultancy.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        eyebrow="IMPORTANT INFORMATION"
        title="Trading involves risk. Understand it before you act."
        description="Please read this information carefully before relying on any market-related content on this website."
      />
      <section className="section">
        <div className="container legal-content">
          <div className="disclaimer-alert">
            <strong>Risk warning</strong>
            <p>
              Trading in securities and derivatives can result in substantial
              losses. You may lose some or all of the capital you put at risk.
              No strategy, market view or discussion guarantees a positive
              result.
            </p>
          </div>
          <h2>General information only</h2>
          <p>
            Website pages, insights and explanations are published for general
            information. They do not constitute a personalised recommendation to
            buy, sell or hold a security or investment product, and they do not
            take account of any visitor&apos;s financial circumstances,
            objectives or risk tolerance.
          </p>
          <h2>Regulated activities in India</h2>
          <p>
            Depending on the activities actually carried out, the fee model, the
            audience and how information is communicated, the SEBI Investment
            Adviser and/or Research Analyst frameworks may be relevant.
            Personalised advice, public research, specific trading
            recommendations and general educational information can be treated
            differently under the applicable regulations and amendments. The
            label “consultancy” alone does not determine the regulatory
            classification.
          </p>
          <p>
            Any regulated activity must only be carried out by a person or
            entity holding the registrations and permissions required for that
            activity under applicable Indian law. The business must obtain
            legal/compliance review of its actual service model, client
            communications, research, trading calls and fee model before
            offering services or publishing claims about regulatory status.
          </p>
          {siteConfig.regulatoryNumber ? (
            <p>
              <strong>
                Registration information supplied by the business owner:
              </strong>{" "}
              {siteConfig.regulatoryNumber}. This detail must be verified
              against the relevant regulator&apos;s official records before
              publication.
            </p>
          ) : (
            <p>
              <strong>
                No SEBI registration number is stated on this website.
              </strong>{" "}
              Do not add a registration claim, registration number, logo or
              wording that could imply regulated status unless it has been
              independently verified.
            </p>
          )}
          <h2>No assured returns</h2>
          <p>
            chaitanya Trading Consultancy does not promise fixed returns,
            assured profits, guaranteed accuracy or protection from market
            losses. Any examples or scenarios are illustrative only unless
            expressly identified and independently substantiated.
          </p>
          <h2>Independent judgement</h2>
          <p>
            Visitors should independently assess all information, verify current
            market data and consider advice from appropriately qualified
            professionals. Past performance and historical patterns are not
            reliable indicators of future results.
          </p>
        </div>
      </section>
    </>
  );
}
