import { absoluteUrl, siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { faqs } from "@/content/faqs";
import { articleCategories, getAllArticles } from "@/content/insights";

export const dynamic = "force-static";

/**
 * llms.txt: a plain-language summary for AI systems and other crawlers. It is a
 * supplementary discovery aid and does not replace sitemap.xml, structured
 * data or ordinary crawlable pages. It is generated from the same configuration
 * and content files as the website so the facts never drift apart.
 */
export function GET() {
  const { contact, legal } = siteConfig;
  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "CHAITANYA Trading Consultancy is a trading consultancy based in " +
      `${contact.city}, ${contact.region}, ${contact.country}. It offers discussion-based consultation on market research, trading process, strategy review and risk management. It is not a trading academy or course provider, does not sell trading signals, does not manage client money and does not guarantee profits or returns.`,
    "",
    "## Key pages",
    `- [Home](${absoluteUrl("/")}): Overview of the consultancy`,
    `- [About](${absoluteUrl("/about")}): Philosophy, vision, mission and values`,
    `- [Services](${absoluteUrl("/services")}): What each service covers, how it works and its limits`,
    `- [Approach](${absoluteUrl("/approach")}): The four-step consultation process`,
    `- [Insights](${absoluteUrl("/insights")}): Original articles on market research, risk and process`,
    `- [Contact](${absoluteUrl("/contact")}): Enquiry form and contact details`,
    `- [Risk disclosure](${absoluteUrl("/disclaimer")}): Risks, limitations and regulatory status`,
    "",
    "## Services",
    ...services.map((service) => `- [${service.title}](${absoluteUrl(`/services#${service.slug}`)}): ${service.summary}`),
    "",
    "## Insights",
    ...getAllArticles().map(
      (article) =>
        `- [${article.title}](${absoluteUrl(`/insights/${article.slug}`)}) (${articleCategories[article.category].label}, ${article.publishedAt}): ${article.excerpt}`,
    ),
    "",
    "## Frequently asked questions",
    ...faqs.map((faq) => `- ${faq.question} ${faq.answer}`),
    "",
    "## Contact",
    ...(contact.email ? [`- Email: ${contact.email}`] : []),
    ...(contact.phone ? [`- Phone: ${contact.phone}`] : []),
    `- Location: ${contact.city}, ${contact.region}, ${contact.country}`,
    `- Enquiry form: ${absoluteUrl("/contact")}`,
    "",
    "## Important notes",
    "- Content is general information, not personalised investment advice.",
    legal.regulatory.registrationNumber
      ? `- Regulatory registration: ${legal.regulatory.authority} ${legal.regulatory.registrationNumber}`
      : "- The consultancy does not claim any securities regulator registration on this website.",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
