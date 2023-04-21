import { map } from '@shared/Array';
import { pipe } from '@shared/Function';
import { sum } from '@shared/Number';
import { isObject } from '@shared/Object';

export const part1 = (input: string) =>
  pipe(input)
    ._((str) => str.match(/-?[0-9]+/g) ?? [])
    ._(map(Number))
    ._(sum)
    .$();

const countExlcudingRed = (obj: unknown, numbers: number[] = []) => {
  if (isObject(obj)) {
    const values = Object.values(obj);
    if (values.every((v) => v !== 'red'))
      values.forEach((v) => countExlcudingRed(v, numbers));
  } else if (Array.isArray(obj)) {
    obj.forEach((o) => countExlcudingRed(o, numbers));
  } else if (typeof obj === 'number') numbers.push(obj);

  return numbers;
};

export const part2 = (input: string) =>
  pipe(input)._(JSON.parse)._(countExlcudingRed)._(sum).$();
