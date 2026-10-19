import type { LegacySource } from "./routes.ts";

type CopyPair = readonly [string, string];

// Editorial copy only. Keep the existing sections, media, links and motion hooks.
const platformCopy: readonly CopyPair[] = [
  ["<h1>Everything a gym runs on, in one place.</h1>", "<h1>Run the day.<br>See the whole business.</h1>"],
  ["Front desk, office and floor work from the same system — one member record behind memberships, bookings, check-in, waivers, payments and messages. One record moves with each member, so owners, staff and coaches see the same operation without rebuilding it in spreadsheets.", "Gym CRM and management software for your leads, memberships, bookings, payments and programs. Give your team one place to work across every location."],
  ["Memberships, packs and the awkward parts of billing.", "Memberships change.<br>Keep the record clear."],
  ["Selling a membership is the easy half. Movena is built for the other half — the refund, the make-good, the member who wants to pay at the desk, the plan that has to change.", "The first payment is only the start. Plans change. Payments fail. Refunds need following up. Keep it all with the member, so your team knows where things stand."],
  ["Build a membership or a class pack once and sell it everywhere it applies.", "Set up your memberships and class packs, then choose the classes and locations they cover."],
  ["Offer card, BECS direct debit or PayTo, or record a payment made in person — the membership is tracked either way.", "Offer card, BECS direct debit or PayTo through Stripe. Record payments taken at the desk too, so each member’s payment history stays together."],
  ["<b>Failed payments</b> — a recovery list, not a mystery", "<b>Failed payments</b> — see who needs a follow-up"],
  ["The operations most gym software leaves you to fix by hand.", "Handle a refund, credit or cancellation with the member’s record in view."],
  ["<b>Make-goods</b> — credit a member when your gym got it wrong", "<b>Make-goods</b> — record a credit against the member"],
  ["<b>Cancellations</b> — with the cooling-off rules handled properly", "<b>Cancellations</b> — manage the change against the member’s plan"],
  ["Knowing where you stand", "Know what needs you"],
  ["The numbers an owner actually asks for, without exporting anything.", "Past-due members, amounts owed, refunds that didn’t arrive and leads waiting. One list, with a direct path to the person."],
  ["<b>Outstanding</b> — who owes, and how long it's been", "<b>Outstanding</b> — who owes, how much and how long it’s been"],
  ["The timetable, the door, and everything between.", "A clear view of every class."],
  ["Build the week once. Generate it for months.", "See sessions run, bookings against capacity, attendance and cancellations. Look by coach and location, so you know how the timetable is working."],
  ["Build the week once, then let it run.", "Build a repeating week, then manage bookings, capacity and waitlists in one place."],
  ["<b>Rooms and locations</b> — filtered to the site you're standing in", "<b>Rooms and locations</b> — switch to the site you need to see"],
  ["A tablet at the door does the front-desk work.", "Give booked members a quick way to check in. Your team can mark attendance when a member needs a hand."],
  ["Signed before the first session, stored for as long as you need it.", "Collect a digital waiver and intake questionnaire on a member’s phone or your front-desk kiosk. Keep the signed record with the member."],
  ["<b>Signed on kiosk or phone</b> — with a real signature", "<b>Signed on kiosk or phone</b> — stored against the member"],
  ["A private line between your team and your members — never member-to-member.", "Keep member conversations with the people who can help. Private threads connect each member with your team."],
  ["<b>Push notifications</b> — so it actually gets read", "<b>Push notifications</b> — send updates to members’ phones"],
  ["The CRM half: enquiries in, members kept.", "From the first enquiry.<br>To the next milestone."],
  ["<h3>Leads and enquiries</h3>", "<h3>Gym CRM and lead management</h3>"],
  ["A gym's pipeline is short and personal — someone walks in, or fills in a form, and somebody has to follow up. Movena keeps that honest without turning your desk into a sales floor.", "Someone asks about joining. Someone else hasn’t been in for a while. Give your team the context to follow up, welcome people in and recognise their progress."],
  ["Everyone who asked about joining, in one list — including the ones who found you on your own website.", "Keep every enquiry in one place, with a person to follow up and a due time. See where the conversation goes next."],
  ["<b>A form for your own site</b> — copy the snippet, paste it into your website, and enquiries land in your pipeline", "<b>Lead capture</b> — website forms, Facebook and Instagram lead ads, and Google lead forms"],
  ["<b>Tagged on arrival</b> — website enquiries are marked as such, so you can see what your site is actually bringing in", "<b>Follow-up</b> — reminders for your team; overdue follow-ups escalate to you"],
  ["<b>Where they came from</b> — walk-in, referral, website, campaign", "<b>Email drafts</b> — Movena drafts from the enquiry and latest reply. Read, edit and approve before anything is sent. <a href=\"/legal/privacy/\">How your information is used.</a>"],
  ["<b>Status history</b> — who moved it, and when", "<b>Replies and funnel</b> — replies stay with the lead. See contacted, trialled, converted and lost by location"],
  ["The record behind every conversation at the desk.", "Know who you’re talking to, from the first trial to the regular at the front desk."],
  ["<b>Invites</b> — one email, and they're in the app", "<b>Invites</b> — invite members to join your gym in the app"],
  ["Give members reasons to keep coming back.", "Notice the change. Start the conversation."],
  ["Bring attendance insights, milestone rewards, challenges and community together. Help your team notice who needs a conversation—and who deserves a celebration.", "A quiet fortnight. A hundredth class. A challenge completed. Give your team a reason to check in or celebrate."],
  ["<h3>Programming</h3>", "<h3>Programs your coaches run</h3>"],
  ["What your coaches write, delivered to the people doing it.", "Coaches build programs and session types, run them in class and record the training. Members follow along and see their progress in the app."],
  ["<b>Member programs</b> — assigned, with a start date that waits", "<b>Member programs</b> — assign training to the people following it"],
  ["Your gym shop. In their pocket.", "Your shop, part of the same gym."],
  ["Let members browse and pay in the Movena app, then collect their purchase at the gym. Included on every plan.", "Let members browse and pay in the Movena app, then collect their purchase at the gym. Keep retail alongside the rest of your business. Included on every plan."],
  ["Multiple sites, without multiple systems.", "We dreamt big.<br>So you can build bigger."],
  ["Movena was built for a group before it was built for a single site. Locations aren't a setting bolted on later — they run through roles, plans, timetables, reporting and the documents members sign.", "One location today. Five tomorrow. Keep the same account and data as you grow, with roles and location access for your managers and staff. They see the locations they run. You see the whole business."],
  ["A coach at one site sees that site. A manager sees the locations they run. An owner sees everything. Nobody has to remember which login they're in.", "Keep the work in view too. Assign tasks by location, move them across a Kanban board and keep comments with the task. See what is open and overdue."],
  ["Know what changed. Know what to do next.", "The numbers behind your next decision."],
  ["Revenue, billing, programming and the training floor stay connected, so the numbers lead back to the work your team can act on.", "See what each location brings in, what needs following up and what your coaches are running. The detail is there when you need it."],
  ["Turn payment data into the next decision.", "Every location.<br>Every dollar."],
  ["See what was collected, what will settle next, and where revenue is moving without assembling another report.", "See collected payments, fees and your next payout. Compare financials by location and keep overdue amounts in view, without rebuilding the numbers in a spreadsheet."],
  ["Collections, payouts and operating indicators in one workspace.", "Payments, payouts and financials by location."],
  ["Build it once. Coach it through the app.", "From the program to the gym floor."],
  ["Create reusable, versioned programs and enrol members without sending another PDF.", "Build a program your coaches can use in class and your members can follow in the app."],
  ["Start with a deep exercise library, then keep your own coaching detail alongside it.", "Find the movements your coaches need, with room for their own notes and coaching detail."],
  ["Want to see it on your own gym's numbers?", "Let’s start with your gym."],
  ["We'll walk you through the platform with your locations, your classes and your plans in front of you.", "Tell us how your gym runs today and where you want to take it. We’ll show you how Movena fits."],
];

