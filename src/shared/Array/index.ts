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
  (input: T[]) =>
    thisArg === undefined ? input.map(fn) : input.map(fn, thisArg);

export const filter =
  <T>(fn: (item: T, index: number, array: T[]) => boolean, thisArg?: unknown) =>
  (input: T[]) =>
    thisArg === undefined ? input.filter(fn) : input.filter(fn, thisArg);

export const reduce =
  <T>(fn: (previous: T, current: T, index: number, array: T[]) => T) =>
  (input: T[]): T =>
    input.reduce(fn);

export const reduceWithInitialValue =
  <T, O>(
    fn: (previous: O, current: T, index: number, array: T[]) => O,
    initialValue: O
  ) =>
  (input: T[]): O =>
    input.reduce(fn, initialValue);

export const any =
  <T>(fn: (item: T, index: number, array: T[]) => boolean, thisArg?: unknown) =>
  (input: T[]) =>
    thisArg === undefined ? input.some(fn) : input.some(fn, thisArg);

export const all =
  <T>(fn: (item: T, index: number, array: T[]) => boolean, thisArg?: unknown) =>
  (input: T[]) =>
    thisArg === undefined ? input.every(fn) : input.every(fn, thisArg);
