import type { Article } from "./types";

/** Add only original, reviewed articles. Do not publish unverified performance claims or live market calls. */
export const articles: Article[] = [
  {
    slug: "why-risk-planning-matters",
    title: "Why it helps to think about risk before a trade",
    excerpt:
      "Before focusing on a possible gain, take a moment to define the downside and the conditions that would change your mind.",
    category: "risk-awareness",
    publishedAt: "2026-11-08",
    sections: [
      {
        paragraphs: [
          "It is natural to notice the opportunity first. A chart looks interesting, a level is approaching or a piece of news has caught your attention. But an idea is not ready to assess until you have also considered what happens if the market moves the other way.",
        ],
      },
      {
        heading: "Write down what would change your mind",
        paragraphs: [
          "An invalidation point is not just a line on a chart. It is the condition that tells you the original reasoning may no longer hold. Defining it early can help you avoid changing the rules in the middle of a trade.",
          "Before taking exposure, make sure you can answer a few basic questions:",
        ],
        list: [
          "What would show that the original idea is no longer valid?",
          "How much could be lost, and how does that fit with the rest of your exposure?",
          "What might happen if price gaps or volatility rises suddenly?",
          "Are there other positions that could be affected by the same move?",
        ],
      },
      {
        heading: "A plan is not a prediction",
        paragraphs: [
          "Planning cannot tell you exactly what will happen. It helps you decide in advance how you will respond to a range of possibilities, rather than trying to make every decision under pressure.",
          "The amount of risk you can accept depends on your own circumstances. It should not be chosen simply because a chart looks attractive.",
        ],
      },
      {
        heading: "Be realistic about the limits",
        paragraphs: [
          "Stops can slip, liquidity can change and unexpected events can move prices quickly. A risk plan does not guarantee a maximum loss or make a trade safe. It is one part of a decision, and the possibility of loss remains.",
        ],
      },
    ],
  },
  {
    slug: "reading-market-context",
    title: "Look beyond a single chart pattern",
    excerpt:
      "A familiar pattern can mean different things in different conditions. The surrounding market context matters.",
    category: "market-research",
    publishedAt: "2026-11-08",
    sections: [
      {
        paragraphs: [
          "A chart pattern can be useful, but it rarely tells the whole story. The same formation may behave differently in a strong trend, a narrow range or a market reacting to important news. Looking at the pattern alone can leave out details that matter.",
        ],
      },
      {
        heading: "Start with the wider picture",
        paragraphs: [
          "Before focusing on a short-term setup, look at the broader timeframe. Note the current structure, the price areas that have mattered and whether the market appears to be trending, ranging or changing direction. The aim is to understand the setting in which the pattern has appeared.",
        ],
      },
      {
        heading: "Notice participation and volatility",
        paragraphs: [
          "Trading activity and volatility add useful context. A price move on light activity may deserve a different interpretation from one accompanied by a sharp increase in participation. A fast market can also behave differently from a quiet one.",
        ],
        list: [
          "Is the move broad-based or limited to a short period?",
          "Has volatility changed compared with recent sessions?",
          "Are there scheduled events that could affect the market?",
        ],
      },
      {
        heading: "Keep an open mind",
        paragraphs: [
          "A good review considers what could support the current reading and what could weaken it. That is more useful than searching only for evidence that confirms the first impression.",
          "No pattern or indicator can predict the next move with certainty. Context helps organise the available information; it does not remove uncertainty.",
        ],
      },
    ],
  },
  {
    slug: "building-a-trading-process",
    title: "Small habits that make a trading process easier to review",
    excerpt:
      "Preparation, written reasoning and an honest review can make decisions easier to understand over time.",
    category: "trading-process",
    publishedAt: "2026-11-08",
    sections: [
      {
        paragraphs: [
          "A trading process does not need to be complicated. It needs to be clear enough that you can explain why you considered a trade, what would make you act and what would make you step away.",
        ],
      },
      {
        heading: "Use the same preparation questions",
        paragraphs: [
          "A short checklist can keep preparation from becoming random. The details will differ from trader to trader, but the questions should be familiar each time.",
        ],
        list: [
          "What is the broader market doing?",
          "What is the reason for considering this trade now?",
          "Which conditions need to be present before acting?",
          "What is the risk, and what would invalidate the idea?",
          "What would make you avoid the trade altogether?",
        ],
      },
      {
        heading: "Record the reasoning, not just the result",
        paragraphs: [
          "A journal is more useful when it captures what you knew at the time. Note the market context, the reason for the decision, the planned risk and any change you made. A screenshot or a short note can be enough if it is consistent.",
        ],
      },
      {
        heading: "Review without rewriting history",
        paragraphs: [
          "After the trade, compare the decision with the plan. A losing trade is not automatically a bad decision, and a profitable trade is not proof that the process was sound. Look for repeated patterns in your preparation and execution, then decide what is worth changing.",
          "A process will not make every outcome favourable. Its value is that it gives you something concrete to examine and improve.",
        ],
      },
    ],
  },
];
