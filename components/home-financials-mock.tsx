// An owner-facing illustration of Financials. The numbers are examples, not a
// capture of a customer's account or a claim about a typical gym.
const months = [
  { label: "May", height: 43 },
  { label: "Jun", height: 58 },
  { label: "Jul", height: 52 },
  { label: "Aug", height: 71 },
  { label: "Sep", height: 87 },
  { label: "Oct", height: 76 },
];

export function HomeFinancialsMock() {
  return (
    <figure className="home-financial-mock" aria-label="Illustration of Movena Financials">
      <div className="home-financial-mock__chrome">
        <span className="home-financial-mock__dots" aria-hidden="true"><i /><i /><i /></span>
        <span>Movena / Financials</span>
        <span className="home-financial-mock__location">All locations <span aria-hidden="true">⌄</span></span>
      </div>
      <div className="home-financial-mock__body">
        <div className="home-financial-mock__heading">
          <div><h4>Financials</h4><p>See what came in, and where.</p></div>
          <span className="home-financial-mock__period">This month <span aria-hidden="true">⌄</span></span>
        </div>
        <div className="home-financial-mock__metrics">
          <div><small>Total collected</small><strong>$12,480</strong><span>Card and manual</span></div>
          <div><small>Stripe net</small><strong>$11,920</strong><span>After fees and refunds</span></div>
          <div><small>Next payout</small><strong>$2,140</strong><span>On its way</span></div>
        </div>
        <div className="home-financial-mock__details">
          <div className="home-financial-mock__chart">
            <div className="home-financial-mock__card-heading"><strong>Collected over time</strong><span>Last six months</span></div>
            <div className="home-financial-mock__bars" aria-label="Illustrative monthly collection chart">
              {months.map((month, index) => <div key={month.label}><i style={{ height: `${month.height}%` }} className={index === months.length - 1 ? "is-current" : undefined} /><span>{month.label}</span></div>)}
            </div>
          </div>
          <div className="home-financial-mock__by-location">
            <div className="home-financial-mock__card-heading"><strong>By sale location</strong></div>
            <p><span>Newtown</span><strong>$7,360</strong></p>
            <p><span>Surry Hills</span><strong>$5,120</strong></p>
            <div className="home-financial-mock__location-bar" aria-hidden="true"><span /></div>
            <small>One view across your locations</small>
          </div>
        </div>
      </div>
      <figcaption>Illustrative Financials view · Example figures</figcaption>
    </figure>
  );
}
