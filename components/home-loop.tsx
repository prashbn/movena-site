export function HomeLoop({ ownerFirst = false }: { ownerFirst?: boolean } = {}) {
  return (
    <section id="loop" className="home-discovery-loop" aria-labelledby="home-loop-heading">
      <div className="wrap">
        <div className="home-discovery-loop__surface">
          <span className="kicker">The loop</span>
          {ownerFirst ? <h2 id="home-loop-heading">You run the gym.<br />You see the whole picture.</h2> : <h2 id="home-loop-heading">One session.<br />Everyone connected.</h2>}
          <p className="sec-lede">{ownerFirst ? "Your coaches run the sessions. You see how classes are running and what needs your attention." : "Training connects your coaches, your members and the team supporting them."}</p>
          <ol className="home-loop-journey">
            <li>
              <span className="home-loop-journey__step mono">01 / Record</span>
              <h3>{ownerFirst ? "Your coaches run the session." : "Coaches and members record it."}</h3>
              <p>{ownerFirst ? "Build programs and session types, run the class and record the training." : "Log the workout and its results, whether recorded by the coach or the member."}</p>
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
              <h3>{ownerFirst ? "You see how classes are running." : "Members see their progress."}</h3>
              <p>{ownerFirst ? "See sessions run, booked places against capacity, attendance and cancellations by location and coach." : "Their logged results build a training history, with personal bests and milestones to look back on."}</p>
              <div className="home-loop-example">
                <span className="home-loop-example__label">{ownerFirst ? "Classes by coach" : "Their training history"}</span>
                <strong>{ownerFirst ? "Dana · Newtown" : "Back squat · 5RM"}</strong>
                <div className="home-loop-result"><b>{ownerFirst ? "12" : "80"} <small>{ownerFirst ? "/ 14" : "kg"}</small></b><span>{ownerFirst ? "booked" : "Saved to history"}</span></div>
                <span className="home-loop-example__status">{ownerFirst ? "11 attended · 1 cancelled" : "Attendance counts towards badges"}</span>
              </div>
            </li>
            <li>
              <span className="home-loop-journey__connector" aria-hidden="true">→</span>
              <span className="home-loop-journey__step mono">03 / Act</span>
              <h3>{ownerFirst ? "You know what needs you." : "Your team has context."}</h3>
              <p>{ownerFirst ? "See past-due amounts, failed refunds and waiting leads. Go straight to the member or lead." : "Attendance changes and milestone rewards give your team a starting point for a personal conversation."}</p>
              <div className="home-loop-example">
                <span className="home-loop-example__label">{ownerFirst ? "Needs you" : "Reasons to check in"}</span>
                <div className="home-loop-task"><strong>{ownerFirst ? "Past due · $142 owed" : "Attendance drop"}</strong><span>{ownerFirst ? "Open the member’s record" : "Message the member"}</span></div>
                <div className="home-loop-task"><strong>{ownerFirst ? "Refund did not reach member" : "Milestone reward ready"}</strong><span>{ownerFirst ? "Review the refund with the member" : "Hand it over. Mark it given."}</span></div>
              </div>
            </li>
          </ol>
          <p className="home-loop-caption">{ownerFirst ? "Illustrative workflow with example results—not a product screenshot. Class records connect your coaches, members and business view." : "Illustrative workflow with example results—not a product screenshot. Results build history; attendance earns badges."}</p>
        </div>
      </div>
    </section>
  );
}
