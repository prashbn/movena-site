import type { Metadata } from "next";
import Image from "next/image";

import { AppStoreActions, PlatformMarks } from "@/components/app-store-actions";
import { CommercialPageShell } from "@/components/page-shells";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";

const route = routeByPath("/app/");

export const metadata: Metadata = createRouteMetadata(route);

export default function MemberAppPage() {
  return (
    <CommercialPageShell activePath="/app/">
      <section className="member-app-page" aria-labelledby="member-app-title">
        <header className="commercial-wrap member-app-intro">
          <p className="commercial-kicker">Movena member app</p>
          <h1 id="member-app-title">Download Movena.</h1>
          <p>
            Book, train and keep your progress with you. Native apps for iPhone
            and Android.
          </p>
        </header>

        <div className="commercial-wrap">
          <article className="member-app-download-card">
            <div className="member-app-download-card__copy">
              <p className="member-app-availability">
                Available on <PlatformMarks />
              </p>
              <h2>Your gym. Your training. One app.</h2>
              <p className="member-app-download-card__description">
                Book classes, check in, follow your program and watch your
                training history build with every session.
              </p>
              <AppStoreActions />
            </div>

            <div className="member-app-product-stage" aria-label="Movena app screens">
              <figure className="member-app-product-shot member-app-product-shot--book">
                <Image
                  src="/assets/members/movena-member-book.png"
                  width={1320}
                  height={2868}
                  priority
                  sizes="(max-width: 760px) 48vw, 22vw"
                  alt="Movena class booking app screen"
                />
              </figure>
              <figure className="member-app-product-shot member-app-product-shot--home">
                <Image
                  src="/assets/members/movena-member-home.png"
                  width={1320}
                  height={2868}
                  priority
                  sizes="(max-width: 760px) 58vw, 27vw"
                  alt="Movena member home and training progress screen"
                />
              </figure>
              <figure className="member-app-product-shot member-app-product-shot--progress">
                <Image
                  src="/assets/members/movena-member-movements.png"
                  width={1320}
                  height={2868}
                  sizes="(max-width: 760px) 48vw, 22vw"
                  alt="Movena strength progress and movement history screen"
                />
              </figure>
            </div>

            <div className="member-app-qr">
              <Image
                src="/assets/app/movena-app-page-qr.png"
                width={420}
                height={420}
                alt="QR code for movena.com.au/app/"
              />
              <p>
                <strong>Scan to get Movena.</strong>
                <span>Opens movena.com.au/app/</span>
              </p>
            </div>
          </article>

          <div className="member-app-benefits" aria-label="Movena member app features">
            <p><strong>Book.</strong> Find classes and secure your place.</p>
            <p><strong>Train.</strong> Follow the programming from your coach.</p>
            <p><strong>Progress.</strong> Keep every session and milestone together.</p>
          </div>
        </div>
      </section>
    </CommercialPageShell>
  );
}
