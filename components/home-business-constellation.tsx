"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { businessCapabilities, constellationFrame } from "@/lib/business-constellation";
import { HomeCapabilityMark } from "./home-capability-mark";
import { BrandLockup } from "./brand-lockup";
import { HomeCrmPreview } from "./home-crm-preview";

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
    const tile = root.querySelector<HTMLElement>(".business-constellation__hub-tile")!;
    const wordmark = root.querySelector<HTMLElement>(".business-constellation__wordmark")!;
    const crm = root.querySelector<HTMLElement>(".business-crm")!;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(".business-constellation__node")).map(node => ({
      node,
      icon: node.querySelector<HTMLElement>(".business-constellation__icon")!,
      label: node.querySelector<HTMLElement>(".business-constellation__label")!,
      size: 0,
      dockSize: 0,
    }));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let request = 0;
    let inView = false;
    let enabled = false;
    let distance = 440;
    let width = 0;
    let height = 0;
    let current = 0;
    let target = 0;
    let lastTime = 0;
    let readScroll = true;

    function progress() {
      const top = Number.parseFloat(getComputedStyle(sticky).top);
      return Math.max(0, Math.min(1, (top - stage.getBoundingClientRect().top) / distance));
    }

    function draw(value: number) {
      const frame = constellationFrame(value, window.innerWidth <= 1000 ? 4 : 6);
      root!.style.setProperty("--constellation-progress", value.toFixed(4));
      hub.style.transform = `translate3d(${width * 0.5}px, ${height * frame.hubY}px, 0) translate(-50%, -50%)`;
      tile.style.transform = `scale(${frame.hubScale})`;
      tile.style.opacity = String(1 - frame.brandOpacity);
      wordmark.style.opacity = String(frame.brandOpacity);
      rings.style.opacity = String(frame.ringOpacity);
      crm.style.opacity = String(frame.reveal);
      crm.style.transform = `translate3d(-50%, ${(1 - frame.reveal) * 32}px, 0) scale(${0.92 + frame.reveal * 0.08})`;
      nodes.forEach(({ node, icon, label, size, dockSize }, index) => {
        const point = frame.nodes[index];
        const visibleSize = size + (dockSize - size) * point.sizeProgress;
        node.style.transform = `translate3d(${width * point.x}px, ${height * point.y}px, 0) translateX(-50%)`;
        icon.style.transform = `translate(-50%, -50%) scale(${visibleSize / size})`;
        label.style.transform = `translate3d(0, ${visibleSize / 2 + 5}px, 0)`;
        label.style.opacity = String(point.labelOpacity);
      });
    }

    function tick(time: number) {
      request = 0;
      if (!enabled || !inView || document.hidden) { lastTime = 0; return; }
      if (readScroll) { target = progress(); readScroll = false; }
      const elapsed = lastTime ? Math.min(64, time - lastTime) : 16;
      lastTime = time;
      // Brief damping removes coarse scroll steps without a long trailing tail.
      current += (target - current) * (1 - Math.exp(-elapsed / 55));
      if (Math.abs(target - current) < 0.0005) current = target;
      draw(current);
      if (current !== target) request = requestAnimationFrame(tick);
      else lastTime = 0;
    }

    function schedule() {
      readScroll = true;
      if (!request && inView && enabled && !document.hidden) request = requestAnimationFrame(tick);
    }

    function measure() {
      width = board.clientWidth;
      height = board.clientHeight;
      // svh keeps the phone scene and its travel stable as Safari's bars collapse.
      distance = Math.round(Math.max(360, Math.min(560, height * 0.8)));
      root!.style.setProperty("--constellation-sticky-height", `${sticky.offsetHeight}px`);
      root!.style.setProperty("--constellation-distance", `${distance}px`);
      nodes.forEach(item => {
        item.size = Number.parseFloat(getComputedStyle(item.icon).width);
        item.dockSize = Number.parseFloat(getComputedStyle(item.node).getPropertyValue("--dock-size"));
      });
    }

    function sceneFits() {
      const phonePortrait = window.innerWidth <= 640 && window.innerHeight >= window.innerWidth;
      return phonePortrait || sticky.offsetHeight + Number.parseFloat(getComputedStyle(sticky).top) <= window.innerHeight;
    }

    function configure() {
      if (request) cancelAnimationFrame(request);
      request = 0;
      lastTime = 0;
      enabled = !preference.matches;
      if (enabled) {
        root!.setAttribute("data-scroll-motion", "true");
        measure();
        enabled = sceneFits();
      }
      if (!enabled) {
        root!.removeAttribute("data-scroll-motion");
        [hub, tile, wordmark, rings, crm, ...nodes.flatMap(({ node, icon, label }) => [node, icon, label])].forEach(element => element.removeAttribute("style"));
      } else {
        current = target = progress();
        draw(current);
      }
    }

    const observer = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      if (inView && enabled) { measure(); schedule(); }
      else if (request) { cancelAnimationFrame(request); request = 0; lastTime = 0; }
    }, { rootMargin: "200px 0px" });
    const resize = new ResizeObserver(() => {
      if (!enabled) return;
      measure();
      if (!sceneFits()) configure();
      else schedule();
    });
    observer.observe(root);
    resize.observe(sticky);
    configure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", configure, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    preference.addEventListener("change", configure);
    return () => {
      if (request) cancelAnimationFrame(request);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", configure);
      document.removeEventListener("visibilitychange", schedule);
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
          <span className="business-constellation__scroll-note" aria-hidden="true">Scroll to see it come together <span>↓</span></span>
        </div>
      </div>
      <div className="business-constellation__stage">
        <div className="business-constellation__sticky">
          <div className="wrap">
            <div className="business-constellation__board">
              <div className="business-constellation__rings" aria-hidden="true">{Array.from({ length: 13 }, (_, index) => <span key={index} style={{ width: `${12 + index * 2}rem`, height: `${12 + index * 2}rem`, opacity: 0.9 - index * 0.055 }} />)}</div>
              <div className="business-constellation__hub">
                <div className="business-constellation__hub-tile">
                  {/* Contrast the central brand tile with the surrounding theme. */}
                  <Image src="/brand/dark/favicon.svg" width={80} height={80} alt="Movena" className="business-constellation__mark site-logo__image--light" />
                  <Image src="/brand/light/favicon.svg" width={80} height={80} alt="Movena" className="business-constellation__mark site-logo__image--dark" />
                </div>
                <span className="business-constellation__wordmark" aria-hidden="true"><BrandLockup /></span>
              </div>
              <HomeCrmPreview />
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
