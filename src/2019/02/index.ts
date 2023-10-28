import { first } from '@shared/Array';
import { pipe } from '@shared/Function';
import { multiply, sum } from '@shared/Number';
import { parseCommaSeparatedLineOfNumbers } from '@shared/ParseInput';

const runProgram = (p: number[]) => {
  for (let i = 0; i < p.length; i = i + 4) {
    if (p[i] === 99) break;
    const operation = p[i] === 1 ? sum : multiply;
    p[p[i + 3]] = operation([p[p[i + 1]], p[p[i + 2]]]);
  }
  return p;
};

const findNounVerb = (input: number[]) => {
  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      const program = [...input];
      program[1] = i;
      program[2] = j;
      if (runProgram(program)[0] === 19690720) return 100 * i + j;
    }
  }
};

export const part1 = (input: string) =>
  pipe(input)._(parseCommaSeparatedLineOfNumbers)._(runProgram)._(first).$();

export const part2 = (input: string) =>
  pipe(input)._(parseCommaSeparatedLineOfNumbers)._(findNounVerb).$();
