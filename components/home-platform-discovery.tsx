"use client";

import { useRef, useState } from "react";
import { HomeProductWindow } from "./home-product-window";
import { homeWorkflows as areas } from "@/lib/home-workflows";

export function HomePlatformDiscovery() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <section id="platform" className="home-discovery-platform" aria-labelledby="home-platform-heading">
      <div className="wrap">
        <span className="kicker">The platform</span>
        <h2 id="home-platform-heading">Everything a gym runs on.</h2>
        <p className="sec-lede">One platform. One member record. Every location.</p>
        <div className="home-financials-proof">
          <div className="home-financials-proof__copy">
            <h3>Less switching.<br />More coaching.</h3>
            <p>Memberships, payments, bookings and your team. Connected in one place, so the business keeps moving while you’re on the floor.</p>
            <a className="link-arrow" href="/platform/">Explore the platform <span aria-hidden="true">→</span></a>
            <p className="home-financials-proof__detail">Card · BECS direct debit · PayTo</p>
          </div>
          <HomeProductWindow label="Movena / Financials"
            src="/product-screenshots/movena-financials.png" width={3350} height={1776}
            alt="Movena Financials showing collected payments, fees, next payout and revenue by product and location" />
        </div>
        <div className="home-discovery-tabs" role="tablist" aria-label="Explore the platform">
          {areas.map((area, index) => (
            <button key={area.id} ref={el => { tabs.current[index] = el; }} type="button" role="tab"
              id={`home-tab-${area.id}`} aria-controls={`home-area-${area.id}`} aria-selected={index === active}
              tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)}
              onKeyDown={event => {
                let next = index;
                if (event.key === "ArrowRight") next = (index + 1) % areas.length;
                else if (event.key === "ArrowLeft") next = (index + areas.length - 1) % areas.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = areas.length - 1;
                else return;
                event.preventDefault(); setActive(next); tabs.current[next]?.focus();
              }}>{area.label}</button>
          ))}
        </div>
        <div className="home-discovery-panels">
          {areas.map((area, index) => (
            <div key={area.id} className="home-discovery-panel" id={`home-area-${area.id}`} role="tabpanel"
              aria-labelledby={`home-tab-${area.id}`} hidden={index !== active} inert={index !== active ? true : undefined} tabIndex={0}>
              <div className="home-discovery-panel__copy">
                <span className="home-workflow-kicker">{area.label} / In practice</span>
                <h3>{area.title}</h3>
                <p className="home-discovery-panel__description">{area.description}</p>
                <ul>{area.features.map(([title, description]) => <li key={title}><h4>{title}</h4><p>{description}</p></li>)}</ul>
              </div>
              <div className="home-workflow">
                <span className="home-workflow-kicker">Illustrative workflow · Not a product screen</span>
                <h4>{area.example}</h4>
                <ol>{area.steps.map((step, stepIndex) => (
                  <li key={step.title}>
                    <span className="home-workflow__number" aria-hidden="true">{stepIndex + 1}</span>
                    <div><span className="home-workflow__mode">{step.mode}</span><strong>{step.title}</strong><p>{step.detail}</p></div>
                  </li>
                ))}</ol>
                <p className="home-workflow__note">{area.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
