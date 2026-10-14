import { peptides } from "./data";

// Drawing data only. No mass assignments, measured intensities, or scientific inference.
export type PlotRange = readonly [number, number];
export const fullRange: PlotRange = [400, 2000];
export const signals = peptides.map((peptide, index) => ({
  ...peptide,
  name: `Signal ${String.fromCharCode(65 + index)}`,
  x: [0.24, 0.51, 0.76][index],
  height: [0.48, 0.87, 0.63][index],
}));
export function signalMass(index: number, seed: number) {
  return 400 + (signals[index].x + (seed - 1) * 0.005) * 1600;
}
export function drawingPeaks(seed: number) {
  const background = Array.from({ length: 240 }, (_, i) => {
    const x = 410 + (i / 239) * 1580;
    const clusters = signals.reduce((height, signal, index) => {
      const distance = (x - signalMass(index, seed)) / 42;
      return height + Math.exp(-distance * distance) * signal.height;
    }, 0);
    return {
      x,
      y: 0.012 + Math.abs(Math.sin(i * 2.41 + seed)) * (0.065 + clusters * 0.7),
    };
  });
  return [
    ...background,
    ...signals.map((signal, i) => ({
      x: signalMass(i, seed),
      y: signal.height,
    })),
  ];
}
export function rangeAround(center: number, width = 340): PlotRange {
  const span = Math.max(80, Math.min(1600, width));
  const start = Math.max(
    fullRange[0],
    Math.min(fullRange[1] - span, center - span / 2),
  );
  return [start, start + span];
}
