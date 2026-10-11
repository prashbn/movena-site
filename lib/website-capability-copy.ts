import type { LegacySource } from "./routes.ts";

// Refresh public copy without changing the frozen source documents or legal text.
export function rewriteWebsiteCapabilityCopy(markup: string, source: LegacySource): string {
  if (source === "index.html") {
    return markup.replace(
      "Book the next session. Follow the workout. See the lifts, moments and milestones build into a history that belongs to them.",
      "One Movena identity. Book the next session, follow the workout and see personal progress build. Each gym’s memberships and training records stay in the right place.",
    )
      .replace("Members don't quit. They drift.", "Give members reasons to keep coming back.")
      .replace(/Badges and challenges turn check-ins into milestones\.\s+Owners can refresh the inactivity list to flag members with no attendance in 14 days\./, "Bring attendance insights, milestone rewards, challenges and community together. Help your team notice who needs a conversation—and who deserves a celebration.")
      .replace("An owner refreshes the list. Owners, managers and coaches can log a follow-up, snooze or resolve a flag.", "Find regular members who have stopped attending. Your team chooses the conversation.")
      .replace("A fortnight away, made visible", "Attendance insights")
      .replace("Badges that arrive on their own", "Milestones and rewards")
      .replace("No setup. Your desk sees who just earned one, so someone can say something.", "Recognise commitment and celebrate achievements.")
      .replace("Challenges anyone can join", "Challenges that bring people together")
      .replace("and kept for good.", "at your gym, from the 5th class to the 1,000th.")
      .replace("Scored from check-ins. Nobody logs a thing.", "Classes, minutes or daily streaks, scored from attendance. No manual tallying.")
      .replace("Change gyms, keep the history. Theirs to share. Theirs to withdraw.", "One account goes with them. A new gym sees a personal-best summary only with their permission—not another gym’s raw workout logs.");
  }

  if (source === "members/index.html") {
    return markup
      .replace("Your training, remembered.</h1>", "One member.<br>One Movena identity.</h1>")
      .replace(
        /Book\. Check in\. Train\. And watch it add up — session by session, instead of\s+disappearing off a whiteboard\./,
        "One account across participating Movena gyms. Keep your personal progress connected, while each gym manages its own memberships, bookings and training records.",
      )
      .replace(
        /Full class\? Join the waitlist — a\s+spot opens, you're in, and you'll know\./,
        "Full class? Join the waitlist. If your gym enables automatic promotion, the next person in the queue is booked and notified when an eligible spot opens before booking closes and class starts.",
      )
      .replace("The tablet at the door records your check-in. A few minutes late still counts.", "Tap your name on the gym’s check-in tablet for a class you’re booked on. Check-in opens shortly before class—30 minutes by default, adjustable by your gym.")
      .replace(/Badges mark 50, 100, 250, 500 and 1,000 classes\. They are awarded\s+automatically and kept permanently\./, "Earn badges automatically at 5, 25, 50, 100, 150, 200, 250, 500 and 1,000 classes attended. Badges stay with the gym where you earned them; they don’t transfer to a new gym.")
      .replace(/Challenges score themselves from check-ins, with nothing extra to log\.[\s\S]*?adds a finisher badge\./, "Challenges count classes attended, minutes attended or daily streaks, with a live leaderboard. An optional finish line awards a finisher badge. Workout results don’t count towards challenges.")
      .replace("No scores out of ten. No rankings against strangers. No telling you what to do.", "Your own results. Your own pace. A record of what you trained, not a prescription for what to do next.")
      .replace("Your gym’s shop. In your pocket.", "Your gym shop. In your pocket.")
      .replace("Browse merchandise and products from your gym, and find your orders in the same app you use to book and train.", "Browse and pay in the Movena app, then collect your purchase at the gym. No delivery or shipping.")
      .replace("Your training history belongs to you.", "Your progress. Your choice.")
      .replace(/Not to a single gym\. Consent, portability and deletion were designed in from\s+the start\./, "Choose whether to share a personal-best summary with another gym. Your detailed workout records stay with the gym where they were recorded.")
      .replace("Change gyms, keep the history. Yours to share. Yours to withdraw.", "Share a summary of your personal bests, per gym, and withdraw that permission whenever you want. Raw workout logs aren’t shared across gyms.")
      .replace("Ask us to delete your information and we do. Where a record has to be kept, we tell you which, and why. Write to us.", "Account deletion is by request to Movena, not a self-serve button. Deletion removes gym records, including badges, subject to records we must retain. We explain what is kept and why.");
  }

  if (source === "platform/index.html") {
    return markup
      .replaceAll("Book a walkthrough</a>", "Book a demo</a>")
      .replace("promotion happens automatically", "automatic promotion when your gym enables it")
      .replace(/<h3>Keeping members<\/h3>[\s\S]*?<\/ul>/, `<h3>Give members reasons to keep coming back.</h3>
        <p>Bring attendance insights, milestone rewards, challenges and community together. Help your team notice who needs a conversation—and who deserves a celebration.</p>
        <ul>
          <li><b>Attendance insights</b> — find regular members who have stopped attending</li>
          <li><b>Milestones and rewards</b> — recognise commitment and celebrate achievements at your gym</li>
          <li><b>Challenges</b> — build participation through attendance-based goals: classes attended, minutes attended or daily streaks</li>
          <li><b>Hangout</b> — keep your community connected between sessions</li>
        </ul>`)
      .replace("<li><b>Self check-in</b> — members mark themselves in</li>", "<li><b>Kiosk check-in</b> — booked members tap their name on your gym’s tablet</li>")
      .replace("<h3>Retail</h3>", "<h3>Your gym shop. In their pocket.</h3>")
      .replace("Sell physical merchandise without separating the shop from the member experience.", "Let members browse and pay in the Movena app, then collect their purchase at the gym. Included on every plan.")
      .replace("<li><b>Member purchase</b> — members buy through the Movena app</li>", "<li><b>Member purchase</b> — online payments through Stripe, in the app or on the web</li>")
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
