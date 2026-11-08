import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Compass,
  MessagesSquare,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export const heroContent = {
  eyebrow: "TRADING CONSULTANCY",
  title: "Practical Market Guidance for",
  highlight: "Disciplined Traders",
  description:
    "chaitanya Trading Consultancy provides research-based market insights, structured guidance and a practical approach to help you navigate the markets with clarity and discipline.",
  primaryCta: "Our Approach",
  secondaryCta: "Get in Touch",
};

export type ServiceItem = {
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
};

export const services: ServiceItem[] = [
  {
    title: "Market Insights",
    short: "Research-led views on market trends and key levels.",
    description:
      "Understand market structure, relevant developments and key areas of interest through a clear, research-led market perspective.",
    icon: BarChart3,
  },
  {
    title: "Trading Consultation",
    short: "Discuss trade ideas, planning and risk management approaches.",
    description:
      "Have a structured discussion about your trading objectives, decision process and the factors you consider before taking market exposure.",
    icon: MessagesSquare,
  },
  {
    title: "Strategy Discussion",
    short: "Review your trading approach and current market scenarios.",
    description:
      "Review the logic behind a trading framework, discuss possible scenarios and identify where planning and discipline can be improved.",
    icon: Target,
  },
  {
    title: "Risk & Trade Planning",
    short: "Think through risk, position sizing and trade preparation.",
    description:
      "Bring risk awareness into the planning process by considering invalidation levels, exposure, position sizing and the impact of adverse outcomes.",
    icon: ShieldCheck,
  },
];

export const valuePillars = [
  {
    title: "Research first",
    text: "Market context before conclusions.",
    icon: BarChart3,
  },
  {
    title: "Plan with intent",
    text: "A structured view of each decision.",
    icon: Compass,
  },
  {
    title: "Respect risk",
    text: "Risk awareness at every stage.",
    icon: ShieldCheck,
  },
  {
    title: "Clear communication",
    text: "Practical discussion, without noise.",
    icon: UsersRound,
  },
];

export const approachSteps = [
  {
    number: "01",
    title: "Analyse",
    description:
      "Study the market context, price behaviour and relevant information before forming a view.",
    icon: BarChart3,
  },
  {
    number: "02",
    title: "Plan",
    description:
      "Define the scenario, the conditions that matter and the risk that must be considered.",
    icon: Compass,
  },
  {
    number: "03",
    title: "Discuss",
    description:
      "Review the reasoning, alternatives and possible outcomes through a structured conversation.",
    icon: MessagesSquare,
  },
  {
    number: "04",
    title: "Review",
    description:
      "Reflect on decisions and process so that learning is based on evidence rather than emotion.",
    icon: ShieldCheck,
  },
];

export const faqs = [
  {
    question: "What does chaitanya Trading Consultancy do?",
    answer:
      "chaitanya Trading Consultancy focuses on market research perspectives, structured trading discussions, strategy review and risk-aware planning. The exact scope of each engagement is discussed clearly before any service begins.",
  },
  {
    question: "Does the consultancy guarantee profits or fixed returns?",
    answer:
      "No. Market outcomes are uncertain. No trading method, market view or discussion can guarantee profits or remove the risk of loss.",
  },
  {
    question: "Can I discuss my existing trading strategy?",
    answer:
      "Yes. You can use the enquiry form to request a discussion about your trading process, market research approach or planning framework. The team will confirm the scope before proceeding.",
  },
  {
    question: "Does the website provide buy or sell recommendations?",
    answer:
      "The website shares general information about the consultancy. Any security-specific or personalised investment advice must only be offered where the provider is appropriately registered and permitted to do so under applicable regulations.",
  },
  {
    question: "How do I request a consultation?",
    answer:
      "Complete the enquiry form with your name, contact details and the topic you would like to discuss. The team can then review your enquiry and respond using the details you provide.",
  },
];

export const insights = [
  {
    slug: "why-risk-planning-matters",
    category: "Risk awareness",
    title: "Why risk planning belongs before the trade",
    excerpt:
      "A trading idea is incomplete until the downside, invalidation point and possible exposure have been considered.",
    readTime: "4 min read",
    paragraphs: [
      "A market view describes what may happen. A risk plan describes what you will do when the market behaves differently. Treating those two questions separately can leave a trader with an attractive thesis but no practical response to an adverse move.",
      "Before taking exposure, consider the conditions that would invalidate the idea, the amount at risk, the effect of gaps or volatility, and how the position fits with other open exposure. These questions do not remove uncertainty, but they make the decision process more deliberate.",
      "The purpose of risk planning is not to predict every outcome. It is to understand the range of outcomes you may face and decide in advance what level of risk is acceptable.",
    ],
  },
  {
    slug: "reading-market-context",
    category: "Market research",
    title: "Reading market context beyond a single chart pattern",
    excerpt:
      "Price structure, volume, volatility and the broader market environment provide context that one signal cannot supply alone.",
    readTime: "5 min read",
    paragraphs: [
      "A chart pattern is only one piece of market information. The same pattern can behave differently depending on trend, volatility, liquidity, event risk and the timeframe being considered.",
      "A more complete review starts with context. Identify the broader structure, mark relevant price areas, observe participation and ask what would confirm or weaken the current view. Keep the analysis focused on observable information rather than forcing a conclusion from a preferred pattern.",
      "No indicator or chart layout predicts the future with certainty. Market research is useful when it helps organise evidence, define scenarios and clarify uncertainty.",
    ],
  },
  {
    slug: "building-a-trading-process",
    category: "Trading process",
    title: "What makes a trading process more consistent?",
    excerpt:
      "Consistency begins with repeatable preparation, documented reasoning and a review process that is honest about mistakes.",
    readTime: "4 min read",
    paragraphs: [
      "A repeatable trading process gives each decision a common structure. It may include market preparation, a written thesis, entry conditions, risk limits, an exit plan and a post-trade review.",
      "The value of a process is not that it makes every trade successful. It makes decisions easier to evaluate. When the reasoning and risk are documented, a trader can distinguish a poor process from an acceptable plan that produced an unfavourable outcome.",
      "Review should focus on evidence. Record what was known at the time, what changed, whether the plan was followed and what can reasonably be improved. Avoid judging a decision only by its final profit or loss.",
    ],
  },
];
