# Homepage connected capabilities

Source review: GymOS owner help centre and its Markdown articles, 22 October 2026.
The help landing page groups the articles under `docs/help/owner-guide/`.
This is a read-only code/documentation check, not a live-product acceptance test.
No GymOS files were changed. This marketing change is for dev review only.

The visual now represents 24 capabilities rather than eight selected examples.
These are capability labels, not a claim to replace 24 separate applications.

| Visual label | GymOS source relative to `docs/help/owner-guide/` |
| --- | --- |
| Memberships | `members/pause-or-cancel-a-membership.md` |
| Class packs | `billing/creating-plans-and-packs.md` |
| Timetables | `timetable/templates-and-generation.md` |
| Bookings & waitlists | `timetable/bookings-and-waitlists.md` |
| Payments | `billing/taking-payment.md` |
| Programs | `programming/program-planner.md` |
| Workout builder | `programming/workout-builder.md` |
| Exercise progress | `members/exercise-progress.md` |
| Leads | `leads/working-with-leads.md` |
| Attendance follow-ups | `members/attendance-follow-ups.md` |
| Team tasks | Existing positioning brief; separately checked `src/lib/services/staff-tasks.ts` and owner tasks page. No dedicated owner help article found. |
| Waivers | `waivers/creating-a-waiver.md`, `waivers/sending-and-signing.md` |
| Kiosk check-in | `kiosk/member-check-in.md` |
| Door access (add-on) | `access-control/buying-door-access.md`, `access-control/who-gets-in.md` |
| Messaging | `messaging/threads-and-broadcasts.md` |
| Hangout | `hangout.md` |
| Challenges | `members/challenges.md` |
| Milestones & rewards | `members/milestones-and-rewards.md` |
| Retail | `retail/selling-merchandise.md` |
| Financial reports | `financials/reading-this-page.md` |
| Multiple locations | `locations-team/locations.md` |
| ChatGPT & Claude | `locations-team/assistant-connectors.md` |
| Member app | `members/the-member-app.md` |
| Accounting exports | `financials/export-for-xero.md`, `financials/export-for-myob.md`, `financials/export-for-quickbooks.md` |

Accounting is labelled as exports: the documentation describes manual downloads,
not a live accounting sync. Kisi stays an optional add-on. Attendance follow-ups
are factual staff prompts, not cancellation predictions. The gym website article
explicitly says website booking is not available and the joining journey still
needs approval before promotion; no new website-booking claim is included.

The scroll visual settles into a six-column desktop/four-column phone grid.
Reduced-motion and short screens use the complete grid in normal page flow.
Circle borders now use the existing stronger border token; orbit lines have
slightly higher opacity. The approved palette, photos and existing animations stay.

Hierarchy refinement: the orbit uses three sizes, with Movena largest in the
centre. Memberships, bookings, payments, programs, leads, financial reports,
locations and the assistant connection have 100px circles on desktop; supporting
tools are 68px and detail capabilities 42px. Phone sizes are 72px, 48px and 34px.
Positions are composed separately for desktop and phone, rather than repeating
an evenly spaced ring. As they settle, all capability circles converge to one
size: 64px on desktop and 52px on phones. The static/reduced-motion grid uses
those same uniform sizes; Movena remains the central brand mark.

The thin outline symbols in this section have been replaced with a dedicated
filled symbol system and existing official OpenAI/Anthropic artwork for the
assistant connection. Thirteen fine concentric lines replace the three broad
rings. Only the visual stage pins during scrolling; the heading and footer use
normal flow. All 24 capabilities, reduced-motion fallback and reverse motion stay.
