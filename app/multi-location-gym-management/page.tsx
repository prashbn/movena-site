import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FeatureClosing, FeatureFacts, FeatureHero, FeatureIntro, FeatureQuestions, PlatformFeaturePage, WorkflowExample } from "@/components/platform-feature-page";
import { createRouteMetadata } from "@/lib/metadata";
import { multiLocationQuestions } from "@/lib/platform-features";
import { routeByPath } from "@/lib/routes";

const route = routeByPath("/multi-location-gym-management/");
export const metadata: Metadata = createRouteMetadata(route);

export default function MultiLocationPage() {
  return (
    <PlatformFeaturePage route={route} questions={multiLocationQuestions}>
      <FeatureHero
        eyebrow="Multi-location gym management"
        title={<>More locations.<br />One clear view.</>}
        description="Keep members, billing, classes and your team connected across every site. Start with one gym and add the next location to the same Movena account."
        photo="/assets/photos/reformer-coaching-1000.jpg"
        alt="A coach working with a member in a bright Pilates studio"
      />
      <FeatureFacts items={["One account across sites", "Financials by location", "Location-scoped access", "Your team, connected"]} />

      <section aria-labelledby="locations-view-heading">
        <div className="wrap">
          <FeatureIntro id="locations-view-heading" number="01" label="Every location" title="Switch locations. Keep your bearings.">
            You shouldn’t have to piece together the business from separate tools and spreadsheets. Switch between locations in members, billing, your dashboard and analytics.
          </FeatureIntro>
          <div className="caps">
            <article className="cap"><h3>The members and the money</h3><p>See members and billing for the location you need. Keep the detail with the person, and the financials with the site.</p><ul><li>Switch the location in members and billing</li><li>See financials by location</li></ul></article>
            <article className="cap"><h3>The whole business in view</h3><p>Move between local detail and the view across your locations. Give each manager a view of the locations they run.</p><ul><li>Location selection in your dashboard and analytics</li><li>Roles and location access for your team</li></ul></article>
          </div>
          <p className="hero-note">Location allowances and reporting capabilities depend on your plan. <Link href="/pricing/">See pricing and inclusions.</Link></p>
        </div>
      </section>

      <section className="platform-proof" aria-labelledby="locations-financials-heading">
        <div className="wrap">
          <div className="platform-proof__intro">
            <div><span className="kicker">02 / Financials</span><h2 id="locations-financials-heading">Every location.<br />Every dollar.</h2></div>
            <p>See what each location brings in, what is owed and what needs following up. Keep the numbers connected to the work.</p>
          </div>
          <div className="platform-proof__feature">
            <div className="platform-proof__copy">
              <span className="platform-proof__label">Inside Movena</span>
              <h3>See where things stand.</h3>
              <p>Review collected payments, fees and your next payout. Compare financials by location without rebuilding the numbers in a spreadsheet.</p>
              <ul><li>Collected payments and payouts</li><li>Financials by location</li><li>Past-due members and amounts owed</li></ul>
            </div>
            <figure className="platform-product-window">
              <div className="platform-product-window__bar"><span /><span /><span /><b>Movena / Financials</b></div>
              <Image src="/product-screenshots/movena-financials.png" width={3350} height={1776} sizes="(max-width: 900px) 100vw, 800px" alt="Movena Financials showing collected payments, fees, next payout and revenue by product and location" />
              <figcaption>Actual product screen · Demonstration data</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="locations-access-heading">
        <div className="wrap split">
          <div className="feature-copy">
            <FeatureIntro id="locations-access-heading" number="03" label="Your team" title={<>Local responsibility.<br />A wider view for you.</>} />
            <p>Your managers see the locations they run. Staff work with the access their role allows. You keep the view across the business.</p>
            <p>Roles and location access live in the same account, so opening another site doesn’t mean starting again with a separate system.</p>
          </div>
          <WorkflowExample label="Location access / Example" steps={[
            { title: "You", detail: "Keep the view across your locations." },
            { title: "Your managers", detail: "See only the locations they run." },
            { title: "Your staff", detail: "Work with role-appropriate access." },
          ]} />
        </div>
      </section>

      <section aria-labelledby="locations-work-heading">
        <div className="wrap">
          <FeatureIntro id="locations-work-heading" number="04" label="The work behind the numbers" title="See what’s happening on the floor.">
            Look at each coach’s classes, follow your enquiries and keep tasks in view. The detail stays connected to the location.
          </FeatureIntro>
          <div className="caps">
            <article className="cap"><h3>Every coach’s classes</h3><p>See sessions run, bookings against capacity, attendance and cancellations by coach and location.</p><ul><li>See which classes are full</li><li>Compare booked places with attendance</li></ul></article>
            <article className="cap"><h3>Team tasks by location</h3><p>Assign work to staff, move it across a Kanban board and keep comments with the task. See what is open and overdue.</p><ul><li>Give each task a person and a location</li><li>Keep the conversation with the work</li></ul></article>
            <article className="cap"><h3>Enquiries and conversions</h3><p>See contacted, trialled, converted and lost by location. Keep local follow-up connected to the view across your business.</p><p><Link className="link-arrow" href="/gym-crm/">Explore gym CRM <span aria-hidden="true">→</span></Link></p></article>
            <article className="cap"><h3>Know what needs you</h3><p>Members past due with the amount owed. Refunds that didn’t reach the member. Leads waiting. Open the issue and go straight to the person.</p><ul><li>Keep follow-up close to the member or lead</li><li>Choose the next step with their record in view</li></ul></article>
          </div>
        </div>
      </section>

      <section aria-labelledby="locations-growth-heading">
        <div className="wrap split">
          <div className="feature-copy">
            <FeatureIntro id="locations-growth-heading" number="05" label="Grows with you" title="Keep what you’ve built." />
            <p>One location today. Five tomorrow. A multi-site business later. Keep the same account and data, with more locations as you grow.</p>
            <p>Choose the plan for the stage you’re at. Your members, your team and your next location stay part of the same business.</p>
            <Link className="link-arrow" href="/pricing/">See location allowances and plans <span aria-hidden="true">→</span></Link>
          </div>
          <figure className="shot shot-feature"><Image src="/assets/photos/coaching-1254w.jpg" width={1254} height={836} sizes="(max-width: 900px) 100vw, 600px" alt="A coach on the gym floor helping a member with a barbell session" /></figure>
        </div>
      </section>

      <FeatureQuestions questions={multiLocationQuestions} />
      <FeatureClosing title="Start with the gym you’re building." relatedHref="/gym-crm/" relatedLabel="Explore gym CRM and lead management">
        Tell us where your business is today and where you want to take it. We’ll show you how Movena keeps your locations connected.
      </FeatureClosing>
    </PlatformFeaturePage>
  );
}
