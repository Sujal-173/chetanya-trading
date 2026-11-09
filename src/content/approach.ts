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
    title: "Understand",
    summary: "Start with your objectives and requirements.",
    detail:
      "Every conversation begins with you. We ask what you trade, over what time horizon, and what you want from the discussion. We also agree what is outside its scope.",
    points: [
      "Your objectives and constraints",
      "How you currently reach decisions",
      "The scope of the consultation",
    ],
  },
  {
    number: "02",
    title: "Analyse",
    summary: "Review market conditions and the information available.",
    detail:
      "We look at observable information: structure, volatility, participation and scheduled events. The aim is to separate what is known from what is assumed.",
    points: [
      "Market structure and context",
      "Relevant events and developments",
      "Gaps in the available information",
    ],
  },
  {
    number: "03",
    title: "Discuss",
    summary: "Explain observations, possible scenarios and risks.",
    detail:
      "We explain what we see and why, set out more than one scenario, and spend as much time on what could go wrong as on what could go right.",
    points: [
      "Scenarios, including adverse ones",
      "The risks attached to each",
      "Questions worth answering before acting",
    ],
  },
  {
    number: "04",
    title: "Review",
    summary: "Discuss the approach and the considerations that matter.",
    detail:
      "We go back over the reasoning and the process, not only the result. A good decision can have a poor outcome, and a poor decision can be lucky.",
    points: [
      "What was known at the time",
      "Whether the plan was followed",
      "What can reasonably be improved",
    ],
  },
];
