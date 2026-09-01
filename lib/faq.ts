export type FaqParagraph = {
  type: "paragraph";
  text: string;
  href?: "/pricing/" | "/integrations/kisi/";
};

export type FaqList = {
  type: "list";
  items: readonly string[];
};

export type FaqContent = FaqParagraph | FaqList;

export type FaqItem = {
  question: string;
  content: readonly FaqContent[];
};

export const faqItems = [
  {
    question: "Do we have to sign a lock-in contract?",
    content: [
      {
        type: "paragraph",
        text: "No. Movena is month to month. Either side can end the agreement with 30 days’ notice, effective at the end of the billing period already paid for.",
      },
      {
        type: "paragraph",
        text: "We’d rather earn the next month than hold you to the next year.",
      },
    ],
  },
  {
    question: "What happens to the members and data we already have?",
    content: [
      {
        type: "paragraph",
        text: "You won’t start from scratch. Send us an export from your current software and we’ll help bring across your members, memberships and contact details.",
      },
      {
        type: "paragraph",
        text: "Every platform structures its export differently, so we’ll work through it with you—not hand you a template and wish you luck.",
      },
    ],
  },
  {
    question: "How do members pay?",
    content: [
      {
        type: "paragraph",
        text: "Members can pay by card, BECS direct debit or PayTo. You choose which methods to offer.",
      },
      {
        type: "paragraph",
        text: "Payments settle into your own Stripe account—not a Movena account you need to withdraw from. Stripe sets its processing fees and discloses them in your Stripe account.",
      },
      {
        type: "paragraph",
        text: "You’ll find Movena plan pricing on our pricing page.",
        href: "/pricing/",
      },
    ],
  },
  {
    question: "Do our members get a real app?",
    content: [
      {
        type: "paragraph",
        text: "Yes. Movena has a native app on the App Store and Google Play. Members can book classes, check in at the door, follow their training and buy merchandise from their phone.",
      },
    ],
  },
  {
    question: "Can Movena open our doors—and who do we buy the hardware from?",
    content: [
      {
        type: "paragraph",
        text: "Movena connects memberships to Kisi door access. When a membership lapses, access ends automatically—no door list to update.",
      },
      {
        type: "paragraph",
        text: "Here’s who supplies what:",
      },
      {
        type: "list",
        items: [
          "You buy the Kisi hardware and Kisi subscription directly from Kisi. Movena does not resell them, mark them up or take part in that agreement.",
          "Your Kisi account belongs to you. Installation, hardware warranty and door support sit between you, Kisi and your installer.",
          "Movena charges its own Access Control add-on for the integration and the day-to-day automation.",
        ],
      },
      {
        type: "paragraph",
        text: "That means two suppliers and two bills. It’s deliberate: your doors continue to work on their own terms, even if you stop using Movena. We’d rather tell you now than have you discover it in a quote.",
      },
      {
        type: "paragraph",
        text: "Movena does not specify or recommend hardware. Kisi and your installer will tell you what your doors need.",
      },
    ],
  },
  {
    question: "Can Movena support a 24/7 gym with no reception?",
    content: [
      {
        type: "paragraph",
        text: "Yes—when Movena is connected to Kisi and the rest of your physical-security setup is designed for unstaffed operation. Movena can grant an enrolled member facility access from an eligible active membership, or time-bounded access from an eligible booking. Membership cancellations and expiries remove access when the entitlement ends, and an access suspension prevents entry until it is lifted—so reception does not maintain a separate door list.",
      },
      {
        type: "paragraph",
        text: "Movena does not replace access-control hardware or the safety systems required to operate an unstaffed facility. Kisi remains authoritative for doors, hardware, opening schedules and physical access restrictions.",
      },
      {
        type: "list",
        items: [
          "You purchase the Kisi hardware and subscription directly from Kisi, and Kisi and your installer specify and configure the physical access setup.",
          "You remain responsible for emergency access, monitoring, incident response, insurance and the legal and safety obligations that apply to your facility.",
          "Movena’s Access Control add-on manages membership and booking eligibility and the day-to-day access automation.",
        ],
      },
      {
        type: "paragraph",
        text: "That can make reception optional for routine access administration. It does not make Movena a substitute for a complete unstaffed-gym security and operating plan.",
      },
      {
        type: "paragraph",
        text: "See how Movena and Kisi divide responsibility for software, access and hardware.",
        href: "/integrations/kisi/",
      },
    ],
  },
  {
    question: "Is Movena just bookings and billing?",
    content: [
      {
        type: "paragraph",
        text: "No. Bookings and billing are the foundation, not the whole product.",
      },
      {
        type: "paragraph",
        text: "Coaches build workouts and programs in Movena, and they arrive in the member app. Members follow the programming you write—not a whiteboard photo or a PDF that gets forgotten.",
      },
      {
        type: "paragraph",
        text: "Members keep their own training history alongside it: what they lifted, when they last did it and when they beat it. That record gives them a reason to return to the app between classes.",
      },
      {
        type: "paragraph",
        text: "Challenges use the same data. Choose a goal and a date range, and scoring runs from check-ins and logged sessions—no spreadsheet on the wall and no manual tallying.",
      },
    ],
  },
  {
    question: "Do we still need a separate tool for tracking leads?",
    content: [
      {
        type: "paragraph",
        text: "Probably not. Add a Movena enquiry form to your website and submissions go straight to your Leads page—no exports and nothing sitting in an inbox.",
      },
      {
        type: "paragraph",
        text: "From there, a lead moves through your pipeline to a trial and then to membership. You do not need to retype anything they have already told you.",
      },
      {
        type: "paragraph",
        text: "Keep your mailing tool for newsletters. If you are paying for a CRM to track people who have not joined yet, that is the part Movena replaces.",
      },
    ],
  },
  {
    question: "Where is our data, and who owns it?",
    content: [
      {
        type: "paragraph",
        text: "Your gym’s data is yours. It is hosted in Sydney, Australia. Movena is subject to the Australian Privacy Act, and our privacy policy explains how we handle personal information.",
      },
      {
        type: "paragraph",
        text: "You can export your data at any time. If you leave Movena, you take it with you.",
      },
    ],
  },
] as const satisfies readonly FaqItem[];

export function faqAnswerText(item: FaqItem): string {
  return item.content
    .flatMap((section) =>
      section.type === "paragraph" ? [section.text] : section.items,
    )
    .join(" ");
}
