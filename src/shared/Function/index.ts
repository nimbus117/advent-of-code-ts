export { pipe } from './pipe';

export const allPass =
  <T>(rules: ((x: T) => boolean)[]) =>
  (x: T) =>
    rules.every((rule) => rule(x));

export const anyPass =
  <T>(rules: ((x: T) => boolean)[]) =>
  (x: T) =>
    rules.some((rule) => rule(x));
