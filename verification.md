# Verification — 10x Science concept

Verified on 2026-10-12. Application built and tested locally on that date. Source published separately to GitHub; no production deployment or lead collection is configured.

## Commands completed successfully

- `npm ci --no-audit --no-fund --ignore-scripts` in the isolated local workspace.
- `npm run build`: TypeScript, Vite production build, and static prerender. Final build: 82 transformed modules, approximately 298.82 kB JavaScript (89.32 kB gzip), 49.08 kB CSS (10.56 kB gzip), plus prerendered HTML.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run dev`: verified on http://127.0.0.1:5173/.
- `npm run preview -- --port 4173`: built preview verified on http://127.0.0.1:4173/.

## Browser checks performed

Codex in-app browser, 1440×1000, 1024×900, 768×1000, and 390×844. Document scrollWidth matched each viewport width; no missing images. Reviewed hero, product frame, feature details, workflows, About, FAQ, contact card, and footer across the captured layouts.

Verified sample switching; modification categories and sequence highlights; peptide regions; arrow/Home/End tab keys; top-down, middle-down, and targeted workflow states; proteoform choices; custom-library browser; menu close on selection and Escape; FAQ disclosures; anchor existence; single H1; noindex/nofollow and absent canonical. All visible controls measured at least 44px tall after the final refinement.

Form: empty fields produce errors and focus Name; invalid email is rejected; `researcher@example.edu` is accepted with a name and organization; success explicitly says no request was sent; values clear afterward. The adapter contains no network/storage API. Static prerender keeps the submit button disabled until client hydration, preventing a no-JavaScript submission.

Final built-page browser console: no warnings or errors. Hydration and all tab aria-controls targets checked after the last build. Reduced-motion rules inspected in the live stylesheet; OS-level emulation and a screen-reader session were not performed.

## Access limitations

Both external websites' public code/content were retrieved, and the authentic 10x Science wordmark and official routes verified. External browser visual captures failed (timeouts, empty page, or black native capture), so desktop/mobile reference sections and direct Superset screenshot comparison remain unverified. The build follows the user's detailed visual specification. The design-QA report records this external-comparison limitation rather than claiming a fidelity pass.

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

## Public source preparation — 2026-10-14

A clean copy containing 30 source, configuration, documentation, and attribution files was prepared for GitHub. Fresh npm install, production build, TypeScript check, and ESLint check passed. Source credentials and local-user-path pattern scans found no matches. Generated builds, dependencies, local working files, and environment files are excluded. The website itself remains undeployed, with no live lead collection.
