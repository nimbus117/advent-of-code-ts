export { pipe } from './pipe';
export { allTrue, anyTrue, Predicate } from './Predicates';

export const repeat =
  <T>(times: number, fn: (input: T) => T) =>
  (input: T) => {
    let state = structuredClone(input);
    for (let i = 0; i < times; i++) state = fn(state);
    return state;
  };
