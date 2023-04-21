export { count, Countable } from './count';

export const isEven = (number: number) => !(number % 2);

export const isOdd = (number: number) => !isEven(number);

export const roundTo = (decimalPlaces: number) => (number: number) => {
  const power = Math.pow(10, decimalPlaces);
  return Math.round(number * power) / power;
};

export const max = (numbers: number[]) => Math.max(...numbers);

export const min = (numbers: number[]) => Math.min(...numbers);

export const multiply = (a: number[]) => a.reduce((a, b) => a * b, 1);

export const sum = (a: number[]) => a.reduce((a, b) => a + b, 0);
