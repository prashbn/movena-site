// Website-only descriptions, confirmed against the supplied shipped-feature
// verification dated 11 October 2026 (product master 1cfa2f54, v0.39.0).
// These are explanatory workflows, not replicas of product interfaces.
export const homeWorkflows = [
  {
    id: "day", label: "The day", title: "A full class. A moving waitlist.",
    description: "A cancellation doesn’t have to leave an empty spot. Keep bookings moving while your team runs the floor.",
    features: [
      ["Build the week", "Copy a timetable week and bulk publish classes."],
      ["Support the booking", "Book on a member’s behalf and mark attendance. Booked members check in on the gym’s kiosk."],
    ],
    example: "When a spot opens",
    steps: [
      { title: "A booked member cancels", detail: "A place becomes available.", mode: "Member or staff" },
      { title: "The first person on the waitlist moves in", detail: "Their booking is promoted and they’re told.", mode: "Automatic*" },
      { title: "Your team keeps the class moving", detail: "Mark attendance; coaches record the training.", mode: "Your team" },
    ],
    note: "*Waitlist promotion runs when your gym has auto-promote enabled, booking is still open and an eligible place becomes available before class starts.",
  },
  {
    id: "money", label: "The money", title: "A failed payment. A clear next step.",
    description: "See who is past due and what needs attention, without losing the member in a separate payment system.",
    features: [
      ["Recover the payment", "Find overdue members in Payment past due and Billing recovery. Staff can collect or waive the amount, or restore access."],
      ["Keep accounting connected", "Connect Xero directly, or export financial data for Xero, QuickBooks and MYOB."],
    ],
    example: "When a card payment fails",
    steps: [
      { title: "The card payment fails", detail: "The outstanding payment becomes visible to the gym.", mode: "Automatic" },
      { title: "Stripe retries; the member gets an email", detail: "The email asks them to update their card.", mode: "Automatic" },
      { title: "A successful payment releases the hold", detail: "Overdue access holds follow your gym’s settings.", mode: "Automatic" },
    ],
    note: "Your team can also intervene. A retry does not guarantee recovery.",
  },
  {
    id: "member", label: "The member", title: "Notice the change. Make the next conversation count.",
    description: "See which regular members have stopped attending, recognise milestones worth celebrating, and give your team the context to follow up personally.",
    features: [
      ["Spot the change", "Find regular members who have stopped coming."],
      ["Understand the member", "Open their record for the context behind your next conversation."],
      ["Choose the follow-up", "Reach out personally or celebrate an achievement. Your team stays in control."],
    ],
    example: "When someone’s attendance drops",
    steps: [
      { title: "Spot an attendance change", detail: "Find regular members who have stopped attending.", mode: "Insight" },
      { title: "Understand the member", detail: "Review their record before reaching out.", mode: "Your team" },
      { title: "Choose the follow-up", detail: "Start a personal conversation.", mode: "Your team" },
    ],
    note: "Your team chooses when and how to reach out.",
  },
  {
    id: "team", label: "The team", title: "The right role. The right location.",
    description: "Bring a new coach into the gym without giving them access to the whole business.",
    features: [
      ["Choose the role", "Invite owners, managers, front-desk staff and coaches, then assign their locations."],
      ["Set coach permissions", "Control access to members, performance, messaging, tasks and leads."],
    ],
    example: "When a new coach joins",
    steps: [
      { title: "Choose their role and location", detail: "The owner sends the invitation.", mode: "Owner" },
      { title: "The invitation arrives by email", detail: "The coach can join through their invitation.", mode: "Automatic" },
      { title: "Their access follows their role", detail: "Only permitted locations and capabilities are available.", mode: "Automatic" },
    ],
    note: "Removing a role takes effect immediately and the person is notified.",
  },
] as const;
