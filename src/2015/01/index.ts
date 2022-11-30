import { map } from '@shared/Array';
import { pipe } from '@shared/Function';
import { sum } from '@shared/Math';
import { parseLineOfCharacters } from '@shared/ParseInput';

const instructionToInt = (x: string) => (x === '(' ? 1 : -1);

const getBasementPosition = (instructions: string[]) => {
  let currentFloor = 0;
  for (const [index, instruction] of instructions.entries()) {
    currentFloor += instructionToInt(instruction);
    if (currentFloor === -1) return index + 1;
  }
};

export const part1 = (input: string) =>
  pipe(input)._(parseLineOfCharacters)._(map(instructionToInt))._(sum).$();

export const part2 = (input: string) =>
  pipe(input)._(parseLineOfCharacters)._(getBasementPosition).$();
