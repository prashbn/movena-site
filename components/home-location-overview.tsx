"use client";

import { useState } from "react";

const examples = {
  "All locations": { members: 248, collected: "$18,420", booked: "156 / 180", attention: 7 },
  Newtown: { members: 142, collected: "$10,680", booked: "92 / 104", attention: 4 },
  Marrickville: { members: 106, collected: "$7,740", booked: "64 / 76", attention: 3 },
} as const;
const views = ["Dashboard", "Members", "Billing", "Analytics"] as const;

export function HomeLocationOverview() {
  const [location, setLocation] = useState<keyof typeof examples>("All locations");
  const [view, setView] = useState<(typeof views)[number]>("Dashboard");
  const example = examples[location];
  const metrics = view === "Members"
    ? [["Members", example.members], ["Past-due accounts", example.attention]]
    : view === "Billing"
      ? [["Collected this month", example.collected], ["Needs attention", example.attention]]
      : view === "Analytics"
        ? [["Booked / capacity", example.booked], ["Members", example.members]]
        : [["Members", example.members], ["Collected this month", example.collected]];

  return (
    <figure className="owner-proof owner-location-example">
      <figcaption className="owner-example-label">Illustrative example · Not a product screen</figcaption>
      <div className="owner-example-body">
        <div className="owner-location-heading"><strong>Your business</strong><span>Location view</span></div>
        <div className="owner-location-switcher" role="group" aria-label="Example location">
          {(Object.keys(examples) as (keyof typeof examples)[]).map(name => (
            <button key={name} type="button" aria-pressed={location === name} onClick={() => setLocation(name)}>{name}</button>
          ))}
        </div>
        <div className="owner-view-switcher" role="group" aria-label="Example workspace">
          {views.map(name => <button key={name} type="button" aria-pressed={view === name} onClick={() => setView(name)}>{name}</button>)}
        </div>
        <div className="owner-location-results" aria-live="polite" aria-atomic="true">
          <p>{view} <span>/ {location}</span></p>
          <dl>{metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div>
        <p className="owner-example-foot">Owners see the whole business. Managers see their assigned locations.</p>
      </div>
    </figure>
  );
}
