import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { JsonLd } from "./json-ld";
import { CommercialPageShell } from "./page-shells";
import type { FeatureQuestion } from "@/lib/platform-features";
import type { PublicRoute } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";
import { featurePageStructuredData, softwareStructuredData } from "@/lib/structured-data";

export function PlatformFeaturePage({ route, questions, children }: {
  route: PublicRoute; questions: readonly FeatureQuestion[]; children: ReactNode;
}) {
  return (
    <CommercialPageShell activePath={route.path} variant="platform">
      <JsonLd data={softwareStructuredData} />
      <JsonLd data={featurePageStructuredData(route, questions)} />
      {children}
    </CommercialPageShell>
  );
}

export function FeatureHero({ eyebrow, title, description, photo, alt }: {
  eyebrow: string; title: ReactNode; description: string; photo: string; alt: string;
}) {
  return (
    <header className="hero">
      <div className="wrap">
        <div className="split">
          <div>
            <nav className="feature-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Movena</Link><span aria-hidden="true">/</span>
              <Link href="/platform/">Platform</Link><span aria-hidden="true">/</span>
              <span aria-current="page">{eyebrow}</span>
            </nav>
            <span className="kicker">{eyebrow}</span>
            <h1>{title}</h1>
            <p className="lede">{description}</p>
            <div className="hero-ctas">
              <Link className="btn btn-primary" href={siteConfig.contactHref}>Book a demo</Link>
              <Link className="btn btn-ghost" href="/pricing/">See pricing</Link>
            </div>
          </div>
          <figure className="shot shot-portrait">
            <Image src={photo} width={1000} height={1250} alt={alt} priority sizes="(max-width: 900px) 100vw, 500px" />
          </figure>
        </div>
      </div>
    </header>
  );
}

export function FeatureFacts({ items }: { items: readonly string[] }) {
  return <div className="facts"><div className="wrap facts-in">
    {items.map(item => <span className="fact" key={item}>{item}</span>)}
  </div></div>;
}

export function FeatureIntro({ id, number, label, title, children }: {
  id: string; number: string; label: string; title: ReactNode; children?: ReactNode;
}) {
  return <>
    <div className="sec-kicker"><span className="sec-num mono">{number}</span><span className="kicker">{label}</span></div>
    <h2 id={id}>{title}</h2>
    {children && <p className="sec-lede">{children}</p>}
  </>;
}

export function WorkflowExample({ label, steps }: {
  label: string; steps: readonly { title: string; detail: string }[];
}) {
  return <figure className="frame feature-example">
    <div className="chrome"><span className="dot" /><span className="dot" /><span className="dot" /><span className="url mono">{label}</span></div>
    <div className="console-main">
      {steps.map((step, index) => <div className="row" key={step.title}>
        <span className="sec-num mono" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <span><span className="name">{step.title}</span><span className="meta">{step.detail}</span></span>
      </div>)}
    </div>
    <figcaption>Illustrative workflow · Not a product screenshot</figcaption>
  </figure>;
}

export function FeatureQuestions({ questions }: { questions: readonly FeatureQuestion[] }) {
  return <section className="feature-questions" aria-labelledby="feature-questions-heading">
    <div className="wrap">
      <span className="kicker">A few practical answers</span>
      <h2 id="feature-questions-heading">Before you ask.</h2>
      <div className="faq-list">
        {questions.map(({ question, answer }, index) => <details className="faq-item" key={question}>
          <summary><span className="faq-item__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="faq-item__question">{question}</span><span className="faq-item__toggle" aria-hidden="true" /></summary>
          <div className="faq-item__answer"><p>{answer}</p></div>
        </details>)}
      </div>
    </div>
  </section>;
}

export function FeatureClosing({ title, children, relatedHref, relatedLabel }: {
  title: string; children: ReactNode; relatedHref: "/gym-crm/" | "/multi-location-gym-management/"; relatedLabel: string;
}) {
  return <section className="close-cta">
    <div className="wrap">
      <span className="kicker">See Movena in action</span>
      <h2>{title}</h2>
      <p>{children}</p>
      <Link className="btn btn-primary" href={siteConfig.contactHref}>Book a demo</Link>
      <div className="feature-related"><Link className="link-arrow" href={relatedHref}>{relatedLabel} <span aria-hidden="true">→</span></Link></div>
    </div>
  </section>;
}
