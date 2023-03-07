import { reduce } from '../Array';

export const factorial = (number: bigint) => {
  if (number < 0n) throw new Error('Number must be positive');

  let total = BigInt(1);
  for (let i = BigInt(1); i <= number; i++) {
    total = total * i;
  }

  return total;
};

export const isEven = (number: number) => !(number % 2);

export const isOdd = (number: number) => !isEven(number);

export const sum = reduce<number>((a, b) => a + b);

export const multiply = reduce<number>((a, b) => a * b);

export const max = (numbers: number[]) => Math.max(...numbers);

export const min = (numbers: number[]) => Math.min(...numbers);

type Countable = string | Array<unknown> | Map<unknown, unknown> | Set<unknown>;
export const count = <T extends Countable>(input: T) =>
  typeof input === 'string' || Array.isArray(input) ? input.length : input.size;
