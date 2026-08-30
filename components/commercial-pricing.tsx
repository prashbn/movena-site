import {
  movenaPackages,
  optionalAddOns,
  packageComparisonRows,
  platformAdministrationFee,
} from "@/lib/commercial";
import { siteConfig } from "@/lib/site-config";

export function PackageCards() {
  return (
    <section className="commercial-section" aria-labelledby="packages-heading">
      <div className="commercial-wrap">
        <div className="commercial-section__heading">
          <p className="commercial-kicker">Packages</p>
          <h2 id="packages-heading">Movena packages</h2>
        </div>
        <div className="pricing-grid">
          {movenaPackages.map((movenaPackage) => (
            <article
              className={`pricing-card pricing-card--${movenaPackage.id}`}
              key={movenaPackage.id}
            >
              <div>
                <p className="pricing-card__name">{movenaPackage.name}</p>
                <p className="pricing-card__price">{movenaPackage.price}</p>
                <p className="pricing-card__positioning">
                  {movenaPackage.positioning}
                </p>
              </div>
              <ul className="pricing-card__features">
                {movenaPackage.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <a className="commercial-button" href={siteConfig.contactHref}>
                Talk to us
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlatformFee() {
  return (
    <div className="commercial-wrap">
      <aside className="platform-fee" aria-label="Platform administration fee">
        <span>0.30%</span>
        <p>{platformAdministrationFee}</p>
      </aside>
    </div>
  );
}

export function OptionalAddOns() {
  return (
    <section
      className="commercial-section commercial-section--addons"
      aria-labelledby="addons-heading"
    >
      <div className="commercial-wrap">
        <div className="commercial-section__heading">
          <p className="commercial-kicker">Optional add-ons</p>
          <h2 id="addons-heading">Optional add-ons</h2>
        </div>
        <div className="addons-grid">
          {optionalAddOns.map((addOn) => (
            <article className="addon-card" key={addOn.name}>
              <p className="addon-card__name">{addOn.name}</p>
              <p className="addon-card__price">{addOn.price}</p>
              {"detail" in addOn ? (
                <p className="addon-card__detail">{addOn.detail}</p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PackageComparison() {
  const plans = ["Movena One", "Movena Collective", "Movena Enterprise"];

  return (
    <section
      className="commercial-section comparison-section"
      aria-labelledby="comparison-heading"
    >
      <div className="commercial-wrap">
        <div className="commercial-section__heading">
          <p className="commercial-kicker">Packages</p>
          <h2 id="comparison-heading">Package comparison</h2>
        </div>
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <caption className="visually-hidden">
              Movena package comparison
            </caption>
            <thead>
              <tr>
                <th scope="col">Capability</th>
                {plans.map((plan) => (
                  <th scope="col" key={plan}>
                    {plan}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packageComparisonRows.map(([capability, ...values]) => (
                <tr key={capability}>
                  <th scope="row">{capability}</th>
                  {values.map((value, index) => (
                    <td data-plan={plans[index]} key={plans[index]}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
