export const parseStrings = (input: string) => input.split('\n').slice(0, -1);

export const parseNumbers = (input: string) =>
  parseStrings(input).map((x) => parseInt(x));

export const parseArrayOfNumbers = (input: string) =>
  parseStrings(input).map((x) => x.split('').map((y) => parseInt(y)));

const reduceNumbers =
  (func: (a: number, b: number) => number) =>
  (numbers: number[] | { [key: string]: number }) =>
    (Array.isArray(numbers) ? numbers : Object.values(numbers)).reduce(func);

export const sum = reduceNumbers((a, b) => a + b);
export const multiply = reduceNumbers((a, b) => a * b);

export const transpose = <T>(array: T[][]) =>
  array[0].map((col, i) => array.map((row) => row[i]));

export const last = <T>(array: T[]) => array[array.length - 1];
