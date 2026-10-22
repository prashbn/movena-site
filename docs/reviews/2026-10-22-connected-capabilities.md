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

## CRM reveal for dev review

The orbit now opens into two banks of capabilities as the owner scrolls. Movena
moves to the top and changes from its symbol tile to the approved wordmark.
The centre reveals an illustrative business workspace. Owners can switch its
Leads, Financials, Analytics and Hangout views. The attached product screenshots
guided the layout, but none is embedded in this section. Financial figures,
people and article text are examples; Hangout uses photos already on the site.
The caption says “Illustrative workspace · Example names and figures”.

The three sample stages — New, Contacted and Trial scheduled — are checked
against `src/app/(owner)/leads/page.tsx`. Converted is deliberately absent from
the active board. Board/Table/Follow-ups, location, assignee and next action/time
are checked against `docs/help/owner-guide/leads/working-with-leads.md`,
`src/components/leads/leads-kanban.tsx` and `lead-card.tsx`. The compact mobile
view shows the same three example people as a list. The other three views
adapt to the narrow space. No new product actions or outbound integrations are
introduced by the illustration.

Desktop has twelve capabilities on either side, each bank in two columns.
Phones use two slim icon rails to leave space for the CRM. The complete labelled
capability list and CRM remain in normal flow without JavaScript, with reduced
motion, or on short landscape screens. The portrait scene uses small-viewport
units so Safari's browser bars do not disable it or change its scroll travel.

Movement begins immediately, with short frame-rate-independent damping rather
than a long gather phase. The animation changes transforms and opacity; it no
longer resizes twenty-four circles during every frame. Reverse scrolling restores
the orbit. There are no timers, autoplay loops or scroll interception.

The initial orbit keeps its approved three-size hierarchy, balanced upper crown,
filled capability symbols, fine concentric rings and official partner marks.
All capability circles converge to equal sizes at either side of the CRM. The
central Movena tile remains light in dark mode and dark in light mode; partner
marks use light silhouettes on their dark surface. Existing photos, phones,
Loop animation, other pages and production are unchanged by this dev review.
