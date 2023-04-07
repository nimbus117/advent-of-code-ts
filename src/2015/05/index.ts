import { Predicate, allTrue } from '@shared/Function';
import { parseLinesOfStrings } from '@shared/ParseInput';

const isNice1 = allTrue<string>([
  (x) => /(\w*[aeuio]\w*){3,}/.test(x),

  (x) => x.split('').some((y, i, a) => y === a[i + 1]),

  (x) => ['ab', 'cd', 'pq', 'xy'].every((y) => !x.includes(y)),
]);

const isNice2 = allTrue<string>([
  (x) => x.split('').some((y, i, a) => x.slice(i + 2).includes(y + a[i + 1])),

  (x) => x.split('').some((y, i, a) => y === a[i + 2]),
]);

export const countNice = (input: string, isNice: Predicate<string>) =>
  parseLinesOfStrings(input).filter(isNice).length;

export const part1 = (input: string) => countNice(input, isNice1);

export const part2 = (input: string) => countNice(input, isNice2);
