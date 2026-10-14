# 10x Science — independent concept by Hippo

A complete local marketing website using React, TypeScript, Vite, and CSS tokens. This is an independent redesign concept, not an authorized replacement for the live website. The source is available on GitHub; no website has been deployed. There is no backend, analytics, tracking, or live lead collection. The page is marked `noindex, nofollow`, without a canonical URL.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173. The server listens only on loopback.

```sh
npm run typecheck
npm run lint
npm run build
npm run preview -- --port 4173
```

The build prerenders the page so core copy, navigation, default previews, and native FAQs remain available without JavaScript. Interactive previews and local form validation require JavaScript. Fonts and assets are local; the production build needs no third-party network requests.

## Sources and assets

Reviewed 2026-10-12:

- Product source: https://10xscience.com/. Public HTML and application bundles verified advertised analyses, team research affiliations, and official routes.
- Composition reference: https://superset.sh/. Public textual content was accessible; see verification notes for visual-access limitations. The detailed user brief specifies the dark canvas, centered type, thin panels, generous spacing, and wide application demonstration. Superset copy, customer logos, security claims, and developer features are excluded.
- Authentic wordmark: https://10xscience.com/assets/10x-Science_wordmark-dark.svg. Saved unchanged at `public/assets/10x-science-wordmark.svg`. The live site's brand-download UI exposes this asset. Local concept reuse is not a declaration of permission to publish.
- Official routes verified in the public application's router: https://10xscience.com/login, https://10xscience.com/blog, https://10xscience.com/careers. The source header explicitly links to `/login`.
- Newsreader for editorial headlines, Geist Sans for body/interface text, and Geist Mono for technical labels: locally bundled Fontsource packages, SIL Open Font License, `font-display: swap`. Newsreader loads only its Latin variable font; no third-party font requests.
- Phosphor Icons React: MIT. No stock photography or invented logo symbol. Institution names use text, with explicit research-background context. The YC indicator is typographic, not a downloaded logo.

## Conceptual UI

Every spectrum, sequence, peptide coverage view, modification selection, and workflow schematic is a website demonstration, not a verified reproduction of shipping software. `src/data.ts` contains deterministic drawing coordinates and a schematic amino-acid sequence, not experimental results, published evidence, molecular assignments, or accuracy claims.

The visible label is “Illustrative interface · Sample data”. Project and sample names are generic. Cross-panel sample, peptide, and modification interactions are proposed for this concept. Workflow SVGs illustrate scientific approaches, not molecular structures or compatibility.

Protein therapeutics audience emphasis and the violet palette are proposed positioning and design choices. Supplied section copy is centralized in `src/content.ts`. Components live in `src/components/`. No fabricated performance numbers, testimonials, pricing, clinical claims, or security certifications are included.

## Form integration boundary

Validation is in memory only. `src/demoRequest.ts` contains `previewDemoRequest()`, an isolated adapter that accepts no personal data and returns `{ previewComplete: true, sent: false }`. There is no fetch, persistence, analytics, email, or scheduling request. Fields clear after a valid preview. Academic email domains are accepted.

Visible button: “Preview request”. Confirmation: “Preview complete. No request has been sent.” The production label is stored separately and not used.

Remaining integration needs, only after separate authorization:

1. Company approval of design, scientific copy, claims, and trademark use.
2. Confirmation of instruments, formats, deployment, data handling, and evaluation terms.
3. Approved privacy/legal wording and lead/scheduling destination; replace the isolated adapter and button label only then. Add server validation and appropriate abuse protection at that stage.
4. Final accessibility review, approved domain, and indexing decision before any publication.

## Accessibility and verification

One H1, semantic landmarks, skip link, visible focus, chart summaries, native labeled controls, 44px touch targets. Tabs support arrow keys and Home/End; selections have checkmarks or borders as well as color. Mobile navigation closes after selection and supports Escape. FAQs are native details/summary. Reduced motion disables JavaScript entrances, CSS animations, transitions, and smooth scrolling. No auto-rotation, WebGL, or simulated file processing.

See `verification.md` for actual build, lint, type, and browser-check results. This is a review concept, not a production-ready site.

## Motion system

`src/motion.ts` uses IntersectionObserver and the native Web Animations API. No animation library was added. Each analytical figure is observed independently, so a long section does not start its charts before they are visible.

- Desktop headline lines enter with a brief horizontal registration reveal. Body copy stays set in place.
- Spectra are revealed left to right beneath a single reading line; axes remain stationary. This is illustrative choreography, not a processing indicator or measured analysis.
- Sequence letters register in reading order, followed by selected-position markers. No sequence text is scrambled or changed.
- Peptide coverage tracks open first, followed by their individual lanes. Workflow chains, cut marks, and larger fragments assemble in order.
- Editorial rules draw across figures; project rows enter in sequence. A small marginal ruler follows scrolling through each capability story, changing to a horizontal ruler on phones.
- Existing sample/peptide/tab controls and the explicit “Replay walkthrough” remain functional. Nothing auto-rotates or loops.

