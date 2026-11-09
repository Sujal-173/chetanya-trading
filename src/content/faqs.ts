export type Faq = { question: string; answer: string; detail: string };

/**
 * Visible FAQ content. The same data feeds the on-page accordion and the
 * FAQPage structured data so the markup always matches what visitors can read.
 */
export const faqs: Faq[] = [
  {
    question: "What does a trading consultancy do?",
    answer:
      "A trading consultancy helps market participants think through their trading decisions. It does not trade on their behalf.",
    detail:
      "That usually means reviewing market conditions, discussing a trader's process and strategy, and looking carefully at risk. The consultant's role is to ask good questions and give a considered perspective. The decision, and the responsibility for it, stays with the trader.",
  },
  {
    question: "What services does CHAITANYA Trading Consultancy provide?",
    answer:
      "We offer market research and analysis, trading consultation, strategy discussion and a risk management perspective.",
    detail:
      "Each service is a discussion-based engagement. We explain what it covers, how it works and what it cannot do before you commit to anything. The Services page sets this out in full.",
  },
  {
    question: "How does the consultation process work?",
    answer:
      "It follows four steps: understand your objectives, analyse market conditions, discuss scenarios and risks, and review the approach.",
    detail:
      "You start by sending an enquiry. We reply to confirm what you would like to discuss and what a consultation can cover. Nothing is started until the scope is clear to both sides.",
  },
  {
    question: "Why is risk management important?",
    answer:
      "Because a trading idea is incomplete until you know what you will do if it is wrong.",
    detail:
      "Markets can move against any view. Deciding in advance how much you are willing to lose, and what would invalidate the idea, makes decisions calmer and easier to review. It does not remove the possibility of loss.",
  },
  {
    question: "Does the consultancy guarantee profits or returns?",
    answer:
      "No. No method, view or discussion can guarantee profit or remove the risk of loss.",
    detail:
      "We do not publish performance figures and we do not promise outcomes. Trading and investing involve risk, including the loss of capital.",
  },
  {
    question: "How can someone contact the consultancy?",
    answer:
      "Send an enquiry through the form on the Contact page or the Discuss your requirements button.",
    detail:
      "Your enquiry is saved to our enquiry records and reviewed by our team. Any phone or email details we publish appear on the Contact page.",
  },
];
