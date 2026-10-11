import type { LegacySource } from "./routes.ts";

// Refresh public copy without changing the frozen source documents or legal text.
export function rewriteWebsiteCapabilityCopy(markup: string, source: LegacySource): string {
  if (source === "index.html") {
    return markup.replace(
      "Book the next session. Follow the workout. See the lifts, moments and milestones build into a history that belongs to them.",
      "One identity. Their training story. Book the next session. Follow the workout. Build personal bests and progress that stay with the member, with gym-specific sessions and programs kept in the right place.",
    )
      .replace("Owners can refresh the inactivity list to flag members with no attendance in 14 days.", "Owners can refresh inactivity flags based on attendance records, then let their team choose the follow-up.")
      .replace("An owner refreshes the list. Owners, managers and coaches can log a follow-up, snooze or resolve a flag.", "An owner refreshes the flags. Owners, managers and coaches log or snooze follow-ups; owners and coaches resolve them. Nothing is sent automatically.")
      .replace("A fortnight away, made visible", "Follow-ups, made visible")
      .replace("and kept for good.", "at your gym, from the 5th class to the 1,000th.")
      .replace("Scored from check-ins. Nobody logs a thing.", "Classes, minutes or daily streaks, scored from attendance. No manual tallying.")
      .replace("Change gyms, keep the history. Theirs to share. Theirs to withdraw.", "One account goes with them. Personal bests stay theirs; a new gym sees a summary only with their permission—not another gym’s raw workout logs.");
  }

  if (source === "members/index.html") {
    return markup
      .replace("Your training, remembered.</h1>", "One identity.<br>Your training story.</h1>")
      .replace(
        /Book\. Check in\. Train\. And watch it add up — session by session, instead of\s+disappearing off a whiteboard\./,
        "One Movena account goes with you. Book your sessions, follow your gym’s programs and build your personal bests. A new gym sees a summary only if you choose to share.",
      )
      .replace(
        /Full class\? Join the waitlist — a\s+spot opens, you're in, and you'll know\./,
        "Full class? Join the waitlist. If your gym enables automatic promotion, the next person in the queue is booked and notified when an eligible spot opens before booking closes and class starts.",
      )
      .replace("The tablet at the door records your check-in. A few minutes late still counts.", "Tap your name on the gym’s check-in tablet for a class you’re booked on. Check-in opens shortly before class—30 minutes by default, adjustable by your gym.")
      .replace(/Badges mark 50, 100, 250, 500 and 1,000 classes\. They are awarded\s+automatically and kept permanently\./, "Earn badges automatically at 5, 25, 50, 100, 150, 200, 250, 500 and 1,000 classes attended. Badges stay with the gym where you earned them; they don’t transfer to a new gym.")
      .replace(/Challenges score themselves from check-ins, with nothing extra to log\.[\s\S]*?adds a finisher badge\./, "Challenges count classes attended, minutes attended or daily streaks, with a live leaderboard. An optional finish line awards a finisher badge. Workout results don’t count towards challenges.")
      .replace("No scores out of ten. No rankings against strangers. No telling you what to do.", "Your own results. Your own pace. A record of what you trained, not a prescription for what to do next.")
      .replace("Browse merchandise and products from your gym, and find your orders in the same app you use to book and train.", "Buy your gym’s merchandise, pay online and collect at the gym. Find your orders in the same app you use to book and train. No delivery or shipping.")
      .replace(/Not to a single gym\. Consent, portability and deletion were designed in from\s+the start\./, "Your account-level personal bests and progress go with you. Memberships, bookings, messages, programs, workout logs and badges stay specific to the gym where they were recorded.")
      .replace("Change gyms, keep the history. Yours to share. Yours to withdraw.", "Your new gym sees nothing from a previous gym by default. Choose to share a summary of your personal bests, per gym, and withdraw that permission whenever you want. Raw workout logs aren’t shared across gyms.")
      .replace("Ask us to delete your information and we do. Where a record has to be kept, we tell you which, and why. Write to us.", "Account deletion is by request to Movena, not a self-serve button. Deletion removes gym records, including badges, subject to records we must retain. We explain what is kept and why.");
  }

  if (source === "platform/index.html") {
    return markup
      .replaceAll("Book a walkthrough</a>", "Book a demo</a>")
      .replace("promotion happens automatically", "automatic promotion when your gym enables it")
      .replace("attendance, minutes, or streaks, scored from check-ins", "classes attended, minutes attended or daily streaks, scored from attendance—not workout results")
      .replace("members who haven't trained in a fortnight", "an owner refreshes flags for active members with no attendance record in 14 days; your team follows up manually")
      .replace("Recognition that arrives on its own, plus a nudge when someone stops.", "Automatic attendance milestones, with follow-ups chosen and recorded by your team.")
      .replace("<li><b>Milestone badges</b> — 50, 100, 250, 500, 1,000 classes</li>", "<li><b>Milestone badges</b> — 5, 25, 50, 100, 150, 200, 250, 500 and 1,000 classes attended, per gym</li>")
      .replace("<li><b>Self check-in</b> — members mark themselves in</li>", "<li><b>Kiosk check-in</b> — booked members tap their name on your gym’s tablet</li>")
      .replace("<li><b>Retention list</b>", "<li><b>Inactivity flags</b>")
      .replace("<li><b>Member purchase</b> — members buy through the Movena app</li>", "<li><b>Member purchase</b> — members pay online in the app or on the web, with Stripe configured</li>")
      .replace("<li><b>Native shop</b> — set up physical merchandise in Movena</li>", "<li><b>Native shop</b> — physical merchandise on every plan</li>")
      .replace(
        "<li><b>Accounting exports</b> — Xero-ready, QuickBooks-ready and MYOB-ready</li>",
        '<li><b>Accounting connection</b> — owners connect Xero directly</li>\n          <li><b>Accounting exports</b> — Xero-ready, QuickBooks CSV and MYOB OFX; QuickBooks and MYOB use exports, not direct connections</li>',
      );
  }

  if (source === "help/ai-assistants/index.html") {
    return markup
      .replace("Last updated: 8 October 2026", "Last updated: 11 October 2026")
      .replace(
        /Movena works with <strong>Claude<\/strong>[\s\S]*?summarise your own training\./,
        "Connect Movena to <strong>ChatGPT</strong> to explore your gym’s bookings, find available capacity and get answers about using Movena. Members can separately choose to share their own training summaries. The <strong>Claude connector is enabled in production; its Anthropic directory listing is in review</strong>.",
      )
      .replace(
        /<h2 id="claude">Connect Claude<\/h2>\s*<ol>[\s\S]*?<\/ol>/,
        '<h2 id="claude">Claude — directory listing in review</h2>\n    <p>The Claude connector is enabled in production. Its Anthropic directory listing is in review, so don’t expect to find a public Movena listing there yet. Contact <a href="mailto:support@movena.com.au">support@movena.com.au</a> for current connection options. Claude requires its own approval; connecting ChatGPT does not approve Claude.</p>',
      )
      .replace(
        "Make the same choices as above (each starts unticked) and choose <strong>Approve</strong>.",
        "Gym team members choose the locations to share; members choose <strong>My training</strong> and/or <strong>My session health</strong>. Every choice starts unticked. Choose <strong>Approve</strong>.",
      );
  }

  return markup;
}
