import { useEffect, useRef } from "react";

const reducedMotion = "(prefers-reduced-motion: reduce)";
const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
const active = new Map<Animation, Element>();
const canMove = () =>
  !document.hidden && !window.matchMedia(reducedMotion).matches;

function animate(
  element: Element,
  frames: Keyframe[],
  duration: number,
  delay = 0,
  easing = ease,
) {
  if (!element.animate || !canMove()) return;
  const animation = element.animate(frames, {
    duration,
    delay,
    easing,
    fill: "backwards",
  });
  active.set(animation, element);
  animation.onfinish = animation.oncancel = () => active.delete(animation);
}

function stopWithin(root?: Element) {
  active.forEach((element, animation) => {
    if (!root || root === element || root.contains(element)) animation.cancel();
  });
}

/** The axes stay still: only the schematic trace is read across. */
function readSpectrum(root: Element, delay = 0) {
  root.querySelectorAll<SVGGElement>(".spectrum-trace").forEach((trace) => {
    animate(
      trace,
      [
        { clipPath: "inset(0 100% 0 0)", opacity: 0.6 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1 },
      ],
      1050,
      delay,
      "cubic-bezier(0.3, 0, 0.25, 1)",
    );
  });
  root.querySelectorAll(".spectrum-scan").forEach((scan) => {
    animate(
      scan,
      [
        { transform: "translateX(0px)", opacity: 0, offset: 0 },
        { transform: "translateX(24px)", opacity: 0.8, offset: 0.08 },
        { transform: "translateX(570px)", opacity: 0.55, offset: 0.9 },
        { transform: "translateX(600px)", opacity: 0, offset: 1 },
      ],
      1050,
      delay,
      "cubic-bezier(0.3, 0, 0.25, 1)",
    );
  });
}

