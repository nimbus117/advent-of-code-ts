import { flat, map, create } from '@shared/Array';
import { pipe } from '@shared/Function';
import { max, sum } from '@shared/Number';
import { parseLinesOfStrings } from '@shared/ParseInput';

type Coordinate = { x: number; y: number };
type Instruction = { action: string; from: Coordinate; to: Coordinate };
type GetNewValue = (light: number, action: string) => number;

const parseInstruction = (instruction: string): Instruction => {
  const parts = instruction.split(' ');
  const [fromX, fromY] = parts.slice(-3)[0].split(',').map(Number);
  const [toX, toY] = parts.slice(-1)[0].split(',').map(Number);
  const action = parts.slice(-4)[0];

  return {
    from: { x: fromX, y: fromY },
    to: { x: toX, y: toY },
    action,
  };
};

const createGrid = () => create(1000).map(() => create(1000).map(() => 0));

const setupLights =
  (getNewValue: GetNewValue) => (instructions: Instruction[]) =>
    instructions.reduce((grid, { to, from, action }) => {
      for (let x = from.x; x <= to.x; x++) {
        for (let y = from.y; y <= to.y; y++) {
          grid[x][y] = getNewValue(grid[x][y], action);
        }
      }
      return grid;
    }, createGrid());

const getNewValue1 = (light: number, a: string) =>
  a === 'toggle' ? Number(!light) : a === 'on' ? 1 : 0;

const getNewValue2 = (light: number, a: string) =>
  a === 'toggle' ? light + 2 : a === 'on' ? light + 1 : max([0, light - 1]);

const getTotal = (input: string, getNewValue: GetNewValue) =>
  pipe(input)
    ._(parseLinesOfStrings)
    ._(map(parseInstruction))
    ._(setupLights(getNewValue))
    ._(flat())
    ._(sum)
    .$();

export const part1 = (input: string) => getTotal(input, getNewValue1);

export const part2 = (input: string) => getTotal(input, getNewValue2);
