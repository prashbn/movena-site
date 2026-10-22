"use client";

import { useState } from "react";
import { HomeDiscoveryIcon } from "./home-discovery-icon";

// This workspace is an illustration. Every name and figure is an example.
const views = [
  { id: "leads", label: "Leads", icon: "enquiry" },
  { id: "financials", label: "Financials", icon: "money" },
  { id: "analytics", label: "Analytics", icon: "chart" },
  { id: "hangout", label: "Hangout", icon: "chat" },
] as const;
type View = (typeof views)[number]["id"];

const columns = [
  { title: "New", people: [
    { name: "Sarah Chen", initials: "SC", source: "Website", location: "Newtown", action: "Arrange a trial", owner: "Dana", due: "Today, 2 pm" },
  ] },
  { title: "Contacted", people: [
    { name: "Alex Morgan", initials: "AM", source: "Website", location: "Newtown", action: "Reply to Alex", owner: "Dana", due: "Due now" },
  ] },
  { title: "Trial scheduled", people: [
    { name: "Jamie Lee", initials: "JL", source: "Website", location: "Newtown", action: "Check in after trial", owner: "Dana", due: "Tomorrow" },
  ] },
];

function LeadsView() {
  return <>
    <div className="business-crm__heading"><div><h3>Leads</h3><p>A conversation. A clear next step.</p></div><span className="business-crm__total">3 leads</span></div>
    <div className="business-crm__views" aria-hidden="true"><span className="business-crm__board-tab">Board</span><span className="business-crm__table-tab">Table</span><span>Follow-ups</span><span className="business-crm__filter">All locations <span>⌄</span></span></div>
    <div className="business-crm__pipeline">
      {columns.map((column, index) => <div className="business-crm__column" key={column.title} data-stage={index}>
        <div className="business-crm__column-title"><span><i />{column.title}</span><small>{column.people.length}</small></div>
        {column.people.map(person => <div className="business-crm__lead" key={person.name}>
          <div className="business-crm__person"><span className="business-crm__avatar">{person.initials}</span><strong>{person.name}</strong></div>
          <p className="business-crm__source">{person.source} <span>·</span> {person.location}</p>
          <div className="business-crm__next"><span>{person.action}</span><strong>{person.due}</strong></div>
          <p className="business-crm__owner"><span>{person.owner.slice(0, 1)}</span>{person.owner}<span className="business-crm__mobile-status">{column.title}</span></p>
        </div>)}
      </div>)}
    </div>
    <p className="business-crm__summary"><HomeDiscoveryIcon name="approval" />The right person. The next step. In view.</p>
  </>;
}

function FinancialsView() {
  return <>
    <div className="business-crm__heading"><div><h3>Financials</h3><p>What came in and where it came from.</p></div><span className="business-crm__total">This month</span></div>
    <div className="business-crm__micro-filters" aria-hidden="true"><span>All locations⌄</span><span>All products⌄</span><span>All methods⌄</span></div>
    <div className="business-crm__metric-row">
      <div><small>Total collected</small><strong>$12,480</strong><span>Card and manual</span></div>
      <div><small>Stripe net</small><strong>$11,920</strong><span>After fees &amp; refunds</span></div>
      <div><small>Next payout</small><strong>$2,140</strong><span>On its way</span></div>
    </div>
    <div className="business-crm__data-row">
      <div className="business-crm__data-card"><strong>Collected over time</strong><div className="business-crm__bars" aria-hidden="true"><i style={{ height: "40%" }} /><i style={{ height: "56%" }} /><i style={{ height: "47%" }} /><i style={{ height: "69%" }} /><i style={{ height: "85%" }} /><i style={{ height: "74%" }} /></div><span>May<span>Oct</span></span></div>
      <div className="business-crm__data-card business-crm__locations"><strong>By sale location</strong><p><span>Newtown</span><b>$7,360</b></p><p><span>Surry Hills</span><b>$5,120</b></p><div className="business-crm__location-track"><i /></div></div>
    </div>
  </>;
}

