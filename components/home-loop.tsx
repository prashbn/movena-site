import { HomeDiscoveryIcon } from "./home-discovery-icon";

export function HomeLoop() {
  return (
    <section id="loop" className="home-discovery-loop" aria-labelledby="home-loop-heading">
      <div className="wrap">
        <div className="home-discovery-loop__surface">
          <span className="kicker">The loop</span>
          <h2 id="home-loop-heading">One session.<br />Everyone connected.</h2>
          <p className="sec-lede">From the gym floor to the front desk. With the member at the centre.</p>
          <div className="home-discovery-loop__bridge">
            <article>
              <span className="home-discovery-icon"><HomeDiscoveryIcon name="session" /></span>
              <h3>Coaches capture it.</h3>
              <p>Attendance, movements and results. Recorded while coaching.</p>
            </article>
            <article>
              <span className="home-discovery-icon"><HomeDiscoveryIcon name="desk" /></span>
              <h3>The desk sees it.</h3>
              <p>Who hit a milestone. Who hasn’t trained in a fortnight.</p>
            </article>
          </div>
          <div className="home-discovery-loop__member">
            <HomeDiscoveryIcon name="member" />
            <div><h3>Members keep it.</h3><p>Their lifts. Their milestones. Their training history.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
