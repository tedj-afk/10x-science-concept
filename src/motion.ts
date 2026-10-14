import { useEffect, useRef } from "react";

const reducedMotion = "(prefers-reduced-motion: reduce)";
const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
const active = new Set<Animation>();

function animate(
  element: Element,
  frames: Keyframe[],
  duration: number,
  delay = 0,
) {
  if (!element.animate || window.matchMedia(reducedMotion).matches) return;
  const animation = element.animate(frames, {
    duration,
    delay,
    easing: ease,
    fill: "backwards",
  });
  active.add(animation);
  animation.onfinish = animation.oncancel = () => active.delete(animation);
}

/** Only transient animation effects; base HTML/CSS always contains visible content. */
export function reveal(element: HTMLElement) {
  element.dataset.revealed = "true";
  if (
    window.matchMedia(reducedMotion).matches ||
    element.contains(document.activeElement)
  )
    return;
  element.getAnimations({ subtree: true }).forEach((animation) => {
    if (active.has(animation)) animation.cancel();
  });
  const layers = Array.from(
    element.querySelectorAll<HTMLElement>("[data-layer]"),
  );
  if (element.dataset.reveal !== "group" || !layers.length) {
    animate(
      element,
      [
        { opacity: 0.35, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      460,
    );
  }
  layers.forEach((layer, index) => {
    animate(
      layer,
      [
        { opacity: 0.35, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      420,
      Math.min(index * 55, 220),
    );
  });
  element.querySelectorAll(".spectrum-trace").forEach((trace) => {
    animate(
      trace,
      [
        { opacity: 0.2, transform: "scaleY(0.08)" },
        { opacity: 1, transform: "scaleY(1)" },
      ],
      760,
      150,
    );
  });
  element.querySelectorAll(".coverage-bar").forEach((bar, index) => {
    animate(
      bar,
      [
        { opacity: 0, transform: "scaleX(0.1)" },
        { opacity: 1, transform: "scaleX(1)" },
      ],
      460,
      100 + index * 45,
    );
  });
}

export function usePageMotion() {
  useEffect(() => {
    const preference = window.matchMedia(reducedMotion);
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const stop = () => {
      active.forEach((animation) => animation.cancel());
      active.clear();
    };
    // Older browsers and reduced-motion users receive the stable, visible page.
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    const onPreference = () => {
      if (preference.matches) stop();
    };
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    // Keyboard focus never has to wait for a reveal to finish.
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const panel = event.target.closest("[data-reveal]");
      panel
        ?.getAnimations({ subtree: true })
        .forEach((animation) => animation.finish());
    };
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("focusin", onFocus);
    return () => {
      observer.disconnect();
      stop();
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("focusin", onFocus);
    };
  }, []);
}

/** Animate updates in place so tab focus and accessible panel IDs stay intact. */
export function useChangeMotion<T extends Element>(
  value: string | number,
  chart = false,
) {
  const ref = useRef<T>(null);
  const previous = useRef(value);
  useEffect(() => {
    if (previous.current === value) return;
    previous.current = value;
    if (!ref.current) return;
    ref.current.getAnimations().forEach((animation) => animation.cancel());
    animate(
      ref.current,
      chart
        ? [
            { opacity: 0.25, transform: "scaleY(0.25)" },
            { opacity: 1, transform: "scaleY(1)" },
          ]
        : [
            { opacity: 0.3, transform: "translateY(6px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
      chart ? 440 : 240,
    );
  }, [value, chart]);
  return ref;
}
