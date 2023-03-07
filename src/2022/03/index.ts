import { chunk, filter, first, map } from '@shared/Array';
import { pipe } from '@shared/Function';
import { sum } from '@shared/Math';
import { parseLinesOfStrings } from '@shared/ParseInput';
import { indexOf, isUpperCase, slice, split } from '@shared/String';

const getPriority = (char: string) =>
  pipe('abcdefghijklmnopqrstuvwxyz')
    ._(indexOf(char.toLowerCase()))
    ._((x) => (isUpperCase(char) ? x + 27 : x + 1))
    .$();

const findError = (bag: string) =>
  pipe(bag)
    ._(slice(0, bag.length / 2))
    ._(split(''))
    ._(filter((x: string) => bag.slice(bag.length / 2).includes(x)))
    ._(first)
    ._(getPriority)
    .$();

const findBadge = (bags: string[][]) =>
  getPriority(
    bags[0].filter((y) => bags.slice(1).every((z) => z.includes(y)))[0]
  );

export const part1 = (input: string) =>
  pipe(input)._(parseLinesOfStrings)._(map(findError))._(sum).$();

export const part2 = (input: string) =>
  pipe(input)
    ._(parseLinesOfStrings)
    ._(map(split('')))
    ._(chunk(3))
    ._(map(findBadge))
    ._(sum)
    .$();
