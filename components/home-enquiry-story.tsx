"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { BrandLockup } from "./brand-lockup";
import { HomeDiscoveryIcon, type DiscoveryIconName } from "./home-discovery-icon";
import { enquiryExampleDraft, enquiryStoryReducer, enquiryStorySteps, initialEnquiryStory } from "@/lib/enquiry-story";

const stepIcons: DiscoveryIconName[] = ["enquiry", "team", "alert", "approval"];

// Copy checked against GymOS 089bf3d: dashboard.ts action groups,
// follow-up-timers.ts business-day escalation, and lead-ai.ts draft inputs.
// This is an illustration; dashboard lead grouping and follow-up alerts are separate paths.

function ClickCue() {
  return <span className="enquiry-story__cursor" aria-hidden="true"><HomeDiscoveryIcon name="cursor" /></span>;
}

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
  const [showCue, setShowCue] = useState(true);
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
    <section id="enquiries" className="home-enquiry-story" aria-labelledby="enquiry-story-heading" data-show-cue={showCue || undefined}
      onPointerDownCapture={() => setShowCue(false)} onKeyDownCapture={() => setShowCue(false)}>
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
        <p className="enquiry-story__interaction-hint"><HomeDiscoveryIcon name="cursor" />Choose a step or try the buttons</p>
        <div ref={frame} className="enquiry-story__window" data-playing={state.playing && visible || undefined}
          onFocusCapture={() => { userControlled.current = true; dispatch({ type: "pause" }); }}>
          <div className="enquiry-story__chrome"><span className="enquiry-story__brand" aria-label="Movena"><BrandLockup /></span><span className="enquiry-story__location">Newtown</span><span className="enquiry-story__example">Example workspace</span></div>
          <div className="enquiry-story__scenes">
            <div id="enquiry-story-scene-0" className="enquiry-story__scene" hidden={state.step !== 0} inert={state.step !== 0}>
              <ScreenHeading title="A new enquiry" subtitle="Enquiries / Website form" status="Just arrived" />
              <div className="enquiry-story__enquiry"><Sarah /><blockquote>“Hi, I’m interested in trying a class at Newtown. How do I get started?”</blockquote><p className="enquiry-story__origin"><HomeDiscoveryIcon name="enquiry" /> Captured from your website</p></div>
              <div className="enquiry-story__foot"><p>The enquiry is in one place.</p><button className="btn btn-primary enquiry-story__action" type="button" onClick={() => select(1)}>Give it a next step <span aria-hidden="true">→</span><ClickCue /></button></div>
            </div>
            <div id="enquiry-story-scene-1" className="enquiry-story__scene" hidden={state.step !== 1} inert={state.step !== 1}>
              <ScreenHeading title="A person. A due time." subtitle="Enquiries / Sarah Chen" status="Follow-up set" />
              <Sarah />
              <dl className="enquiry-story__assignment"><div><dt>Assigned to</dt><dd>Dana · Front desk</dd></div><div><dt>Follow up by</dt><dd>Today, 2:00 pm</dd></div></dl>
              <ul className="enquiry-story__next-steps"><li><HomeDiscoveryIcon name="approval" /> Arrange a trial class</li><li><HomeDiscoveryIcon name="alert" /> Movena reminds Dana</li></ul>
              <div className="enquiry-story__foot"><p>A clear next step for your team.</p><button className="btn btn-primary enquiry-story__action" type="button" onClick={() => select(2)}>If it’s overdue <span aria-hidden="true">→</span><ClickCue /></button></div>
            </div>
            <div id="enquiry-story-scene-2" className="enquiry-story__scene" hidden={state.step !== 2} inert={state.step !== 2}>
              <ScreenHeading title="Action center" subtitle="Dashboard / Newtown" status="3 open" warning />
              <ul className="enquiry-story__attention">
                <li><span className="enquiry-story__attention-icon"><HomeDiscoveryIcon name="reply" /></span><div><strong>1 refund didn’t reach the member</strong><span>Retry the refund</span></div><span>$48</span></li>
                <li className="enquiry-story__escalation"><span className="enquiry-story__attention-icon"><HomeDiscoveryIcon name="enquiry" /></span><div><strong>2 leads awaiting follow-up</strong><span>No reply in over 24 hours</span></div><span>Leads →</span></li>
                <li><span className="enquiry-story__attention-icon"><HomeDiscoveryIcon name="money" /></span><div><strong>1 membership past due</strong><span>Retry the payment</span></div><span>$142</span></li>
              </ul>
              <p className="enquiry-story__policy">Lead follow-up alerts use your configured business hours and business-day escalation timers.</p>
              <div className="enquiry-story__foot"><p>Grouped actions open Leads, Billing or the relevant member.</p><button className="btn btn-primary enquiry-story__action" type="button" onClick={() => select(3)}>See a reply draft <span aria-hidden="true">→</span><ClickCue /></button></div>
            </div>
            <div id="enquiry-story-scene-3" className="enquiry-story__scene" hidden={state.step !== 3} inert={state.step !== 3}>
              <ScreenHeading title="Your words. Your approval." subtitle="Leads / Sarah Chen / Communication" status={state.approved ? "Example approved" : "Draft · Not sent"} />
              <div className="enquiry-story__context"><p><strong>Approved gym fact:</strong> Newtown location.</p><p><strong>Screened latest email reply:</strong> “Monday evenings work for me. What happens next?”</p></div>
              <dl className="enquiry-story__email"><div><dt>To</dt><dd>Sarah Chen</dd></div><div><dt>Subject</dt><dd>Your first class at Newtown</dd></div></dl>
              <label className="visually-hidden" htmlFor="enquiry-story-draft">Edit the example follow-up draft</label>
              <textarea ref={draftInput} id="enquiry-story-draft" className="enquiry-story__draft" value={draft} readOnly={state.approved} onChange={event => setDraft(event.target.value)} />
              <div className="enquiry-story__foot">
                <p>{state.approved ? "Example draft approved. No email has been sent." : "Drafting is optional. You read, edit and approve."}</p>
                {state.approved ? <button className="btn btn-ghost enquiry-story__action" type="button" onClick={() => { userControlled.current = true; dispatch({ type: "play" }); }}>Replay story <span aria-hidden="true">↻</span></button> : <button className="btn btn-primary enquiry-story__action" type="button" onClick={() => dispatch({ type: "approve" })}>Approve example draft <span aria-hidden="true">✓</span><ClickCue /></button>}
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
        <noscript><p>Website enquiries arrive in one place. Assign a person and due time. With follow-up enabled, reminders and owner escalation use your configured business hours and business-day timers. The Action center groups leads, past-due memberships and unresolved refunds. Optional drafting uses approved gym facts and may include a screened latest email reply. You read, edit and approve the email before sending.</p></noscript>
      </div>
    </section>
  );
}
