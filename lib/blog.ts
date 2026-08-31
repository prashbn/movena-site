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
  category: "Wellbeing" | "Strength" | "Performance";
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
] as const satisfies readonly BlogPost[];

export type BlogSlug = (typeof blogPosts)[number]["slug"];

export function blogPath(slug: string): string {
  return `/blog/${slug}/`;
}

export function blogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
