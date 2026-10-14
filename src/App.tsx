import { useState } from "react";
import { usePageMotion, useChangeMotion } from "./motion";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { ArrowUpRight } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { CaretDown } from "@phosphor-icons/react/dist/csr/CaretDown";
import { Plus } from "@phosphor-icons/react/dist/csr/Plus";
import { Scan } from "@phosphor-icons/react/dist/csr/Scan";
import { Stack } from "@phosphor-icons/react/dist/csr/Stack";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/csr/MagnifyingGlass";
import { content, links, navigation } from "./content";
import { SiteHeader, Logo } from "./components/SiteHeader";
import { ProductPreview } from "./components/ProductPreview";
import { CapabilityRow } from "./components/CapabilityRow";
import {
  Coverage,
  Sequence,
  Spectrum,
  WorkflowSchematic,
} from "./components/ScientificVisuals";
import { Tabs } from "./components/Tabs";
import { DemoSection } from "./components/DemoSection";
function Hero() {
  return (
    <section
      data-reveal="group"
      className="hero container"
      aria-labelledby="hero-heading"
    >
      <p className="eyebrow" data-layer>
        <span className="eyebrow-line" />
        {content.hero.eyebrow}
      </p>
      <h1 id="hero-heading" data-layer>
        {content.hero.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h1>
      <p className="hero-description" data-layer>
        {content.hero.body}
      </p>
      <div className="hero-actions" data-layer>
        <a className="button" href="#demo">
          {content.hero.primary}
          <ArrowUpRight size={18} />
        </a>
        <a className="text-link" href="#platform">
          {content.hero.secondary}
          <ArrowRight size={17} />
        </a>
      </div>
      <p className="hero-proof" data-layer>
        <span className="yc-letter" aria-hidden="true">
          Y
        </span>
        {content.hero.proof}
      </p>
    </section>
  );
}
function ResearchStrip() {
  return (
    <section
      className="research-strip container"
      data-reveal="group"
      aria-label={content.research.label}
    >
      <p data-layer>{content.research.label}</p>
      <div className="institutions" data-layer>
        {content.research.institutions.map((name, i) => (
          <span key={name} className={`institution institution-${i}`}>
            {name}
          </span>
        ))}
      </div>
      <p className="research-note" data-layer>
        {content.research.supporting}
      </p>
    </section>
  );
}
function ProblemSection() {
  return (
    <section
      className="problem-section section-block container"
      aria-labelledby="problem-heading"
    >
      <div className="section-intro" data-reveal>
        <div>
          <p className="eyebrow">{content.problem.eyebrow}</p>
          <h2 id="problem-heading">{content.problem.heading}</h2>
        </div>
        <p className="section-body">{content.problem.body}</p>
      </div>
      <div className="problem-questions">
        {content.problem.questions.map((q, i) => (
          <div className="problem-question" data-reveal key={q}>
            <div className="question-top">
              <span className="mono">0{i + 1}</span>
              {i === 0 ? (
                <Scan size={19} />
              ) : i === 1 ? (
                <Stack size={19} />
              ) : (
                <MagnifyingGlass size={19} />
              )}
            </div>
            <h3>{q}</h3>
            <div
              className={`question-fragment fragment-${i}`}
              aria-hidden="true"
            >
              {i === 0 ? (
                <Spectrum seed={3} compact />
              ) : i === 1 ? (
                <Sequence positions={[6, 18, 27]} compact />
              ) : (
                <Coverage start={22} end={37} />
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="closing-line" data-reveal>
        {content.problem.closing}
        <ArrowRight size={17} />
      </p>
    </section>
  );
}
function WorkflowExplorer() {
  const [selected, setSelected] = useState("top-down"),
    workflow = content.workflows.items.find((item) => item.id === selected)!;
  const panelRef = useChangeMotion<HTMLDivElement>(selected);
  return (
    <section
      id="workflows"
      className="workflow-section section-block container"
      aria-labelledby="workflow-heading"
    >
      <div className="centered-intro" data-reveal>
        <p className="eyebrow">{content.workflows.eyebrow}</p>
        <h2 id="workflow-heading">{content.workflows.heading}</h2>
        <p className="section-body">{content.workflows.body}</p>
      </div>
      <div className="workflow-card" data-reveal="panel">
        <Tabs
          id="workflow"
          items={content.workflows.items}
          value={selected}
          onChange={setSelected}
          label="Protein workflows"
        />
        <div
          className="workflow-panel"
          ref={panelRef}
          role="tabpanel"
          id="workflow-panel"
          aria-labelledby={`workflow-tab-${selected}`}
          tabIndex={0}
        >
          <div className="workflow-copy" data-layer>
            <p className="technical-label">{workflow.eyebrow}</p>
            <h3>{workflow.heading}</h3>
            <p>{workflow.body}</p>
            <span className="workflow-legend">
              <span className="legend-square" />
              {content.workflows.legend}
            </span>
          </div>
          <WorkflowSchematic mode={selected} />
        </div>
      </div>
    </section>
  );
}
function AboutSection() {
  return (
    <section
      id="about"
      className="about-section section-block container"
      aria-labelledby="about-heading"
    >
      <div className="about-main">
        <div className="about-copy" data-reveal>
          <p className="eyebrow">{content.about.eyebrow}</p>
          <h2 id="about-heading">{content.about.heading}</h2>
          <p className="section-body">{content.about.body}</p>
        </div>
        <div className="inspection-detail" data-reveal="panel">
          <div className="inspection-top" data-layer>
            <span className="technical-label">Signal detail</span>
            <span className="detail-pill">Sample A</span>
          </div>
          <Spectrum seed={8} name="Sample A enlarged analytical detail" mint />
          <div className="inspection-sequence" data-layer>
            <Sequence positions={[18, 27, 46]} compact />
          </div>
          <p className="visual-footer">{content.platform.label}</p>
        </div>
      </div>
      <div className="about-block" data-reveal>
        <h3>{content.about.title}</h3>
        <div>
          <p>{content.about.description}</p>
          <a href={links.blog} className="text-link">
            {content.about.link}
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
function FAQ() {
  return (
    <section
      id="faq"
      className="faq-section section-block container"
      aria-labelledby="faq-heading"
    >
      <div className="faq-title" data-reveal>
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-heading">{content.faq.heading}</h2>
      </div>
      <div className="faq-list">
        {content.faq.items.map((item, i) => (
          <details
            key={item.question}
            data-reveal
            name="faq"
            open={i === 0 ? true : undefined}
          >
            <summary>
              {item.question}
              <Plus size={20} aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function SiteFooter() {
  const footerLinks = [
    ...navigation,
    { label: "Blog", href: links.blog },
    { label: "Careers", href: links.careers },
    { label: content.header.login, href: links.login },
  ];
  return (
    <footer className="site-footer container">
      <div className="footer-top" data-reveal>
        <div>
          <Logo />
          <p>{content.footer.descriptor}</p>
        </div>
        <nav aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
              {link.href.startsWith("http") && <ArrowUpRight size={12} />}
            </a>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <p>{content.footer.credit}</p>
        <a href="#top" className="back-top">
          Back to top
          <CaretDown size={14} />
        </a>
      </div>
    </footer>
  );
}
export default function App() {
  usePageMotion();
  return (
    <>
      <a className="skip-link" href="#main">
        {content.header.skip}
      </a>
      <div id="top" />
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProductPreview />
        <ResearchStrip />
        <ProblemSection />
        <section
          className="capabilities container"
          aria-label="Platform capabilities"
        >
          {content.capabilities.map((item, index) => (
            <CapabilityRow key={item.kind} item={item} index={index} />
          ))}
        </section>
        <WorkflowExplorer />
        <AboutSection />
        <FAQ />
        <DemoSection />
      </main>
      <SiteFooter />
    </>
  );
}
