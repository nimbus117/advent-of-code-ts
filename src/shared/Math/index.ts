import { reduce } from '../Array';

export const factorial = (number: bigint): bigint => {
  if (number < 0n) throw new Error('Number must be positive');

  let total = BigInt(1);
  for (let i = BigInt(1); i <= number; i++) {
    total = total * i;
  }

  return total;
};

export const isEven = (number: number): boolean => !(number % 2);

export const isOdd = (number: number): boolean => !isEven(number);

export const sum = reduce<number>((a, b) => a + b);

export const multiply = reduce<number>((a, b) => a * b);

export const count = <T extends { length: number } | { size: number }>(
  input: T
): number =>
  typeof input === 'string' || 'length' in input ? input.length : input.size;
