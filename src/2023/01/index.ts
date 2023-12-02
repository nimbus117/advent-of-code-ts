import { map } from '@shared/Array';
import { pipe } from '@shared/Function';
import { sum } from '@shared/Number';
import { parseLinesOfStrings } from '@shared/ParseInput';

const getValue = (input: string) => {
  const first = input.match(/\d/);
  const last = input.split('').reverse().join('').match(/\d/);
  return Number('' + first + last);
};

const numbers: Record<string, string> = {
  one: 'one1one',
  two: 'two2two',
  three: 'three3three',
  four: 'four4four',
  five: 'five5five',
  six: 'six6six',
  seven: 'seven7seven',
  eight: 'eight8eight',
  nine: 'nine9nine',
};

const replaceWords = (input: string) => {
  let _input = input;
  Object.keys(numbers).forEach(
    (num) => (_input = _input.replaceAll(num, numbers[num]))
  );
  return _input;
};

export const part1 = (input: string) =>
  pipe(input)._(parseLinesOfStrings)._(map(getValue))._(sum).$();

export const part2 = (input: string) =>
  pipe(input)
    ._(parseLinesOfStrings)
    ._(map(replaceWords))
    ._(map(getValue))
    ._(sum)
    .$();
