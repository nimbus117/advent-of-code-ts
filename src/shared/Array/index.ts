import { Obj } from '../Object';

export const first = <T>(array: T[]) => array[0];

export const last = <T>(array: T[]) => array[array.length - 1];

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
  (array: T[]) =>
    array.reduce(fn);

// reduce with Initial value
export const reduceI =
  <T, O>(
    fn: (previous: O, current: T, index: number, array: T[]) => O,
    initialValue: O
  ) =>
  (array: T[]) =>
    array.reduce(fn, initialValue);

export const some =
  <T>(fn: (item: T, index: number, array: T[]) => boolean, thisArg?: unknown) =>
  (array: T[]) =>
    array.some(fn, thisArg);

export const every =
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
    array.map(fn, thisArg).flat();

export const join =
  <T>(separator?: string) =>
  (array: T[]) =>
    array.join(separator);

export const fromIterable = <T>(iterable: {
  [Symbol.iterator](): IterableIterator<T>;
}) => [...iterable];

export const sort =
  <T>(fn?: (a: T, b: T) => number) =>
  (array: T[]) =>
    array.toSorted(fn);

export const slice =
  <T>(start?: number, end?: number) =>
  (array: T[]) =>
    array.slice(start, end);

export const reverse = <T>(array: T[]) => array.slice().reverse();

export const includes =
  <T>(searchElement: T) =>
  (array: T[]) =>
    array.includes(searchElement);

export const find =
  <T>(fn: (item: T, index: number, array: T[]) => boolean, thisArg?: unknown) =>
  (array: T[]) =>
    array.find(fn, thisArg);

export const groupBy =
  <T, K extends keyof Obj>(key: (i: T) => K) =>
  (array: T[]): Record<K, T[]> =>
    array.reduce((groups, item) => {
      (groups[key(item)] ||= []).push(item);
      return groups;
    }, {} as Record<K, T[]>);

export const transpose = <T>(array: T[][]) =>
  array[0].map((_, i) => array.map((row) => row[i]));

export const chunk =
  <T>(size: number) =>
  (array: T[]) =>
    Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(size * i, size * i + size)
    );

export const range = (a: number, b?: number) => {
  if (a === 0 && b === undefined) return [0];

  const [start, end] = b !== undefined ? [a, b] : [a > 0 ? 1 : -1, a];
  const length = Math.abs(end - start) + 1;
  const step = start < end ? 1 : -1;

  return Array.from({ length }, (_, i) => start + i * step);
};