`src/editorial.css` contains decorative reading rules, scan lines, and rulers. `src/motion.css` retains short control/link/menu/FAQ responses. There are no floating-card lifts, ambient glow loops, scroll hijacking, or text-scrambling effects.

Base HTML/CSS contains the full visible content. Entrances are transient and cancel to their complete state when a figure leaves the viewport, the document becomes hidden, or reduced motion is requested. Keyboard focus immediately finishes active motion; pointer interaction finishes the relevant panel. A focus guard also prevents delayed state effects from restarting an animation around a newly focused control. Decorative rulers run only on scroll/resize events, scheduled with requestAnimationFrame, and only for visible sections. Reduced-motion users get static complete figures.

## Supplied workspace note

This Documents folder offloaded newly written files to iCloud during the build. To keep the local runtime reliable, the active project is in `work/local.nosync/`; root source/config paths link there. From this workspace, run `cd work/local.nosync` before npm commands. The downloadable ZIP is self-contained with normal files: after extracting it, run npm commands directly in the extracted folder. No unrelated files or system settings were modified.

## Interactive product demonstration — 2026-10-14

The live 10x Science website was visually inspected in the Codex in-app browser on desktop and at 390px. The public Analysis example, annotation controls, residue modification editor, replay sequences, data browser, and peptide mapping example informed this update. This supersedes the earlier visual-access limitation for **10x Science**; Superset's earlier capture limitation is unchanged.

The concept now includes:

- SVG spectra with pointer drag zoom, double-click reset, a hover crosshair/readout, and zoom/reset buttons.
- Three selectable example signals linked to sequence regions and the detail panel. Left/right arrow keys select a signal; `+` zooms, and `0`, `-`, or Escape resets the chart.
- Annotations toggle and a sequence-position editor. Choose a residue and an example category, then add/remove an annotation; selected positions are marked in the sequence. Clear returns a useful empty state. Arrow keys and Home/End move through residue positions without adding 60 tab stops.
- Peptide selection synchronizing coverage, sequence, spectrum, and detail views.
- A user-triggered, three-step walkthrough for each tab. It stops on direct interaction, when the frame leaves the viewport, or when the document is hidden. Reduced motion shows the final state immediately; it never rotates tabs automatically.

`src/components/InteractiveAnalysis.tsx` contains the chart and sequence controls. `src/previewData.ts` contains deterministic drawing data and range helpers. No runtime dependencies were added.

This is an independent adaptation of **public website demonstration patterns**, not a reproduction of the scientific analysis engine or a claim about shipping software. No real spectra, molecular structures, masses, match scores, coverage percentages, or experimental results were copied. Example annotations are unrestricted UI markers, not biochemical assignments or chemistry validation. No data is processed, transmitted, or persisted. All original marketing copy and the visible illustrative-data labels remain in place.

See `design-qa.md` and `verification.md` for the checks actually performed. Screenshots are in `docs/interactive-desktop.jpg` and `docs/interactive-mobile.jpg` in the public source repository.

## Editorial redesign — 2026-10-14

This pass responds to the request for a less generic visual identity. It intentionally evolves the original centered, all-sans direction: Newsreader headlines, a left-aligned two-line desktop hero, split introductory copy/actions, a warm paper-colored analysis spread, and open scientific figures replace repetitive outlined cards. The workflow selector becomes a margin index on desktop; a large typographic footer closes the page. These are concept design decisions, not claims about the company's official brand.

`src/editorial.css` owns marketing typography, section composition, and the paper-colored form. The existing base/interface styles remain separate so the interactive analysis controls retain their density and behavior. Mobile layouts stack, and desktop workflow tabs use Up/Down keys with the correct vertical ARIA orientation; smaller layouts use Left/Right. Focus indicators, illustrative labels, exact marketing copy, local-only form handling, noindex, and reduced-motion fallbacks remain intact.

TypeScript now explicitly includes Vite client ambient types, avoiding accidental discovery of unrelated type packages in ancestor workspace folders. No application or data-service dependency was added; Newsreader is the only new asset package.

Screenshots: `docs/editorial-desktop.jpg`, `docs/editorial-analysis.jpg`, and `docs/editorial-mobile.jpg`. See the latest sections of `verification.md` and `design-qa.md` for the scope and limits of browser checks.

## Scientific motion refinement — 2026-10-14

The motion treatment extends the editorial redesign without changing its scientific copy or data. The local build was browser-inspected for entry choreography, stable end states, keyboard interruption, sample changes, and viewport widths. Node-based mocked-environment checks exercise the reduced-motion, hidden-document, and focused-content guards; an OS-level motion-preference change was not performed. The source repository includes a short capture at `docs/scientific-motion.gif`.
