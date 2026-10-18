"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Content stays visible without JavaScript. Motion starts after the object is
// clearly on screen, and can replay after it has fully left the viewport.
const objectSelector = [
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
    const objects = Array.from(main.querySelectorAll<HTMLElement>(objectSelector))
      .filter(element => !element.closest(".hero") &&
        !element.parentElement?.closest(objectSelector));
    const visible = new Set<Element>();
    const animations = new Map<Element, Animation>();
    let observer: IntersectionObserver | undefined;
    let disposed = false;

    function reset(element: Element) {
      animations.get(element)?.cancel();
      animations.delete(element);
      element.removeAttribute("data-motion");
      visible.delete(element);
    }

    function stop() {
      observer?.disconnect();
      objects.forEach(reset);
    }

    function start() {
      stop();
      if (preference.matches || disposed) return;

      observer = new IntersectionObserver(entries => {
        if (preference.matches || disposed) return;
        let sequence = 0;
        for (const entry of entries) {
          const element = entry.target;
          if (!entry.isIntersecting) {
            reset(element);
            continue;
          }
          if (entry.intersectionRatio < 0.18 || visible.has(element)) continue;
          visible.add(element);
          // Never move the control someone is using with a keyboard.
          if (element.contains(document.activeElement)) continue;

          element.setAttribute("data-motion", "visible");
          const animation = element.animate([
            { opacity: 0.65, transform: "translateY(14px)" },
            { opacity: 1, transform: "translateY(0)" },
          ], {
            duration: 600,
            delay: Math.min(sequence++, 2) * 80,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "backwards",
          });
          animations.set(element, animation);
          animation.onfinish = () => animations.delete(element);
        }
      }, { threshold: [0, 0.18], rootMargin: "0px 0px -64px 0px" });

      objects.forEach(element => observer!.observe(element));
    }

    function onFocus(event: FocusEvent) {
      objects.forEach(element => {
        if (event.target instanceof Node && element.contains(event.target)) {
          reset(element);
          visible.add(element);
        }
      });
    }

    start();
    preference.addEventListener("change", start);
    main.addEventListener("focusin", onFocus);
    return () => {
      disposed = true;
      stop();
      preference.removeEventListener("change", start);
      main.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);

  return null;
}
