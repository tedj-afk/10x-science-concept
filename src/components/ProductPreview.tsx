import { useRef, useState } from "react";
import { ArrowClockwise } from "@phosphor-icons/react/dist/csr/ArrowClockwise";
import { reveal, useChangeMotion } from "../motion";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { CaretRight } from "@phosphor-icons/react/dist/csr/CaretRight";
import { FolderSimple } from "@phosphor-icons/react/dist/csr/FolderSimple";
import { Stack } from "@phosphor-icons/react/dist/csr/Stack";
import { ChartBar } from "@phosphor-icons/react/dist/csr/ChartBar";
import { DotsThree } from "@phosphor-icons/react/dist/csr/DotsThree";
import { Database } from "@phosphor-icons/react/dist/csr/Database";
import { Check } from "@phosphor-icons/react/dist/csr/Check";
import { Flask } from "@phosphor-icons/react/dist/csr/Flask";
import { content } from "../content";
import { modifications, peptides, samples } from "../data";
import { Coverage, Sequence, Spectrum } from "./ScientificVisuals";
import { Tabs } from "./Tabs";
export function ProductPreview() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState("protein"),
    [sampleIndex, setSampleIndex] = useState(0),
    [modIndex, setModIndex] = useState(0),
    [peptideIndex, setPeptideIndex] = useState(0);
  const sample = samples[sampleIndex],
    modification = modifications[modIndex],
    peptide = peptides[peptideIndex],
    current = content.platform.tabs.find((item) => item.id === tab)!;
  const canvasRef = useChangeMotion<HTMLDivElement>(tab);
  return (
    <section
      id="platform"
      className="platform container"
      aria-labelledby="platform-heading"
    >
      <div className="platform-intro" data-reveal>
        <div>
          <p className="eyebrow">{content.platform.eyebrow}</p>
          <h2 id="platform-heading">{content.platform.heading}</h2>
        </div>
        <p>{content.platform.body}</p>
      </div>
      <div className="preview-surround">
        <div className="spectrum-field" aria-hidden="true">
          {Array.from({ length: 70 }, (_, i) => (
            <i
              key={i}
              style={{ height: `${20 + Math.abs(Math.sin(i * 4.12)) * 80}%` }}
            />
          ))}
        </div>
        <div className="application-frame" data-reveal="panel" ref={frameRef}>
          <div className="app-chrome" data-layer>
            <span className="app-brand">
              <img
                src="/assets/10x-science-wordmark.svg"
                width="108"
                height="24"
                alt="10x Science"
              />
              <span className="chrome-divider" />
              <span>{content.ui.project}</span>
            </span>
            <span className="illustrative-label">
              <span className="status-dot" />
              {content.platform.label}
            </span>
          </div>
          <Tabs
            items={content.platform.tabs}
            value={tab}
            onChange={setTab}
            label="Platform walkthrough"
            id="platform"
          />
          <div
            className="app-body"
            id="platform-panel"
            role="tabpanel"
            aria-labelledby={`platform-tab-${tab}`}
            tabIndex={0}
          >
            <aside
              className="app-sidebar"
              data-layer
              aria-label="Example project samples"
            >
              <div className="sidebar-project">
                <FolderSimple size={17} />
                <span>{content.ui.project}</span>
                <CaretRight size={12} />
              </div>
              <div className="sidebar-label">
                {content.ui.samples}
                <span>03</span>
              </div>
              <div className="sample-list">
                {samples.map((item, i) => (
                  <button
                    type="button"
                    key={item.id}
                    aria-pressed={sampleIndex === i}
                    onClick={() => setSampleIndex(i)}
                    className={`sample-button ${sampleIndex === i ? "is-selected" : ""}`}
                  >
                    <Flask size={17} />
                    <span>{item.name}</span>
                    {sampleIndex === i && (
                      <Check size={14} aria-label="Selected" />
                    )}
                  </button>
                ))}
              </div>
              <div className="sidebar-bottom">
                <Database size={15} />
                {content.ui.sampleData}
              </div>
            </aside>
            <div className="analysis-main" data-layer ref={canvasRef}>
              <div className="analysis-heading">
                <div>
                  <p className="technical-label">{content.ui.overview}</p>
                  <h3>
                    {sample.name}
                    <span className="sample-tag">{content.ui.protein}</span>
                  </h3>
                </div>
                <span className="view-glyph" aria-hidden="true">
                  <ChartBar size={18} />
                </span>
              </div>
              {tab === "protein" && (
                <>
                  <div className="canvas-label">
                    <span>
                      <ChartBar size={15} />
                      {content.ui.spectrum}
                    </span>
                    <span className="mono">m/z</span>
                  </div>
                  <Spectrum seed={sample.seed} name={sample.name} />
                  <div className="below-spectrum">
                    <Stack size={15} />
                    <span>{sample.detail}</span>
                    <span className="signal-key">
                      <i />
                      {content.ui.selected}
                    </span>
                  </div>
                </>
              )}
              {tab === "modifications" && (
                <>
                  <div className="canvas-label">
                    <span>
                      <Stack size={15} />
                      {content.ui.sequence}
                    </span>
                    <span className="mono">01–60</span>
                  </div>
                  <Sequence positions={modification.positions} />
                  <div className="modification-readout" aria-live="polite">
                    <span className="readout-mark">
                      <Stack size={22} />
                    </span>
                    <div>
                      <span className="technical-label">
                        {content.ui.selected}
                      </span>
                      <strong>{modification.name}</strong>
                    </div>
                    <span className="mono">
                      {modification.positions.join(" · ")}
                    </span>
                  </div>
                </>
              )}
              {tab === "peptides" && (
                <>
                  <div className="canvas-label">
                    <span>
                      <Stack size={15} />
                      {content.ui.coverage}
                    </span>
                    <span className="mono">01–60</span>
                  </div>
                  <Coverage start={peptide.start} end={peptide.end} />
                  <div className="mini-spectrum-label">
                    <span>{peptide.label}</span>
                    <span>{content.ui.linkedSpectrum}</span>
                  </div>
                  <Spectrum
                    seed={peptide.seed + sampleIndex}
                    compact
                    name={`${sample.name}, ${peptide.label}`}
                  />
                </>
              )}
            </div>
            <aside
              className="app-details"
              data-layer
              aria-label={content.ui.details}
            >
              <div className="details-title">
                {tab === "protein"
                  ? content.ui.details
                  : tab === "modifications"
                    ? content.ui.modCategories
                    : content.ui.peptideRegion}
                <DotsThree size={20} aria-hidden="true" />
              </div>
              {tab === "protein" ? (
                <>
                  <div className="detail-sample-icon">
                    <Flask size={28} weight="light" />
                  </div>
                  <h4>{sample.name}</h4>
                  <span className="detail-pill">{content.ui.illustrative}</span>
                  <dl>
                    <div>
                      <dt>Project</dt>
                      <dd>{content.ui.project}</dd>
                    </div>
                    <div>
                      <dt>View</dt>
                      <dd>Protein analysis</dd>
                    </div>
                    <div>
                      <dt>Signal</dt>
                      <dd>{sample.detail}</dd>
                    </div>
                  </dl>
                </>
              ) : tab === "modifications" ? (
                <div className="detail-options">
                  {modifications.map((m, i) => (
                    <button
                      type="button"
                      key={m.name}
                      onClick={() => setModIndex(i)}
                      aria-pressed={modIndex === i}
                    >
                      <span>{m.name}</span>
                      {modIndex === i ? (
                        <Check size={15} />
                      ) : (
                        <ArrowRight size={15} />
                      )}
                    </button>
                  ))}
                  <p className="microcopy">
                    {content.ui.positions}: {modification.positions.join(", ")}.
                    No molecular assignment is implied.
                  </p>
                </div>
              ) : (
                <div className="detail-options">
                  {peptides.map((p, i) => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setPeptideIndex(i)}
                      aria-pressed={peptideIndex === i}
                    >
                      <span>
                        {p.label}
                        <small>
                          {p.start}–{p.end}
                        </small>
                      </span>
                      {peptideIndex === i ? (
                        <Check size={15} />
                      ) : (
                        <ArrowRight size={15} />
                      )}
                    </button>
                  ))}
                </div>
              )}
              <div className="detail-footnote">{content.ui.chartNote}</div>
            </aside>
          </div>
          <div className="app-status" data-layer>
            <span>
              <span className="status-dot" />
              {content.ui.conceptual}
            </span>
            <span>
              {content.ui.project}
              <CaretRight size={11} />
              {sample.name}
            </span>
          </div>
        </div>
      </div>
      <div className="preview-caption">
        <p className="caption-text" aria-live="polite">
          <span className="caption-index">
            0{content.platform.tabs.indexOf(current) + 1}
          </span>
          {current.caption}
        </p>
        <button
          type="button"
          className="replay-button"
          onClick={() => {
            if (frameRef.current) reveal(frameRef.current);
          }}
        >
          <ArrowClockwise size={15} aria-hidden="true" />
          {content.ui.replay}
        </button>
      </div>
    </section>
  );
}
