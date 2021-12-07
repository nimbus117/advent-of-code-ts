export const parseLinesOfStrings = (input: string): string[] =>
  input.split('\n').slice(0, -1);

export const parseLinesOfNumbers = (input: string): number[] =>
  parseLinesOfStrings(input).map((x) => parseInt(x));

export const parseArraysOfNumbers = (input: string): number[][] =>
  parseLinesOfStrings(input).map((x) => x.split('').map(Number));

export const parseLineOfNumbers = (input: string) =>
  parseLinesOfStrings(input)[0].split(',').map(Number);

const reduceNumbers =
  (func: (a: number, b: number) => number) =>
  (numbers: number[] | { [key: string]: number }) =>
    (Array.isArray(numbers) ? numbers : Object.values(numbers)).reduce(func);

export const sum = reduceNumbers((a, b) => a + b);
export const multiply = reduceNumbers((a, b) => a * b);

export const transpose = <T>(array: T[][]) =>
  array[0].map((col, i) => array.map((row) => row[i]));

export const last = <T>(array: T[]) => array[array.length - 1];

export const range = (start: number, end: number) =>
  [...Array(Math.abs(start - end) + 1).keys()].map((i) =>
    end > start ? i + start : start - i
  );
