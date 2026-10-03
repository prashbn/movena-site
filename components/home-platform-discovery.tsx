"use client";

import { useRef, useState } from "react";
import { HomeDiscoveryIcon, type DiscoveryIconName } from "./home-discovery-icon";

const areas: { id: string; label: string; title: string; icon: DiscoveryIconName; features: [string, string][] }[] = [
  { id: "day", label: "The day", title: "Keep the day moving.", icon: "day", features: [
    ["Timetable & bookings", "Templates, capacity and waitlists."],
    ["Kiosk check-in", "Members check themselves in."],
    ["Digital waivers", "Signed, versioned, stored."],
  ] },
  { id: "money", label: "The money", title: "Keep the money in view.", icon: "money", features: [
    ["Memberships & billing", "Card, BECS direct debit and PayTo. Or track payments made in person."],
    ["Accounting", "Direct Xero and QuickBooks sync. MYOB-ready exports."],
    ["Retail", "Merchandise for collection at your gym."],
  ] },
  { id: "member", label: "The member", title: "Stay close to your members.", icon: "member", features: [
    ["Leads & enquiries", "A form for your site. A pipeline for your desk."],
    ["Messaging", "Threads and broadcasts. Moderated."],
  ] },
  { id: "team", label: "The team", title: "Work as one team.", icon: "team", features: [
    ["Programming", "A builder and catalogue, straight to the app."],
    ["Team & locations", "Set access by role and location."],
  ] },
];

export function HomePlatformDiscovery() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <section id="platform" className="home-discovery-platform" aria-labelledby="home-platform-heading">
      <div className="wrap">
        <span className="kicker">The platform</span>
        <h2 id="home-platform-heading">Everything a gym runs on.</h2>
        <p className="sec-lede">One platform. One member record. Every location.</p>
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
              aria-labelledby={`home-tab-${area.id}`} hidden={index !== active} tabIndex={0}>
              <div className="home-discovery-panel__heading">
                <span className="home-discovery-icon"><HomeDiscoveryIcon name={area.icon} /></span>
                <h3>{area.title}</h3>
              </div>
              <ul>{area.features.map(([title, description]) => <li key={title}><h4>{title}</h4><p>{description}</p></li>)}</ul>
            </div>
          ))}
        </div>
        <a className="link-arrow home-discovery-platform__link" href="/platform/">Explore the platform <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}
