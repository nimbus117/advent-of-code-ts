import { all, filter, map } from '@shared/Array';
import { anyTrue, pipe } from '@shared/Function';
import { count } from '@shared/Number';
import { parseLinesOfStrings } from '@shared/ParseInput';

const parseReport = (x: string) =>
  parseLinesOfStrings(x).map((y) => y.split(' ').map(Number));

const increasing = (x: number, i: number, arr: number[]) =>
  !i || (x > arr[i - 1] && x < arr[i - 1] + 4);

const decreasing = (x: number, i: number, arr: number[]) =>
  !i || (x < arr[i - 1] && x > arr[i - 1] - 4);

const isSafe = anyTrue([all(increasing), all(decreasing)]);

const isSafeWithDampner = (report: number[]) =>
  isSafe(report) || report.some((_, i) => isSafe(report.toSpliced(i, 1)));

export const part1 = (input: string) =>
  pipe(input)._(parseReport)._(map(isSafe))._(filter(Boolean))._(count).$;

export const part2 = (input: string) =>
  pipe(input)
    ._(parseReport)
    ._(map(isSafeWithDampner))
    ._(filter(Boolean))
    ._(count).$;
