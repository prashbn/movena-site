import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Movena — homepage concept",
  description: "A separate, product-led homepage concept for review.",
  robots: { index: false, follow: false },
};

function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className={styles.textLink} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}

function Phone({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <figure className={styles.phone}>
      {/* Original app pixels, contained rather than cropped. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} width="1320" height="2868" alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" />
    </figure>
  );
}

export default function HomepageConcept() {
  return (
    <div className="site-shell">
      <a className="visually-hidden" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main" className={styles.root}>
        <div className={styles.reviewBar}>
          <span>Homepage concept · For review only</span>
          <Link href="/">View the current homepage <span aria-hidden="true">↗</span></Link>
        </div>

        <section className={`${styles.container} ${styles.hero}`} aria-labelledby="concept-heading">
          <p className={styles.eyebrow}>Made for the way your gym moves</p>
          <div className={styles.heroIntro}>
            <h1 id="concept-heading">The gym platform that<br className={styles.desktopBreak} /> remembers the training<span className={styles.blue}>.</span></h1>
            <div className={styles.heroCopy}>
              <p>Run the business. Capture the session. Give members a training history they keep.</p>
              <div className={styles.actions}>
                <Link className={styles.button} href="/contact/">Book a walkthrough <span aria-hidden="true">↗</span></Link>
                <a className={styles.textLink} href="#meet-movena">Meet Movena <span aria-hidden="true">↓</span></a>
              </div>
            </div>
          </div>
          <figure className={styles.heroPhoto}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/home-hero-banner.jpg" width="2400" height="1601" loading="eager" fetchPriority="high" decoding="async" alt="A coach recording a member's barbell training on the gym floor" />
            <figcaption><span>On the floor.</span><span>In the app.</span><span>All connected.</span></figcaption>
          </figure>
          <ul className={styles.proof} aria-label="Movena at a glance">
            <li>Built in Australia</li><li>Unlimited members &amp; team</li><li>Native iPhone &amp; Android apps</li><li>Single sites &amp; multi-location gyms</li>
          </ul>
        </section>

        <section id="meet-movena" className={`${styles.container} ${styles.story}`} aria-labelledby="run-heading">
          <div className={styles.copy}>
            <p className={styles.eyebrow}>01 / Run the gym</p>
            <h2 id="run-heading">Less switching.<br />More coaching.</h2>
            <p>Memberships, payments, bookings and your team. Connected in one place, so the business keeps moving while you’re on the floor.</p>
            <ArrowLink href="/platform/">Explore the platform</ArrowLink>
            <p className={styles.detail}>Card · BECS direct debit · PayTo</p>
          </div>
          <figure className={styles.browser}>
            <div className={styles.browserBar}><span aria-hidden="true">● ● ●</span><span>Movena / Financials</span></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/product-screenshots/movena-financials.png" width="3350" height="1776" loading="lazy" decoding="async" alt="Movena Financials showing payments, collections and a breakdown by product and location" />
            <figcaption>Actual product screen · Demonstration data</figcaption>
          </figure>
        </section>

        <div className={`${styles.container} ${styles.trainingPhoto}`}>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/home-pilates/class-1600.jpg" srcSet="/home-pilates/class-900.jpg 900w, /home-pilates/class-1600.jpg 1600w" sizes="(max-width: 1300px) 100vw, 1260px" width="1600" height="900" loading="lazy" decoding="async" alt="Members following their coach through a reformer Pilates class" />
            <figcaption>Different ways to train. One connected experience.</figcaption>
          </figure>
        </div>

        <section className={styles.trainingBand} aria-labelledby="training-heading">
          <div className={styles.container}>
            <div className={styles.trainingIntro}>
              <p className={styles.eyebrow}>02 / Remember the training</p>
              <h2 id="training-heading">The session doesn’t end<br />at the gym door.</h2>
              <p>Build the program. Record the movements, loads and results.<br className={styles.desktopBreak} /> The day’s training is there for members to follow in the app.</p>
            </div>
            <div className={styles.trainingFlow}>
              <figure className={styles.browser}>
                <div className={styles.browserBar}><span aria-hidden="true">● ● ●</span><span>For the coach / Program builder</span></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/product-screenshots/movena-program-builder.png" width="3352" height="1922" loading="lazy" decoding="async" alt="Movena program builder with a four-day strength program" />
                <figcaption>Actual product screen · Demonstration data</figcaption>
              </figure>
              <span className={styles.flowArrow} aria-hidden="true">→</span>
              <div className={styles.workoutPreview}>
                <Phone src="/members-screens/1.8.0/workout-dark.png" alt="The member's workout in the Movena app, with movements, sets and repetitions" />
                <p>For the member / Today’s workout</p>
              </div>
            </div>
            <div className={styles.trainingLink}><ArrowLink href="/platform/">See how programming connects</ArrowLink></div>
          </div>
        </section>

        <section className={`${styles.container} ${styles.story} ${styles.memberStory}`} aria-labelledby="member-heading">
          <div className={styles.memberVisual}>
            <Phone src="/members-screens/1.8.0/home.png" alt="Movena member app in light mode showing a personal best and recent training activity" />
            <Phone src="/members-screens/1.8.0/progress-dark.png" alt="Movena member app in dark mode showing a bench press result and training history" />
          </div>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>03 / In their pocket</p>
            <h2 id="member-heading">An app worth<br />opening.</h2>
            <p>Book the next session. Follow the workout. See the lifts, moments and milestones build into a history that belongs to them.</p>
            <ArrowLink href="/members/">See the member experience</ArrowLink>
            <div className={styles.download}>
              <Link href="/app/" aria-label="Get the Movena app">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/app/movena-app-page-qr.png" width="160" height="160" loading="lazy" decoding="async" alt="QR code to open the Movena app download page" />
              </Link>
              <div><strong>For iPhone and Android.</strong><Link href="/app/">Get the app <span aria-hidden="true">↗</span></Link></div>
            </div>
          </div>
        </section>

        <section className={styles.communityBand} aria-labelledby="community-heading">
          <div className={`${styles.container} ${styles.story}`}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>04 / Hangout</p>
              <h2 id="community-heading">A place to train.<br />A place to belong.</h2>
              <p>Keep your members connected between sessions. Share what’s on, useful advice and stories from your gym—all in Hangout, inside the Movena app.</p>
              <ArrowLink href="/members/#members-hangout-heading">Discover the member experience</ArrowLink>
              <ul className={styles.hangoutTopics}><li>What’s On</li><li>Know How</li><li>The Goss</li></ul>
            </div>
            <figure className={styles.communityPhoto}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/home-yoga/group-1600.jpg" srcSet="/home-yoga/group-900.jpg 900w, /home-yoga/group-1600.jpg 1600w" sizes="(max-width: 800px) 100vw, 650px" width="1600" height="900" loading="lazy" decoding="async" alt="Four women sharing a moment together in a yoga studio, holding rolled mats" />
            </figure>
          </div>
        </section>

        <section className={`${styles.container} ${styles.closing}`} aria-labelledby="closing-heading">
          <p className={styles.eyebrow}>Built for Australian gyms</p>
          <h2 id="closing-heading">More time for<br />the people who show up<span className={styles.blue}>.</span></h2>
          <p>Tell us about your gym. We’ll show you where Movena fits.</p>
          <Link className={styles.button} href="/contact/">Let’s talk about your gym <span aria-hidden="true">↗</span></Link>
          <Link className={styles.pricingLink} href="/pricing/">Or explore pricing</Link>
        </section>
      </main>
      <SiteFooter marketing />
    </div>
  );
}
