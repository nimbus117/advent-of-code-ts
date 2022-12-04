import { pipe } from '../Function';

export const first = <T>(array: T[]): T => array[0];

export const last = <T>(array: T[]): T => array[array.length - 1];

export const transpose = <T>(array: T[][]): T[][] =>
  array[0].map((_, i) => array.map((row) => row[i]));

export const range = (start: number, end: number): number[] => {
  const fn =
    end > start
      ? (value: number) => value + start
      : (value: number) => start - value;

  return [...Array(Math.abs(start - end) + 1).keys()].map(fn);
};

export const map =
  <T, O>(fn: (item: T, index: number, array: T[]) => O, thisArg?: unknown) =>
  (array: T[]) =>
    array.map(fn, thisArg);

export const filter =
  <T>(fn: (item: T, index: number, array: T[]) => boolean, thisArg?: unknown) =>
  (array: T[]) =>
    array.filter(fn, thisArg);

export const reduce =
  <T>(fn: (previous: T, current: T, index: number, array: T[]) => T) =>
  (array: T[]): T =>
    array.reduce(fn);

// reduce with Initial value
export const reduceI =
  <T, O>(
    fn: (previous: O, current: T, index: number, array: T[]) => O,
    initialValue: O
  ) =>
  (array: T[]): O =>
    array.reduce(fn, initialValue);

export const any =
  <T>(fn: (item: T, index: number, array: T[]) => boolean, thisArg?: unknown) =>
  (array: T[]) =>
    array.some(fn, thisArg);

export const all =
  <T>(fn: (item: T, index: number, array: T[]) => boolean, thisArg?: unknown) =>
  (array: T[]) =>
    array.every(fn, thisArg);

export const flat =
  <A, D extends number = 1>(depth?: D) =>
  (array: A[]) =>
    array.flat(depth);

export const flatMap =
  <T, O>(fn: (item: T, index: number, array: T[]) => O, thisArg?: unknown) =>
  (array: T[]) =>
    pipe(array)._(map(fn, thisArg))._(flat()).$();

export const join =
  <T>(separator?: string) =>
  (array: T[]): string =>
    array.join(separator);

export const fromIterable = <T>(iterable: {
  [Symbol.iterator](): IterableIterator<T>;
}) => [...iterable];

export const sort =
  <T>(fn?: (a: T, b: T) => number) =>
  (array: T[]): T[] =>
    array.slice().sort(fn);

export const reverse = <T>(array: T[]): T[] => array.reverse();

export const slice =
  <T>(start?: number, end?: number) =>
  (array: T[]) =>
    array.slice(start, end);

export const includes =
  <T>(searchElement: T) =>
  (array: T[]) =>
    array.includes(searchElement);

export const find =
  <T>(fn: (item: T, index: number, array: T[]) => boolean, thisArg?: unknown) =>
  (array: T[]) =>
    array.find(fn, thisArg);

export const chunk =
  <T>(size: number) =>
  (array: T[]): T[][] =>
    Array(Math.ceil(array.length / size))
      .fill(undefined)
      .map((_, i) => array.slice(size * i, size * i + size));
