import { map, reduceI, slice, sort } from '@shared/Array';
import { pipe } from '@shared/Function';
import { multiply, sum } from '@shared/Math';
import { parseLinesOfStrings } from '@shared/ParseInput';
import { split } from '@shared/String';

const getDimensions = (present: string) =>
  pipe(present)._(split('x'))._(map(Number)).$();

const getRequiredPaper = reduceI((total, present: string) => {
  const [l, w, h] = getDimensions(present);
  const [lw, wh, hl] = [l * w, w * h, h * l];
  const smallest = Math.min(lw, wh, hl);
  return total + sum([lw * 2, wh * 2, hl * 2, smallest]);
}, 0);

const getRequiredRibbon = reduceI((total, present: string) => {
  const dimensions = getDimensions(present);
  const bowRibbon = multiply(dimensions);
  const wrapRibbon = pipe(dimensions)
    ._(sort((a, b) => a - b))
    ._(slice(0, 2))
    ._(map((x) => x + x))
    ._(sum)
    .$();
  return total + wrapRibbon + bowRibbon;
}, 0);

export const part1 = (input: string) =>
  pipe(input)._(parseLinesOfStrings)._(getRequiredPaper).$();

export const part2 = (input: string) =>
  pipe(input)._(parseLinesOfStrings)._(getRequiredRibbon).$();