const membersCopy: readonly CopyPair[] = [
  ["<h1>One member.<br>One Movena identity.</h1>", "<h1>Your gym.<br>Your training.<br>Your progress.</h1>"],
  ["One account across participating Movena gyms. Keep your personal progress connected, while each gym manages its own memberships, bookings and training records.", "Book your next class. Follow your coach’s program. See your progress build. One account across participating Movena gyms, with each gym’s records kept separate."],
  ["Movena comes from your gym. You join through their invite, not through a public sign-up.", "Get started with an invitation from your gym."],
  ["Book and cancel in seconds", "Your next class, booked"],
  ["The bits you'll use every day.", "Ready for your next session."],
  ["Anything your membership covers. Full class? Join the waitlist. If your gym enables automatic promotion, the next person in the queue is booked and notified when an eligible spot opens before booking closes and class starts.", "Book classes your membership covers. Full class? Join the waitlist. If your gym enables automatic promotion, you’re booked and notified when an eligible place opens for you, before bookings close and class starts."],
  ["Tap your name on the gym’s check-in tablet for a class you’re booked on. Check-in opens shortly before class—30 minutes by default, adjustable by your gym.", "Booked in? Tap your name on the gym’s tablet when you arrive. Check-in opens 30 minutes before class by default; your gym can adjust the window."],
  ["The day's training, laid out. Every movement, set and load.", "Your coach’s program, ready to follow. See the movements, sets and loads for the session."],
  ["One private thread with your gym's team. Never other members. Never public.", "Send a private message to your gym’s team. Keep the conversation in one place."],
  ["Earn badges automatically at 5, 25, 50, 100, 150, 200, 250, 500 and 1,000 classes attended. Badges stay with the gym where you earned them; they don’t transfer to a new gym.", "From your 5th class to your 1,000th, attendance earns badges automatically. They stay with the gym where you earned them and don’t transfer to another gym."],
  ["Challenges count classes attended, minutes attended or daily streaks, with a live leaderboard. An optional finish line awards a finisher badge. Workout results don’t count towards challenges.", "Join a challenge measured in classes attended, minutes attended or daily streaks. Follow the live leaderboard. If your gym sets a finish line, reaching it earns a finisher badge. Workout results don’t count towards challenges."],
  ["A history that builds.", "Look back.<br>See what’s changed."],
  ["What your coach records becomes your record, not just the gym's. The movements you train, the sessions behind them, months of it — described plainly, never dressed up as advice.", "The sessions you showed up for. The movements you trained. The personal bests along the way. Look back at your recorded training, one session at a time."],
  ["When a result matches or beats a previous best, it gets marked. A moment, not a row in a table.", "Match or beat a recorded personal best and it gets marked. Find those moments again in your history."],
  ["The lifts you train often, with the recorded history behind each one.", "Find your familiar movements and the results you’ve recorded for each one."],
  ["Your own results. Your own pace. A record of what you trained, not a prescription for what to do next.", "Your results tell your story. Look back on what you’ve trained, at your own pace."],
  ["A place to train. A place to belong.", "Still part of it.<br>Between sessions."],
  ["Stay connected between sessions. Find what’s on, useful advice and stories from your gym—all in Hangout, inside the Movena app.", "Catch up on gym news, find what’s on and explore articles and videos in Hangout. Your gym’s community, in the same app."],
  ["Useful articles and videos, with pinned advice easy to find.", "Articles, videos and pinned tips from your gym, ready when you want them."],
  ["Your gym shop. In your pocket.", "Find it in the app.<br>Pick it up at the gym."],
  ["Browse and pay in the Movena app, then collect your purchase at the gym. No delivery or shipping.", "Your gym’s merchandise, alongside your bookings and training. Browse, pay and collect at the gym. No delivery or shipping."],
  ["Choose whether to share a personal-best summary with another gym. Your detailed workout records stay with the gym where they were recorded.", "You choose whether another gym can see a summary of your personal bests. Your detailed workout records stay with the gym where you trained."],
  ["It can follow you", "You choose what follows you"],
  ["Share a summary of your personal bests, per gym, and withdraw that permission whenever you want. Raw workout logs aren’t shared across gyms.", "Choose which gym can see your personal-best summary. Withdraw that permission whenever you want. Raw workout logs aren’t shared across gyms."],
  ["Asked in plain language, per gym. Never bundled. Health data is optional and separate.", "Sharing choices are explained in plain language, for each gym. Health data is optional and needs separate consent."],
  ["Account deletion is by request to Movena, not a self-serve button. Deletion removes gym records, including badges, subject to records we must retain. We explain what is kept and why.", "To delete your account, contact Movena. We remove your gym records, including badges, except records we’re required to keep. We explain what stays and why."],
  ["Run the experience behind the app.", "Bring this experience to your gym."],
  ["Keep memberships, bookings, payments, check-ins, programming and progress connected in one place.", "Give members the app you see here, with memberships, bookings, payments and your team connected behind it."],
  ["We'll help — or point you to your gym.", "A little help, in the right place."],
  ["Sign-in, notifications, your personal information — that's us. Bookings, billing and membership — your gym knows your account best.", "Ask your gym about bookings, billing and your membership. For sign-in, notifications or your personal information, talk to us."],
];

export function rewriteMarketingPageCopy(markup: string, source: LegacySource): string {
  const pairs = source === "platform/index.html" ? platformCopy
    : source === "members/index.html" ? membersCopy : [];
  return pairs.reduce((result, [before, after]) => {
    const pattern = new RegExp(before.split(/\s+/).map(part => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("\\s+"));
    if (!pattern.test(result)) throw new Error(`Marketing copy not found in ${source}: ${before}`);
    return result.replace(pattern, () => after);
  }, markup);
}
