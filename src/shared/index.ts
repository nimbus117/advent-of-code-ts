/* istanbul ignore file */

export {
  all,
  any,
  filter,
  first,
  flat,
  flatMap,
  fromIterable,
  join,
  last,
  map,
  range,
  reduce,
  reduceI,
  reverse,
  slice,
  sort,
  transpose,
} from './Array';

export { allPass, anyPass, pipe } from './Function';

export { MapWithDefault } from './MapWithDefault';

export { factorial, isEven, isOdd, multiply, sum } from './Math';

export { omit, pick } from './Object';

export {
  parseArraysOfNumbers,
  parseCommaSeparatedLineOfNumbers,
  parseLineOfCharacters,
  parseLineOfNumbers,
  parseLinesOfNumbers,
  parseLinesOfStrings,
} from './ParseInput';

export {
  isCapitalized,
  isLowerCase,
  isUpperCase,
  isLengthAtLeast,
  split,
  trim,
  trimEnd,
  trimStart,
} from './String';

export const length = <T extends { length: number }>(x: T): number => x.length;
