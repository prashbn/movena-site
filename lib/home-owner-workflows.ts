// Prash's 18 October 2026 positioning brief. Same four tabs and three-step
// workflow layout; new owner wording only. These remain illustrative workflows.
export const ownerHomeWorkflows = [
  {
    id: "day", label: "The day", title: "See every coach’s classes.",
    description: "See how your timetable is working. Compare sessions run, class fill, attendance and cancellations by location and coach.",
    features: [
      ["Booked is only part of the story", "See attendance and cancellations alongside bookings and capacity."],
      ["Sign-up without the paperwork", "Digital waivers and intake questions, signed on a phone or your front-desk kiosk. Stored against the member."],
    ],
    example: "From the timetable to the numbers",
    steps: [
      { title: "Build the session", detail: "Your coaches create programs and session types.", mode: "Your coaches" },
      { title: "Run the class", detail: "Record the training and who attended.", mode: "Your team" },
      { title: "See how it went", detail: "Review bookings, attendance and cancellations.", mode: "You" },
    ],
    note: "Your managers see their own locations. You keep the view across them all.",
  },
  {
    id: "money", label: "The money", title: "Know what needs you.",
    description: "An overdue payment. A refund that didn’t arrive. A lead waiting for a reply. See what needs your attention, then go straight to the person.",
    features: [
      ["See what is owed", "See who is past due and how much they owe. Open a failed refund to go straight to the member."],
      ["Keep accounting connected", "Connect directly to Xero for your accounting."],
    ],
    example: "From the issue to the person",
    steps: [
      { title: "Find what needs attention", detail: "Past-due payment, failed refund or waiting lead.", mode: "Your view" },
      { title: "Open the member or lead", detail: "Go straight to the person and their record.", mode: "You" },
      { title: "Choose the next step", detail: "Follow up with the person, with their record in view.", mode: "Your team" },
    ],
    note: "See financials for one location or the whole business.",
  },
  {
    id: "member", label: "Enquiries", title: "Turn enquiries into members.",
    description: "The enquiry comes in. The next step is clear. Give every lead a person to follow up and a time to do it.",
    features: [
      ["Bring your enquiries together", "Website forms, Facebook and Instagram lead ads, and Google lead forms arrive in one place."],
      ["Keep follow-up moving", "Movena reminds the right person and escalates overdue follow-ups to you."],
      ["See where enquiries go", "Track contacted, trialled, converted and lost by location. Replies stay with the lead."],
    ],
    example: "A follow-up you approve",
    steps: [
      { title: "Set the next step", detail: "Assign the person and a due time.", mode: "Your team" },
      { title: "Review Movena’s draft", detail: "Optional drafting uses approved gym facts and may include a screened latest email reply. Read it, edit it and approve it before anything is sent.", mode: "You approve" },
      { title: "Keep the conversation together", detail: "Replies return to the lead, alongside their place in your funnel.", mode: "Your team" },
    ],
    note: "The draft is a starting point. You have the final say before it is sent.",
  },
  {
    id: "team", label: "The team", title: "Keep your team on track.",
    description: "The group chat moves on. The work still needs doing. Give every task a person, a location and a place on the board.",
    features: [
      ["See what is open. And overdue.", "Move tasks across your Kanban board as work progresses. Keep comments with the work."],
      ["Give the right access", "Choose roles for managers and staff, with access to the locations they work in."],
    ],
    example: "From assignment to done",
    steps: [
      { title: "Assign the task", detail: "Choose the staff member and location.", mode: "Your team" },
      { title: "Keep everyone up to date", detail: "Move the task as work progresses. Add comments where they belong.", mode: "Your team" },
      { title: "Know what is still open", detail: "Keep open and overdue tasks in view.", mode: "You" },
    ],
    note: "Grows with you. One location today, five tomorrow. Keep the same account and data as you add more locations.",
  },
] as const;
