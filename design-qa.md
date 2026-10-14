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
