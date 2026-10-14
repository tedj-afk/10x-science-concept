import { useId, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { ArrowsOutSimple } from "@phosphor-icons/react/dist/csr/ArrowsOutSimple";
import { ArrowCounterClockwise } from "@phosphor-icons/react/dist/csr/ArrowCounterClockwise";
import { Check } from "@phosphor-icons/react/dist/csr/Check";
import { content } from "../content";
import { sequence } from "../data";
import {
  drawingPeaks,
  fullRange,
  rangeAround,
  signalMass,
  signals,
} from "../previewData";
import type { PlotRange } from "../previewData";
import { useChangeMotion } from "../motion";

export function InteractiveSpectrum({
  seed,
  selected,
  onSelect,
  range,
  onRange,
  annotated,
  name,
}: {
  seed: number;
  selected: number;
  onSelect: (index: number) => void;
  range: PlotRange;
  onRange: (range: PlotRange) => void;
  annotated: boolean;
  name: string;
}) {
  const id = useId();
  const start = useRef<number | null>(null);
  const [drag, setDrag] = useState<PlotRange | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const traceRef = useChangeMotion<SVGGElement>(seed, true);
  const width = range[1] - range[0];
  const x = (mass: number) => ((mass - range[0]) / width) * 600;
  const isZoomed = width < 1599;
  const plotMass = (event: PointerEvent<SVGSVGElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    return (
      range[0] +
      Math.max(0, Math.min(1, (event.clientX - box.left) / box.width)) * width
    );
  };
  function pick(mass: number) {
    const nearest = signals.reduce(
      (best, _, i) =>
        Math.abs(signalMass(i, seed) - mass) <
        Math.abs(signalMass(best, seed) - mass)
          ? i
          : best,
      0,
    );
    onSelect(nearest);
  }
  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      onSelect((selected + (event.key === "ArrowRight" ? 1 : 2)) % 3);
    } else if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      onRange(rangeAround(signalMass(selected, seed), width / 2));
    } else if (
      event.key === "-" ||
      event.key === "0" ||
      event.key === "Escape"
    ) {
      event.preventDefault();
      onRange(fullRange);
      start.current = null;
      setDrag(null);
    }
  }
  return (
    <div className="interactive-spectrum">
      <div className="plot-toolbar">
        <span>{content.ui.dragHint}</span>
        <div>
          <button
            type="button"
            className="tool-button"
            onClick={() => onRange(rangeAround(signalMass(selected, seed)))}
            aria-label={content.ui.zoom}
            title={content.ui.zoom}
          >
            <ArrowsOutSimple size={15} />
            <span>Zoom</span>
          </button>
          <button
            type="button"
            className="tool-button"
            disabled={!isZoomed}
            onClick={() => onRange(fullRange)}
            aria-label={content.ui.resetZoom}
          >
            <ArrowCounterClockwise size={15} />
            <span>Reset</span>
          </button>
        </div>
      </div>
      <figure aria-labelledby={id} data-reveal="signal">
        <figcaption id={id} className="sr-only">
          {name}. Schematic spectrum; no experimental results. Displayed m/z
          range {Math.round(range[0])} to {Math.round(range[1])}. Selected{" "}
          {signals[selected].name}, linked to illustrative sequence positions{" "}
          {signals[selected].start} to {signals[selected].end}. Use the signal
          buttons below, or focus the chart and use left/right arrows to select,
          plus to zoom, and zero to reset.
        </figcaption>
        <div
          className="live-plot"
          role="group"
          aria-label={`${name} interactive spectrum`}
          tabIndex={0}
          onKeyDown={onKey}
        >
          <span className="live-axis-y">Relative intensity</span>
          <div className="live-y-ticks" aria-hidden="true">
            <span>100</span>
            <span>50</span>
            <span>0</span>
          </div>
          <div className="live-plot-area">
            <svg
              viewBox="0 0 600 210"
              preserveAspectRatio="none"
              aria-hidden="true"
              onPointerDown={(event) => {
                if (event.button !== 0) return;
                start.current = plotMass(event);
                event.currentTarget.setPointerCapture(event.pointerId);
                setDrag(null);
              }}
              onPointerMove={(event) => {
                const mass = plotMass(event);
                setHover(mass);
                if (start.current !== null) setDrag([start.current, mass]);
              }}
              onPointerLeave={() => setHover(null)}
              onPointerCancel={() => {
                start.current = null;
                setDrag(null);
              }}
              onPointerUp={(event) => {
                if (start.current === null) return;
                const end = plotMass(event),
                  first = start.current;
                if (Math.abs(end - first) > width * 0.025)
                  onRange(
                    rangeAround((end + first) / 2, Math.abs(end - first)),
                  );
                else pick(end);
                start.current = null;
                setDrag(null);
                setHover(null);
                if (event.currentTarget.hasPointerCapture(event.pointerId))
                  event.currentTarget.releasePointerCapture(event.pointerId);
              }}
              onDoubleClick={() => onRange(fullRange)}
            >
              <defs>
                <clipPath id={`${id}-clip`}>
                  <rect width="600" height="210" />
                </clipPath>
              </defs>
              {[10, 100, 190].map((y) => (
                <line
                  key={y}
                  x1="0"
                  x2="600"
                  y1={y}
                  y2={y}
                  className="chart-grid"
                />
              ))}
              {[0, 150, 300, 450, 600].map((v) => (
                <line
                  key={v}
                  x1={v}
                  x2={v}
                  y1="10"
                  y2="190"
                  className="chart-grid"
                />
              ))}
              <g clipPath={`url(#${id}-clip)`}>
                <rect
                  x={x(signalMass(selected, seed)) - 15}
                  y="10"
                  width="30"
                  height="180"
                  className="signal-band"
                />
                <g ref={traceRef} className="spectrum-trace">
                  {drawingPeaks(seed).map((p, i) => (
                    <line
                      key={i}
                      x1={x(p.x)}
                      x2={x(p.x)}
                      y1="190"
                      y2={190 - p.y * 180}
                      className="live-peak"
                    />
                  ))}
                </g>
                {signals.map((signal, i) => (
                  <g
                    key={signal.id}
                    className={
                      i === selected ? "live-signal selected" : "live-signal"
                    }
                  >
                    <line
                      x1={x(signalMass(i, seed))}
                      x2={x(signalMass(i, seed))}
                      y1="190"
                      y2={190 - signal.height * 180}
                    />
                    <circle
                      cx={x(signalMass(i, seed))}
                      cy={190 - signal.height * 180}
                      r={i === selected ? 4 : 2.5}
                    />
                  </g>
                ))}
                {drag && (
                  <rect
                    className="zoom-selection"
                    x={Math.min(x(drag[0]), x(drag[1]))}
                    y="10"
                    width={Math.abs(x(drag[1]) - x(drag[0]))}
                    height="180"
                  />
                )}
                {hover !== null && !drag && (
                  <line
                    className="plot-crosshair"
                    x1={x(hover)}
                    x2={x(hover)}
                    y1="10"
                    y2="190"
                  />
                )}
              </g>
              <line className="spectrum-scan" x1="0" x2="0" y1="10" y2="190" />
              <line
                x1="0"
                x2="600"
                y1="190"
                y2="190"
                className="chart-baseline"
              />
            </svg>
            {annotated &&
              signals.map((signal, i) => {
                const left = x(signalMass(i, seed)) / 6;
                if (left < 4 || left > 96) return null;
                return (
                  <span
                    aria-hidden="true"
                    key={signal.id}
                    className={`peak-label ${i === selected ? "active" : ""}`}
                    style={{
                      left: `${left}%`,
                      top: `${(190 - signal.height * 180) / 2.1}%`,
                    }}
                  >
                    {signal.name}
                  </span>
                );
              })}
            {hover !== null && (
              <span className="plot-tooltip" aria-hidden="true">
                m/z {Math.round(hover)} · illustrative
              </span>
            )}
            <div className="live-x-ticks" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>
                  {Math.round(range[0] + (width * i) / 4).toLocaleString(
                    "en-US",
                  )}
                </span>
              ))}
            </div>
            <div className="axis-x">m/z</div>
          </div>
        </div>
      </figure>
      <div className="signal-selector" aria-label={content.ui.signalLinks}>
        {signals.map((signal, i) => (
          <button
            key={signal.id}
            type="button"
            aria-pressed={selected === i}
            onClick={() => onSelect(i)}
          >
            <span
              className={`signal-symbol signal-symbol-${i}`}
              aria-hidden="true"
            />
            {signal.name}
            {selected === i && <Check size={13} aria-label="Selected" />}
          </button>
        ))}
      </div>
    </div>
  );
}

