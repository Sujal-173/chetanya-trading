import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/ui/legal-page";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description:
    "What personal information CHAITANYA Trading Consultancy collects through its enquiry forms, why, where it is stored and how to exercise your rights.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  const { legal } = siteConfig;
  const owner = legal.legalName ?? siteConfig.name;
  return (
    <LegalPage
      title="Privacy policy"
      intro="This policy explains what we collect when you use this website, why, and what you can ask us to do."
      trail={[{ name: "Privacy policy", path: "/privacy-policy" }]}
      sections={[
        {
          heading: "Who we are",
          paragraphs: [
            `${owner} operates this website. For privacy questions or requests, ${
              legal.privacyEmail ? `write to ${legal.privacyEmail}` : "use the enquiry form on the contact page"
            }.`,
          ],
        },
        {
          heading: "What we collect",
          paragraphs: ["When you send an enquiry, we collect:"],
          list: [
            "Your full name, email address and phone number",
            "The area of interest you select and any message you write",
            "The page you sent the enquiry from and, where available, the campaign or site that referred you",
            "A record that you agreed to be contacted, and the date and time of your enquiry",
            "Your IP address, used briefly to limit abuse of the form",
          ],
        },
        {
          heading: "Why we use it",
          list: [
            "To reply to your enquiry and discuss what you asked about",
            "To keep a record of enquiries and follow them up",
            "To protect the form from spam and misuse",
            "To understand which pages and sources lead to enquiries",
          ],
        },
        {
          heading: "Basis for processing",
          paragraphs: [
            "We process your details with your consent, which you give by ticking the box on the form. You can withdraw consent at any time by contacting us.",
          ],
        },
        {
          heading: "Where it is stored",
          paragraphs: [
            "Enquiries are saved in a Google Sheets spreadsheet we control, which means Google processes that data on our behalf. If the spreadsheet is unavailable, an enquiry may be held temporarily in a secure queue provided by our infrastructure provider until it can be moved. Our website host and rate-limiting service may process technical data such as IP addresses to serve pages and prevent abuse.",
            "We do not sell your personal information.",
          ],
        },
        {
          heading: "Information stored on your device",
          paragraphs: [
            "We use your browser's local storage to remember that you have closed the enquiry popup, and session storage to remember where your visit came from. We do not set advertising cookies. This site does not currently use analytics that track you across sites. If that changes, we will update this policy.",
          ],
        },
        {
          heading: "How long we keep it",
          paragraphs: [
            "We keep enquiry records only for as long as needed to respond to you and keep a reasonable business record. We delete them when you ask, unless the law requires us to keep them.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Under applicable Indian law, including the Digital Personal Data Protection Act, 2023, you may ask to access, correct or erase your personal data, withdraw consent, or raise a grievance. To do so, contact us as described above and tell us which enquiry you mean.",
          ],
        },
        {
          heading: "Children",
          paragraphs: ["This website is not intended for anyone under 18, and we do not knowingly collect their data."],
        },
        {
          heading: "Changes to this policy",
          paragraphs: [
            <>
              We will update the date at the top of this page when the policy changes. See also our{" "}
              <Link href="/terms">terms of use</Link> and <Link href="/disclaimer">risk disclosure</Link>.
            </>,
          ],
        },
      ]}
    />
  );
}
