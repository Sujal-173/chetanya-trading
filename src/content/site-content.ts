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
  eyebrow: "TRADING RESEARCH & CONSULTATION",
  title: "Make clearer trading decisions with",
  highlight: "a more considered process.",
  description:
    "Talk through market conditions, the thinking behind a trading idea and the risks that deserve attention before you make a decision.",
  primaryCta: "Our approach",
  secondaryCta: "Get in touch",
};

export type ServiceItem = {
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
};

export const services: ServiceItem[] = [
  {
    title: "Market Research and Analysis",
    short: "A closer look at price behaviour and market conditions.",
    description:
      "Review price structure, important levels, volatility and relevant developments to understand the setting around a market move.",
    icon: BarChart3,
  },
  {
    title: "Trading Consultation",
    short: "Talk through your questions and the way you approach a decision.",
    description:
      "Discuss your objectives, preparation habits and the questions you ask before deciding to take market exposure.",
    icon: MessagesSquare,
  },
  {
    title: "Strategy Discussion",
    short: "Take a closer look at the rules behind your approach.",
    description:
      "Examine the assumptions behind a method, the conditions it depends on and the situations in which it may not work as expected.",
    icon: Target,
  },
  {
    title: "Risk Management Perspective",
    short: "Consider the downside before focusing on a possible gain.",
    description:
      "Talk through invalidation, exposure, position sizing and how an adverse move could affect the wider portfolio.",
    icon: ShieldCheck,
  },
];

export const valuePillars = [
  {
    title: "Start with evidence",
    text: "Look at the available information first.",
    icon: BarChart3,
  },
  {
    title: "Question the idea",
    text: "Consider what could change the picture.",
    icon: Compass,
  },
  {
    title: "Respect the risk",
    text: "Give the downside proper attention.",
    icon: ShieldCheck,
  },
  {
    title: "Keep it clear",
    text: "Understand the reasoning and its limits.",
    icon: UsersRound,
  },
];

export const approachSteps = [
  {
    number: "01",
    title: "Understand",
    description:
      "Start with the market, method or decision you want to talk through and agree on the scope.",
    icon: MessagesSquare,
  },
  {
    number: "02",
    title: "Review",
    description:
      "Look at the available information, market context and assumptions behind the idea.",
    icon: BarChart3,
  },
  {
    number: "03",
    title: "Discuss",
    description:
      "Talk through different scenarios, the risks involved and the questions that remain.",
    icon: Compass,
  },
  {
    number: "04",
    title: "Reflect",
    description:
      "Review the reasoning and identify what may be useful to record or examine further.",
    icon: ShieldCheck,
  },
];

export const faqs = [
  {
    question: "What can I discuss with CHAITANYA Trading Consultancy?",
    answer:
      "You can enquire about market research, your trading process, a strategy you already use or the risks around an idea.",
  },
  {
    question: "Do you provide trading tips or signals?",
    answer:
      "No. We do not sell trading tips or signals. You remain responsible for every trading decision.",
  },
  {
    question: "Can I ask about a strategy I already use?",
    answer:
      "Yes. You can request a discussion about its logic, assumptions and the conditions in which it may struggle. We do not certify strategies or promise results.",
  },
  {
    question: "Do you guarantee profits or fixed returns?",
    answer:
      "No. Markets are uncertain, and trading can result in losses. No discussion or market view can guarantee a result.",
  },
  {
    question: "How do I request a consultation?",
    answer:
      "Send an enquiry through the contact form with a short note about the topic you have in mind. We will get back to you about the next step.",
  },
];

export const insights = [
  {
    slug: "why-risk-planning-matters",
    category: "Risk awareness",
    title: "Why it helps to think about risk before a trade",
    excerpt:
      "Define the downside and the conditions that would change your mind before focusing on a possible gain.",
    readTime: "4 min read",
    paragraphs: [
      "It is natural to notice the opportunity first. But a trade is not ready to assess until you have considered what happens if the market moves the other way.",
      "Before taking exposure, think about the conditions that would invalidate the idea, the amount at risk, the effect of gaps or volatility and any exposure you already have.",
      "A plan cannot predict every outcome or remove the possibility of loss. It can help you decide in advance how you will respond to different scenarios.",
    ],
  },
  {
    slug: "reading-market-context",
    category: "Market research",
    title: "Look beyond a single chart pattern",
    excerpt:
      "A familiar pattern can mean different things in different conditions. The surrounding market context matters.",
    readTime: "5 min read",
    paragraphs: [
      "A chart pattern is one part of market information. The same formation may behave differently in a trend, a range or a market reacting to important news.",
      "Look at the wider structure, relevant price areas, participation and volatility before deciding what a pattern may be showing.",
      "No pattern or indicator can tell you exactly what will happen next. Context helps organise the information; it does not remove uncertainty.",
    ],
  },
  {
    slug: "building-a-trading-process",
    category: "Trading process",
    title: "Small habits that make a trading process easier to review",
    excerpt:
      "Preparation, written reasoning and an honest review can make decisions easier to understand over time.",
    readTime: "4 min read",
    paragraphs: [
      "A trading process should be clear enough that you can explain why you considered a trade, what would make you act and what would make you step away.",
      "Record the market context, the reason for the decision, the planned risk and any changes you made. Keep the notes consistent so you can review them later.",
      "A profitable outcome does not automatically mean the process was sound, just as a loss does not always mean the decision was poor. Review the reasoning and the execution, not only the result.",
    ],
  },
];
