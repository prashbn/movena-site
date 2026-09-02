export const movenaPackages = [
  {
    id: "one",
    name: "Movena One",
    price: "A$129 / month + GST",
    positioning: "Everything you need to run one great gym.",
    highlights: [
      "1 location",
      "Unlimited members",
      "Unlimited owners, managers, staff & coaches",
      "Membership, billing, timetable & bookings",
      "Member app, programming & messaging",
      "Check-in, waivers & core reporting",
    ],
  },
  {
    id: "collective",
    name: "Movena Collective",
    price: "A$349 / month + GST",
    positioning: "Built for growing fitness businesses.",
    highlights: [
      "Everything in Movena One",
      "Up to 3 locations",
      "Unlimited members and team users",
      "Multi-location management",
      "Native Retail / Shop",
      "Physical merchandise collected in person",
    ],
  },
  {
    id: "enterprise",
    name: "Movena Enterprise",
    price: "Custom",
    positioning:
      "For fitness organisations that need advanced analytics, deeper control and organisation-wide operations.",
    highlights: [
      "Everything in Movena Collective",
      "Larger / custom location scale",
      "Unlimited members and team users",
      "Advanced analytics & organisation insights",
      "Enterprise permissions and governance",
      "Tailored onboarding, migration and support",
    ],
  },
] as const;

export const packageComparisonRows = [
  ["Price", "A$129/mo + GST", "A$349/mo + GST", "Custom"],
  ["Locations", "1", "Up to 3", "Custom"],
  ["Members", "Unlimited", "Unlimited", "Unlimited"],
  ["Owners, managers, staff & coaches", "Unlimited", "Unlimited", "Unlimited"],
  ["Membership & billing", "Included", "Included", "Included"],
  ["Timetable & bookings", "Included", "Included", "Included"],
  ["Member app", "Included", "Included", "Included"],
  ["Programming", "Included", "Included", "Included"],
  ["Messaging", "Included", "Included", "Included"],
  ["Check-in & waivers", "Included", "Included", "Included"],
  ["Core reporting", "Included", "Included", "Included"],
  ["Native Retail / Shop", "—", "Included", "Included"],
  ["Multi-location management", "—", "Included", "Included"],
  ["Advanced analytics", "—", "—", "Included"],
  ["Organisation-wide insights", "—", "—", "Included"],
  ["Enterprise integrations", "—", "—", "Tailored"],
  ["Enterprise onboarding/support", "—", "—", "Tailored"],
] as const;

export const optionalAddOns = [
  {
    name: "Access Control Integration",
    price: "+A$49 / location / month + GST",
    detail:
      "Movena integration fee only. Hardware, installation and access-control provider subscriptions are purchased separately.",
  },
] as const;

export const platformAdministrationFee =
  "Plus a 0.30% platform administration fee on applicable Movena-processed payments.";
