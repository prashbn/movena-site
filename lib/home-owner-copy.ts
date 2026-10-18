// Owner wording applied to the preserved homepage markup. Its photos, sections,
// classes, links and media remain in the original layout.
export function rewriteHomepageForOwners(original: string): string {
  const replacements = [
    ["<h1>The gym platform that remembers the training.</h1>", "<p class=\"owner-eyebrow\">One location or many. Five spreadsheets. No idea what's working.</p>\n        <h1>Run every location from one place.</h1>"],
    ["Memberships, payments, bookings, team management and workout programming. Plus a training history members keep.", "Memberships, bookings, payments, programs, waivers, check-ins and door access, with every coach's classes and every task in view. Start with one location; add the next on the same system."],
    ["Available now for Australian gyms.", "Built for Australian gym owners. One location or many."],
    ["<span class=\"kicker\">Movena member app</span>", "<span class=\"kicker\">For your members</span>"],
    ["An app worth opening.", "Your gym. In their pocket."],
    ["One Movena identity. Book the next session, follow the workout and see personal progress build. Each gym’s memberships and training records stay in the right place.", "Give your members one place to book, follow your coaches’ programs and see their progress. Keep your gym’s memberships and training records together."],
    ["A place to train.<br>A place to belong.", "Keep your gym connected.<br>Between every session."],
    ["Keep your members connected between sessions. Share what’s on, useful advice and stories from your gym—all in Hangout, inside the Movena app.", "Share your gym’s updates, useful advice and stories in Hangout. Give your members a place to stay connected between sessions, inside the Movena app."],
    ["<span class=\"kicker\">24/7 access</span>", "<span class=\"kicker\">Optional add-on</span>"],
    ["Memberships and bookings, carried through to the door.", "Doors that know who’s paid."],
    ["Movena can grant enrolled members access from an eligible active membership or booking. When that entitlement ends, access ends without reception maintaining a separate door list.", "Kisi door access follows each member’s membership and bookings. Access stops when a membership ends or a payment is overdue after the grace period you set. It returns when the payment is made."],
    ["Movena manages eligibility. Kisi remains authoritative for doors, hardware and opening schedules. You purchase Kisi hardware and its subscription directly from Kisi.", "Requires Kisi hardware at each site. Hardware, installation and Kisi subscriptions are purchased separately. Kisi manages the doors, hardware and opening schedules."],
    ["Members own their story.", "Give members control of their history."],
    ["A training history belongs to the person who trained it.", "Keep sharing clear as your business grows. Your members choose what follows them to another gym."],
    ["Run your gym on Movena.", "See your business on Movena."],
    ["Single sites and multi-location groups. Tell us about yours.", "One location today, five tomorrow. Tell us about your team and where you want to go."],
  ] as const;

  return replacements.reduce((markup, [before, after]) => {
    if (!markup.includes(before)) throw new Error(`Preserved homepage copy not found: ${before}`);
    return markup.replace(before, after);
  }, original);
}
