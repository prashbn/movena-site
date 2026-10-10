import type { LegacySource } from "./routes.ts";

// Refresh public copy without changing the frozen source documents or legal text.
export function rewriteWebsiteCapabilityCopy(markup: string, source: LegacySource): string {
  if (source === "index.html") {
    return markup.replace(
      "Book the next session. Follow the workout. See the lifts, moments and milestones build into a history that belongs to them.",
      "One identity. Their training story. Book the next session. Follow the workout. Keep programs, results and milestones connected through one Movena identity—with a training history that belongs to the member, not just the gym.",
    );
  }

  if (source === "members/index.html") {
    return markup
      .replace("Your training, remembered.</h1>", "One identity.<br>Your training story.</h1>")
      .replace(
        /Book\. Check in\. Train\. And watch it add up — session by session, instead of\s+disappearing off a whiteboard\./,
        "Your sessions, programs, results and milestones—connected through one Movena identity. A training history that belongs to you, not just the gym.",
      )
      .replace(
        /Full class\? Join the waitlist — a\s+spot opens, you're in, and you'll know\./,
        "Full class? Join the waitlist. If your gym enables automatic promotion, an available spot becomes your booking and you’re notified.",
      );
  }

  if (source === "platform/index.html") {
    return markup
      .replaceAll("Book a walkthrough</a>", "Book a demo</a>")
      .replace("promotion happens automatically", "automatic promotion when your gym enables it")
      .replace("attendance, minutes, or streaks, scored from check-ins", "attendance-based challenges, scored from marked attendance")
      .replace("members who haven't trained in a fortnight", "owners refresh the list of members with no attendance in 14 days")
      .replace(
        "<li><b>Accounting exports</b> — Xero-ready, QuickBooks-ready and MYOB-ready</li>",
        '<li><b>Accounting connections</b> — connect Xero or QuickBooks directly</li>\n          <li><b>Accounting exports</b> — Xero-ready, QuickBooks-ready and MYOB-ready; MYOB uses exports, not a direct connection</li>',
      );
  }

  if (source === "help/ai-assistants/index.html") {
    return markup
      .replace("Last updated: 8 October 2026", "Last updated: 11 October 2026")
      .replace(
        /Movena works with <strong>Claude<\/strong>[\s\S]*?summarise your own training\./,
        "Connect Movena to <strong>ChatGPT</strong> to explore your gym’s bookings, find available capacity and get answers about using Movena. Members can separately choose to share their own training summaries. The <strong>Claude integration is in review and is not yet available</strong>.",
      )
      .replace(
        /<h2 id="claude">Connect Claude<\/h2>\s*<ol>[\s\S]*?<\/ol>/,
        '<h2 id="claude">Claude — in review</h2>\n    <p>The Claude integration is in review and is not yet available. Connection instructions will be published when availability is confirmed.</p>',
      )
      .replace(
        "Make the same choices as above (each starts unticked) and choose <strong>Approve</strong>.",
        "Gym team members choose the locations to share; members choose <strong>My training</strong> and/or <strong>My session health</strong>. Every choice starts unticked. Choose <strong>Approve</strong>.",
      );
  }

  return markup;
}
