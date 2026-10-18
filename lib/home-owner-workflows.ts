// Prash's 18 October 2026 positioning brief. Same four tabs and three-step
// workflow layout; new owner wording only. These remain illustrative workflows.
export const ownerHomeWorkflows = [
  {
    id: "day", label: "The day", title: "See every coach’s classes.",
    description: "See sessions run, booked places against capacity, attendance and cancellations. Look by location and by coach.",
    features: [
      ["Know how classes are running", "See which classes are filling and where there is room."],
      ["Sign-up without the paperwork", "Digital waivers and intake questions, signed on a member’s phone or your kiosk and stored against the member."],
    ],
    example: "From the class to your view",
    steps: [
      { title: "Your coaches build the session", detail: "Programs and session types sit in the same system.", mode: "Your coaches" },
      { title: "Your team runs the class", detail: "Record attendance and the training as it happens.", mode: "Your team" },
      { title: "You see the class numbers", detail: "Review fill, attendance and cancellations by location and coach.", mode: "You" },
    ],
    note: "One view across locations, with managers scoped to the locations they run.",
  },
  {
    id: "money", label: "The money", title: "Know what needs you.",
    description: "See past-due amounts, refunds that did not reach the member and leads waiting for a response, without rebuilding a list in a spreadsheet.",
    features: [
      ["See what is owed", "Past-due members appear with the amount owed. Failed refunds lead back to the member."],
      ["Keep accounting connected", "Connect Xero directly, or export financial data for Xero, QuickBooks and MYOB."],
    ],
    example: "From the issue to the person",
    steps: [
      { title: "See the item that needs you", detail: "Past-due payment, failed refund or waiting lead.", mode: "Your view" },
      { title: "Open the member or lead", detail: "Go straight to the person and their record.", mode: "You" },
      { title: "Choose the next step", detail: "Give your team the context to follow it through.", mode: "Your team" },
    ],
    note: "See financials for one location or the whole business.",
  },
  {
    id: "member", label: "Enquiries", title: "Turn enquiries into members.",
    description: "Give each enquiry a next step and a due time. Keep the conversation in one place.",
    features: [
      ["Bring leads together", "Website forms, Facebook and Instagram lead ads, and Google lead forms arrive in one place."],
      ["Keep follow-up moving", "Movena reminds the right person and escalates overdue follow-ups to you."],
      ["See your funnel", "Contacted, trialled, converted and lost, by location. Replies come back into the lead."],
    ],
    example: "From enquiry to approved follow-up",
    steps: [
      { title: "Set the next step", detail: "Assign the person and a due time.", mode: "Your team" },
      { title: "Review Movena’s draft", detail: "Based on the enquiry and latest reply. Read it, edit it and approve it before anything is sent.", mode: "You approve" },
      { title: "Keep replies with the lead", detail: "Follow the conversation and the lead’s place in your funnel.", mode: "Your team" },
    ],
    note: "Movena drafts the follow-up. Your team approves it before it is sent.",
  },
  {
    id: "team", label: "The team", title: "Keep your team on track.",
    description: "Give work a place beyond the group chat. Assign tasks to staff by location and see what is open and overdue.",
    features: [
      ["Keep work visible", "Move tasks across your Kanban board as work progresses. Add comments so the context stays with the task."],
      ["Give the right access", "Set roles and location-scoped access for your managers and staff."],
    ],
    example: "From assignment to done",
    steps: [
      { title: "Assign the task", detail: "Choose the staff member and location.", mode: "Your team" },
      { title: "Move the work forward", detail: "Update its state and add comments on the board.", mode: "Your team" },
      { title: "See what still needs attention", detail: "Keep open and overdue tasks in view.", mode: "You" },
    ],
    note: "Grows with you: one location today, five tomorrow. Same account, same data, more locations.",
  },
] as const;
