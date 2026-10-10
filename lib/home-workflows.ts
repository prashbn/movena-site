// Website-only descriptions, confirmed against the supplied shipped-feature
// review dated 10 October 2026 (product master 1cfa2f54, v0.39.0).
// These are explanatory workflows, not replicas of product interfaces.
export const homeWorkflows = [
  {
    id: "day", label: "The day", title: "A full class. A moving waitlist.",
    description: "A cancellation doesn’t have to leave an empty spot. Keep bookings moving while your team runs the floor.",
    features: [
      ["Build the week", "Copy a timetable week and bulk publish classes."],
      ["Support the booking", "Book on a member’s behalf and mark attendance. Booked members can check in from their account or the kiosk."],
    ],
    example: "When a spot opens",
    steps: [
      { title: "A booked member cancels", detail: "A place becomes available.", mode: "Member or staff" },
      { title: "The first person on the waitlist moves in", detail: "Their booking is promoted and they’re told.", mode: "Automatic*" },
      { title: "Your team keeps the class moving", detail: "Mark attendance; coaches record the training.", mode: "Your team" },
    ],
    note: "*Waitlist promotion runs when your gym has auto-promote enabled.",
  },
  {
    id: "money", label: "The money", title: "A failed payment. A clear next step.",
    description: "See who is past due and what needs attention, without losing the member in a separate payment system.",
    features: [
      ["Recover the payment", "Find overdue members in Payment past due and Billing recovery. Staff can collect or waive the amount, or restore access."],
      ["Keep accounting connected", "Owner-only Xero connection, plus Xero CSV and MYOB exports."],
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
    id: "member", label: "The member", title: "Notice the change. Start a conversation.",
    description: "Spot a change in attendance and give your team the context to reach out—not another generic reminder.",
    features: [
      ["See attendance changes", "Attendance drop means at least 40% fewer visits in the last 14 days than the member’s previous six weeks."],
      ["Choose the follow-up", "Message a member or segment. Owners, managers and coaches can log, snooze or resolve inactivity flags."],
    ],
    example: "When someone’s attendance drops",
    steps: [
      { title: "They appear in Attendance drop", detail: "The segment updates when the Members page loads.", mode: "Automatic" },
      { title: "Your team opens the member’s record", detail: "Check the context before deciding what to do.", mode: "Your team" },
      { title: "Send a personal check-in", detail: "Message the member or their segment.", mode: "Your team" },
    ],
    note: "Separate inactivity flags use 14 days without attendance. An owner must press Recompute to refresh them; front desk staff use Members segments instead.",
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
