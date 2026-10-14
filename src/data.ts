// Deterministic drawing coordinates, not measured experimental data.
export type Peak = { x: number; y: number; highlight: boolean };
export const makePeaks = (seed: number): Peak[] =>
  Array.from({ length: 104 }, (_, index) => {
    const x = index / 103,
      envelope = Math.exp(-Math.pow((x - (0.42 + seed * 0.035)) * 4.3, 2)),
      rhythm = Math.abs(Math.sin(index * 2.41 + seed * 0.87));
    return {
      x,
      y: Math.min(
        (0.025 + envelope * (0.1 + rhythm * rhythm * 0.75)) *
          (index % 7 === 0 ? 1.12 : 0.65),
        0.95,
      ),
      highlight:
        index % 13 === seed % 13 || (index > 44 + seed && index < 48 + seed),
    };
  });
export const samples = [
  {
    id: "sample-a",
    name: "Sample A",
    seed: 1,
    detail: "Illustrative protein signal A",
  },
  {
    id: "sample-b",
    name: "Sample B",
    seed: 5,
    detail: "Illustrative protein signal B",
  },
  {
    id: "sample-c",
    name: "Sample C",
    seed: 9,
    detail: "Illustrative protein signal C",
  },
] as const;
export const sequence =
  "MKWVTFISLLFLFSSAYSRGVFRRDTHKSEIAHRFKDLGEQFKGLVLIAFSQYLQQCPFD";
export const modifications = [
  { name: "Glycosylation", positions: [18, 27, 46] },
  { name: "Oxidation", positions: [1, 33, 52] },
  { name: "Phosphorylation", positions: [6, 16, 30] },
] as const;
export const peptides = [
  { id: "a", label: "Peptide A", start: 5, end: 18, seed: 2 },
  { id: "b", label: "Peptide B", start: 22, end: 37, seed: 6 },
  { id: "c", label: "Peptide C", start: 41, end: 55, seed: 10 },
] as const;
export const spectrumSummary = (name: string) =>
  `${name}: a schematic spectrum with many peaks and a highlighted signal cluster. Axes show m/z and relative intensity. Values are illustrative and do not represent an experiment.`;
