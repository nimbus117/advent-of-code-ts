import { filter, map, range } from '@shared/Array';
import { Predicate, allTrue, pipe } from '@shared/Function';
import { count } from '@shared/Number';

const hasNoDecreasing = (digitArray: number[]) =>
  !digitArray.some((digit, i, arr) => digit > arr[i + 1]);

const hasAtLeast2Adjacent = (digitArray: number[]) =>
  digitArray.some((digit, i, arr) => digit === arr[i + 1]);

const has2Adjacent = (digitArray: number[]) =>
  digitArray.some(
    (digit, i, arr) =>
      digit !== arr[i - 1] && digit === arr[i + 1] && digit !== arr[i + 2]
  );

const getPasswordRange = (input: string) => {
  const [start, end] = input.split('-').map(Number);
  return range(start, end);
};

const toDigitArray = (password: number) => `${password}`.split('').map(Number);

const buildValidator = (validators: Predicate<number[]>[]) => (input: string) =>
  pipe(input)
    ._(getPasswordRange)
    ._(map(toDigitArray))
    ._(filter(allTrue(validators)))
    ._(count).$;

export const part1 = buildValidator([hasNoDecreasing, hasAtLeast2Adjacent]);

export const part2 = buildValidator([hasNoDecreasing, has2Adjacent]);
