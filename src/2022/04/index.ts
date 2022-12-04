import { filter, map, range, sort } from '@shared/Array';
import { pipe } from '@shared/Function';
import { parseLinesOfStrings } from '@shared/ParseInput';
import { split } from '@shared/String';
import { count } from '@shared/Math';

const parsePair = (pair: string) =>
  pipe(pair)
    ._(split(','))
    ._(map(split('-')))
    ._(map((x) => range(parseInt(x[0]), parseInt(x[1]))))
    ._(sort((a, b) => a.length - b.length))
    .$();

export const part1 = (input: string) =>
  pipe(input)
    ._(parseLinesOfStrings)
    ._(map(parsePair))
    ._(filter((x) => x[0].every((y) => x[1].includes(y))))
    ._(count)
    .$();

export const part2 = (input: string) =>
  pipe(input)
    ._(parseLinesOfStrings)
    ._(map(parsePair))
    ._(filter((x) => x[1].some((y) => x[0].includes(y))))
    ._(count)
    .$();
