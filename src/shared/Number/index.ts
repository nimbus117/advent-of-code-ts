export { count, Countable } from './count';

export const isEven = (number: number) => !(number % 2);

export const isOdd = (number: number) => !isEven(number);

export const roundTo = (decimalPlaces: number) => (number: number) => {
  const power = Math.pow(10, decimalPlaces);
  return Math.round(number * power) / power;
};

export const max = (arr: number[]) => arr.reduce((a, b) => (a > b ? a : b));

export const min = (arr: number[]) => arr.reduce((a, b) => (a < b ? a : b));

export const multiply = (arr: number[]) => arr.reduce((a, b) => a * b, 1);

export const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
