export type BlogSection = {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type BlogSource = {
  label: string;
  publisher: string;
  url: string;
};

export type BlogPost = {
  slug: string;
  category:
    | "Wellbeing"
    | "Strength"
    | "Performance"
    | "Operations"
    | "Payments"
    | "Retention"
    | "Buying guide";
  title: string;
  description: string;
  excerpt: string;
  published: string;
  publishedLabel: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  introduction: readonly string[];
  sections: readonly BlogSection[];
  safetyNote: string;
  sources: readonly BlogSource[];
};

export const blogPosts = [
  {
    slug: "movement-and-mental-health",
    category: "Wellbeing",
    title: "Movement and mental health: a practical, pressure-free guide",
    description:
      "A practical guide to using everyday movement to support mental wellbeing without turning exercise into another source of pressure.",
    excerpt:
      "Movement can support mood, sleep and connection. It does not need to be intense, perfect or measured to count.",
    published: "2026-08-31",
    publishedLabel: "31 August 2026",
    readingTime: "6 minute read",
    image: "/assets/photos/after-session-1800.jpg",
    imageAlt:
      "Three gym members sitting together and talking after a training session",
    introduction: [
      "Movement can be one useful part of looking after mental wellbeing. It can create a change of scene, a point of connection and a little more structure in the day. It is not a cure, and it should not become another standard you have to meet.",
      "The most useful starting point is usually not the hardest session. It is the form of movement you can return to with the least friction.",
    ],
    sections: [
      {
        heading: "Start with the smallest useful dose",
        paragraphs: [
          "When energy or motivation is low, a full workout can feel impossibly far away. Shrink the task. A short walk, a few minutes outside, an easy mobility sequence or arriving at the gym just to warm up can be enough for today.",
          "Starting slowly in a setting that feels comfortable is consistent with Healthdirect guidance. Enjoyment matters too: an activity you do willingly is more useful than an ideal plan you avoid.",
        ],
        bullets: [
          "Choose a time and place that feels predictable.",
          "Make the first step very small: shoes on, one song, one lap or one exercise.",
          "Stop while the experience still feels manageable.",
        ],
      },
      {
        heading: "Use movement for connection, not punishment",
        paragraphs: [
          "Training beside other people can add routine and social contact even when nobody talks about mental health. A familiar class, coach or walking partner may make showing up easier.",
          "Try to avoid using exercise to make up for food, a missed session or a difficult day. A supportive routine leaves room for rest and does not turn your body into a problem to solve.",
        ],
      },
      {
        heading: "Notice what changes",
        paragraphs: [
          "You do not need a perfect streak or a dashboard of numbers. Pay attention to simple signals: whether you feel a little calmer after moving, sleep more easily, enjoy being around people, or find it easier to begin the next task.",
          "If a type of training reliably leaves you more anxious, depleted or preoccupied, that is useful information. Change the intensity, the environment or the activity rather than forcing the same plan.",
        ],
      },
      {
        heading: "Movement is support, not a replacement for care",
        paragraphs: [
          "Exercise can sit alongside professional mental-health care, medication, sleep, relationships and practical support. It should not be presented as a substitute for treatment.",
          "If distress is persistent, worsening or affecting daily life, speak with a GP or qualified mental-health professional. If you need immediate help in Australia, call 000. Lifeline is available on 13 11 14 and Beyond Blue on 1300 22 4636.",
        ],
      },
    ],
    safetyNote:
      "General information only. This article is not medical advice and movement is not a substitute for mental-health care. Choose an activity appropriate for you and seek professional support when you need it.",
    sources: [
      {
        label: "Exercise and mental health",
        publisher: "Healthdirect Australia",
        url: "https://www.healthdirect.gov.au/exercise-and-mental-health",
      },
      {
        label: "Recommendations for adults aged 18 to 64",
        publisher: "Australian Government Department of Health, Disability and Ageing",
        url: "https://www.health.gov.au/topics/physical-activity/24-hour-movement-guidelines-for-all-australians/recommendations-for-adults-18-to-64-years",
      },
    ],
  },
  {
    slug: "strength-training-for-everyday-movement",
    category: "Strength",
    title: "Strength training for everyday movement",
    description:
      "A beginner-friendly approach to building useful strength for lifting, carrying, climbing and moving with confidence.",
    excerpt:
      "Build strength around the movements daily life asks for: standing, lifting, pushing, pulling, carrying and staying steady.",
    published: "2026-08-31",
    publishedLabel: "31 August 2026",
    readingTime: "7 minute read",
    image: "/assets/photos/coaching-1254w.jpg",
    imageAlt: "A coach guiding a gym member through a strength exercise",
    introduction: [
      "Useful strength is not limited to a barbell total. It is the capacity to get up from a chair, carry awkward bags, climb stairs, lift something from the floor and keep doing the activities you enjoy.",
      "Strength training uses resistance from body weight, bands, machines or free weights. The best starting method is the one you can perform safely, control and repeat consistently.",
    ],
    sections: [
      {
        heading: "Train patterns, not just body parts",
        paragraphs: [
          "A balanced beginner program can be organised around a few broad movement patterns. The exact exercise matters less than finding a version that suits your current ability and equipment.",
        ],
        bullets: [
          "Sit and stand: a squat to a box, chair sit-to-stand or leg press.",
          "Hinge and lift: a light deadlift pattern or hip hinge.",
          "Push and pull: a wall push-up, machine press, cable row or band row.",
          "Carry and brace: a comfortable carry, supported hold or controlled trunk exercise.",
          "Step and balance: a low step-up or another stable single-leg pattern.",
        ],
      },
      {
        heading: "Keep the first sessions simple",
        paragraphs: [
          "Choose four to six movements and use a resistance that lets you move with control. One or two comfortable sets can be a perfectly reasonable beginning. Finish with the sense that you could have done a little more.",
          "Australian movement guidelines recommend muscle-strengthening activity on two or more days each week for adults. That is a population-level guide, not a demand to train hard every second day. Recovery, experience and health all affect what is appropriate.",
        ],
      },
      {
        heading: "Progress one thing at a time",
        paragraphs: [
          "Progress does not always mean adding weight. You might use a slightly larger range of motion, add a controlled repetition, improve balance, or perform the same work with more confidence.",
          "Small changes make it easier to understand how your body responds. If every variable changes at once, it is harder to tell what helped and what was too much.",
        ],
      },
      {
        heading: "Know when to adjust",
        paragraphs: [
          "Muscles may feel tired after unfamiliar work, but sharp pain, dizziness, chest pain or a sudden loss of function are not signals to push through. Stop and seek appropriate medical advice.",
          "If you are returning after injury, live with a chronic condition, are pregnant, or are unsure where to start, a GP, physiotherapist or accredited exercise professional can help tailor the plan.",
        ],
      },
      {
        heading: "Consistency is the useful metric",
        paragraphs: [
          "A modest session repeated across months usually offers more than an ambitious session that makes the next week impossible. Record enough to remember what you did, then look for gradual improvement rather than constant personal records.",
        ],
      },
    ],
    safetyNote:
      "General information only. This is not an individual exercise prescription. Start with manageable resistance and seek qualified guidance if you have pain, an injury, a health condition or concerns about beginning strength training.",
    sources: [
      {
        label: "Strength training for beginners",
        publisher: "Healthdirect Australia",
        url: "https://www.healthdirect.gov.au/strength-training-for-beginners",
      },
      {
        label: "Recommendations for adults aged 18 to 64",
        publisher: "Australian Government Department of Health, Disability and Ageing",
        url: "https://www.health.gov.au/topics/physical-activity/24-hour-movement-guidelines-for-all-australians/recommendations-for-adults-18-to-64-years",
      },
    ],
  },
  {
    slug: "how-to-fuel-for-hyrox",
    category: "Performance",
    title: "How to fuel for HYROX training and race day",
    description:
      "A food-first, practical guide to fuelling HYROX training and race day without relying on complicated supplement stacks.",
    excerpt:
      "Match food and fluids to the work, practise the plan in training, and keep race day familiar.",
    published: "2026-08-31",
    publishedLabel: "31 August 2026",
    readingTime: "8 minute read",
    image: "/assets/photos/kettlebell-carry-1000.jpg",
    imageAlt: "An athlete carrying kettlebells during a gym training session",
    introduction: [
      "HYROX alternates eight one-kilometre runs with eight functional workout stations. That mix asks for sustained running, repeated high-force efforts and the ability to keep working when fatigue accumulates.",
      "There is no single perfect menu. Body size, pace, race duration, climate, gut tolerance and dietary needs all change the plan. The safest useful principle is to practise a simple food-and-fluid routine during training before relying on it on race day.",
    ],
    sections: [
      {
        heading: "Build the everyday base first",
        paragraphs: [
          "Regular meals do more of the work than a last-minute supplement. Include carbohydrate-rich foods to support running and hard sessions, protein-containing foods across the day for recovery, and a varied mix of fruit, vegetables, grains and other foods you tolerate well.",
          "Training with too little energy can make quality work and recovery harder. If you are frequently exhausted, losing weight unintentionally, getting recurrent injuries or noticing changes in menstrual function, seek advice from a GP or Accredited Sports Dietitian.",
        ],
      },
      {
        heading: "Before a demanding session",
        paragraphs: [
          "For key sessions, arrive having eaten rather than trying to rescue the workout halfway through. A familiar meal a few hours beforehand can centre on carbohydrate, include some protein and avoid unusually large amounts of fat, fibre or spice if those upset your stomach.",
          "If the last meal was early, a smaller familiar snack closer to training may help. Test timing and portions during ordinary sessions; gut comfort is part of preparation.",
        ],
        bullets: [
          "Porridge with banana and yoghurt.",
          "Toast with eggs and fruit.",
          "Rice or pasta with a familiar lean protein.",
          "A simple sandwich, fruit or cereal-based snack when less time is available.",
        ],
      },
      {
        heading: "During longer or harder work",
        paragraphs: [
          "Water may be enough for many shorter sessions. During longer, hotter or more demanding work, some athletes benefit from fluid that also provides carbohydrate and electrolytes. The Australian Institute of Sport notes that sports drinks are designed to provide fluid and carbohydrate together, but that does not make them necessary for every session.",
          "Practise with the exact product and amount you intend to use. More is not automatically better, and trying an unfamiliar gel or concentrated drink on race day is an avoidable gamble.",
        ],
      },
      {
        heading: "Race morning: familiar beats clever",
        paragraphs: [
          "Use a pre-race meal you have already tolerated before a race-specific training session. Leave enough time to feel comfortable at the start, then use a small familiar top-up only if you know it works for you.",
          "Start normally hydrated rather than drinking excessive amounts at once. Your plan should account for venue temperature, expected race time and access to aid stations. Individual sweat losses vary, so rigid fluid targets copied from another athlete can be unhelpful.",
        ],
      },
      {
        heading: "After training and racing",
        paragraphs: [
          "Begin recovery with a normal meal or snack that contains carbohydrate, protein and fluid. The goal is to restore energy, support adaptation and make the next meal easy—not to find a magical thirty-minute window.",
          "Supplements are optional, not the foundation. The AIS recommends a food-first approach and notes that supplement decisions should be made carefully. Athletes subject to anti-doping rules should be especially cautious and seek qualified advice.",
        ],
      },
    ],
    safetyNote:
      "General information only. This article is not personalised sports-nutrition or medical advice. An Accredited Sports Dietitian can tailor a plan for allergies, gastrointestinal problems, diabetes, eating-disorder history, performance goals or other individual needs.",
    sources: [
      {
        label: "The Fitness Race",
        publisher: "HYROX",
        url: "https://hyrox.com/the-fitness-race/",
      },
      {
        label: "Performance Nutrition HQ modules",
        publisher: "Australian Institute of Sport",
        url: "https://www.ais.gov.au/nutrition/performance-nutrition-hq-modules",
      },
      {
        label: "Athlete supplement resources",
        publisher: "Australian Institute of Sport",
        url: "https://www.ais.gov.au/nutrition/supplements/athlete-resources",
      },
      {
        label: "Low energy availability education",
        publisher: "Australian Institute of Sport",
        url: "https://www.ais.gov.au/fphi/education",
      },
    ],
  },
  {
    slug: "running-a-24-7-gym-without-reception",
    category: "Operations",
    title: "Running a 24/7 gym without a reception desk",
    description:
      "A practical guide to the boundary between membership software, Kisi access control and the wider safety setup required for an unstaffed gym.",
    excerpt:
      "Membership software can automate who is eligible to enter. It does not replace the doors, monitoring or operating plan around them.",
    published: "2026-09-02",
    publishedLabel: "2 September 2026",
    readingTime: "6 minute read",
    image: "/assets/photos/gym-floor-1600.jpg",
    imageAlt:
      "An open gym floor with racks, benches and a roller door between sessions",
    introduction: [
      "A 24/7 gym needs two systems to agree: the membership system decides who is eligible, and the physical access system decides whether the door opens. Treating those as the same system hides an important operational boundary.",
      "Movena connects eligible memberships and bookings to Kisi. That can remove the reception-managed door list, but it does not turn membership software into a complete security or unstaffed-facility plan.",
    ],
    sections: [
      {
        heading: "Start with the eligibility rule",
        paragraphs: [
          "Decide which memberships should include facility access, which locations they cover and whether a booking can create time-bounded access. The rule should be understandable before it is automated.",
          "With the Movena and Kisi connection, an enrolled member can receive access from an eligible active membership or booking. When the entitlement ends, the related access ends; suspending access prevents entry until it is restored.",
        ],
      },
      {
        heading: "Keep the door system authoritative",
        paragraphs: [
          "Kisi remains authoritative for doors, hardware, opening schedules and physical access restrictions. Movena supplies the membership and booking eligibility—it does not directly operate an electronic strike, turnstile or maglock.",
          "That separation is useful. A membership change can flow into access without your team maintaining another list, while door behaviour remains inside the system designed to manage it.",
        ],
      },
      {
        heading: "Know who supplies what",
        paragraphs: [
          "You purchase the Kisi hardware and Kisi subscription directly from Kisi. Installation, hardware warranty and door support sit between your business, Kisi and your installer. Movena charges separately for its Access Control integration and the day-to-day eligibility automation.",
        ],
        bullets: [
          "Ask Kisi and your installer to specify the hardware for each door.",
          "Document opening schedules, staff overrides and what happens during an outage.",
          "Test membership expiry, cancellation, suspension and booking-based access before relying on them.",
        ],
      },
      {
        heading: "Build the operating plan around the access path",
        paragraphs: [
          "Unstaffed access also requires decisions about emergency entry, incident response, monitoring, insurance, member conduct and the legal and safety obligations that apply to your facility. Those responsibilities remain with the gym operator and the relevant specialists.",
          "The practical goal is narrower and more valuable: routine eligibility should update without reception copying membership changes into a separate door list.",
        ],
      },
    ],
    safetyNote:
      "General information only. Access automation does not replace a site-specific security, safety, emergency-response or legal review. Kisi and your installer should specify the physical access setup for your facility.",
    sources: [
      {
        label: "Movena integration",
        publisher: "Kisi Marketplace",
        url: "https://www.getkisi.com/integrations/movena",
      },
      {
        label: "Movena setup guide",
        publisher: "Kisi Documentation",
        url: "https://docs.kisi.io/marketplace/fitness/movena/",
      },
      {
        label: "Frequently asked questions",
        publisher: "Movena",
        url: "https://movena.com.au/faq/",
      },
    ],
  },
  {
    slug: "australian-gym-software-migration-checklist",
    category: "Operations",
    title: "An Australian gym-software migration checklist",
    description:
      "A practical checklist for moving members, memberships and contact details without treating migration as a one-click export.",
    excerpt:
      "A clean migration starts with knowing what you have, what must move and who will verify it before the old system is switched off.",
    published: "2026-09-02",
    publishedLabel: "2 September 2026",
    readingTime: "7 minute read",
    image: "/assets/photos/front-desk-1000.jpg",
    imageAlt:
      "A staff member using a tablet while speaking with a member at a gym front desk",
    introduction: [
      "Changing gym software is not mainly a file-format problem. It is an operating change involving membership rules, future payments, staff habits and the records members expect you to retain.",
      "Every platform exports data differently. The safest approach is to agree the scope, inspect the real export and rehearse the transition before choosing a final cutover date.",
    ],
    sections: [
      {
        heading: "List the records that matter",
        paragraphs: [
          "Begin with members, contact details, membership status and the plans or packs attached to each person. Then identify attendance, waivers, payment references, notes and any other history your team needs after the move.",
          "Separate essential operational records from material you only need to archive. Moving everything without deciding how it will be used can create a new system full of old clutter.",
        ],
      },
      {
        heading: "Export early and inspect the real file",
        paragraphs: [
          "Request an export before the final week. Check whether dates, phone numbers, plan names and active or cancelled states are consistent. Look for duplicated people and values that only make sense inside the old platform.",
          "Movena asks for the export from your current software and helps bring members, memberships and contact details across. The shape of that help depends on the source data rather than a promise that every field maps automatically.",
        ],
      },
      {
        heading: "Rehearse the operating day",
        paragraphs: [
          "Use a small test set to check the activities staff perform most often: finding a member, checking them in, confirming a membership, viewing a booking and understanding what happens when a payment fails.",
        ],
        bullets: [
          "Nominate one person to approve the migrated totals and member counts.",
          "Document what staff should do in the old and new systems during the transition.",
          "Choose a quiet cutover window and keep a named rollback decision-maker available.",
        ],
      },
      {
        heading: "Keep the old system long enough to verify",
        paragraphs: [
          "Do not cancel access to the previous platform before you have checked the agreed records in the new one and completed any retention or export obligations. Record the final export date and store the archive with appropriate access controls.",
          "Tell members only what they need to know: when to use the new app, whether they need to take an action, and where to get help. A short, accurate message is better than a feature announcement during cutover.",
        ],
      },
    ],
    safetyNote:
      "General information only. Migration scope, privacy, financial records and retention obligations vary by business. Confirm your requirements before decommissioning an existing system.",
    sources: [
      {
        label: "Frequently asked questions",
        publisher: "Movena",
        url: "https://movena.com.au/faq/",
      },
      {
        label: "Privacy Policy",
        publisher: "Movena",
        url: "https://movena.com.au/legal/privacy/",
      },
      {
        label: "Australian Privacy Principles guidelines",
        publisher: "Office of the Australian Information Commissioner",
        url: "https://www.oaic.gov.au/privacy/australian-privacy-principles-guidelines",
      },
    ],
  },
  {
    slug: "card-becs-payto-for-gym-memberships",
    category: "Payments",
    title: "Card, BECS and PayTo for gym memberships",
    description:
      "A plain-language guide to the payment methods Australian gym owners can offer through Movena and the operational differences between them.",
    excerpt:
      "The useful question is not which payment method wins. It is which mix suits your members, cash flow and follow-up process.",
    published: "2026-09-02",
    publishedLabel: "2 September 2026",
    readingTime: "6 minute read",
    image: "/product-screenshots/movena-financials.png",
    imageAlt:
      "Movena Financials showing collected revenue, fees, payouts and revenue movement",
    introduction: [
      "Australian gyms can offer members card, BECS direct debit or PayTo through Movena. Each method can support recurring payments, but confirmation, member authorisation and failure handling are not identical.",
      "Payments settle into the gym’s own Stripe account. Stripe sets and discloses its processing fees; Movena’s published pricing separately states its platform administration fee on applicable Movena-processed payments.",
    ],
    sections: [
      {
        heading: "Card payments",
        paragraphs: [
          "Cards are familiar to members and usually provide quick confirmation. They can also expire or be replaced, so the operating question is how clearly failed payments appear and how your team follows them up.",
          "Compare the current Stripe fee and dispute settings in your own account rather than relying on an old screenshot or a fee quoted without context.",
        ],
      },
      {
        heading: "BECS direct debit",
        paragraphs: [
          "BECS Direct Debit lets an Australian customer authorise recurring debits from an Australian bank account. It is a delayed-notification method: Stripe notes that final success or failure can take several business days.",
          "The mandate and notification process matters. Make sure members understand the debit arrangement and that your team does not treat a processing payment as final before it is confirmed.",
        ],
      },
      {
        heading: "PayTo",
        paragraphs: [
          "PayTo lets a customer authorise a payment agreement through their bank app or online banking. Stripe describes it as an Australian real-time payment method that supports one-time and recurring payments, while still returning final payment status asynchronously.",
          "Eligibility and bank support can vary, so enable it based on what is available in your Stripe account and test the member experience before making it your default path.",
        ],
      },
      {
        heading: "Choose the mix, then design the follow-up",
        paragraphs: [
          "You do not have to force every member onto the same rail. Choose the methods you offer, explain them plainly and decide what staff do when a payment remains processing or fails.",
        ],
        bullets: [
          "Check current processing fees and settlement behaviour in Stripe.",
          "Keep mandate and member-notification requirements in the operating checklist.",
          "Make failed payments visible to the team responsible for follow-up.",
          "Reconcile with exports that are ready for Xero, QuickBooks or MYOB.",
        ],
      },
    ],
    safetyNote:
      "General information only. Payment-method availability, fees, settlement timing, disputes and verification requirements can change. Check the current settings and documentation in your Stripe account before making a commercial decision.",
    sources: [
      {
        label: "Australia BECS Direct Debit payments",
        publisher: "Stripe Documentation",
        url: "https://docs.stripe.com/payments/au-becs-debit",
      },
      {
        label: "PayTo payments",
        publisher: "Stripe Documentation",
        url: "https://docs.stripe.com/payments/payto",
      },
      {
        label: "Movena pricing",
        publisher: "Movena",
        url: "https://movena.com.au/pricing/",
      },
    ],
  },
  {
    slug: "notice-member-drift-before-cancellation",
    category: "Retention",
    title: "Notice member drift before cancellation",
    description:
      "A practical way to use attendance and training history as a prompt for thoughtful member follow-up without pretending that a dashboard knows the whole story.",
    excerpt:
      "A missed fortnight is a signal, not a verdict. Make it visible, add context and let a person decide what happens next.",
    published: "2026-09-02",
    publishedLabel: "2 September 2026",
    readingTime: "5 minute read",
    image: "/assets/photos/after-session-1800.jpg",
    imageAlt:
      "Three gym members sitting together and talking after a training session",
    introduction: [
      "Cancellation is often the first clear administrative event, but it may not be the first sign that a member’s routine has changed. Attendance can make that change visible sooner without claiming to explain why it happened.",
      "Movena places members with no attendance in fourteen days on a retention list. That list is a prompt for the team—not an automated judgement about the member.",
    ],
    sections: [
      {
        heading: "Use a simple signal",
        paragraphs: [
          "A clear interval is easier to operate than a mysterious score. Fourteen days without attendance creates a consistent point at which staff can look, understand the context and decide whether contact is appropriate.",
          "The signal should remain visible alongside the member record, not disappear into a separate marketing tool that the coaching team never opens.",
        ],
      },
      {
        heading: "Read the record before reaching out",
        paragraphs: [
          "Check the member’s recent bookings, messages, membership status and training history. A holiday, injury note, planned break or already-resolved conversation changes what a helpful follow-up looks like.",
          "Do not turn absence into a diagnosis. The system can show that somebody has not attended; it cannot know their reason or whether they want to discuss it.",
        ],
      },
      {
        heading: "Make contact human",
        paragraphs: [
          "A useful message sounds like it came from someone who knows the member. Keep it brief, acknowledge the gap without pressure, and give the member an easy way to say what they need.",
        ],
        bullets: [
          "Assign follow-up to a named staff member.",
          "Reference context only when it is relevant and appropriate.",
          "Record the outcome so another staff member does not repeat the same message.",
        ],
      },
      {
        heading: "Look for operating patterns",
        paragraphs: [
          "Individual conversations matter, but the list can also reveal recurring friction: a timetable change, an overcrowded class, a program gap or a payment issue. Review themes without exposing personal notes more broadly than necessary.",
          "Retention work is strongest when the signal leads back to a change your team can make—not simply a larger volume of messages.",
        ],
      },
    ],
    safetyNote:
      "General information only. Attendance data does not explain a member’s health, circumstances or intentions. Use appropriate permissions, respect privacy and keep follow-up proportionate and human.",
    sources: [
      {
        label: "The gym platform that remembers the training",
        publisher: "Movena",
        url: "https://movena.com.au/",
      },
      {
        label: "The Movena platform",
        publisher: "Movena",
        url: "https://movena.com.au/platform/",
      },
      {
        label: "Privacy Policy",
        publisher: "Movena",
        url: "https://movena.com.au/legal/privacy/",
      },
    ],
  },
  {
    slug: "questions-before-choosing-gym-software",
    category: "Buying guide",
    title: "What to ask before choosing gym software",
    description:
      "A practical checklist covering pricing, payments, migration, member apps, access control, data portability and the capabilities that are not yet available.",
    excerpt:
      "A feature list is easy to scan. The better questions reveal what the software costs, who controls the surrounding services and how you leave.",
    published: "2026-09-02",
    publishedLabel: "2 September 2026",
    readingTime: "7 minute read",
    image: "/assets/photos/class-floor-1600.jpg",
    imageAlt:
      "A coach briefing members around a loaded barbell on a gym floor",
    introduction: [
      "Gym-software pages often use the same nouns: memberships, bookings, payments, reports and an app. The useful differences appear when you ask how each capability works in your operation and what sits outside the subscription.",
      "This checklist is written by Movena, so verify our answers as closely as any other provider’s. A clear limitation is more useful than a broad claim that changes meaning after the contract is signed.",
    ],
    sections: [
      {
        heading: "How does the price grow?",
        paragraphs: [
          "Ask whether the monthly price changes with active members, staff accounts, locations, messages, transactions or feature tiers. Then ask about payment-processing fees and optional add-ons separately.",
          "Movena publishes Australian-dollar plan prices, unlimited member and team accounts, the 0.30% platform administration fee on applicable Movena-processed payments, and a separate per-location Access Control integration fee.",
        ],
      },
      {
        heading: "What does a member actually use?",
        paragraphs: [
          "Open the real member app, not a slide. Check booking, cancellation, check-in, messaging and the training experience your members will return to between classes.",
          "Also ask whether the app is native, shared or custom-branded; whether both major app stores are supported; and which capabilities depend on the member’s phone or permissions.",
        ],
      },
      {
        heading: "Where do money, doors and messages live?",
        paragraphs: [
          "Specialist services may sit behind the platform. Ask whose account receives payments, who supplies access hardware, what happens when an integration is unavailable and which provider handles support for each layer.",
          "For Movena, payments settle into the gym’s own Stripe account. Kisi hardware and subscriptions are purchased directly from Kisi, while Movena handles membership and booking eligibility through its separate integration.",
        ],
      },
      {
        heading: "How do we arrive—and how do we leave?",
        paragraphs: [
          "Ask what the supplier will import, what your team must clean up, how the cutover is verified and how long the old system should remain available. Then ask for the export path before you sign.",
        ],
        bullets: [
          "Which member, membership, payment and attendance records can be imported?",
          "Can we export our data without opening a support ticket?",
          "What notice period applies, and when does termination take effect?",
          "Which capabilities are live today, and which are roadmap items?",
        ],
      },
    ],
    safetyNote:
      "General information only. Verify current pricing, contract terms, integrations and product availability with each supplier. Requirements differ between fitness businesses and jurisdictions.",
    sources: [
      {
        label: "Movena pricing",
        publisher: "Movena",
        url: "https://movena.com.au/pricing/",
      },
      {
        label: "Frequently asked questions",
        publisher: "Movena",
        url: "https://movena.com.au/faq/",
      },
      {
        label: "Terms of Service",
        publisher: "Movena",
        url: "https://movena.com.au/legal/terms/",
      },
    ],
  },
] as const satisfies readonly BlogPost[];

export type BlogSlug = (typeof blogPosts)[number]["slug"];

export function blogPath(slug: string): string {
  return `/blog/${slug}/`;
}

export function blogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
