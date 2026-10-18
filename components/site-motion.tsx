"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Enhance existing objects, including frozen-markup pages, without hiding content
// while JavaScript loads or changing their layout, semantics, or artwork.
const objectSelector = [
  ".home-loop-journey > li",
  ".home-app-showcase__screen",
  ".home-product-window",
  ".home-training-connection__member",
  ".home-photo-panel",
  ".shot",
  ".ai-connection",
].join(", ");

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main || !("IntersectionObserver" in window)) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    const animations = new Map<Element, Animation>();
    let observer: IntersectionObserver | undefined;

    function stop() {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    }

    function start() {
      stop();
      if (preference.matches) return;

      observer = new IntersectionObserver(entries => {
        let sequence = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target;
          observer?.unobserve(element);
          seen.add(element);

          // Keep navigation, deep links and keyboard focus immediately readable.
          if (element.contains(document.activeElement)) continue;
          const animation = element.animate([
            { opacity: 0.65, transform: "translateY(16px)" },
            { opacity: 1, transform: "translateY(0)" },
          ], {
            duration: 560,
            delay: Math.min(sequence++, 2) * 70,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "backwards",
          });
          animations.set(element, animation);
          animation.onfinish = () => animations.delete(element);
        }
      }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

      main!.querySelectorAll<HTMLElement>(objectSelector).forEach(element => {
        // Hero content is already visible; avoid replaying it after hydration.
        // Also avoid animating a nested object together with its parent.
        if (seen.has(element) || element.closest(".hero") ||
            element.parentElement?.closest(objectSelector)) return;
        if (element.getBoundingClientRect().top < window.innerHeight) {
          seen.add(element);
          return;
        }
        observer!.observe(element);
      });
    }

    function onFocus(event: FocusEvent) {
      animations.forEach((animation, element) => {
        if (event.target instanceof Node && element.contains(event.target)) {
          animation.cancel();
          animations.delete(element);
        }
      });
    }

    start();
    preference.addEventListener("change", start);
    main.addEventListener("focusin", onFocus);
    return () => {
      stop();
      preference.removeEventListener("change", start);
      main.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);

  return null;
}
