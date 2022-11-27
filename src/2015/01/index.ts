import { parseLineOfCharacters, pipe, map, sum } from '../../shared';

const instructionToInt = (x: string) => (x === '(' ? 1 : -1);

const getBasementPosition = (instructions: string[]) => {
  let currentFloor = 0;
  for (let i = 0; i < instructions.length; i++) {
    currentFloor += instructionToInt(instructions[i]);
    if (currentFloor === -1) return i + 1;
  }
};

export const part1 = (input: string) =>
  pipe(input)._(parseLineOfCharacters)._(map(instructionToInt))._(sum).$();

export const part2 = (input: string) =>
  pipe(input)._(parseLineOfCharacters)._(getBasementPosition).$();
