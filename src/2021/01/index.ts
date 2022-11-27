import {
  filter,
  length,
  parseLinesOfNumbers,
  pipe,
  sum,
  map,
} from '../../shared';

const hasIncreased = (depth: number, i: number, arr: number[]) =>
  depth > arr[i - 1];

const sumWindow = (_: number, i: number, arr: number[]) =>
  i + 2 >= arr.length ? 0 : sum(arr.slice(i, i + 3));

export const part1 = (input: string) =>
  pipe(input)._(parseLinesOfNumbers)._(filter(hasIncreased))._(length).$();

export const part2 = (input: string) =>
  pipe(input)
    ._(parseLinesOfNumbers)
    ._(map(sumWindow))
    ._(filter(hasIncreased))
    ._(length)
    .$();
