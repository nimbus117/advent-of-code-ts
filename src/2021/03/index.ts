import { parseArrayOfNumbers } from '../../shared';

const bitsToInt = (input: number[]) => parseInt(input.join(''), 2);

const mostCommonBits = (input: number[][]) =>
  input
    .reduce(
      (acc, cur) => cur.map((x, i) => x + acc[i]),
      new Array(input[0].length).fill(0)
    )
    .map((x) => (x > input.length / 2 ? 1 : 0));

const getRating = (
  input: number[][],
  mostCommon: 0 | 1,
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
  const gamma = mostCommonBits(parseArrayOfNumbers(input));
  const epsilon = gamma.map((x) => (x === 0 ? 1 : 0));
  return bitsToInt(gamma) * bitsToInt(epsilon);
};

export const part2 = (input: string) => {
  const parsed = parseArrayOfNumbers(input);
  const oxygen = getRating(parsed, 1);
  const co2 = getRating(parsed, 0);
  return bitsToInt(oxygen) * bitsToInt(co2);
};
