import { useState } from "react";
import { Check } from "@phosphor-icons/react/dist/csr/Check";
import { Database } from "@phosphor-icons/react/dist/csr/Database";
import { FolderSimple } from "@phosphor-icons/react/dist/csr/FolderSimple";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { Stack } from "@phosphor-icons/react/dist/csr/Stack";
import { Flask } from "@phosphor-icons/react/dist/csr/Flask";
import { BookOpen } from "@phosphor-icons/react/dist/csr/BookOpen";
import { content } from "../content";
import type { Capability } from "../content";
import { modifications, peptides } from "../data";
import { Coverage, Sequence, Spectrum } from "./ScientificVisuals";
function FormsDetail() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="detail-visual forms-visual" data-reveal="panel">
      <div className="visual-toolbar" data-layer>
        <span>
          <Stack size={16} />
          Proteoform exploration
        </span>
        <span className="mini-badge">Example</span>
      </div>
      <div className="visual-inner" data-layer>
        <p className="technical-label">{content.ui.sequence}</p>
        <Sequence positions={modifications[selected].positions} compact />
        <div className="forms-list">
          {content.ui.formNames.map((form, i) => (
            <button
              type="button"
              key={form}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span className="form-dot" />
              <span>{form}</span>
              <span className="form-marks" aria-hidden="true">
                {Array.from({ length: 6 }, (_, j) => (
                  <i className={(j + i) % 3 === 0 ? "marked" : ""} key={j} />
                ))}
              </span>
              {selected === i ? <Check size={15} /> : <ArrowRight size={15} />}
            </button>
          ))}
        </div>
      </div>
      <div className="visual-footer">{content.platform.label}</div>
    </div>
  );
}
function PeptideDetail() {
  const [selected, setSelected] = useState(0),
    peptide = peptides[selected];
  return (
    <div className="detail-visual peptide-visual" data-reveal="panel">
      <div className="visual-toolbar" data-layer>
        <span>
          <Stack size={16} />
          {content.ui.coverage}
        </span>
        <span className="mini-badge">Example</span>
      </div>
      <div className="visual-inner" data-layer>
        <Coverage start={peptide.start} end={peptide.end} />
        <div className="peptide-pills">
          {peptides.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <Spectrum seed={peptide.seed} compact name={peptide.label} />
      </div>
      <div className="visual-footer">{content.platform.label}</div>
    </div>
  );
}
function DataDetail() {
  const [selected, setSelected] = useState("Samples");
  const rows =
    selected === "Samples"
      ? ["Sample A", "Sample B", "Sample C"]
      : selected === "UniProt"
        ? ["Reference proteins", "Sequence context", "Protein annotations"]
        : ["Example library", "Research sequences", "Project references"];
  return (
    <div className="detail-visual data-visual" data-reveal="panel">
      <div className="visual-toolbar" data-layer>
        <span>
          <FolderSimple size={16} />
          {content.ui.project}
        </span>
        <span className="mini-badge">Example</span>
      </div>
      <div className="data-browser">
        <div className="data-browser-nav" data-layer>
          {[
            { label: "Samples", Icon: Flask },
            { label: "UniProt", Icon: Database },
            { label: "Custom library", Icon: BookOpen },
          ].map(({ label, Icon }) => (
            <button
              key={label}
              type="button"
              aria-pressed={selected === label}
              onClick={() => setSelected(label)}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </div>
        <div className="data-browser-main" data-layer>
          <p className="technical-label">{content.ui.browse}</p>
          <h4>{selected}</h4>
          {rows.map((row, i) => (
            <div className="browser-row" key={row}>
              <span className="browser-file">
                <Stack size={17} />
              </span>
              <span>
                {row}
                <small>{content.ui.illustrative}</small>
              </span>
              <span className="mono">0{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="visual-footer">{content.platform.label}</div>
    </div>
  );
}
export function CapabilityRow({
  item,
  index,
}: {
  item: Capability;
  index: number;
}) {
  return (
    <article className={`capability-row ${index % 2 === 1 ? "reversed" : ""}`}>
      <div className="capability-copy" data-reveal>
        <p className="eyebrow">
          <span className="section-number">0{index + 1}</span>
          {item.eyebrow}
        </p>
        <h2>{item.heading}</h2>
        <p>{item.body}</p>
      </div>
      {item.kind === "forms" ? (
        <FormsDetail />
      ) : item.kind === "peptides" ? (
        <PeptideDetail />
      ) : (
        <DataDetail />
      )}
    </article>
  );
}
