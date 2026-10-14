import { useChangeMotion } from "../motion";
import { useId } from "react";
import { content } from "../content";
import { makePeaks, sequence, spectrumSummary } from "../data";
export function Spectrum({
  seed = 1,
  name = "Sample A",
  compact = false,
  mint = false,
}: {
  seed?: number;
  name?: string;
  compact?: boolean;
  mint?: boolean;
}) {
  const id = useId();
  const traceRef = useChangeMotion<SVGGElement>(seed, true);
  return (
    <figure
      data-reveal="signal"
      className={`spectrum ${compact ? "spectrum-compact" : ""} ${mint ? "spectrum-mint" : ""}`}
      aria-labelledby={id}
    >
      <figcaption id={id} className="sr-only">
        {spectrumSummary(name)}
      </figcaption>
      <div className="axis-y">Relative intensity</div>
      <div className="plot-wrapper">
        <div className="y-ticks" aria-hidden="true">
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>
        <svg
          className="spectrum-plot"
          viewBox="0 0 600 210"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[10, 105, 200].map((y) => (
            <line
              key={`h${y}`}
              x1="0"
              x2="600"
              y1={y}
              y2={y}
              className="chart-grid"
            />
          ))}
          {[0, 150, 300, 450, 600].map((x) => (
            <line
              key={`v${x}`}
              x1={x}
              x2={x}
              y1="10"
              y2="200"
              className="chart-grid chart-grid-vertical"
            />
          ))}
          <rect
            x={250 + seed * 4}
            y="10"
            width="48"
            height="190"
            className="signal-band"
          />
          <g className="spectrum-trace" ref={traceRef}>
            {makePeaks(seed).map((p, i) => (
              <line
                key={i}
                x1={p.x * 584 + 8}
                x2={p.x * 584 + 8}
                y1="200"
                y2={200 - p.y * 205}
                className={p.highlight ? "peak peak-highlight" : "peak"}
              />
            ))}
          </g>
          <line x1="0" x2="600" y1="200" y2="200" className="chart-baseline" />
          <line className="spectrum-scan" x1="0" x2="0" y1="10" y2="200" />
        </svg>
        <div className="x-ticks" aria-hidden="true">
          <span>400</span>
          <span>800</span>
          <span>1,200</span>
          <span>1,600</span>
          <span>2,000</span>
        </div>
        <div className="axis-x" aria-hidden="true">
          m/z
        </div>
      </div>
    </figure>
  );
}
export function Sequence({
  positions = [18, 27, 46],
  compact = false,
}: {
  positions?: readonly number[];
  compact?: boolean;
}) {
  return (
    <div
      className={`sequence-block ${compact ? "sequence-compact" : ""}`}
      data-reveal="sequence"
    >
      <div className="sequence-ruler" aria-hidden="true">
        <span>01</span>
        <span>15</span>
        <span>30</span>
        <span>45</span>
        <span>60</span>
      </div>
      <div
        className="sequence"
        role="img"
        aria-label={`Illustrative amino-acid sequence. Highlighted positions: ${positions.join(", ")}.`}
      >
        {sequence.split("").map((r, i) => (
          <span
            key={i}
            className={
              positions.includes(i + 1) ? "residue residue-selected" : "residue"
            }
            aria-hidden="true"
          >
            {r}
            {positions.includes(i + 1) && <i />}
          </span>
        ))}
      </div>
      <p className="microcopy">{content.ui.sequenceNote}</p>
    </div>
  );
}
export function Coverage({
  start = 5,
  end = 18,
}: {
  start?: number;
  end?: number;
}) {
  return (
    <div
      className="coverage"
      data-reveal="coverage"
      role="img"
      aria-label={`Illustrative peptide coverage. Selected region: positions ${start} to ${end}. No measured coverage is represented.`}
    >
      <div className="coverage-ruler" aria-hidden="true">
        <span>01</span>
        <span>20</span>
        <span>40</span>
        <span>60</span>
      </div>
      <div className="protein-track" aria-hidden="true">
        {Array.from({ length: 60 }, (_, i) => (
          <span
            className={i + 1 >= start && i + 1 <= end ? "track-selected" : ""}
            key={i}
          />
        ))}
      </div>
      <div className="coverage-lanes" aria-hidden="true">
        {[
          [5, 18],
          [14, 29],
          [22, 37],
          [33, 47],
          [41, 55],
        ].map(([a, b], i) => (
          <div key={i} className="coverage-lane">
            <span
              className={
                a === start
                  ? "coverage-bar coverage-bar-selected"
                  : "coverage-bar"
              }
              style={{
                marginLeft: `${(a / 60) * 100}%`,
                width: `${((b - a) / 60) * 100}%`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="coverage-legend">
        <span className="legend-square" />
        {content.ui.peptideRegion}
        <span className="mono">
          {String(start).padStart(2, "0")}–{end}
        </span>
      </div>
    </div>
  );
}
export function WorkflowSchematic({ mode }: { mode: string }) {
  const id = useId(),
    top = mode === "top-down",
    middle = mode === "middle-down";
  return (
    <div className="workflow-diagram" data-reveal="schematic">
      <svg viewBox="0 0 540 200" role="img" aria-labelledby={id}>
        <title id={id}>
          {(top
            ? "Intact protein, fragmentation, then spectrum inspection."
            : middle
              ? "Large protein fragments, with one selected for spectrum inspection."
              : "A specific protein region selected for peptide and spectrum inspection.") +
            " Workflow illustration, not a molecular structure."}
        </title>
        <path d="M38 76H502" className="diagram-line" />
        {Array.from({ length: 25 }, (_, i) => {
          const selected =
              top || (middle ? i >= 9 && i <= 15 : i >= 13 && i <= 18),
            gap = middle ? (i > 7 ? 8 : 0) + (i > 16 ? 8 : 0) : 0;
          return (
            <rect
              key={i}
              x={35 + i * 18 + gap}
              y={64 + Math.sin(i * 0.8) * (top ? 9 : 0)}
              width="12"
              height="25"
              rx="5"
              className={
                selected ? "diagram-residue active" : "diagram-residue"
              }
            />
          );
        })}
        {(top ? [156, 282, 408] : middle ? [183, 353] : [269, 383]).map((x) => (
          <path
            key={x}
            d={`M${x} 45v10m-4-5 4 5 4-5`}
            className="fragment-mark"
          />
        ))}
        <path d="M280 104v38m-5-6 5 6 5-6" className="diagram-arrow" />
        <rect
          x="206"
          y="154"
          width="148"
          height="4"
          rx="2"
          className="diagram-line-fill"
        />
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            key={i}
            x={215 + i * 15}
            y="146"
            width="10"
            height="20"
            rx="4"
            className={
              i > 2 && i < 7 ? "diagram-residue active" : "diagram-residue"
            }
          />
        ))}
      </svg>
      <div className="diagram-spectrum">
        <Spectrum
          seed={top ? 1 : middle ? 5 : 9}
          compact
          name={`${mode} workflow illustration`}
        />
      </div>
    </div>
  );
}
