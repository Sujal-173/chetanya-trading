import { siteConfig } from "@/config/site";

export type Service = {
  slug: string;
  title: string;
  /** Short description used in service cards and metadata. */
  summary: string;
  covers: string[];
  howItWorks: string;
  expect: string[];
  limits: string;
};

const allServices: Array<Service & { enabled: boolean }> = [
  {
    slug: "market-research-and-analysis",
    title: "Market Research and Analysis",
    summary:
      "A closer look at price behaviour, volatility, market activity and the developments that may affect the picture.",
    covers: [
      "The wider market and the timeframe being considered",
      "Price levels, volatility and observable trading activity",
      "Relevant announcements and scheduled events",
      "What could support or weaken the current reading",
    ],
    howItWorks:
      "Tell us which market or instrument you follow and what you are trying to understand. We review the relevant information with you, explain the observations and point out where the evidence is incomplete.",
    expect: [
      "A plain-language explanation of the market context",
      "More than one possible scenario, including an unfavourable one",
      "A clear distinction between observation and assumption",
    ],
    limits:
      "Market research is not a forecast. Conditions can change quickly, and an analysis can be wrong. This service is general information, not a recommendation to buy, sell or hold a security.",
    enabled: true,
  },
  {
    slug: "trading-consultation",
    title: "Trading Consultation",
    summary:
      "A one-to-one conversation about your trading objectives, the way you make decisions and the questions you want to resolve.",
    covers: [
      "What you trade and the timeframes you follow",
      "How you prepare for and assess a trading idea",
      "The habits or assumptions that influence decisions",
      "Ways to record decisions and review them later",
    ],
    howItWorks:
      "We start by listening to what you want to work through. Once we understand the question, we explain what can be covered in a consultation and agree on the scope before proceeding.",
    expect: [
      "A focused conversation around your stated question",
      "Questions that help make your reasoning easier to examine",
      "Clear boundaries and no pressure to take a particular action",
    ],
    limits:
      "A consultation is a discussion, not a managed trading service. We do not operate accounts, make trades on your behalf or promise improved performance.",
    enabled: true,
  },
  {
    slug: "strategy-discussion",
    title: "Strategy Discussion",
    summary:
      "Take a closer look at a trading method you already use: its rules, assumptions and the conditions in which it may struggle.",
    covers: [
      "The idea and assumptions behind the method",
      "Entry, exit and position-sizing rules you currently follow",
      "Market conditions that may not suit the approach",
      "How you record results and decide when to review a rule",
    ],
    howItWorks:
      "You explain the approach in your own words and share the questions you have about it. We talk through what needs to be true for the method to make sense, where it may fall short and what deserves further checking.",
    expect: [
      "A second perspective on the logic behind the approach",
      "Specific questions you can examine using your own records",
      "A clearer view of the method's assumptions and limitations",
    ],
    limits:
      "We do not certify, optimise or guarantee the performance of a strategy. Any backtesting or performance assessment must be based on suitable data and independently checked records.",
    enabled: true,
  },
  {
    slug: "risk-management-perspective",
    title: "Risk Management Perspective",
    summary:
      "Consider the downside before a decision: possible exposure, invalidation, volatility and the effect of an adverse move.",
    covers: [
      "How much could be at risk in the situation being discussed",
      "The conditions that would invalidate the idea",
      "Volatility, gaps and important event risk",
      "How a position may overlap with other exposure",
    ],
    howItWorks:
      "Bring an idea or a situation you want to examine. We work through the less favourable possibilities first and discuss the questions that are useful to answer before taking exposure.",
    expect: [
      "A repeatable set of questions for reviewing risk",
      "Attention to unfavourable outcomes as well as favourable ones",
      "A clearer way to document the assumptions behind a risk plan",
    ],
    limits:
      "A risk discussion cannot remove market risk or prevent loss. You decide what level of exposure is appropriate for your own circumstances.",
    enabled: true,
  },
  {
    slug: "ongoing-market-guidance",
    title: "Ongoing Market Guidance",
    summary:
      "Regular review conversations about changing market conditions and the way you assess your decisions over time.",
    covers: [
      "Periodic reviews of market context",
      "Revisiting earlier scenarios in light of new information",
      "Looking at decisions against the process you intended to follow",
    ],
    howItWorks:
      "The frequency and scope of any follow-up are discussed in advance. Each conversation can refer back to earlier notes, so changes in the market and in your own thinking are easier to follow.",
    expect: [
      "Continuity from one discussion to the next",
      "A regular opportunity to review assumptions and process",
      "A clear record of what is and is not included",
    ],
    limits:
      "Ongoing discussions do not include discretionary management of funds or guaranteed outcomes. This service is shown only when enabled by the business and must remain within its permitted scope.",
    enabled: siteConfig.offerings.ongoingGuidance,
  },
];

export const services: Service[] = allServices
  .filter((service) => service.enabled)
  .map((service) => ({
    slug: service.slug,
    title: service.title,
    summary: service.summary,
    covers: service.covers,
    howItWorks: service.howItWorks,
    expect: service.expect,
    limits: service.limits,
  }));

/** Values offered in the enquiry form's "Area of interest" field. */
export const interestOptions = [
  ...services.map((service) => service.title),
  "General enquiry",
] as const;

export type InterestOption = (typeof interestOptions)[number];
