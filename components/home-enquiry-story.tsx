"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { BrandLockup } from "./brand-lockup";
import { HomeDiscoveryIcon, type DiscoveryIconName } from "./home-discovery-icon";
import { enquiryExampleDraft, enquiryStoryReducer, enquiryStorySteps, initialEnquiryStory } from "@/lib/enquiry-story";

const stepIcons: DiscoveryIconName[] = ["enquiry", "team", "alert", "approval"];

function Sarah() {
  return <div className="enquiry-story__person"><span className="enquiry-story__avatar" aria-hidden="true">SC</span><div><strong>Sarah Chen</strong><span>Newtown · Interested in a trial</span></div></div>;
}

function ScreenHeading({ title, subtitle, status, warning = false }: { title: string; subtitle: string; status: string; warning?: boolean }) {
  return <div className="enquiry-story__screen-heading"><div><h3>{title}</h3><p>{subtitle}</p></div><span className={`enquiry-story__status${warning ? " enquiry-story__status--warning" : ""}`}>{status}</span></div>;
}

export function HomeEnquiryStory() {
  const [state, dispatch] = useReducer(enquiryStoryReducer, initialEnquiryStory);
  const [visible, setVisible] = useState(false);
  const [draft, setDraft] = useState(enquiryExampleDraft);
  const frame = useRef<HTMLDivElement>(null);
  const draftInput = useRef<HTMLTextAreaElement>(null);
  const hasStarted = useRef(false);
  const userControlled = useRef(false);

  useEffect(() => {
    const target = frame.current;
    if (!target) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    function pause() { dispatch({ type: "pause" }); }
    function onPreference() { if (preference.matches) pause(); }
    function onVisibility() {
      setVisible(inView && !document.hidden);
      if (document.hidden) pause();
    }
    const observer = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.3);
      setVisible(inView && !document.hidden);
      if (!inView) pause();
      else if (!document.hidden && !preference.matches && !hasStarted.current && !userControlled.current) {
        hasStarted.current = true;
        dispatch({ type: "play" });
      }
    }, { threshold: [0, 0.3], rootMargin: "0px 0px -48px 0px" });
    observer.observe(target);
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!state.playing || !visible) return;
    const timer = window.setTimeout(() => dispatch({ type: "advance" }), 4500);
    return () => window.clearTimeout(timer);
  }, [state.playing, state.step, visible]);

  useEffect(() => {
    if (state.step !== 3 || !draftInput.current) return;
    const input = draftInput.current;
    const fit = () => { input.style.height = "auto"; input.style.height = `${input.scrollHeight}px`; };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(input);
    return () => observer.disconnect();
  }, [draft, state.step]);

  function select(step: number) {
    userControlled.current = true;
    dispatch({ type: "select", step });
  }

  return (
    <section id="enquiries" className="home-enquiry-story" aria-labelledby="enquiry-story-heading">
      <div className="wrap">
        <div className="enquiry-story__intro">
          <span className="kicker">Enquiries, connected</span>
          <h2 id="enquiry-story-heading">A first hello.<br />A clear next step.</h2>
          <p className="sec-lede">One conversation. The right person. You in the picture.</p>
        </div>
        <ol className="enquiry-story__journey" aria-label="Explore the enquiry workflow">
          {enquiryStorySteps.map((label, index) => <li key={label} data-complete={index < state.step || undefined}>
            <button type="button" aria-current={index === state.step ? "step" : undefined} aria-controls={`enquiry-story-scene-${index}`} onClick={() => select(index)}>
              <span className="enquiry-story__symbol"><HomeDiscoveryIcon name={stepIcons[index]} /></span><span>{label}</span>
            </button>
          </li>)}
        </ol>
        <div ref={frame} className="enquiry-story__window" data-playing={state.playing && visible || undefined}
          onFocusCapture={() => { userControlled.current = true; dispatch({ type: "pause" }); }}>
          <div className="enquiry-story__chrome"><span className="enquiry-story__brand" aria-label="Movena"><BrandLockup /></span><span className="enquiry-story__location">Newtown</span><span className="enquiry-story__example">Example workspace</span></div>
          <div className="enquiry-story__scenes">
            <div id="enquiry-story-scene-0" className="enquiry-story__scene" hidden={state.step !== 0} inert={state.step !== 0}>
              <ScreenHeading title="A new enquiry" subtitle="Enquiries / Website form" status="Just arrived" />
              <div className="enquiry-story__enquiry"><Sarah /><blockquote>“Hi, I’m looking to try a class. Do you have anything on Monday evenings?”</blockquote><p className="enquiry-story__origin"><HomeDiscoveryIcon name="enquiry" /> Captured from your website</p></div>
              <div className="enquiry-story__foot"><p>The enquiry is in one place.</p><button className="btn btn-primary enquiry-story__action" type="button" onClick={() => select(1)}>Give it a next step <span aria-hidden="true">→</span></button></div>
            </div>
            <div id="enquiry-story-scene-1" className="enquiry-story__scene" hidden={state.step !== 1} inert={state.step !== 1}>
              <ScreenHeading title="A person. A due time." subtitle="Enquiries / Sarah Chen" status="Follow-up set" />
              <Sarah />
              <dl className="enquiry-story__assignment"><div><dt>Assigned to</dt><dd>Dana · Front desk</dd></div><div><dt>Follow up by</dt><dd>Today, 2:00 pm</dd></div></dl>
              <ul className="enquiry-story__next-steps"><li><HomeDiscoveryIcon name="approval" /> Arrange a trial class</li><li><HomeDiscoveryIcon name="alert" /> Movena reminds Dana</li></ul>
              <div className="enquiry-story__foot"><p>A clear next step for your team.</p><button className="btn btn-primary enquiry-story__action" type="button" onClick={() => select(2)}>If it’s overdue <span aria-hidden="true">→</span></button></div>
            </div>
            <div id="enquiry-story-scene-2" className="enquiry-story__scene" hidden={state.step !== 2} inert={state.step !== 2}>
              <ScreenHeading title="Know what needs you." subtitle="Overview / Newtown" status="3 need attention" warning />
              <ul className="enquiry-story__attention">
                <li className="enquiry-story__escalation"><span className="enquiry-story__attention-icon"><HomeDiscoveryIcon name="alert" /></span><div><strong>Sarah Chen</strong><span>Lead follow-up overdue · Assigned to Dana</span></div><span>30 min overdue</span></li>
                <li><span className="enquiry-story__attention-icon"><HomeDiscoveryIcon name="money" /></span><div><strong>Alex Morgan</strong><span>Membership payment past due</span></div><span>$142 owed</span></li>
                <li><span className="enquiry-story__attention-icon"><HomeDiscoveryIcon name="reply" /></span><div><strong>Jamie Lee</strong><span>Refund didn’t reach the member</span></div><span>Review</span></li>
              </ul>
              <div className="enquiry-story__foot"><p>Overdue follow-up comes to you.</p><button className="btn btn-primary enquiry-story__action" type="button" onClick={() => select(3)}>Open Sarah’s lead <span aria-hidden="true">→</span></button></div>
            </div>
            <div id="enquiry-story-scene-3" className="enquiry-story__scene" hidden={state.step !== 3} inert={state.step !== 3}>
              <ScreenHeading title="Your words. Your approval." subtitle="Enquiries / Sarah Chen" status={state.approved ? "Example approved" : "Draft · Not sent"} />
              <p className="enquiry-story__context">From Sarah’s enquiry: “Do you have anything on Monday evenings?”</p>
              <dl className="enquiry-story__email"><div><dt>To</dt><dd>Sarah Chen</dd></div><div><dt>Subject</dt><dd>Your first class at Newtown</dd></div></dl>
              <label className="visually-hidden" htmlFor="enquiry-story-draft">Edit the example follow-up draft</label>
              <textarea ref={draftInput} id="enquiry-story-draft" className="enquiry-story__draft" value={draft} readOnly={state.approved} onChange={event => setDraft(event.target.value)} />
              <div className="enquiry-story__foot">
                <p>{state.approved ? "Example draft approved. No email has been sent." : "Movena drafts. You read, edit and approve."}</p>
                {state.approved ? <button className="btn btn-ghost enquiry-story__action" type="button" onClick={() => { userControlled.current = true; dispatch({ type: "play" }); }}>Replay story <span aria-hidden="true">↻</span></button> : <button className="btn btn-primary enquiry-story__action" type="button" onClick={() => dispatch({ type: "approve" })}>Approve example draft <span aria-hidden="true">✓</span></button>}
              </div>
            </div>
          </div>
        </div>
        <div className="enquiry-story__controls">
          <button className="enquiry-story__play" type="button" onClick={() => { userControlled.current = true; dispatch({ type: state.playing ? "pause" : "play" }); }}>
            <HomeDiscoveryIcon name={state.playing ? "pause" : state.step === 3 ? "reply" : "play"} />{state.playing ? "Pause story" : state.step === 3 ? "Replay story" : "Play story"}
          </button>
          <p>Interactive illustration · Example data. No email is sent.</p>
        </div>
        <p className="visually-hidden" role="status">{state.approved ? "Example draft approved. No email has been sent." : `${state.step + 1} of 4: ${enquiryStorySteps[state.step]}`}</p>
        <p className="enquiry-story__links"><a className="link-arrow" href="/gym-crm/">Explore gym CRM <span aria-hidden="true">→</span></a><a href="/legal/privacy/">How we use your information</a></p>
        <noscript><p>Website enquiries arrive in one place. Assign a person and due time. Movena reminds your team and escalates overdue follow-ups to you. Movena drafts the reply. You read, edit and approve it before anything is sent.</p></noscript>
      </div>
    </section>
  );
}
