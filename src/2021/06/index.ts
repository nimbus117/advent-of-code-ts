import { parseCommaSeparatedLineOfNumbers, range, sum } from '../../shared';

const simulateGrowth = (fish: number[], days: number): number[] => {
  const growth = fish.map((f) => (f > 0 ? f - 1 : [6, 8])).flat();
  return days > 1 ? simulateGrowth(growth, days - 1) : growth;
};

const calculateGrowth = (fish: number[], days: number) => {
  const count = range(0, 8).map((c) => fish.filter((f) => f === c).length);
  return range(0, days - 1).reduce((acc) => {
    const newFish = acc.shift() || 0;
    acc[8] = newFish;
    acc[6] += newFish;
    return acc;
  }, count);
};

export const part1 = (input: string) =>
  simulateGrowth(parseCommaSeparatedLineOfNumbers(input), 80).length;

export const part2 = (input: string) =>
  sum(calculateGrowth(parseCommaSeparatedLineOfNumbers(input), 256));
