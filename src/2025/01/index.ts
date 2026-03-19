import { at, reduceI } from '@shared/Array';
import { pipe } from '@shared/Function';
import { parseLinesOfStrings } from '@shared/ParseInput';

// [current, zeroCount]
type Result = [number, number];

const parse = (input: string) =>
  parseLinesOfStrings(input).map((x) =>
    Number((x[0] === 'L' ? '-' : '') + x.substring(1))
  );

const getNext = (start: number, move: number) =>
  (((start + move) % 100) + 100) % 100;

const moveDial = (previous: Result, move: number): Result => {
  const next = getNext(previous[0], move);
  return [next, next === 0 ? previous[1] + 1 : previous[1]];
};

const incrementDial = ([current, zeroCount]: Result, move: number): Result => {
  if (move > 0) {
    for (let i = 0; i < move; i++) {
      current = getNext(current, 1);
      if (current === 0) zeroCount++;
    }
  } else {
    for (let i = 0; i > move; i--) {
      current = getNext(current, -1);
      if (current === 0) zeroCount++;
    }
  }

  return [current, zeroCount];
};

export const part1 = (input: string) =>
  pipe(input)
    ._(parse)
    ._(reduceI(moveDial, [50, 0]))
    ._(at(1)).$;

export const part2 = (input: string) =>
  pipe(input)
    ._(parse)
    ._(reduceI(incrementDial, [50, 0]))
    ._(at(1)).$;
