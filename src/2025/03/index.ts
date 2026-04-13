import { map } from '@shared/Array';
import { pipe } from '@shared/Function';
import { max, sum } from '@shared/Number';
import { parseArraysOfNumbers } from '@shared/ParseInput';

const getMaxXDigits = (numberOfDigits: number) => (array: number[]) => {
  const digits: number[] = [];

  const get = (numberOfDigits: number, array: number[]) => {
    const endIndex = numberOfDigits > 1 ? (numberOfDigits - 1) * -1 : undefined;
    const _array = array.slice(0, endIndex);
    const maxDigit = max(_array);
    const maxIndex = _array.findIndex((digit) => digit === maxDigit);
    digits.push(maxDigit);
    if (numberOfDigits > 1) get(numberOfDigits - 1, array.slice(maxIndex + 1));
  };

  get(numberOfDigits, array);
  return Number(digits.join(''));
};

const solve = (numberOfDigits: number) => (input: string) =>
  pipe(input)
    ._(parseArraysOfNumbers)
    ._(map(getMaxXDigits(numberOfDigits)))
    ._(sum).$;

export const part1 = solve(2);
export const part2 = solve(12);
