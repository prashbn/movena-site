import type { Metadata } from "next";
import Link from "next/link";

import { FeatureClosing, FeatureFacts, FeatureHero, FeatureIntro, FeatureQuestions, PlatformFeaturePage, WorkflowExample } from "@/components/platform-feature-page";
import { createRouteMetadata } from "@/lib/metadata";
import { crmQuestions } from "@/lib/platform-features";
import { routeByPath } from "@/lib/routes";

const route = routeByPath("/gym-crm/");
export const metadata: Metadata = createRouteMetadata(route);

export default function GymCrmPage() {
  return (
    <PlatformFeaturePage route={route} questions={crmQuestions}>
      <FeatureHero
        eyebrow="Gym CRM and lead management"
        title={<>Every enquiry.<br />A clear next step.</>}
        description="Someone is thinking about joining your gym. Give your team one place to follow the conversation, arrange the next step and turn an enquiry into a member."
        photo="/assets/photos/front-desk-1000.jpg"
        alt="A gym team member at the front desk speaking with someone about joining"
      />
      <FeatureFacts items={["Website forms + lead ads", "Reminders + escalation", "You approve the email", "Funnel by location"]} />

      <section aria-labelledby="crm-capture-heading">
        <div className="wrap">
          <FeatureIntro id="crm-capture-heading" number="01" label="Capture" title="Bring enquiries together.">
            Your website, your ads and your team’s follow-up belong in the same conversation. Movena keeps your gym leads in one place.
          </FeatureIntro>
          <div className="caps">
            <article className="cap">
              <h3>From your website</h3>
              <p>Someone asks about a trial, a membership or getting started. Your website form brings the enquiry into Movena for your team to follow up.</p>
              <ul><li>Enquiries arrive in one lead list</li><li>Give each person a next step and a due time</li></ul>
            </article>
            <article className="cap">
              <h3>From your lead ads</h3>
              <p>Bring Facebook and Instagram lead ads, and Google lead forms, into the same place. Your team can work through enquiries together.</p>
              <ul><li>Facebook and Instagram lead capture</li><li>Google lead forms</li></ul>
            </article>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="crm-follow-up-heading">
        <div className="wrap split">
          <div className="feature-copy">
            <FeatureIntro id="crm-follow-up-heading" number="02" label="Follow up" title={<>A person to follow up.<br />A time to do it.</>} />
            <p>A good conversation needs a next step. Assign the person responsible and when the follow-up is due.</p>
            <p>Movena reminds the right person. When a follow-up is overdue, it escalates to you. Leads waiting also appear in your “needs you” list, with a direct path to the person.</p>
          </div>
          <WorkflowExample label="Lead follow-up / Example" steps={[
            { title: "Set the next step", detail: "Choose who follows up and when." },
            { title: "Remind the right person", detail: "Keep the due time in view." },
            { title: "Bring overdue work to you", detail: "Open the lead and choose what happens next." },
          ]} />
        </div>
      </section>

      <section aria-labelledby="crm-drafts-heading">
        <div className="wrap">
          <FeatureIntro id="crm-drafts-heading" number="03" label="Your conversation" title="A draft you have the final say on.">
            Movena drafts the follow-up email from the enquiry and the lead’s latest reply. You read it, edit it and approve it before anything is sent.
          </FeatureIntro>
          <div className="steps">
            <article className="card"><span className="n">01 / Context</span><h3>Start with the enquiry.</h3><p>The enquiry and latest reply give the draft its starting point.</p></article>
            <article className="card"><span className="n">02 / Review</span><h3>Make it sound like you.</h3><p>Read the draft and edit it for the person you’re speaking with.</p></article>
            <article className="card"><span className="n">03 / Approval</span><h3>You decide when it’s ready.</h3><p>Approve the email before it is sent. Your team stays in control of the conversation.</p></article>
          </div>
          <p className="hero-note"><Link className="link-arrow" href="/legal/privacy/">How we use your information <span aria-hidden="true">→</span></Link></p>
        </div>
      </section>

      <section aria-labelledby="crm-funnel-heading">
        <div className="wrap">
          <FeatureIntro id="crm-funnel-heading" number="04" label="See what happens next" title="From the first reply to membership.">
            Keep the conversation and its progress together. See where enquiries move forward and where your team needs to follow up.
          </FeatureIntro>
          <div className="caps">
            <article className="cap"><h3>Replies stay with the lead.</h3><p>Replies come back into the lead. Your team can pick up the conversation with the latest context in view.</p><ul><li>Keep the enquiry and replies together</li><li>Convert a lead to a member without retyping their details</li></ul></article>
            <article className="cap"><h3>See the funnel by location.</h3><p>See contacted, trialled, converted and lost for each location. Keep local follow-up and the view across your business connected.</p><ul><li>Follow the lead through each stage</li><li>Compare the funnel across your locations</li></ul></article>
          </div>
          <p className="feature-related"><Link className="link-arrow" href="/platform/">See the platform behind the CRM <span aria-hidden="true">→</span></Link></p>
        </div>
      </section>

      <FeatureQuestions questions={crmQuestions} />
      <FeatureClosing title="Let’s follow an enquiry through." relatedHref="/multi-location-gym-management/" relatedLabel="Explore multi-location management">
        Tell us how people find your gym today. We’ll show you how capture, follow-up and membership fit together in Movena.
      </FeatureClosing>
    </PlatformFeaturePage>
  );
}
