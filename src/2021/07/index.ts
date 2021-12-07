import { parseLineOfNumbers, range, sum, last } from '../../shared';

type Cost = (c: number, p: number) => number;

const cheapestPosition = (input: string, cost: Cost) => {
  const current = parseLineOfNumbers(input).sort();
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
