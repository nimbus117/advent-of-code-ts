export type Predicate<T> = (input: T) => boolean;

export const allTrue =
  <T>(predicates: Predicate<T>[]) =>
  (input: T) =>
    predicates.every((predicate) => predicate(input));

export const anyTrue =
  <T>(predicates: Predicate<T>[]) =>
  (input: T) =>
    predicates.some((predicate) => predicate(input));
