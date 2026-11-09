import type { Article } from "./types";

/**
 * To publish a new article, add an object to this array. Listings, article
 * pages, category pages, related articles, the sitemap, structured data and
 * llms.txt all update automatically.
 *
 * Only publish original, reviewed content. Do not add live market commentary
 * or performance claims unless they have been verified.
 */
export const articles: Article[] = [
  {
    slug: "why-risk-planning-matters",
    title: "Why risk planning belongs before the trade",
    excerpt:
      "A trading idea is incomplete until the downside, the invalidation point and the possible exposure have been considered.",
    category: "risk-awareness",
    publishedAt: "2026-11-08",
    sections: [
      {
        paragraphs: [
          "A market view describes what may happen. A risk plan describes what you will do when the market behaves differently. When the two are treated as separate questions, a trader can end up with an attractive thesis and no practical response to an adverse move.",
        ],
      },
      {
        heading: "Start from the downside",
        paragraphs: [
          "Most people begin with the idea and add risk at the end, if at all. Reversing the order changes the quality of the decision. If you first ask what would prove the idea wrong and what that would cost, you are forced to be specific about both.",
          "Before taking exposure, it helps to be able to answer a short list of questions in writing.",
        ],
        list: [
          "What observable event would invalidate this idea?",
          "How much am I prepared to lose if it does, and how does that relate to my total capital?",
          "What happens to the position if there is a gap or a sudden rise in volatility?",
          "How does this position overlap with exposure I already hold?",
        ],
      },
      {
        heading: "Planning is not prediction",
        paragraphs: [
          "The purpose of a risk plan is not to forecast every outcome. It is to understand the range of outcomes you may face and decide, in advance and calmly, what level of risk is acceptable.",
          "A plan made before the trade is almost always clearer than a decision made during one. Fear and hope both distort judgement once money is at stake, which is why the answers are better written down early.",
        ],
      },
      {
        heading: "What a plan cannot do",
        paragraphs: [
          "Risk planning reduces surprises. It does not remove loss, and it does not make any individual trade a good one. Gaps, illiquidity and fast markets can all cause outcomes worse than the plan assumed. The honest version of a risk plan says so.",
        ],
      },
    ],
  },
  {
    slug: "reading-market-context",
    title: "Reading market context beyond a single chart pattern",
    excerpt:
      "Price structure, volume, volatility and the wider environment give context that no single signal can supply on its own.",
    category: "market-research",
    publishedAt: "2026-11-08",
    sections: [
      {
        paragraphs: [
          "A chart pattern is one piece of market information. The same pattern can behave differently depending on trend, volatility, liquidity, scheduled events and the timeframe being considered. Treating it as a standalone signal discards most of what matters.",
        ],
      },
      {
        heading: "Begin with structure",
        paragraphs: [
          "A fuller review starts wide. Identify the broader structure on a higher timeframe, mark the price areas that have mattered before, and note whether the market is trending, ranging or changing character. A pattern on a lower timeframe means something different inside each of those settings.",
        ],
      },
      {
        heading: "Add participation and volatility",
        paragraphs: [
          "Volume and volatility describe how many people are involved and how much the price is moving. A move on thin participation tells a different story from the same move on heavy participation. Likewise, a calm market and a fast one call for different expectations of how far price can travel against you.",
        ],
        list: [
          "Is the move supported by broad participation or confined to a narrow window?",
          "Is volatility rising or falling compared with recent history?",
          "Are there scheduled events nearby that could change the context?",
        ],
      },
      {
        heading: "Ask what would change the view",
        paragraphs: [
          "Good analysis names its own weak points. For each reading, note what would confirm it and what would weaken it, then watch for those things instead of looking for reasons to keep the original view.",
          "No indicator or chart layout predicts the future with certainty. Research is useful when it helps organise evidence, define scenarios and make uncertainty easier to see.",
        ],
      },
    ],
  },
  {
    slug: "building-a-trading-process",
    title: "What makes a trading process more consistent?",
    excerpt:
      "Consistency begins with repeatable preparation, documented reasoning and a review process that is honest about mistakes.",
    category: "trading-process",
    publishedAt: "2026-11-08",
    sections: [
      {
        paragraphs: [
          "A repeatable process gives every decision a common structure. It may include market preparation, a written thesis, entry conditions, risk limits, an exit plan and a review afterwards. None of these guarantees a good result. Together they make decisions easier to evaluate.",
        ],
      },
      {
        heading: "Write the reasoning down",
        paragraphs: [
          "When the thesis and the risk are recorded before the trade, you can later tell the difference between a poor process and a reasonable plan that produced an unfavourable outcome. Without a record, memory fills the gap, and memory tends to flatter the person remembering.",
        ],
      },
      {
        heading: "Make review specific",
        paragraphs: [
          "Review is where a process improves, and it only works when it is concrete. Compare what you knew at the time with what happened afterwards, and ask whether the plan was followed.",
        ],
        list: [
          "What was known when the decision was made?",
          "What changed afterwards, and was it foreseeable?",
          "Was the plan followed, and if not, why not?",
          "What is one specific thing to change next time?",
        ],
      },
      {
        heading: "Judge decisions, not just results",
        paragraphs: [
          "A good decision can lose money and a careless one can get lucky. Judging every decision only by profit or loss teaches the wrong lessons. A consistent process keeps attention on the quality of reasoning, which is the part within your control.",
        ],
      },
    ],
  },
];