function AnalyticsView() {
  return <>
    <div className="business-crm__heading"><div><h3>Analytics</h3><p>See the patterns across your business.</p></div><span className="business-crm__total">All locations</span></div>
    <div className="business-crm__analysis-chart"><div><strong>Session attendance</strong><span>Sessions run and attendees each week</span></div><svg viewBox="0 0 500 110" role="img" aria-label="Illustrative attendance trend"><path className="business-crm__gridline" d="M0 25H500M0 65H500M0 105H500"/><path className="business-crm__line business-crm__line--secondary" d="M0 92 C55 89 83 86 125 80 S180 64 225 73 S280 65 325 55 S390 62 435 49 S475 45 500 43"/><path className="business-crm__line" d="M0 91 C50 90 83 74 125 79 S175 49 225 56 S265 34 305 45 S360 23 400 31 S450 35 500 12"/></svg><div className="business-crm__chart-key"><i />Attendees <i />Sessions</div></div>
    <div className="business-crm__analysis-bottom"><div><strong>Lead to member</strong><div className="business-crm__funnel"><span style={{ width: "100%" }}>New</span><span style={{ width: "76%" }}>Contacted</span><span style={{ width: "54%" }}>Trial</span><span style={{ width: "34%" }}>Converted</span></div></div><div><strong>Class fill</strong><div className="business-crm__fill"><b>78%</b><span>Average bookings against capacity</span></div></div></div>
  </>;
}

function HangoutView() {
  return <>
    <div className="business-crm__heading"><div><h3>Hangout</h3><p>Keep your members in the loop.</p></div><span className="business-crm__total">Your community</span></div>
    <div className="business-crm__story-grid">
      <article><div className="business-crm__story-art business-crm__story-art--one" aria-hidden="true" /><div><small>What&apos;s on · Published</small><strong>Saturday community session</strong><p>Bring a friend along this weekend.</p></div></article>
      <article><div className="business-crm__story-art business-crm__story-art--two" aria-hidden="true" /><div><small>Know how · Published</small><strong>Meet your coaches</strong><p>Get to know the team behind each class.</p></div></article>
    </div>
  </>;
}

export function HomeCrmPreview() {
  const [view, setView] = useState<View>("leads");
  const active = views.find(item => item.id === view)!;

  return (
    <figure className="business-crm" aria-label="Illustration of Movena's business workspace">
      <div className="business-crm__window">
        <div className="business-crm__chrome"><span className="business-crm__traffic" aria-hidden="true"><i /><i /><i /></span><span>Movena / {active.label}</span><span className="business-crm__location"><HomeDiscoveryIcon name="location" />All locations</span></div>
        <div className="business-crm__workspace">
          <nav className="business-crm__sidebar" aria-label="Illustration views">
            <span className="business-crm__gym">YOUR BUSINESS</span>
            {views.map(item => <button type="button" key={item.id} onClick={() => setView(item.id)} aria-pressed={view === item.id}><HomeDiscoveryIcon name={item.icon} />{item.label}</button>)}
            <span className="business-crm__sidebar-foot">One account.<br />Every location.</span>
          </nav>
          <div className="business-crm__main">
            <div className="business-crm__mobile-tabs" role="group" aria-label="Illustration views">{views.map(item => <button type="button" key={item.id} onClick={() => setView(item.id)} aria-pressed={view === item.id}>{item.label}</button>)}</div>
            <div key={view} className="business-crm__view" aria-live="polite">
              {view === "leads" && <LeadsView />}
              {view === "financials" && <FinancialsView />}
              {view === "analytics" && <AnalyticsView />}
              {view === "hangout" && <HangoutView />}
            </div>
          </div>
        </div>
      </div>
      <figcaption>Illustrative workspace · Example names and figures</figcaption>
    </figure>
  );
}
