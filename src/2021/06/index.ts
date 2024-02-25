import { flatMap, range } from '@shared/Array';
import { pipe } from '@shared/Function';
import { count, sum } from '@shared/Number';
import { parseCommaSeparatedLineOfNumbers } from '@shared/ParseInput';

const simulateGrowth =
  (days: number) =>
  (fish: number[]): number[] => {
    const growth = flatMap((f: number) => (f > 0 ? f - 1 : [6, 8]))(fish);
    return days > 1 ? simulateGrowth(days - 1)(growth) : growth;
  };

const calculateGrowth = (days: number) => (fish: number[]) => {
  const count = range(0, 8).map((c) => fish.filter((f) => f === c).length);
  return range(days).reduce((acc) => {
    const newFish = acc.shift() || 0;
    acc[8] = newFish;
    acc[6] += newFish;
    return acc;
  }, count);
};

export const part1 = (input: string) =>
  pipe(input)._(parseCommaSeparatedLineOfNumbers)._(simulateGrowth(80))._(count)
    .$;

export const part2 = (input: string) =>
  pipe(input)._(parseCommaSeparatedLineOfNumbers)._(calculateGrowth(256))._(sum)
    .$;
