import type { ArticleCategoryId } from "./types";

export const articleCategories: Record<
  ArticleCategoryId,
  { label: string; description: string }
> = {
  "risk-awareness": {
    label: "Risk awareness",
    description:
      "How to think about downside, invalidation and exposure before taking a trade.",
  },
  "market-research": {
    label: "Market research",
    description:
      "How to read market context without leaning on a single signal.",
  },
  "trading-process": {
    label: "Trading process",
    description:
      "Preparation, documentation and review habits that make decisions easier to evaluate.",
  },
};
