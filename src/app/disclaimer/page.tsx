import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/ui/legal-page";

export const metadata = buildMetadata({
  title: "Risk disclosure",
  description:
    "Risks of trading and investing, the limits of the information on this website, and the regulatory status of CHAITANYA Trading Consultancy.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  const { regulatory } = siteConfig.legal;
  return (
    <LegalPage
      title="Risk disclosure"
      intro="Please read this before relying on anything on this website or acting on a discussion with us."
      trail={[{ name: "Risk disclosure", path: "/disclaimer" }]}
      sections={[
        {
          heading: "Trading involves risk",
          paragraphs: [
            "Trading and investing in securities, derivatives and other instruments involve substantial risk, including the loss of some or all of the capital you commit. Leveraged products can lose more than the amount first invested. Only trade with money you can afford to lose.",
            "Past performance, where mentioned anywhere, does not indicate or guarantee future results.",
          ],
        },
        {
          heading: "No guarantee of profit or returns",
          paragraphs: [
            "CHAITANYA Trading Consultancy does not guarantee profits, returns or any outcome. No view, analysis, method or conversation can remove market risk. We do not publish performance figures, and we do not use testimonials to suggest results.",
          ],
        },
        {
          heading: "General information, not personalised advice",
          paragraphs: [
            "Content on this website, including articles, is general information and education. It is not a recommendation to buy, sell or hold any security and does not take account of your objectives, finances or risk tolerance. Consultations are discussions about process, market context and risk. We do not manage money, operate accounts or place trades on anyone's behalf.",
          ],
        },
        {
          heading: "Regulatory status",
          paragraphs: regulatory.registrationNumber
            ? [
                `${siteConfig.name} states the following registration: ${regulatory.authority}${regulatory.registrationType ? ` ${regulatory.registrationType}` : ""}, registration number ${regulatory.registrationNumber}. You can verify registrations directly with the regulator.`,
              ]
            : [
                "This website does not claim registration with the Securities and Exchange Board of India (SEBI) or any other regulator, and nothing here should be read as implying that we are registered as an investment adviser or research analyst.",
                <>
                  If you want security-specific advice, speak to an adviser who is registered for that
                  purpose. Registrations can be checked on the{" "}
                  <a href="https://www.sebi.gov.in/" target="_blank" rel="noopener noreferrer">
                    SEBI website<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  .
                </>,
              ],
        },
        {
          heading: "Your responsibility",
          paragraphs: [
            "Any decision to trade or invest is yours alone. Consider your own circumstances and, where appropriate, take advice from a suitably qualified and registered professional before acting. We accept no responsibility for losses arising from decisions made using information from this website.",
          ],
        },
        {
          heading: "Third-party information",
          paragraphs: [
            "Where we refer to third-party sites or data, we do not control and are not responsible for their accuracy or availability.",
          ],
        },
        {
          heading: "Questions",
          paragraphs: [
            <>
              If anything here is unclear, please <Link href="/contact">contact us</Link> before relying on
              our services.
            </>,
          ],
        },
      ]}
    />
  );
}
