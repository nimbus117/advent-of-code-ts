import { parseNumbers, sum } from '../../shared';

const hasIncreased = (depth: number, i: number, arr: number[]) =>
  depth > arr[i - 1];

export const part1 = (input: string) =>
  parseNumbers(input).filter(hasIncreased).length;

export const part2 = (input: string) =>
  parseNumbers(input)
    .map((_, i, arr) => (i + 2 >= arr.length ? 0 : sum(arr.slice(i, i + 3))))
    .filter(hasIncreased).length;
