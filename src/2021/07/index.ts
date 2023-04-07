import { last, range } from '@shared/Array';
import { sum } from '@shared/Number';
import { parseCommaSeparatedLineOfNumbers } from '@shared/ParseInput';

type Cost = (c: number, p: number) => number;

const cheapestPosition = (input: string, cost: Cost) => {
  const current = parseCommaSeparatedLineOfNumbers(input).sort();
  const possible = range(current[0], last(current));
  return Math.min(...possible.map((p) => sum(current.map((c) => cost(c, p)))));
};

export const part1 = (input: string) =>
  cheapestPosition(input, (c, p) => Math.abs(c - p));

export const part2 = (input: string) =>
  cheapestPosition(input, (c, p) => {
    const moves = Math.abs(c - p);
    return (moves * (moves + 1)) / 2;
  });
