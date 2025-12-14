export { pipe, Pipe } from './pipe';

export type Predicate<T> = (input: T) => boolean;

export const all =
  <T>(predicates: Predicate<T>[]) =>
  (input: T) =>
    predicates.every((predicate) => predicate(input));

export const any =
  <T>(predicates: Predicate<T>[]) =>
  (input: T) =>
    predicates.some((predicate) => predicate(input));

export const repeat =
  <T>(times: number, fn: (input: T) => T) =>
  (input: T) => {
    let _input = structuredClone(input);
    for (let i = 0; i < times; i++) _input = fn(_input);
    return _input;
  };
