import { every, filter } from '@shared/Array';
import { any, pipe } from '@shared/Function';
import { count } from '@shared/Number';
import { parseLinesOfStrings } from '@shared/ParseInput';

const parseReport = (x: string) =>
  parseLinesOfStrings(x).map((y) => y.split(' ').map(Number));

const isSafe = any<number[]>([
  every((x, i, arr) => !i || (x > arr[i - 1] && x < arr[i - 1] + 4)),
  every((x, i, arr) => !i || (x < arr[i - 1] && x > arr[i - 1] - 4)),
]);

const isSafeWithDampner = (report: number[]) =>
  isSafe(report) || report.some((_, i) => isSafe(report.toSpliced(i, 1)));

export const part1 = (input: string) =>
  pipe(input)._(parseReport)._(filter(isSafe))._(count).$;

export const part2 = (input: string) =>
  pipe(input)._(parseReport)._(filter(isSafeWithDampner))._(count).$;
