# Verification — 10x Science concept

Verified on 2026-10-12. Built and run locally; nothing published or connected to production.

## Commands completed successfully

- `npm ci --no-audit --no-fund --ignore-scripts` in the isolated local workspace.
- `npm run build`: TypeScript, Vite production build, and static prerender. Final build: 82 transformed modules, approximately 298.82 kB JavaScript (89.32 kB gzip), 49.08 kB CSS (10.56 kB gzip), plus prerendered HTML.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run dev`: running on http://127.0.0.1:5173/.
- `npm run preview -- --port 4173`: built preview running on http://127.0.0.1:4173/.

## Browser checks performed

Codex in-app browser, 1440×1000, 1024×900, 768×1000, and 390×844. Document scrollWidth matched each viewport width; no missing images. Reviewed hero, product frame, feature details, workflows, About, FAQ, contact card, and footer across the captured layouts.

Verified sample switching; modification categories and sequence highlights; peptide regions; arrow/Home/End tab keys; top-down, middle-down, and targeted workflow states; proteoform choices; custom-library browser; menu close on selection and Escape; FAQ disclosures; anchor existence; single H1; noindex/nofollow and absent canonical. All visible controls measured at least 44px tall after the final refinement.

Form: empty fields produce errors and focus Name; invalid email is rejected; `researcher@example.edu` is accepted with a name and organization; success explicitly says no request was sent; values clear afterward. The adapter contains no network/storage API. Static prerender keeps the submit button disabled until client hydration, preventing a no-JavaScript submission.

Final built-page browser console: no warnings or errors. Hydration and all tab aria-controls targets checked after the last build. Reduced-motion rules inspected in the live stylesheet; OS-level emulation and a screen-reader session were not performed.

## Access limitations

Both external websites' public code/content were retrieved, and the authentic 10x Science wordmark and official routes verified. External browser visual captures failed (timeouts, empty page, or black native capture), so desktop/mobile reference sections and direct Superset screenshot comparison remain unverified. The build follows the user's detailed visual specification. The design-QA report records this external-comparison limitation rather than claiming a fidelity pass.

## Workspace workaround

The original Documents workspace was automatically offloading new source and dependency files to iCloud, causing blocked file reads. Active sources and dependencies now live in `work/local.nosync/`, with root source/config links for convenience. No system settings or unrelated files were changed. Run workspace commands from that local-only folder. The ZIP includes actual source files, build output, and configuration without these workspace symlinks or node_modules.

## Remaining integrations

Intentionally unconfigured: live demo submission, company-approved legal/privacy wording, company approval of brand/copy/claims, and product-specific compatibility/deployment confirmation. This remains an independent review concept.

## Motion update — 2026-10-12

Build, typecheck, and lint passed again after the animation changes. No new runtime dependencies were added.

In the built local browser preview, verified:

- Hero and preview were marked entered; below-fold sections remained unentered until scrolled into view, with visible base styles.
- Replay produced staggered layer transforms and a compressed spectrum trace; subsequent inspection showed opacity 1 and no residual transform.
- Selecting Sample B animated the spectrum and changed the sample title. Modification and peptide tabs, sequence category selection, arrow-key navigation, and workflow Home/End navigation remained functional.
- Feature-panel hover was confirmed in the browser with the violet border and a 4px lift; the selected form remained usable.
- FAQ opening worked; empty form validation still focused Name with full-opacity form content.
- Mobile menu opened and closed after selection. Mobile replay and modification controls worked; replay touch target measured 44px high.
- Document width matched 1440, 1024, 768, and 390px viewports. No missing images or browser warnings/errors were reported.

Reduced-motion handling was reviewed in both JavaScript and CSS. An OS-level reduced-motion toggle and screen-reader session were not performed. External-reference visual capture limitations remain as described above; this update makes no new claim of source-motion fidelity.

Final responsive fix: reduced the decorative spectrum field’s side extension below 760px. Rechecked the natural 755px viewport: document width 755px, field bounds 4–751px. Final build, typecheck, and lint passed; final browser console was clear.

## Interactive example update — 2026-10-14

- `npm ci --no-audit --no-fund` restored incomplete local dependency files.
- `npm run build`, `npm run typecheck`, and `npm run lint` passed after the final tab fix. Production build: 87 modules, 313.35 kB JavaScript (94.06 kB gzip), 62.40 kB CSS (13.02 kB gzip), plus static prerender and local fonts. Node 22.20.0 was used for Vite/native build dependencies.
- Browser-inspected at 1440×1000, 1024×900, 768×1000, and 390×844. Document width equaled viewport width. The 390px preview controls measured at least 44×44px.
- Sample switching, signal selection, linked sequence regions, pointer drag zoom, zoom/reset buttons, keyboard arrows and reset, annotation toggling, residue navigation, add/remove/clear annotations, peptide selection, tab arrow/Home/End behavior, replay completion, and replay interruption were exercised. Mobile menu closed after a destination was selected.
- Fixed a mobile active-tab label that could remain partially clipped. Narrowed tab gaps and ensured click/keyboard activation scrolls the selected tab into view; rechecked all three labels at 390px.
- Production preview at port 4173: chart selection/zoom/reset and modification editing passed; one H1, noindex/nofollow, and all images loaded. Console contained no warnings or errors. Empty form validation focused Name; an academic-domain example completed locally, cleared fields, and displayed “Preview complete. No request has been sent.” FAQ expansion passed.
- JavaScript/CSS reduced-motion branches and cleanup were inspected; OS-level reduced-motion emulation and a screen-reader session were not performed. Browser automation had transient input timeouts during the extra form/FAQ smoke test; native browser controls completed those checks successfully.
- 10x Science's public interactive demonstrations were successfully captured and inspected on desktop and mobile. The previous 10x Science visual-access limitation no longer applies. This update did not repeat the Superset visual review.

No deployment, live data processing, analytics, or lead collection was added.

## Editorial redesign — 2026-10-14

- `npm run build`, `npm run lint`, and `npm run typecheck` passed. A subsequent CSS-only narrow-screen footer fix was rebuilt. The production bundle remains about 309.34 kB JavaScript (93.41 kB gzip), 81.8 kB CSS (16.6 kB gzip), plus local fonts and prerendered HTML. Newsreader's Latin variable font is 58.08 kB.
- Browser review covered 1440×1000, 1024×900, 768×1000, and 390×844. Each matched document/viewport widths. An additional 320px edge-case check found the long footer word overflowing; a responsive font clamp fixed it and the document width rechecked at exactly 320px.
- Verified desktop vertical workflow tabs with ArrowDown and mobile horizontal tabs with ArrowRight, including matching ARIA orientation. Mobile menu opened and closed after selecting Platform/Workflows. Main platform tabs switched with all labels fitting at 390px.
- Empty form validation focused Name and displayed all required errors. Fictional academic-domain input completed the local preview, cleared fields, and displayed the explicit no-request-sent confirmation. FAQ expansion passed.
- The browser reported one H1, noindex/nofollow, no broken images, and no console warnings/errors during this review. Font rendering was verified as Newsreader in the browser.
- The paper-colored analysis section, unboxed feature figures, workflow index, redesigned form, and typographic footer were visually inspected. New screenshots are `docs/editorial-desktop.jpg`, `docs/editorial-analysis.jpg`, and `docs/editorial-mobile.jpg`.
- Reduced-motion behavior was retained and code-reviewed; no OS-level emulation or screen-reader session was run. The earlier Superset visual-access limitation was not retested. This pass evaluates the user's revised art direction rather than claiming a pixel clone of an external source.

The source repository was updated; the website was not deployed, and no form/backend/analytics integration was added.

## Scientific motion refinement — 2026-10-14

- Build, lint, and TypeScript checks passed. No new dependencies. Bundle: 313.69 kB JavaScript (94.45 kB gzip), 83.85 kB CSS (17.09 kB gzip), plus unchanged local fonts and prerendered HTML.
- Browser verified a sample-change spectrum reveal at a partial clip (`inset(0px 15.3848% 0px 0px)`) with a moving scan line; after completion the trace returned to `clip-path: none` and the line to opacity 0.
- Sequence entry showed staggered letter opacity/translation, then opacity 1 and no residual transform. Figure rules similarly returned to a complete, untransformed state.
- Capability ruler progression changed from 0.2883 to 0.5550 after scrolling. Desktop, 1024px, 768px, and 390px document widths matched their viewports.
- Workflow tab changes animated residues and cut marks. A rapid focus test exposed a possible transition/focus race during development. Added capture-phase focus interruption and a guard against delayed updates around already focused content. Retested in a freshly loaded production build: focusing `workflow-panel` immediately yielded `clip-path: none` and no residue transform.
- Node mocked-environment assertions passed for reduced motion, a hidden document, and focused content producing no animations, with a normal visible signal as a positive control. This is a code-level check, not OS preference emulation or a screen-reader session.
- Browser console was clear during the motion checks. The main scientific preview remains interactive; entry effects do not change illustrative data or run analysis.

Capture: `docs/scientific-motion.gif`. No site deployment, live submission, tracking, or processing was added.
