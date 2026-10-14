import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowClockwise } from "@phosphor-icons/react/dist/csr/ArrowClockwise";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { CaretRight } from "@phosphor-icons/react/dist/csr/CaretRight";
import { FolderSimple } from "@phosphor-icons/react/dist/csr/FolderSimple";
import { Database } from "@phosphor-icons/react/dist/csr/Database";
import { Check } from "@phosphor-icons/react/dist/csr/Check";
import { Flask } from "@phosphor-icons/react/dist/csr/Flask";
import { Plus } from "@phosphor-icons/react/dist/csr/Plus";
import { X } from "@phosphor-icons/react/dist/csr/X";
import { Pause } from "@phosphor-icons/react/dist/csr/Pause";
import { useChangeMotion } from "../motion";
import { content } from "../content";
import { modifications, peptides, samples, sequence } from "../data";
import { fullRange, rangeAround, signalMass, signals } from "../previewData";
import type { PlotRange } from "../previewData";
import { InteractiveSpectrum, LinkedSequence } from "./InteractiveAnalysis";
import type { Annotation } from "./InteractiveAnalysis";
import { Coverage } from "./ScientificVisuals";
import { Tabs } from "./Tabs";

export function ProductPreview() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState("protein");
  const [sampleIndex, setSampleIndex] = useState(0);
  const [selected, setSelected] = useState(1);
  const [modIndex, setModIndex] = useState(0);
  const [position, setPosition] = useState(18);
  const [annotations, setAnnotations] = useState<Annotation[]>([
    { position: 18, category: "Glycosylation" },
  ]);
  const [annotated, setAnnotated] = useState(true);
  const [range, setRange] = useState<PlotRange>(fullRange);
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(-1);
  const [notice, setNotice] = useState<string>(content.ui.demoOnly);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const sample = samples[sampleIndex],
    signal = signals[selected],
    modification = modifications[modIndex];
  const current = content.platform.tabs.find((item) => item.id === tab)!;
  const canvasRef = useChangeMotion<HTMLDivElement>(tab);
  const steps =
    tab === "protein"
      ? content.ui.proteinSteps
      : tab === "modifications"
        ? content.ui.modificationSteps
        : content.ui.peptideSteps;
  const seed =
    tab === "peptides" ? peptides[selected].seed + sampleIndex : sample.seed;
  const exists = annotations.some(
    (item) => item.position === position && item.category === modification.name,
  );
  const stop = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPlaying(false);
  }, []);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pause = () => {
      stop();
    };
    const onVisibility = () => {
      if (document.hidden) pause();
    };
    const onMotion = () => {
      if (preference.matches) pause();
    };
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) pause();
          })
        : null;
    if (frameRef.current) observer?.observe(frameRef.current);
    document.addEventListener("visibilitychange", onVisibility);
    preference.addEventListener("change", onMotion);
    return () => {
      timers.current.forEach(clearTimeout);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      preference.removeEventListener("change", onMotion);
    };
  }, [stop]);
  function interrupt() {
    if (playing) {
      stop();
      setNotice(content.ui.walkthroughStopped);
    }
  }
  function switchTab(value: string) {
    stop();
    setTab(value);
    setStep(-1);
    setRange(fullRange);
    setNotice(content.ui.demoOnly);
  }
  function selectSignal(index: number) {
    setSelected(index);
    if (range[1] - range[0] < 1599) {
      const nextSeed =
        tab === "peptides" ? peptides[index].seed + sampleIndex : sample.seed;
      setRange(rangeAround(signalMass(index, nextSeed), range[1] - range[0]));
    }
  }
  function toggleAnnotation() {
    if (exists)
      setAnnotations((items) =>
        items.filter(
          (item) =>
            !(
              item.position === position && item.category === modification.name
            ),
        ),
      );
    else
      setAnnotations((items) => [
        ...items,
        { position, category: modification.name },
      ]);
    setNotice(
      `${exists ? "Removed" : "Added"} example annotation: ${modification.name}, position ${position}.`,
    );
  }
  function walkthrough() {
    stop();
    setStep(0);
    setNotice(steps[0]);
    setRange(fullRange);
    setAnnotated(true);
    const actions =
      tab === "modifications"
        ? [
            () => {
              setPosition(18);
              setModIndex(0);
            },
            () => {
              setPosition(16);
              setModIndex(2);
            },
            () =>
              setAnnotations((items) =>
                items.some(
                  (item) =>
                    item.position === 16 && item.category === "Phosphorylation",
                )
                  ? items
                  : [...items, { position: 16, category: "Phosphorylation" }],
              ),
          ]
        : [
            () => {
              if (tab === "protein") setSampleIndex(1);
              setSelected(0);
            },
            () => {
              setSelected(1);
              setRange(
                rangeAround(
                  signalMass(
                    1,
                    tab === "protein"
                      ? samples[1].seed
                      : peptides[1].seed + sampleIndex,
                  ),
                ),
              );
            },
            () => {
              setRange(fullRange);
              setAnnotated(true);
            },
          ];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      actions.forEach((action) => action());
      setStep(2);
      setNotice(content.ui.walkthroughComplete);
      return;
    }
    setPlaying(true);
    actions[0]();
    [1, 2].forEach((index) =>
      timers.current.push(
        setTimeout(() => {
          actions[index]();
          setStep(index);
          setNotice(steps[index]);
        }, index * 1800),
      ),
    );
    timers.current.push(
      setTimeout(() => {
        setPlaying(false);
        setNotice(content.ui.walkthroughComplete);
        timers.current = [];
      }, 5800),
    );
  }
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
        <div
          className={`application-frame interactive-frame ${playing ? "is-playing" : ""}`}
          data-reveal="panel"
          ref={frameRef}
          onPointerDownCapture={interrupt}
          onKeyDownCapture={interrupt}
        >
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
            onChange={switchTab}
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
                    onClick={() => {
                      setSampleIndex(i);
                      setRange(fullRange);
                    }}
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
              <div className="sidebar-context">
                <span className="technical-label">{content.ui.resources}</span>
                <span>
                  <Database size={14} />
                  {content.ui.uniprot}
                </span>
                <span>
                  <FolderSimple size={14} />
                  {content.ui.library}
                </span>
              </div>
              <div className="sidebar-bottom">
                <Database size={15} />
                {content.ui.sampleData}
              </div>
            </aside>
            <div className="analysis-main" data-layer ref={canvasRef}>
              <div className="analysis-heading">
                <div>
                  <p className="technical-label">
                    {tab === "modifications"
                      ? content.ui.builder
                      : content.ui.overview}
                  </p>
                  <h3>
                    {sample.name}
                    <span className="sample-tag">
                      {tab === "peptides" ? signal.label : content.ui.protein}
                    </span>
                  </h3>
                </div>
                {tab !== "modifications" && (
                  <button
                    type="button"
                    className="annotation-toggle"
                    aria-pressed={annotated}
                    onClick={() => setAnnotated((value) => !value)}
                  >
                    <span className="toggle-indicator" />
                    {content.ui.annotate}
                  </button>
                )}
              </div>
              {tab === "modifications" ? (
                <>
                  <div className="builder-position">
                    <span>
                      Position{" "}
                      <strong className="mono">
                        {position} · {sequence[position - 1]}
                      </strong>
                    </span>
                    <span>{content.ui.illustrative}</span>
                  </div>
                  <LinkedSequence
                    selected={selected}
                    annotated={false}
                    editable
                    position={position}
                    onPosition={setPosition}
                    annotations={annotations}
                  />
                  <div className="builder-editor">
                    <div>
                      <label htmlFor="modification-category">
                        Example category
                      </label>
                      <select
                        id="modification-category"
                        value={modIndex}
                        onChange={(event) =>
                          setModIndex(Number(event.target.value))
                        }
                      >
                        {modifications.map((item, i) => (
                          <option key={item.name} value={i}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      className="annotation-action"
                      onClick={toggleAnnotation}
                    >
                      {exists ? <X size={15} /> : <Plus size={15} />}
                      {exists
                        ? content.ui.removeAnnotation
                        : content.ui.addAnnotation}
                    </button>
                  </div>
                  <p className="annotation-disclaimer">
                    {content.ui.annotationNote}
                  </p>
                </>
              ) : (
                <>
                  {tab === "peptides" && (
                    <div className="interactive-coverage">
                      <Coverage start={signal.start} end={signal.end} />
                      <div className="peptide-choices">
                        {peptides.map((peptide, i) => (
                          <button
                            type="button"
                            key={peptide.id}
                            aria-pressed={selected === i}
                            onClick={() => selectSignal(i)}
                          >
                            {peptide.label}
                            <span className="mono">
                              {peptide.start}–{peptide.end}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <InteractiveSpectrum
                    seed={seed}
                    name={`${sample.name}, ${current.label}`}
                    selected={selected}
                    onSelect={selectSignal}
                    range={range}
                    onRange={setRange}
                    annotated={annotated}
                  />
                  <LinkedSequence selected={selected} annotated={annotated} />
                </>
              )}
            </div>
            <aside
              className="app-details interactive-details"
              data-layer
              aria-label={content.ui.details}
            >
              {tab === "modifications" ? (
                <>
                  <div className="details-title">
                    {content.ui.applied}
                    <span className="annotation-count">
                      {annotations.length}
                    </span>
                  </div>
                  <div className="annotation-list">
                    {annotations.length ? (
                      annotations.map((item) => (
                        <button
                          type="button"
                          key={`${item.position}-${item.category}`}
                          aria-pressed={
                            position === item.position &&
                            modification.name === item.category
                          }
                          onClick={() => {
                            setPosition(item.position);
                            setModIndex(
                              modifications.findIndex(
                                (mod) => mod.name === item.category,
                              ),
                            );
                          }}
                        >
                          <span className="annotation-node">
                            {item.position}
                          </span>
                          <span>
                            {item.category}
                            <small>
                              {sequence[item.position - 1]} · position{" "}
                              {item.position}
                            </small>
                          </span>
                          <Check size={13} />
                        </button>
                      ))
                    ) : (
                      <p className="microcopy">{content.ui.noAnnotations}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="clear-annotations"
                    disabled={!annotations.length}
                    onClick={() => {
                      setAnnotations([]);
                      setNotice("Example annotations cleared.");
                    }}
                  >
                    {content.ui.clearAnnotations}
                  </button>
                </>
              ) : (
                <>
                  <div className="details-title">
                    {content.ui.selected}
                    <span className="detail-pill">
                      {content.ui.illustrative}
                    </span>
                  </div>
                  <div className="signal-detail" aria-live="polite">
                    <span className="detail-signal-number">
                      0{selected + 1}
                      <span>/{signals.length.toString().padStart(2, "0")}</span>
                    </span>
                    <h4>{tab === "peptides" ? signal.label : signal.name}</h4>
                    <p>{sample.detail}</p>
                    <dl>
                      <div>
                        <dt>Sequence region</dt>
                        <dd>
                          {signal.start}–{signal.end}
                        </dd>
                      </div>
                      <div>
                        <dt>View</dt>
                        <dd>{current.label}</dd>
                      </div>
                    </dl>
                    <div className="region-swatch" aria-hidden="true">
                      {Array.from({ length: 30 }, (_, i) => (
                        <i
                          key={i}
                          className={
                            i * 2 + 1 >= signal.start && i * 2 + 1 <= signal.end
                              ? "active"
                              : ""
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="microcopy">{content.ui.signalHint}</p>
                  <button
                    type="button"
                    className="inspect-modification"
                    onClick={() => {
                      setPosition(signal.start);
                      switchTab("modifications");
                    }}
                  >
                    Explore modifications
                    <ArrowRight size={15} />
                  </button>
                </>
              )}
              <div className="detail-footnote">{content.ui.chartNote}</div>
            </aside>
          </div>
          <div className="walkthrough-status">
            <div className="walkthrough-steps" aria-label="Walkthrough steps">
              {steps.map((label, index) => (
                <span
                  key={label}
                  className={
                    step === index ? "current" : step > index ? "complete" : ""
                  }
                >
                  <span>
                    {step > index ? <Check size={11} /> : `0${index + 1}`}
                  </span>
                  {label}
                </span>
              ))}
            </div>
            <p role="status">{notice}</p>
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
            if (playing) {
              stop();
              setNotice(content.ui.walkthroughStopped);
            } else walkthrough();
          }}
        >
          {playing ? <Pause size={15} /> : <ArrowClockwise size={15} />}
          {playing ? content.ui.stopWalkthrough : content.ui.replay}
        </button>
      </div>
    </section>
  );
}
