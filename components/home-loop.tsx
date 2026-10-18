"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const stages = [
  { label: "Record", detail: "A session is recorded.", packet: "80 kg × 5" },
  { label: "Keep", detail: "The result joins their training history.", packet: "80 kg × 5" },
  { label: "Act", detail: "Attendance and milestones give your team context.", packet: "Attendance" },
];

export function HomeLoop() {
  const [stage, setStage] = useState(0);
  const [replayId, setReplayId] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [mobile, setMobile] = useState(false);
  const journey = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 1000px)");
    const update = () => {
      setReduced(preference.matches);
      setMobile(narrow.matches);
    };
    update();
    preference.addEventListener("change", update);
    narrow.addEventListener("change", update);
    const onVisibility = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", onVisibility);

    let observer: IntersectionObserver | undefined;
    let cards: IntersectionObserver | undefined;
    if (journey.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        if (!narrow.matches) setInView(entry.isIntersecting && entry.intersectionRatio >= 0.3);
      }, { threshold: [0, 0.3] });
      observer.observe(journey.current);
      const items = Array.from(journey.current.children);
      cards = new IntersectionObserver(entries => {
        if (!narrow.matches) return;
        const current = entries.filter(entry => entry.isIntersecting && entry.intersectionRatio >= 0.25)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) {
          setStage(items.indexOf(current.target));
          setInView(true);
        }
      }, { threshold: [0, 0.25, 0.7], rootMargin: "-240px 0px -32px 0px" });
      items.forEach(item => cards!.observe(item));
    }
    return () => {
      observer?.disconnect();
      cards?.disconnect();
      preference.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!playing || !inView || reduced || mobile) return;
    const timer = window.setTimeout(() => {
      if (stage < stages.length - 1) setStage(stage + 1);
      else setPlaying(false);
    }, 2800);
    return () => window.clearTimeout(timer);
  }, [stage, playing, inView, reduced, mobile, replayId]);

  function chooseStage(index: number) {
    setStage(index);
    setPlaying(false);
    if (mobile) journey.current?.children[index].scrollIntoView({
      behavior: reduced ? "instant" : "smooth", block: "start",
    });
  }

  return (
    <section id="loop" className="home-discovery-loop" aria-labelledby="home-loop-heading">
      <div className="wrap">
        <div className="home-discovery-loop__surface">
          <span className="kicker">The loop</span>
          <h2 id="home-loop-heading">One session.<br />Everyone connected.</h2>
          <p className="sec-lede">Training connects your coaches, your members and the team supporting them.</p>
          <div className="home-loop-story" style={{ "--loop-stage": stage } as CSSProperties}
            data-stage={stage} data-playing={playing && inView && !mobile && !reduced ? "true" : "false"}>
            <div className="home-loop-story__topline">
              <span className="home-loop-story__eyebrow">One session. Follow the connection.</span>
              <div className="home-loop-story__controls">
                <button type="button" className="home-loop-story__play" onClick={() => {
                  if (stage === stages.length - 1 && !playing) setStage(0);
                  setPlaying(!playing);
                }} aria-label={playing ? "Pause Loop animation" : "Play Loop animation"}>
                  <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span> {playing ? "Pause" : "Play"}
                </button>
                <button type="button" className="home-loop-story__replay" onClick={() => {
                  setStage(0); setPlaying(true); setReplayId(value => value + 1);
                }} aria-label="Replay Loop animation"><span aria-hidden="true">↻</span> Replay</button>
              </div>
            </div>
            <div className="home-loop-story__lane" aria-hidden="true">
              <div className="home-loop-story__courier">
                <span className="home-loop-story__packet"><span className="home-loop-story__packet-mark">✓</span>{stages[stage].packet}</span>
              </div>
            </div>
            <div className="home-loop-story__stops" role="group" aria-label="Follow a session through Movena">
              {stages.map((item, index) => <button type="button" key={item.label}
                onClick={() => chooseStage(index)} aria-pressed={stage === index}
                aria-label={`Step ${index + 1}: ${item.label}`}>
                <span className="home-loop-story__node" aria-hidden="true">{index + 1}</span>
                <span>{item.label}</span>
              </button>)}
            </div>
            <p className="home-loop-story__caption">{stages[stage].detail}</p>
          </div>
          <ol className="home-loop-journey" ref={journey} data-stage={stage} data-animate={inView && !reduced ? "true" : "false"}>

            <li data-active={stage === 0 ? "true" : "false"}>
              <span className="home-loop-journey__step mono">01 / Record</span>
              <h3>Coaches and members record it.</h3>
              <p>Log the workout and its results, whether recorded by the coach or the member.</p>
              <div className="home-loop-example">
                <span className="home-loop-example__label">A session record</span>
                <strong>Back squat · 5RM</strong>
                <div className="home-loop-result" key={replayId}><b>80 <small>kg</small></b><span>× 5 reps</span></div>
                <span className="home-loop-example__status" key={`status-${replayId}`}>✓ Attendance marked</span>
              </div>
            </li>
            <li data-active={stage === 1 ? "true" : "false"}>
              <span className="home-loop-journey__connector" aria-hidden="true">→</span>
              <span className="home-loop-journey__step mono">02 / Keep</span>
              <h3>Members see their progress.</h3>
              <p>Their logged results build a training history, with personal bests and milestones to look back on.</p>
              <div className="home-loop-example">
                <span className="home-loop-example__label">Their training history</span>
                <strong>Back squat · 5RM</strong>
                <div className="home-loop-result" key={replayId}><b>80 <small>kg</small></b><span>Saved to history</span></div>
                <span className="home-loop-example__status">Attendance counts towards badges</span>
              </div>
            </li>
            <li data-active={stage === 2 ? "true" : "false"}>
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
