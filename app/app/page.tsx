import type { Metadata } from "next";
import Image from "next/image";

import { CommercialPageShell } from "@/components/page-shells";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

const route = routeByPath("/app/");

export const metadata: Metadata = createRouteMetadata(route);

export default function MemberAppPage() {
  return (
    <CommercialPageShell activePath="/app/">
      <section className="member-app-hero" aria-labelledby="member-app-title">
        <div className="commercial-wrap member-app-hero__inner">
          <div className="member-app-hero__content">
            <p className="commercial-kicker">Movena member app</p>
            <h1 id="member-app-title">Your training, remembered.</h1>
            <p className="member-app-hero__platforms">
              Native Movena apps for iPhone and Android.
            </p>
            <p className="member-app-hero__description">
              Book classes, check in, follow your program, and watch a training
              history build with every session.
            </p>
            <div className="member-app-actions" aria-label="Download Movena">
              <a href={siteConfig.memberApp.appStoreUrl}>
                <span>Download on the</span>
                App Store
              </a>
              <a href={siteConfig.memberApp.googlePlayUrl}>
                <span>Get it on</span>
                Google Play
              </a>
            </div>
            <div className="member-app-qr">
              <Image
                src="/assets/app/movena-app-page-qr.png"
                width={420}
                height={420}
                alt="QR code for movena.com.au/app/"
              />
              <p>
                <strong>Open Movena on your phone.</strong>
                <span>Scan to visit movena.com.au/app/</span>
              </p>
            </div>
          </div>

          <div className="member-app-gallery" aria-label="Movena member app">
            <figure className="member-app-gallery__image member-app-gallery__image--primary">
              <Image
                src="/assets/app/movena-training-performance.jpg"
                width={1024}
                height={1024}
                priority
                sizes="(max-width: 760px) 86vw, 34vw"
                alt="Movena member app home and training performance screen on an iPhone"
              />
            </figure>
            <figure className="member-app-gallery__image member-app-gallery__image--secondary">
              <Image
                src="/assets/app/movena-class-booking.jpg"
                width={1024}
                height={1024}
                sizes="(max-width: 760px) 58vw, 20vw"
                alt="Movena member app class booking timetable on an iPhone"
              />
            </figure>
          </div>
        </div>
      </section>
    </CommercialPageShell>
  );
}
