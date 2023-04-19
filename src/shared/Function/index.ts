export { pipe } from './pipe';
export { allTrue, anyTrue, Predicate } from './Predicates';

// import { create } from '../Array';
// export const repeat =
//   <T>(times: number, fn: (input: T) => T) =>
//   (input: T) =>
//     create(times).reduce((_input) => {
//       return fn(_input);
//     }, input);

export const repeat =
  <T>(times: number, fn: (input: T) => T) =>
  (input: T) => {
    let _input = input;
    for (let i = 0; i < times; i++) {
      _input = fn(_input);
    }
    return _input;
  };
