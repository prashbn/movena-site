"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { businessCapabilities, constellationFrame } from "@/lib/business-constellation";
import { HomeCapabilityMark } from "./home-capability-mark";

export function HomeBusinessConstellation() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = section.current;
    if (!root) return;
    const stage = root.querySelector<HTMLElement>(".business-constellation__stage")!;
    const sticky = root.querySelector<HTMLElement>(".business-constellation__sticky")!;
    const board = root.querySelector<HTMLElement>(".business-constellation__board")!;
    const hub = root.querySelector<HTMLElement>(".business-constellation__hub")!;
    const rings = root.querySelector<HTMLElement>(".business-constellation__rings")!;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(".business-constellation__node"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let request = 0;
    let inView = false;
    let enabled = false;
    let distance = 440;
    let width = 0;
    let height = 0;

    function paint() {
      request = 0;
      if (!enabled) return;
      const top = Number.parseFloat(getComputedStyle(sticky).top);
      const progress = Math.max(0, Math.min(1, (top - stage.getBoundingClientRect().top) / distance));
      const frame = constellationFrame(progress, window.innerWidth <= 1000 ? 4 : 6);
      root!.style.setProperty("--constellation-progress", progress.toFixed(4));
      root!.style.setProperty("--constellation-spread", String(frame.spread));
      hub.style.transform = `translate3d(${width * 0.5}px, ${height * frame.hubY}px, 0) translate(-50%, -50%) scale(${frame.hubScale})`;
      rings.style.opacity = String(frame.ringOpacity);
      nodes.forEach((node, index) => {
        const point = frame.nodes[index];
        node.style.transform = `translate3d(${width * point.x}px, ${height * point.y}px, 0) translate(-50%, -50%) scale(${point.scale})`;
        node.style.setProperty("--label-opacity", String(point.labelOpacity));
      });
    }

    function schedule() {
      if (!request && inView && enabled) request = requestAnimationFrame(paint);
    }

    function measure() {
      width = board.clientWidth;
      height = board.clientHeight;
      distance = Math.round(Math.max(320, Math.min(520, window.innerHeight * 0.65)));
      root!.style.setProperty("--constellation-sticky-height", `${sticky.offsetHeight}px`);
      root!.style.setProperty("--constellation-distance", `${distance}px`);
    }

    function configure() {
      if (request) cancelAnimationFrame(request);
      request = 0;
      enabled = !preference.matches;
      if (enabled) {
        root!.setAttribute("data-scroll-motion", "true");
        measure();
        // Keep the full grid in normal flow if the scene cannot fit on screen.
        enabled = sticky.offsetHeight + Number.parseFloat(getComputedStyle(sticky).top) <= window.innerHeight;
      }
      if (!enabled) {
        root!.removeAttribute("data-scroll-motion");
        [hub, ...nodes].forEach(element => element.removeAttribute("style"));
        rings.removeAttribute("style");
      } else {
        paint();
      }
    }

    const observer = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      if (inView && enabled) { measure(); schedule(); }
    }, { rootMargin: "200px 0px" });
    const resize = new ResizeObserver(() => {
      if (!enabled) return;
      measure();
      if (sticky.offsetHeight + Number.parseFloat(getComputedStyle(sticky).top) > window.innerHeight) configure();
      else schedule();
    });
    observer.observe(root);
    resize.observe(sticky);
    configure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", configure, { passive: true });
    preference.addEventListener("change", configure);
    return () => {
      if (request) cancelAnimationFrame(request);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", configure);
      preference.removeEventListener("change", configure);
    };
  }, []);

  return (
    <section ref={section} id="connected-business" className="home-business-constellation" aria-labelledby="business-constellation-heading">
      <div className="wrap">
        <div className="business-constellation__intro">
          <span className="kicker">One connected business</span>
          <h2 id="business-constellation-heading"><span>Your whole gym.</span>{" "}<span>Working together.</span></h2>
          <p>Memberships, bookings, payments and the people behind them. Connected in Movena.</p>
          <span className="business-constellation__scroll-note" aria-hidden="true">Scroll to bring it together <span>↓</span></span>
        </div>
      </div>
      <div className="business-constellation__stage">
        <div className="business-constellation__sticky">
          <div className="wrap">
            <div className="business-constellation__board">
              <div className="business-constellation__rings" aria-hidden="true">{Array.from({ length: 13 }, (_, index) => <span key={index} style={{ width: `${12 + index * 2}rem`, height: `${12 + index * 2}rem`, opacity: 0.9 - index * 0.055 }} />)}</div>
              <div className="business-constellation__hub">
                <Image src="/brand/light/favicon.svg" width={80} height={80} alt="Movena" className="business-constellation__mark site-logo__image--light" />
                <Image src="/brand/dark/favicon.svg" width={80} height={80} alt="Movena" className="business-constellation__mark site-logo__image--dark" />
              </div>
              <ul className="business-constellation__nodes" aria-label="Connected Movena capabilities">
                {businessCapabilities.map(capability => <li key={capability.label} className="business-constellation__node" data-emphasis={capability.emphasis} data-mark={capability.icon}>
                  <span className="business-constellation__icon"><HomeCapabilityMark name={capability.icon} /></span>
                  <span className="business-constellation__label">{capability.label}</span>
                </li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="business-constellation__foot">
          <a className="link-arrow" href="/platform/">See how it connects <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
