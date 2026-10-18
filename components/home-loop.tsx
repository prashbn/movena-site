"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

function LoopIcon({ kind }: { kind: "check" | "training" | "team" }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "check" ? <path d="m6 12 4 4 8-8" /> : kind === "training" ? <><path d="M4 8v8m4-11v14m8-14v14m4-11v8M8 12h8" /></> : <><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2m1-15a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5"/></>}
  </svg>;
}

export function HomeLoop() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const scene = useRef<HTMLDivElement>(null);
  const running = playing && inView && !reduced && tabVisible;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduced(preference.matches);
    const updateVisibility = () => setTabVisible(!document.hidden);
    updatePreference();
    updateVisibility();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    let observer: IntersectionObserver | undefined;
    if (scene.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.2);
      }, { threshold: [0, 0.2] });
      observer.observe(scene.current);
    }
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setStage(value => (value + 1) % 3), 3600);
    return () => window.clearTimeout(timer);
  }, [stage, running]);

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (!running || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--look-x", `${((event.clientX - rect.left) / rect.width - 0.5) * 7}deg`);
    event.currentTarget.style.setProperty("--look-y", `${((event.clientY - rect.top) / rect.height - 0.5) * -5}deg`);
  }

  function resetTilt() {
    scene.current?.style.setProperty("--look-x", "0deg");
    scene.current?.style.setProperty("--look-y", "0deg");
  }

  function chooseStage(index: number) {
    setStage(index);
    setPlaying(false);
  }

  return (
    <section id="loop" className="home-discovery-loop" aria-labelledby="home-loop-heading">
      <div className="wrap">
        <div className="home-discovery-loop__surface holo-loop" data-running={running ? "true" : "false"} data-stage={stage}>
          <div className="holo-loop__intro">
            <div className="holo-loop__heading-row"><span className="kicker">The loop</span><button type="button" className="holo-motion-control" onClick={() => setPlaying(value => !value)} aria-label={playing ? "Pause Loop animation" : "Play Loop animation"} disabled={reduced}><span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span> {playing ? "Pause motion" : "Play motion"}</button></div>
            <h2 id="home-loop-heading">One session.<br />Everyone connected.</h2>
            <p className="sec-lede">Training connects your coaches, your members and the team supporting them.</p>
          </div>

          <div className="holo-scene" ref={scene} onPointerMove={tilt} onPointerLeave={resetTilt}>
            <div className="holo-scene__wash" aria-hidden="true" />
            <div className="holo-ribbons" aria-hidden="true">
              {/* The decorative artwork is separate from all readable live UI. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/loop/holographic-ribbons.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async" />
            </div>
            <svg className="holo-signals" viewBox="0 0 1200 700" fill="none" aria-hidden="true">
              <defs><linearGradient id="loop-signal" x1="0" y1="0" x2="1200" y2="700" gradientUnits="userSpaceOnUse"><stop stopColor="#c7b7ff"/><stop offset=".5" stopColor="#fff"/><stop offset="1" stopColor="#7c9dff"/></linearGradient><filter id="loop-glow"><feGaussianBlur stdDeviation="3"/></filter></defs>
              <path className="holo-signal holo-signal--glow" d="M90 450C-10 270 1020 240 1120 430S80 680 90 450Z" stroke="url(#loop-signal)" strokeWidth="12" filter="url(#loop-glow)"/>
              <path className="holo-signal" d="M90 450C-10 270 1020 240 1120 430S80 680 90 450Z" stroke="url(#loop-signal)" strokeWidth="4"/>
              <path className="holo-signal holo-signal--upper" d="M650 340C400 100 1120-40 1140 210S750 570 280 570" stroke="url(#loop-signal)" strokeWidth="4"/>
            </svg>

            <div className="holo-object holo-object--record">
              <article className="holo-tile holo-tile--record" data-active={stage === 0 ? "true" : "false"} aria-label="Illustrative session record">
                <div className="holo-tile__eyebrow"><span className="holo-check"><LoopIcon kind="check" /></span><span>Session recorded</span><span className="holo-more" aria-hidden="true">···</span></div>
                <h3>Back squat</h3>
                <div className="holo-weight"><b>80</b><span>kg × 5</span></div>
                <div className="holo-tile__footer"><span className="holo-training"><LoopIcon kind="training"/></span><span className="holo-lines" aria-hidden="true"><i/><i/></span><span aria-hidden="true">↗</span></div>
              </article>
            </div>

            <div className="holo-object holo-object--history">
              <article className="holo-tile holo-tile--history" data-active={stage === 1 ? "true" : "false"} aria-label="Illustrative member training history">
                <h3>Training history</h3>
                <svg className="holo-chart" viewBox="0 0 260 100" fill="none" aria-hidden="true">
                  <defs><linearGradient id="loop-chart" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#a78bfa" stopOpacity=".26"/><stop offset="1" stopColor="#a78bfa" stopOpacity="0"/></linearGradient></defs>
                  <path d="M10 85L55 52L95 60L140 26L180 35L220 12L250 3V100H10Z" fill="url(#loop-chart)"/>
                  <path className="holo-chart__line" d="M10 85L55 52L95 60L140 26L180 35L220 12L250 3" stroke="#9164ed" strokeWidth="2.5"/>
                  {[ [10,85], [55,52], [95,60], [140,26], [180,35], [220,12], [250,3] ].map(([cx,cy])=><circle key={cx} cx={cx} cy={cy} r="3.5" fill="#9164ed"/>)}
                </svg>
                <p className="holo-history-saved"><span aria-hidden="true">▥</span> Result saved</p>
              </article>
            </div>

            <div className="holo-object holo-object--team">
              <article className="holo-tile holo-tile--team" data-active={stage === 2 ? "true" : "false"} aria-label="Illustrative team context">
                <span className="holo-team-icon"><LoopIcon kind="team"/></span>
                <div><h3>Team context</h3><p>Milestone reward ready</p></div><span aria-hidden="true">›</span>
              </article>
            </div>
            <div className="holo-orb holo-orb--one" aria-hidden="true"/><div className="holo-orb holo-orb--two" aria-hidden="true"/><div className="holo-orb holo-orb--three" aria-hidden="true"/>
          </div>

          <div className="holo-loop__bottom">
            <ol className="home-loop-journey" aria-label="How the Loop connects your gym">
              <li data-active={stage === 0 ? "true" : "false"}>
                <button type="button" onClick={() => chooseStage(0)} aria-pressed={stage === 0} aria-label="Step 1: Record"><span className="holo-step-number">01</span><span className="mono">/ Record</span></button>
                <h3>Coaches and members record it.</h3>
                <p>Log the workout and its results, whether recorded by the coach or the member.</p>
              </li>
              <li data-active={stage === 1 ? "true" : "false"}>
                <button type="button" onClick={() => chooseStage(1)} aria-pressed={stage === 1} aria-label="Step 2: Keep"><span className="holo-step-number">02</span><span className="mono">/ Keep</span></button>
                <h3>Members see their progress.</h3>
                <p>Their logged results build a training history, with personal bests and milestones to look back on.</p>
              </li>
              <li data-active={stage === 2 ? "true" : "false"}>
                <button type="button" onClick={() => chooseStage(2)} aria-pressed={stage === 2} aria-label="Step 3: Act"><span className="holo-step-number">03</span><span className="mono">/ Act</span></button>
                <h3>Your team has context.</h3>
                <p>Attendance changes and milestone rewards give your team a starting point for a personal conversation.</p>
              </li>
            </ol>
            <div className="holo-loop__notes">
              <p className="home-loop-caption">Illustrative workflow with example results—not a product screenshot. Results build history; attendance earns badges.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
