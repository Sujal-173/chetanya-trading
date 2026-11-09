export type ApproachStep = {
  number: string;
  title: string;
  summary: string;
  detail: string;
  points: string[];
};

export const approachSteps: ApproachStep[] = [
  {
    number: "01",
    title: "Understand the question",
    summary: "Start with what you want to work through.",
    detail:
      "We begin by understanding the market or method you have in mind, the decision you are considering and what you want from the conversation. We also agree on the limits of the discussion.",
    points: [
      "The market, instrument or strategy you want to discuss",
      "Your current approach and the question behind it",
      "What the consultation can reasonably cover",
    ],
  },
  {
    number: "02",
    title: "Review the information",
    summary: "Look at the context before forming a view.",
    detail:
      "We review the information relevant to your question. This may include price structure, volatility, trading activity, timeframes and scheduled events. We distinguish what is visible from what is assumed.",
    points: [
      "The wider market and relevant timeframes",
      "Price areas, volatility and participation",
      "Information that is missing or still uncertain",
    ],
  },
  {
    number: "03",
    title: "Talk through the possibilities",
    summary: "Consider different outcomes and the risks involved.",
    detail:
      "We explain the observations and discuss more than one possible scenario. That includes the conditions that could support the idea and the developments that could weaken or invalidate it.",
    points: [
      "The reasoning behind the current view",
      "Alternative and adverse scenarios",
      "The risks and questions to consider before acting",
    ],
  },
  {
    number: "04",
    title: "Review the process",
    summary: "Leave with clearer questions and a basis for review.",
    detail:
      "We revisit the assumptions and the decision process so you can see what deserves further attention. The purpose is not to judge a trade only by its result, but to understand how the decision was made.",
    points: [
      "What was known when the decision was considered",
      "Which parts of the plan were followed or changed",
      "What you may want to record and review next time",
    ],
  },
];
