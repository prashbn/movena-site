// Owner wording applied to the preserved homepage markup. Its photos, sections,
// classes, links and media remain in the original layout.
export function rewriteHomepageForOwners(original: string): string {
  const replacements = [
    ["<h1>The gym platform that remembers the training.</h1>", "<p class=\"owner-eyebrow\">One location or many. Five spreadsheets. No idea what's working.</p>\n        <h1>Run every location from one place.</h1>"],
    ["Memberships, payments, bookings, team management and workout programming. Plus a training history members keep.", "Memberships, bookings, payments, programs, waivers, check-ins and door access, with every coach's classes and every task in view. Start with one location; add the next on the same system."],
    ["Available now for Australian gyms.", "Built in Australia. For the business you’re building."],
    ["<span class=\"kicker\">Movena member app</span>", "<span class=\"kicker\">For your members</span>"],
    ["An app worth opening.", "Your gym. In their pocket."],
    ["One Movena identity. Book the next session, follow the workout and see personal progress build. Each gym’s memberships and training records stay in the right place.", "Bookings, your coaches’ programs and a record of their progress. Give members one place to stay connected to your gym."],
    ["A place to train.<br>A place to belong.", "Your community.<br>Beyond the gym floor."],
    ["Keep your members connected between sessions. Share what’s on, useful advice and stories from your gym—all in Hangout, inside the Movena app.", "A class update. A member milestone. Something worth sharing. Keep the conversation going in Hangout, inside the Movena app."],
    ["<span class=\"kicker\">24/7 access</span>", "<span class=\"kicker\">Optional add-on</span>"],
    ["Memberships and bookings, carried through to the door.", "Doors that know who’s paid."],
    ["Movena can grant enrolled members access from an eligible active membership or booking. When that entitlement ends, access ends without reception maintaining a separate door list.", "Keep door access in step with memberships, bookings and payments. Kisi access stops when a membership ends, or a payment stays overdue past the grace period you set. Once paid, access returns."],
    ["Movena manages eligibility. Kisi remains authoritative for doors, hardware and opening schedules. You purchase Kisi hardware and its subscription directly from Kisi.", "Requires Kisi hardware at each site. Hardware, installation and Kisi subscriptions are purchased separately. Kisi manages the doors, hardware and opening schedules."],
    ["Give members reasons to keep coming back.", "Notice the quiet weeks.<br>Celebrate the big ones."],
    ["Bring attendance insights, milestone rewards, challenges and community together. Help your team notice who needs a conversation—and who deserves a celebration.", "Spot a change in attendance. Recognise a milestone. Bring people together with a challenge. Give your team a reason to start a conversation."],
    ["Milestones and rewards", "Milestones worth recognising"],
    ["Recognise commitment and celebrate achievements.", "Celebrate the classes they keep coming back for."],
    ["Challenges that bring people together", "A shared reason to show up"],
    ["Find regular members who have stopped attending. Your team chooses the conversation.", "See when a regular member stops attending. Your team decides when to reach out."],
    ["Members own their story.", "Their progress. Their choice."],
    ["A training history belongs to the person who trained it.", "Your gym’s records stay with your gym. Members choose whether to share a personal-best summary elsewhere."],
    ["Run your gym on Movena.", "Start with your gym.<br>Grow from there."],
    ["Single sites and multi-location groups. Tell us about yours.", "You shouldn’t have to change systems to grow. Tell us where your business is today and where you want to take it."],
  ] as const;

  return replacements.reduce((markup, [before, after]) => {
    if (!markup.includes(before)) throw new Error(`Preserved homepage copy not found: ${before}`);
    return markup.replace(before, after);
  }, original);
}
