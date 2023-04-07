import { reduce } from '../Array';

export { count, Countable } from './count';

export const isEven = (number: number) => !(number % 2);

export const isOdd = (number: number) => !isEven(number);

export const sum = reduce<number>((a, b) => a + b);

export const multiply = reduce<number>((a, b) => a * b);

export const max = (numbers: number[]) => Math.max(...numbers);

export const min = (numbers: number[]) => Math.min(...numbers);
