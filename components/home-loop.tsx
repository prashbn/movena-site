export function HomeLoop() {
  return (
    <section id="loop" className="home-discovery-loop" aria-labelledby="home-loop-heading">
      <div className="wrap">
        <div className="home-discovery-loop__surface">
          <span className="kicker">The loop</span>
          <h2 id="home-loop-heading">One session.<br />Everyone connected.</h2>
          <p className="sec-lede">Training connects your coaches, your members and the team supporting them.</p>
          <ol className="home-loop-journey">
            <li>
              <span className="home-loop-journey__step mono">01 / Record</span>
              <h3>Coaches and members record it.</h3>
              <p>Log the workout and its results, whether recorded by the coach or the member.</p>
              <div className="home-loop-example">
                <span className="home-loop-example__label">A session record</span>
                <strong>Back squat · 5RM</strong>
                <div className="home-loop-result"><b>80 <small>kg</small></b><span>× 5 reps</span></div>
                <span className="home-loop-example__status">✓ Attendance marked</span>
              </div>
            </li>
            <li>
              <span className="home-loop-journey__connector" aria-hidden="true">→</span>
              <span className="home-loop-journey__step mono">02 / Keep</span>
              <h3>Members see their progress.</h3>
              <p>Their logged results build a training history, with personal bests and milestones to look back on.</p>
              <div className="home-loop-example">
                <span className="home-loop-example__label">Their training history</span>
                <strong>Back squat · 5RM</strong>
                <div className="home-loop-result"><b>80 <small>kg</small></b><span>Saved to history</span></div>
                <span className="home-loop-example__status">Attendance counts towards badges</span>
              </div>
            </li>
            <li>
              <span className="home-loop-journey__connector" aria-hidden="true">→</span>
              <span className="home-loop-journey__step mono">03 / Act</span>
              <h3>Your team has context.</h3>
              <p>Attendance changes and milestone rewards give your team a starting point for a personal conversation.</p>
              <div className="home-loop-example">
                <span className="home-loop-example__label">Reasons to check in</span>
                <div className="home-loop-task"><strong>Attendance drop</strong><span>Message the member</span></div>
                <div className="home-loop-task"><strong>Milestone reward ready</strong><span>Hand it over. Mark it given.</span></div>
              </div>
            </li>
          </ol>
          <p className="home-loop-caption">Illustrative workflow with example results—not a product screenshot. Results build history; attendance earns badges.</p>
        </div>
      </div>
    </section>
  );
}