export type Annotation = { position: number; category: string };
export function LinkedSequence({
  selected,
  annotated,
  editable = false,
  position = 18,
  onPosition,
  annotations = [],
}: {
  selected: number;
  annotated: boolean;
  editable?: boolean;
  position?: number;
  onPosition?: (position: number) => void;
  annotations?: Annotation[];
}) {
  const signal = signals[selected];
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | undefined;
    if (event.key === "ArrowRight") next = Math.min(60, index + 2);
    if (event.key === "ArrowLeft") next = Math.max(1, index);
    if (event.key === "Home") next = 1;
    if (event.key === "End") next = 60;
    if (next) {
      event.preventDefault();
      onPosition?.(next);
      (
        event.currentTarget.parentElement?.children[next - 1] as HTMLElement
      )?.focus();
    }
  }
  return (
    <div className={`linked-sequence ${editable ? "editable-sequence" : ""}`}>
      <div className="sequence-caption">
        <span>{content.ui.sequence}</span>
        <span className="mono">01–60</span>
      </div>
      <div
        className="linked-residues"
        role={editable ? "group" : "img"}
        aria-label={
          editable
            ? "Choose a sequence position. Arrow keys move between positions."
            : `Schematic sequence; selected region ${signal.start} to ${signal.end}.`
        }
      >
        {sequence.split("").map((residue, i) => {
          const index = i + 1,
            inRegion = index >= signal.start && index <= signal.end;
          const added = annotations.some((item) => item.position === index);
          const className = `linked-residue ${!editable && inRegion ? "in-region" : ""} ${editable && index === position ? "is-current" : ""} ${added ? "has-annotation" : ""} ${annotated && (index === signal.start || index === signal.end) ? "cleavage-mark" : ""}`;
          return editable ? (
            <button
              key={i}
              type="button"
              className={className}
              aria-label={`Position ${index}, ${residue}${added ? ", annotated" : ""}`}
              aria-pressed={position === index}
              tabIndex={position === index ? 0 : -1}
              onClick={() => onPosition?.(index)}
              onKeyDown={(event) => navigate(event, i)}
            >
              <small>{index}</small>
              {residue}
              {added && <i aria-hidden="true" />}
            </button>
          ) : (
            <span className={className} key={i} aria-hidden="true">
              <small>
                {index % 10 === 1 ? String(index).padStart(2, "0") : ""}
              </small>
              {residue}
            </span>
          );
        })}
      </div>
      <p className="microcopy">
        {editable ? content.ui.residueHint : content.ui.sequenceNote}
      </p>
    </div>
  );
}
