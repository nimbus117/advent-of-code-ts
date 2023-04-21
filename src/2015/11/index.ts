import { map } from '@shared/Array';
import { allTrue, pipe } from '@shared/Function';
import { parseLineOfCharacters } from '@shared/ParseInput';

const charToNumber = (x: string) => x.charCodeAt(0) - 97;
const numberToCar = (x: number) => String.fromCharCode(x + 97);

const isValidPasword = allTrue<number[]>([
  (p) => ![8, 11, 14].some((y) => p.includes(y)),
  (p) => p.some((c, i) => p[i + 1] === c + 1 && p[i + 2] === c + 2),
  (p) =>
    (p
      .map(numberToCar)
      .join('')
      .match(/([a-z])\1/g)?.length ?? 0) >= 2,
]);

const increment = (password: number[], index = 7) => {
  if (password[index] < 25) password[index]++;
  else {
    password[index] = 0;
    increment(password, index - 1);
  }
  return password;
};

const run = (password: number[]) => {
  let isValid = false;
  while (!isValid) {
    password = increment(password);
    if (isValidPasword(password)) isValid = true;
  }
  return password.map(numberToCar).join('');
};

export const part1 = (input: string) =>
  pipe(input)._(parseLineOfCharacters)._(map(charToNumber))._(run).$();

export const part2 = (input: string) => part1(part1(input));
