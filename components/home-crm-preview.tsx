import { HomeDiscoveryIcon } from "./home-discovery-icon";

// An illustrative excerpt, checked against GymOS's Leads workspace and owner
// help. Converted leads do not remain in its active Kanban board.
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

export function HomeCrmPreview() {
  return (
    <figure className="business-crm" aria-label="Movena CRM illustration">
      <div className="business-crm__window">
        <div className="business-crm__chrome"><span className="business-crm__traffic" aria-hidden="true"><i /><i /><i /></span><span>Movena / Leads</span><span className="business-crm__location"><HomeDiscoveryIcon name="location" />All locations</span></div>
        <div className="business-crm__workspace">
          <div className="business-crm__sidebar" aria-hidden="true">
            <span className="business-crm__gym">YOUR BUSINESS</span>
            {([ ["chart", "Dashboard"], ["enquiry", "Leads"], ["membership", "Members"], ["day", "Timetable"], ["money", "Financials"], ["tasks", "Team tasks"] ] as const).map(([icon, label]) => <span key={label} data-selected={label === "Leads" || undefined}><HomeDiscoveryIcon name={icon} />{label}</span>)}
            <span className="business-crm__sidebar-foot">One account.<br />Every location.</span>
          </div>
          <div className="business-crm__main">
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
          </div>
        </div>
      </div>
      <figcaption>Illustrative workspace · Example data</figcaption>
    </figure>
  );
}