function registerSequence(root: Element, delay = 0) {
  // No text scrambling: the exact illustrative sequence stays readable.
  root.querySelectorAll(".sequence").forEach((sequence) => {
    sequence.querySelectorAll(".residue").forEach((residue, index) => {
      animate(
        residue,
        [
          { opacity: 0.28, transform: "translateY(3px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        320,
        delay + (index % 20) * 20 + Math.floor(index / 20) * 75,
      );
    });
    sequence.querySelectorAll(".residue-selected i").forEach((mark, index) => {
      animate(
        mark,
        [
          { transform: "scale(0)", opacity: 0 },
          { transform: "scale(1.7)", opacity: 1, offset: 0.6 },
          { transform: "scale(1)", opacity: 1 },
        ],
        380,
        delay + 430 + index * 100,
      );
    });
  });
}

function assembleCoverage(root: Element, delay = 0) {
  root.querySelectorAll(".protein-track").forEach((track) => {
    animate(
      track,
      [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }],
      650,
      delay,
    );
  });
  root.querySelectorAll(".coverage-bar").forEach((bar, index) => {
    animate(
      bar,
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      550,
      delay + 180 + index * 95,
    );
  });
}

function drawSchematic(root: Element, delay = 0) {
  root.querySelectorAll(".diagram-residue").forEach((residue, index) => {
    const fragment = index >= 25;
    animate(
      residue,
      [
        { opacity: 0.15, transform: `translateY(${fragment ? -9 : 5}px)` },
        { opacity: 1, transform: "translateY(0)" },
      ],
      400,
      delay + (fragment ? 600 + (index - 25) * 25 : index * 16),
    );
  });
  root.querySelectorAll<SVGPathElement>(".fragment-mark").forEach((path, i) => {
    const length = path.getTotalLength();
    animate(
      path,
      [
        { strokeDasharray: `${length}`, strokeDashoffset: length, opacity: 0 },
        { strokeDasharray: `${length}`, strokeDashoffset: 0, opacity: 1 },
      ],
      400,
      delay + 420 + i * 90,
    );
  });
}

function rule(root: Element, delay = 0) {
  root.querySelectorAll(".motion-rule").forEach((line) => {
    animate(
      line,
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      750,
      delay,
    );
  });
}

function ink(element: Element, delay = 0) {
  animate(element, [{ opacity: 0.45 }, { opacity: 1 }], 460, delay);
}

/** Once-on-entry recipes. Base HTML/CSS always contains the complete page. */
export function reveal(element: HTMLElement) {
  element.dataset.revealed = "true";
  if (!canMove() || element.contains(document.activeElement)) return;
  stopWithin(element);
  const recipe = element.dataset.reveal;
  element.dataset.motionRecipe = recipe || "editorial";
  rule(element);

  if (recipe === "signal") {
    readSpectrum(element);
    return;
  }
  if (recipe === "sequence") {
    registerSequence(element);
    return;
  }
  if (recipe === "coverage") {
    assembleCoverage(element);
    return;
  }
  if (recipe === "schematic") {
    drawSchematic(element);
    return;
  }
  if (recipe === "footer") {
    ink(element);
    return;
  }

  if (recipe === "hero") {
    // Two typeset lines come into registration; body copy never disappears.
    element.querySelectorAll("h1 > span").forEach((line, index) => {
      animate(
        line,
        [
          {
            clipPath: "inset(-12% 100% -18% 0)",
            transform: "translateX(-8px)",
          },
          { clipPath: "inset(-12% 0% -18% 0)", transform: "translateX(0)" },
        ],
        900,
        90 + index * 150,
      );
    });
    element
      .querySelectorAll(".hero-bottom > *, .hero .eyebrow")
      .forEach((part, i) => ink(part, 250 + i * 100));
    return;
  }

  if (recipe === "question") {
    element
      .querySelectorAll(".question-top, h3")
      .forEach((part, i) => ink(part, i * 140));
    return;
  }

  if (recipe === "panel") {
    // Register the frame first, then its contents. No whole-panel lift or zoom.
    element.querySelectorAll("[data-layer]").forEach((layer, index) => {
      if (layer.matches(".workflow-diagram")) return;
      ink(layer, Math.min(index * 95, 285));
    });
    element
      .querySelectorAll(".forms-list button, .browser-row")
      .forEach((row, i) => {
        animate(
          row,
          [
            { clipPath: "inset(0 100% 0 0)", opacity: 0.6 },
            { clipPath: "inset(0 0% 0 0)", opacity: 1 },
          ],
          600,
          280 + i * 115,
        );
      });
    return;
  }

  // Prose is set in place, not repeatedly flown up the page.
  const layers = element.querySelectorAll("[data-layer]");
  if (layers.length) layers.forEach((layer, index) => ink(layer, index * 90));
  else
    element
      .querySelectorAll(".eyebrow, h2, h3, p, summary")
      .forEach((part, index) => ink(part, Math.min(index * 75, 225)));
}

export function usePageMotion() {
  useEffect(() => {
    const preference = window.matchMedia(reducedMotion);
    const targets = [
      ...document.querySelectorAll<HTMLElement>("[data-reveal]"),
    ];
    const rails = [
      ...document.querySelectorAll<HTMLElement>("[data-scroll-figure]"),
    ];
    const visibleRails = new Set<HTMLElement>();
    const seen = new WeakSet<Element>();
    let frame = 0;
    if (!("IntersectionObserver" in window)) return;

    const updateRails = () => {
      frame = 0;
      if (!canMove()) return;
      visibleRails.forEach((element) => {
        const box = element.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight * 0.78 - box.top) /
              (box.height + window.innerHeight * 0.25),
          ),
        );
        element.style.setProperty("--reading-progress", progress.toFixed(4));
      });
    };
    const schedule = () => {
      if (!frame && visibleRails.size && canMove())
        frame = requestAnimationFrame(updateRails);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (!entry.isIntersecting) {
            // Scrolling away finishes the story in its complete, stable state.
            stopWithin(element);
            return;
          }
          if (seen.has(element)) return;
          seen.add(element);
          reveal(element);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    const railObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) visibleRails.add(element);
        else visibleRails.delete(element);
      });
      schedule();
    });
    rails.forEach((rail) => railObserver.observe(rail));

    const stop = () => {
      stopWithin();
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const onPreference = () => {
      if (preference.matches) {
        stop();
        rails.forEach((rail) =>
          rail.style.removeProperty("--reading-progress"),
        );
      } else schedule();
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else schedule();
    };
    // Focus or pointer intent wins over a reveal, including SVG clipping.
    const onIntent = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target;
      if (event.type === "focusin") {
        stopWithin();
        return;
      }
      const panel = target.closest("[data-reveal]");
      if (panel) stopWithin(panel);
      active.forEach((element, animation) => {
        if (element.contains(target)) animation.cancel();
      });
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("focusin", onIntent, true);
    document.addEventListener("pointerdown", onIntent, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    preference.addEventListener("change", onPreference);
    return () => {
      observer.disconnect();
      railObserver.disconnect();
      stop();
      rails.forEach((rail) => rail.style.removeProperty("--reading-progress"));
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("focusin", onIntent, true);
      document.removeEventListener("pointerdown", onIntent);
      document.removeEventListener("visibilitychange", onVisibility);
      preference.removeEventListener("change", onPreference);
    };
  }, []);
}

/** Re-read changed analytical data without moving focused controls. */
export function useChangeMotion<T extends Element>(
  value: string | number,
  chart = false,
) {
  const ref = useRef<T>(null);
  const previous = useRef(value);
  useEffect(() => {
    if (previous.current === value) return;
    previous.current = value;
    const element = ref.current;
    if (!element || !canMove()) return;
    const focusedRegion = element.closest('[tabindex="0"]');
    if (
      element.contains(document.activeElement) ||
      focusedRegion?.contains(document.activeElement)
    )
      return;
    stopWithin(element);
    if (chart) {
      animate(
        element,
        [
          { clipPath: "inset(0 100% 0 0)", opacity: 0.55 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1 },
        ],
        480,
      );
      const scan = element.closest("svg")?.querySelector(".spectrum-scan");
      if (scan)
        animate(
          scan,
          [
            { transform: "translateX(0px)", opacity: 0.6 },
            { transform: "translateX(600px)", opacity: 0 },
          ],
          480,
        );
    } else {
      ink(element);
      drawSchematic(element);
      registerSequence(element);
      assembleCoverage(element);
      readSpectrum(element, 80);
    }
  }, [value, chart]);
  return ref;
}
