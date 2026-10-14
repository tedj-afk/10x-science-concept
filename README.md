# 10x Science — independent concept by Hippo

A complete local marketing website using React, TypeScript, Vite, and CSS tokens. This is an independent redesign concept, not an authorized replacement for the live website. This public repository shares the concept source; the website is not deployed. There is no backend, analytics, tracking, or live lead collection. The page is marked `noindex, nofollow`, without a canonical URL.

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
- Geist Sans and Geist Mono: locally bundled Fontsource packages, SIL Open Font License, `font-display: swap`.
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
4. Final accessibility review, approved domain, and indexing decision before any production deployment.

## Accessibility and verification

One H1, semantic landmarks, skip link, visible focus, chart summaries, native labeled controls, 44px touch targets. Tabs support arrow keys and Home/End; selections have checkmarks or borders as well as color. Mobile navigation closes after selection and supports Escape. FAQs are native details/summary. Reduced motion disables JavaScript entrances, CSS animations, transitions, and smooth scrolling. No auto-rotation, WebGL, or simulated file processing.

See `verification.md` for actual build, lint, type, and browser-check results. This is a review concept, not a production-ready site.

## Motion system

`src/motion.ts` uses IntersectionObserver and the native Web Animations API; no animation dependency was added. Hero elements and section contents reveal once with staggered 10–12px entrances. Application panels layer their contents, spectra grow into view, and peptide coverage draws from left to right. The preview includes an explicit “Replay walkthrough” button. Sample and tab updates animate without remounting focused controls.

`src/motion.css` adds short button lifts, moving link arrows, navigation underlines, panel edge highlights, feature-panel lift, selection transitions, and FAQ/menu entrances. Hover movement is restricted to devices with a fine pointer. There is no continuous loop, automatic tab switching, or scroll hijacking.

Animations have no persistent hidden styles: content remains visible if JavaScript or an animation fails. Keyboard focus finishes an active entrance immediately. The motion preference is checked before each animation and observed for changes; active motion is cancelled on reduced-motion changes or when the document becomes hidden.

