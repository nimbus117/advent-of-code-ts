export { MapWithDefault } from './MapWithDefault';
export { pipe } from './pipe';
export {
  parseArraysOfNumbers,
  parseLineOfNumbers,
  parseLinesOfNumbers,
  parseLinesOfStrings,
} from './ParseInput';

export const reducer =
  <T>(fn: (previous: T, current: T, index: number, array: T[]) => T) =>
  (input: T[] | { [key: string | number | symbol]: T }): T =>
    Object.values(input).reduce(fn);

export const sum = reducer<number>((a, b) => a + b);
export const multiply = reducer<number>((a, b) => a * b);

export const transpose = <T>(array: T[][]): T[][] =>
  array[0].map((_, i) => array.map((row) => row[i]));

export const last = <T>(array: T[]) => array[array.length - 1];

export const range = (start: number, end: number): number[] =>
  [...Array(Math.abs(start - end) + 1).keys()].map((i) =>
    end > start ? i + start : start - i
  );

export const isEven = (number: number): boolean => !(number % 2);

export const isOdd = (number: number): boolean => !isEven(number);
