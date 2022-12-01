import { map, slice, sort } from '@shared/Array';
import { pipe } from '@shared/Function';
import { max, sum } from '@shared/Math';
import { parseLinesOfNumbers } from '@shared/ParseInput';
import { split } from '@shared/String';

const sumCalories = (input: string) =>
  pipe(input)._(parseLinesOfNumbers)._(sum).$();

export const part1 = (input: string) =>
  pipe(input)._(split('\n\n'))._(map(sumCalories))._(max).$();

export const part2 = (input: string) =>
  pipe(input)
    ._(split('\n\n'))
    ._(map(sumCalories))
    ._(sort((a, b) => a - b))
    ._(slice(-3))
    ._(sum)
    .$();
