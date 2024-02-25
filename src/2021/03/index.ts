import { map, reduceI } from '@shared/Array';
import { pipe } from '@shared/Function';
import { parseArraysOfNumbers } from '@shared/ParseInput';

const getGammaBits = (input: number[][]) => {
  const countSetBits = reduceI(
    (acc: number[], cur: number[]) => cur.map((x, i) => x + acc[i]),
    new Array(input[0].length).fill(0)
  );

  const toGamaBit = (x: number) => (x > input.length / 2 ? 1 : 0);

  return pipe(input)._(countSetBits)._(map(toGamaBit)).$;
};

const flipBit = (bit: number) => 1 - bit;

const bitsToInt = (input: number[]) => parseInt(input.join(''), 2);

const getRating = (
  input: number[][],
  mostCommon: number,
  index = 0
): number[] => {
  const commonBitAtIndex =
    input.reduce((acc, cur) => cur[index] + acc, 0) >= input.length / 2
      ? mostCommon
      : mostCommon ^ 1;

  const filteredInput = input.filter((x) => x[index] === commonBitAtIndex);

  return filteredInput.length > 1
    ? getRating(filteredInput, mostCommon, index + 1)
    : filteredInput[0];
};

export const part1 = (input: string) => {
  const gamma = pipe(input)._(parseArraysOfNumbers)._(getGammaBits).$;
  const epsilon = gamma.map(flipBit);
  return bitsToInt(gamma) * bitsToInt(epsilon);
};

export const part2 = (input: string) => {
  const parsed = parseArraysOfNumbers(input);
  const oxygen = getRating(parsed, 1);
  const co2 = getRating(parsed, 0);
  return bitsToInt(oxygen) * bitsToInt(co2);
};
