import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/ui/legal-page";

export const metadata = buildMetadata({
  title: "Terms of use",
  description: "The terms that apply when you use the CHAITANYA Trading Consultancy website.",
  path: "/terms",
});

export default function TermsPage() {
  const owner = siteConfig.legal.legalName ?? siteConfig.name;
  return (
    <LegalPage
      title="Terms of use"
      intro="By using this website you agree to these terms. If you do not agree, please do not use it."
      trail={[{ name: "Terms of use", path: "/terms" }]}
      sections={[
        {
          heading: "About this website",
          paragraphs: [
            `This website is operated by ${owner}. It provides general information about our consultancy and its services.`,
          ],
        },
        {
          heading: "Information only",
          paragraphs: [
            <>
              Content on this site is general information and education. It is not investment advice, a
              recommendation, or an offer to buy or sell any security. Please read the{" "}
              <Link href="/disclaimer">risk disclosure</Link>.
            </>,
          ],
        },
        {
          heading: "Enquiries and engagements",
          paragraphs: [
            "Sending an enquiry does not create a client relationship or any obligation on either side. Any consultation is subject to a scope that we confirm with you before it begins.",
          ],
        },
        {
          heading: "Acceptable use",
          list: [
            "Do not submit false, misleading or unlawful content through our forms",
            "Do not attempt to disrupt, probe or gain unauthorised access to the website",
            "Do not use automated tools to submit enquiries or scrape the site in a way that harms it",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "The text, design, logo and other material on this website belong to us or our licensors. You may view and share pages for personal, non-commercial use, but you may not copy or reuse them commercially without written permission.",
          ],
        },
        {
          heading: "Links to other sites",
          paragraphs: ["We are not responsible for the content or practices of sites we link to."],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "To the extent the law allows, we are not liable for any loss arising from your use of this website or reliance on its content, including trading or investment losses. Nothing here limits liability that cannot be limited by law.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            "These terms are governed by the laws of India. Disputes are subject to the courts of competent jurisdiction in India.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            <>
              We may update these terms and will change the date above when we do. Questions? Please{" "}
              <Link href="/contact">contact us</Link>.
            </>,
          ],
        },
      ]}
    />
  );
}
