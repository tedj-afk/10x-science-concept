# Design QA — interactive product example update

Date: 2026-10-14. Scope: the interactive platform preview and tab behavior. This is a source-informed adaptation within the user's existing dark concept, not a pixel clone of the live marketing page.

## Evidence and comparison

- Source: https://10xscience.com/ public Analysis, residue modification editor, peptide mapping, and replay demonstrations. Captures in the supplied workspace: `work/reference-captures/source-analysis-desktop.png`, `source-modification-editor.png`, `source-builder-desktop.png`, `source-analysis-mobile.png`.
- Implementation: http://127.0.0.1:4173/#platform. Final screenshots: `docs/interactive-desktop.jpg` (1440×1000) and `docs/interactive-mobile.jpg` (390×844); supplied workspace also exposes these through `outputs/`.
- Desktop source and implementation were displayed together in one comparison input at 1440×1000 pixels, 1 image pixel per CSS pixel, no rescaling. Both show an annotated full-range spectrum and sequence context. Source uses its own experimental-looking demo labels; the concept deliberately substitutes generic illustrative signals.
- Focused inspection covered chart axes and labels, selected sequence regions, modification controls, and the mobile tab strip. Source mobile capture was 390×844, with a vertically stacked compact app. The concept intentionally allows its panels to continue vertically to keep controls readable.

## Findings and iteration history

1. **[P2, fixed] Mobile active-tab label clipped.** At 390px, the old tab strip had a 381px content width in a 348px viewport and could leave the selected Peptide mapping label partially hidden after keyboard activation. Reduced gaps/padding for the product tabs and added nearest-view scrolling on tab activation. Final check: content width 348px; active label right edge 352px within the strip's right edge 369px. Screenshot `interactive-mobile.jpg` confirms the full label is visible.
2. No remaining actionable P0/P1/P2 findings in this scoped update.

## Required surfaces

- **Typography:** Existing local Geist Sans/Mono retained by instruction. Hierarchy distinguishes sample, signal, sequence, and technical labels. No new font requests. Mobile controls stay readable and have at least 44×44px targets.
- **Spacing/layout:** Preserved the full-width app with project sidebar, analytical canvas, and detail panel. Compared source chart-over-sequence anatomy, then checked the adapted three-panel layout at 1440/1024px and stacked layout at 768/390px. No page overflow. Long residue editing uses normal page flow on phones.
- **Colors/tokens:** Existing near-black, raised/inset panels, violet selection and sparse mint accents remain intact. Source light theme is an intentional deviation required by the original concept direction. Selected state also uses labels, outlines, checkmarks, and shapes.
- **Assets:** Existing authentic local wordmark and Phosphor icons retained. Scientific charts are SVG as explicitly requested. They remain schematic and labeled; no scientific imagery or molecular structures were invented as evidence.
- **Copy:** Original supplied marketing copy retained. Added only interface instructions, generic example annotations, and explicit demonstration status. No numerical performance or accuracy claims.

## Interaction checks

Desktop: sample/signal changes; pointer drag zoom; zoom/reset; keyboard signal selection; chart descriptions; editable sequence position navigation; add/remove/clear annotation; peptide linking; replay completion and interruption. Tablet/mobile: layout and overflow; menu close; tab keyboard navigation; residue targets and selection; mobile peptide selection. Built preview: hydration, no missing images, no console errors, one H1 and noindex. Local form and FAQ smoke checks also passed.

## Limitations and accepted differences

The actual scientific engine, source molecular structures, glycan drawing editor, file processing, assignment scores and research results are outside this concept. The modification editor is deliberately a category/position annotation demonstration. No claim of chemical correctness is made. The dark visual design and unified frame follow the original brief rather than the source site's light marketing layout. Superset's earlier full-site visual-comparison limitation remains outside this scoped pass. Reduced-motion code was reviewed, but no OS-level motion setting or screen-reader session was run.

## Implementation checklist

- [x] Capture live source interactions on desktop/mobile.
- [x] Implement source-inspired scientific preview within existing architecture.
- [x] Verify responsive layouts and core interactions.
- [x] Fix clipped mobile active tab and recapture.
- [x] Pass build, typecheck, and lint.
- [x] Preserve local-only form, illustrative data, and noindex.

final result: passed


# Editorial refinement QA — 2026-10-14

Scope: typography, visual hierarchy, marketing layout, borders, hover treatment, and responsive adaptation. The user asked for a more distinctive, less generic result; this is intentionally a redesign rather than a pixel-fidelity clone.

## Fresh evidence and design decisions

Before editing, inspected the existing hero, analysis questions, and feature panels in the browser. The repeated sans-serif headlines, nested borders, and floating-card treatments gave sections similar emphasis. The new design uses Newsreader display type, asymmetrical desktop compositions, a contrasting paper-colored analysis section, unboxed feature figures, and an indexed workflow layout. The application keeps its dense sans-serif UI and necessary functional separators. Authentic logo, exact scientific copy, and illustrative-data labels are retained.

## Checks and fixes

- Inspected the hero, main preview, paper section, feature figures, workflow explorer, FAQ, contact form, and footer.
- Responsive browser checks at 1440×1000, 1024×900, 768×1000, and 390×844 showed document width equal to viewport width. A further 320px check exposed a long footer word; a responsive display-size clamp fixed the overflow, then the document rechecked at 320px.
- Updated workflow keyboard orientation to match its vertical desktop layout; Up/Down work above 900px, Left/Right below. Existing Home/End behavior is retained.
- Mobile navigation opens and closes after selecting a destination; all platform tab labels fit at 390px.
- Local form required-field errors focus Name. A fictional academic-domain email completes the preview, clears input values, and explicitly confirms that no request was sent. FAQ expansion remains functional.
- Replaced dark chart guide lines in the paper section with softer ink rules; removed redundant decorative icons and panel glows/lifts.
- Shortened entrances and kept them partially visible from the first animation frame. Reduced-motion branches remain in place; no OS setting or screen-reader session was run.

The supplied brief's original all-sans/centered design has been deliberately revised under the user's latest direction. Scientific illustration boundaries and production integration limitations remain unchanged. No new external-reference fidelity claim is made.
