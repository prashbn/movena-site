export type FeatureQuestion = { question: string; answer: string };

export const crmQuestions: readonly FeatureQuestion[] = [
  {
    question: "Where can enquiries come from?",
    answer: "Your website form, Facebook and Instagram lead ads, and Google lead forms. Enquiries arrive in Movena for your team to follow up.",
  },
  {
    question: "Who approves a follow-up email?",
    answer: "You or the person following up reads, edits and approves the draft before anything is sent. Optional drafting uses approved gym facts and may include a screened latest email reply. Enquiry form answers are not used for drafting.",
  },
  {
    question: "What happens when a follow-up is overdue?",
    answer: "Each lead has a next step and a due time. Movena reminds the right person and escalates an overdue follow-up to you.",
  },
  {
    question: "Can I see the funnel for each location?",
    answer: "Yes. See contacted, trialled, converted and lost by location. Replies come back into the lead, so your team can pick up the conversation with its context.",
  },
];

export const multiLocationQuestions: readonly FeatureQuestion[] = [
  {
    question: "Can I start with one location?",
    answer: "Yes. Start with one location and add the next to the same Movena account. Keep your data as you grow, choosing the plan that fits your locations and capabilities.",
  },
  {
    question: "Can managers see only their own locations?",
    answer: "Yes. Managers can be scoped to the locations they run. Roles and location access keep managers and staff working with the information they need, while you retain the view across your business.",
  },
  {
    question: "Which numbers can I see by location?",
    answer: "Financials and the lead funnel are available by location. You can also see sessions run, bookings against capacity, attendance and cancellations by location and coach. Reporting capabilities depend on your plan.",
  },
  {
    question: "Can each location use Kisi door access?",
    answer: "Kisi door access is an optional add-on. Each site needs Kisi hardware. Access follows memberships, bookings and overdue status, with the payment grace period you set. Hardware and Kisi subscriptions are purchased separately.",
  },
];
