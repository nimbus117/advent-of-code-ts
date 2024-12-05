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
    let state = structuredClone(input);
    for (let i = 0; i < times; i++) state = fn(state);
    return state;
  };
