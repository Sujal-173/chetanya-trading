export type Faq = { question: string; answer: string; detail: string };

/** Shared by the visible FAQ and its structured data. */
export const faqs: Faq[] = [
  {
    question: "What can I discuss with CHAITANYA Trading Consultancy?",
    answer:
      "You can enquire about market research, your trading process, a strategy you already use or the risks around an idea.",
    detail:
      "The conversation depends on the question you bring. We will first understand what you want to discuss and confirm the scope. The service is discussion-based; it is not a direction to buy, sell or hold a security.",
  },
  {
    question: "Do you provide trading tips or buy and sell signals?",
    answer:
      "No. We do not sell trading tips or signals, and we do not ask clients to follow a market view without understanding it.",
    detail:
      "The aim is to talk through market information, assumptions and possible scenarios. You remain responsible for deciding what to do with that information.",
  },
  {
    question: "How do I arrange a consultation?",
    answer:
      "Send an enquiry through the contact form and tell us what you would like to discuss.",
    detail:
      "We review the details you share and get back to you using your preferred contact method. We will confirm the proposed scope before anything is agreed. Sending an enquiry does not create an obligation to proceed.",
  },
  {
    question: "Can you review a trading strategy I already use?",
    answer:
      "You can ask for a discussion about the logic, assumptions and risk considerations behind your approach.",
    detail:
      "We can talk through the conditions your method depends on, the situations it may not suit and the questions worth checking against your own records. We do not certify a strategy or claim that it will be profitable.",
  },
  {
    question: "Do you guarantee profits or trading results?",
    answer:
      "No. Trading involves risk, and losses are possible. No market view or discussion can guarantee a result.",
    detail:
      "Past performance does not establish future results. We do not promise a return, a success rate or the removal of risk. Read the risk disclosure before relying on information from this website.",
  },
  {
    question: "Do you manage funds or place trades for clients?",
    answer:
      "No. The services described on this website do not include managing client money or placing trades on another person's behalf.",
    detail:
      "Any trading or investment decision remains your responsibility. The information on this website is general in nature and should not be treated as personalised investment advice.",
  },
];
