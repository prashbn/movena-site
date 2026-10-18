import { HomeProductWindow } from "./home-product-window";
import { HomeTrainingConnection } from "./home-training-connection";

const coaches = [
  { name: "Dana", location: "Newtown", sessions: 12, booked: 12, capacity: 14, attended: 11, cancelled: 1 },
  { name: "Mia", location: "Marrickville", sessions: 9, booked: 8, capacity: 10, attended: 8, cancelled: 0 },
  { name: "Alex", location: "Newtown", sessions: 10, booked: 9, capacity: 12, attended: 8, cancelled: 1 },
];

export function HomeOwnerPage() {
  return (
    <main id="main" className="owner-home">
      <header className="hero owner-photo-hero">
        <div className="wrap">
          <div className="split">
            <div>
              <p className="owner-eyebrow">One location or many. Five spreadsheets. No idea what&apos;s working.</p>
              <h1>Run every location from one place.</h1>
              <p className="lede">Memberships, bookings, payments, programs, waivers, check-ins and door access, with every coach&apos;s classes and every task in view. Start with one location; add the next on the same system.</p>
              <div className="hero-ctas">
                <a className="btn btn-primary" href="/contact/">Book a demo</a>
                <a className="btn btn-ghost" href="#locations">See how it works</a>
              </div>
              <p className="hero-note">Built for Australian gym owners. One location through to multi-site.</p>
            </div>
            <div aria-hidden="true" />
          </div>
        </div>
      </header>
      <div className="facts"><div className="wrap facts-in"><span className="fact">Built in Australia</span><span className="fact">One account, every location</span><span className="fact">Location-scoped team access</span><span className="fact">Unlimited members and team</span></div></div>

      <section id="locations" className="owner-section" aria-labelledby="owner-locations-heading">
        <div className="wrap owner-split">
          <div className="owner-copy">
            <span className="kicker">01 / Your business</span>
            <h2 id="owner-locations-heading">See every location.</h2>
            <p>Stop rebuilding the picture in a spreadsheet. Switch locations across members, billing, your dashboard and analytics. See financials for one location or the whole business.</p>
            <p>Your managers see the locations they run. You keep the full view.</p>
          </div>
          <HomeProductWindow label="Movena / Financials"
            src="/product-screenshots/movena-financials.png" width={3350} height={1776}
            alt="Movena Financials with a location filter, collected payments, next payout and revenue breakdowns" />
        </div>
      </section>

      <section id="coaches" className="owner-section" aria-labelledby="owner-coaches-heading">
        <div className="wrap owner-split">
          <div className="owner-copy">
            <span className="kicker">02 / The coaching floor</span>
            <h2 id="owner-coaches-heading">See every coach&apos;s classes.</h2>
            <p>See sessions run, booked places against capacity, attendance and cancellations. Look by location and by coach, so you can see where classes are filling and where there is room.</p>
            <figure className="shot owner-coaching-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/home-pilates/class-1600.jpg" srcSet="/home-pilates/class-900.jpg 900w, /home-pilates/class-1600.jpg 1600w"
                sizes="(max-width: 1000px) 100vw, 44vw" width="1600" height="900" loading="lazy" decoding="async"
                alt="A group Pilates class extending their arms with straps while kneeling on reformers" />
            </figure>
          </div>
          <figure className="owner-proof owner-coaches-example">
            <figcaption className="owner-example-label">Illustrative example · Not a product screen</figcaption>
            <div className="owner-example-body">
              <div className="owner-location-heading"><strong>Classes by coach</strong><span>Example period</span></div>
              <div className="owner-coach-list">{coaches.map(coach => (
                <div className="owner-coach" key={coach.name}>
                  <div className="owner-coach__heading"><strong>{coach.name} <span>{coach.location}</span></strong><span>{coach.sessions} sessions run</span></div>
                  <div className="owner-coach__fill"><span style={{ width: `${coach.booked / coach.capacity * 100}%` }} /></div>
                  <p><b>Latest class: {coach.booked} / {coach.capacity} booked</b><span>{coach.attended} attended · {coach.cancelled} cancelled</span></p>
                </div>
              ))}</div>
            </div>
          </figure>
        </div>
      </section>

      <section id="needs-you" className="owner-section owner-section--attention" aria-labelledby="owner-attention-heading">
        <div className="wrap owner-split">
          <div className="owner-copy">
            <span className="kicker">03 / Your next move</span>
            <h2 id="owner-attention-heading">Know what needs you.</h2>
            <p>Past-due memberships, refunds that did not reach the member, leads waiting for a response. One list, with the amount owed and a direct path to the member or lead.</p>
          </div>
          <figure className="owner-proof owner-attention-example">
            <figcaption className="owner-example-label">Illustrative example · Not a product screen</figcaption>
            <div className="owner-example-body">
              <div className="owner-location-heading"><strong>Needs you</strong><span>All locations</span></div>
              <div className="owner-action-row"><span className="owner-action-dot" /><div><strong>Membership past due</strong><span>Jamie Lee · Newtown</span></div><b>$142 owed</b></div>
              <div className="owner-action-row"><span className="owner-action-dot" /><div><strong>Refund did not reach member</strong><span>Sam Taylor · Marrickville</span></div><b>$35 refund</b></div>
              <div className="owner-action-row"><span className="owner-action-dot" /><div><strong>Lead waiting for follow-up</strong><span>Amelia Chen · Newtown</span></div><b>Due today</b></div>
              <p className="owner-example-foot">Go straight from the item to the person who needs your attention.</p>
            </div>
          </figure>
        </div>
      </section>

      <section id="enquiries" className="owner-section" aria-labelledby="owner-enquiries-heading">
        <div className="wrap owner-leads-panel">
          <div className="owner-copy">
            <span className="kicker">04 / From enquiry to member</span>
            <h2 id="owner-enquiries-heading">Turn enquiries into members.</h2>
            <p>Website forms, Facebook and Instagram lead ads, and Google lead forms bring enquiries into one place.</p>
            <ol className="owner-lead-steps">
              <li><strong>A next step. A due time.</strong><span>Movena reminds the right person and escalates overdue follow-ups to you.</span></li>
              <li><strong>A draft you approve.</strong><span>Movena drafts the follow-up email from the enquiry and the lead&apos;s latest reply. You read it, edit it and approve it before anything is sent.</span></li>
              <li><strong>The conversation stays together.</strong><span>Replies come back into the lead. See contacted, trialled, converted and lost in your funnel, by location.</span></li>
            </ol>
            <a className="link-arrow" href="/legal/privacy/">How drafting uses information <span aria-hidden="true">→</span></a>
          </div>
          <figure className="owner-proof owner-lead-example">
            <figcaption className="owner-example-label">Illustrative example · Not a product screen</figcaption>
            <div className="owner-example-body">
              <div className="owner-location-heading"><strong>Amelia Chen</strong><span>Newtown</span></div>
              <p className="owner-lead-source">Website enquiry · Interested in a trial</p>
              <div className="owner-next-step"><span>Next step</span><strong>Follow up about a trial</strong><p>Dana · Due today</p></div>
              <div className="owner-draft"><span className="owner-draft__label">Draft · Awaiting your approval</span><p>Hi Amelia, thanks for getting in touch. You mentioned an evening trial. Which day would work for you?</p><span className="owner-draft__foot">Read. Edit. Approve before sending.</span></div>
              <p className="owner-funnel-label">Your funnel, by location</p>
              <div className="owner-funnel"><span>Contacted</span><span>Trialled</span><span>Converted</span><span>Lost</span></div>
            </div>
          </figure>
        </div>
      </section>

      <section id="team" className="owner-section" aria-labelledby="owner-team-heading">
        <div className="wrap">
          <div className="owner-section-heading"><div><span className="kicker">05 / Work that gets done</span><h2 id="owner-team-heading">Keep your team on track.</h2></div><p>Give tasks a place beyond the group chat. Assign staff by location, move work across the board and add comments. See what is open and what is overdue.</p></div>
          <figure className="owner-proof owner-task-board">
            <figcaption className="owner-example-label">Illustrative example · Not a product screen</figcaption>
            <div className="owner-board-columns">
              <div><h3>To do</h3><article><span className="owner-task-location">Newtown</span><strong>Follow up trial enquiry</strong><p>Dana · Due today</p><span className="owner-task-state">Open</span></article></div>
              <div><h3>In progress</h3><article><span className="owner-task-location">Marrickville</span><strong>Check failed refund</strong><p>Mia · Comment added</p><span className="owner-task-state owner-task-state--due">Overdue</span></article></div>
              <div><h3>Done</h3><article><span className="owner-task-location">Newtown</span><strong>Prepare next week&apos;s sessions</strong><p>Alex · Programming</p><span className="owner-task-state">Done</span></article></div>
            </div>
          </figure>
        </div>
      </section>

      <section id="programs" className="owner-section" aria-labelledby="owner-programs-heading">
        <div className="wrap">
          <div className="owner-section-heading"><div><span className="kicker">06 / Programs your coaches run</span><h2 id="owner-programs-heading">The gym platform that remembers the training.</h2></div><p>Your coaches build programs and session types, run them in class and record the training. Members follow along and see their progress in the Movena app. The class and coach numbers start here.</p></div>
          <HomeTrainingConnection showIntro={false} />
        </div>
      </section>

      <section id="sign-up" className="owner-section owner-section--compact" aria-labelledby="owner-waivers-heading">
        <div className="wrap owner-support-card owner-support-row">
          <div><span className="kicker">07 / A clearer start</span><h2 id="owner-waivers-heading">Sign-up without the paperwork.</h2></div>
          <p>Digital waivers with an intake questionnaire, signed on the member&apos;s phone or at your front-desk kiosk. Stored against the member, ready when your team needs them.</p>
        </div>
      </section>

      <section id="access" className="owner-section owner-section--compact" aria-labelledby="owner-access-heading">
        <div className="wrap owner-support-card owner-support-row owner-access">
          <div><span className="kicker">08 / Optional add-on</span><h2 id="owner-access-heading">Doors that know who&apos;s paid.</h2></div>
          <div><p>Kisi door access follows each member&apos;s membership and bookings. Access stops when a membership ends or a payment is overdue after the grace period you set. It returns when the payment is made.</p><p>Requires Kisi hardware at each site. Hardware and Kisi subscriptions are purchased separately.</p><a className="link-arrow" href="/integrations/kisi/">See Movena + Kisi <span aria-hidden="true">→</span></a></div>
        </div>
      </section>

      <section id="growth" className="owner-section" aria-labelledby="owner-growth-heading">
        <div className="wrap owner-growth">
          <div className="owner-copy"><span className="kicker">09 / The next location</span><h2 id="owner-growth-heading">Grows with you.</h2><p>One location today. Five tomorrow. A multi-site business later. Keep the same account and data as you add locations, with roles and location-scoped access for managers and staff.</p></div>
          <ol className="owner-growth-path"><li><b>01</b><strong>Your first location</strong><span>Get the whole business in view.</span></li><li><b>05</b><strong>Your next chapter</strong><span>Add locations on the same system.</span></li><li><b>↗</b><strong>Your multi-site business</strong><span>Keep every location in one view.</span></li></ol>
        </div>
      </section>

      <section id="included" className="owner-section" aria-labelledby="owner-included-heading">
        <div className="wrap owner-included"><h2 id="owner-included-heading">Also included.</h2><ul><li>Online payments and Direct Debit through Stripe</li><li>Xero accounting connection</li><li>Kiosk check-in</li><li>Retail at the front desk</li><li>Member messaging</li><li>Challenges</li><li>Member app for iOS and Android</li></ul></div>
      </section>

      <section id="next-step" className="home-closing owner-photo-closing" aria-labelledby="owner-closing-heading">
        <div className="wrap-band">
          <div className="home-photo-panel home-closing__panel">
            <picture className="home-photo-panel__photo home-closing__photo">
              <source media="(max-width: 700px)" srcSet="/home-closing/member-mobile-900.jpg" />
              <img src="/home-closing/member-1800.jpg" srcSet="/home-closing/member-900.jpg 900w, /home-closing/member-1800.jpg 1800w"
                sizes="(max-width: 1800px) 100vw, 1720px" width="1800" height="1200" loading="lazy" decoding="async"
                alt="A woman in blue activewear using her phone on the gym floor" />
            </picture>
            <div className="home-photo-panel__copy home-closing__copy">
              <span className="kicker">Built for Australian gym owners</span>
              <h2 id="owner-closing-heading">See your business on Movena.</h2>
              <p>Tell us about your locations, your team and where you want to go.</p>
              <a className="btn btn-primary" href="/contact/">Book a demo</a>
            </div>
          </div>
          <nav className="owner-closing-links" aria-label="Explore Movena"><a href="/integrations/">Integrations</a><a href="/pricing/">Pricing</a><a href="/contact/">Contact</a></nav>
        </div>
      </section>
    </main>
  );
}
