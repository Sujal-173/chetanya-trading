import { siteConfig } from "@/config/site";

export type Service = {
  slug: string;
  title: string;
  /** One-sentence description used in lists and metadata. */
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
      "A structured reading of market conditions: trend, volatility, participation and the events that could change the picture.",
    covers: [
      "Broader market structure and the timeframe it applies to",
      "Price areas, volatility and participation that are observable today",
      "Scheduled events and developments that could change the context",
      "The conditions that would strengthen or weaken the current reading",
    ],
    howItWorks:
      "You tell us which market or instrument you follow and what you are trying to understand. We review the available information, then walk you through what we observe, how confident the evidence allows us to be, and what we cannot tell from it.",
    expect: [
      "A clear explanation of the current market context, in plain language",
      "Scenarios laid out side by side, including the ones that go against the main view",
      "An honest statement of what the information does not show",
    ],
    limits:
      "Research describes conditions; it does not predict outcomes. A market reading can change quickly and may be wrong. It is general information, not a recommendation to buy, sell or hold any security.",
    enabled: true,
  },
  {
    slug: "trading-consultation",
    title: "Trading Consultation",
    summary:
      "A one-to-one conversation about your objectives, how you currently make decisions, and what a more structured process could look like.",
    covers: [
      "Your trading objectives and the time you can give to markets",
      "How you currently find, assess and act on an idea",
      "Where decisions rely on habit or emotion instead of a stated reason",
      "Practical ways to document and review decisions",
    ],
    howItWorks:
      "The first conversation is about understanding you, not the market. We ask what you trade, how, and why, and we agree on what the consultation will and will not cover before it goes further.",
    expect: [
      "Questions that make your own reasoning easier to see",
      "Observations about the process, shared respectfully and directly",
      "A shared understanding of scope at the start",
    ],
    limits:
      "A consultation is a discussion. We do not manage money, place trades on your behalf or guarantee that any approach will improve your results.",
    enabled: true,
  },
  {
    slug: "strategy-discussion",
    title: "Strategy Discussion",
    summary:
      "A review of the logic behind a trading approach you already use: its assumptions, its conditions and the situations it was not built for.",
    covers: [
      "The assumptions the approach depends on",
      "Entry, exit and position-sizing rules, and why each exists",
      "Market conditions in which the approach is likely to struggle",
      "How the approach is reviewed and when it should be questioned",
    ],
    howItWorks:
      "You share the approach as you understand it. We test the reasoning by asking what must be true for it to work and what you would do when it does not, then discuss gaps and alternatives.",
    expect: [
      "A second set of eyes on the reasoning, not a verdict on the strategy",
      "Specific questions to take away and answer with your own data",
      "A clearer view of what would make you stop or change course",
    ],
    limits:
      "We do not validate, back-test or certify strategies, and we do not claim a strategy will be profitable. Any conclusions about performance must come from your own records.",
    enabled: true,
  },
  {
    slug: "risk-management-perspective",
    title: "Risk Management Perspective",
    summary:
      "A conversation that puts risk first: how much is at stake, what would invalidate an idea, and how you would respond to an adverse move.",
    covers: [
      "The amount at risk and how it relates to your overall capital",
      "Invalidation points and the reasoning behind them",
      "Gaps, volatility and event risk",
      "Overlapping exposure across several positions",
    ],
    howItWorks:
      "We take an idea you are considering and work backwards from the downside. We set out what could go wrong, what it would cost, and which decisions are better made before the trade than during it.",
    expect: [
      "A framework for asking the same risk questions every time",
      "A realistic picture of the range of outcomes, not only the favourable one",
      "Language for writing down a risk plan you can follow",
    ],
    limits:
      "Risk management reduces surprises but cannot remove loss. Position sizes and risk limits are your decisions, taken on your own responsibility.",
    enabled: true,
  },
  {
    slug: "ongoing-market-guidance",
    title: "Ongoing Market Guidance",
    summary:
      "Regular discussions that follow how market conditions and your own process develop over time.",
    covers: [
      "Periodic reviews of market context",
      "Follow-up on earlier scenarios and what actually happened",
      "Reviewing how decisions were made against the plan",
    ],
    howItWorks:
      "Frequency, format and scope are agreed in advance and can be reviewed. Each session builds on the previous one so that learning is based on a written record.",
    expect: [
      "Continuity between conversations",
      "Consistent preparation and review habits",
      "Clear boundaries on what is and is not included",
    ],
    limits:
      "Ongoing guidance does not include discretionary management of funds or guaranteed outcomes. It is offered only within the scope the consultancy is permitted to provide.",
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
