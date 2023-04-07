import { reduceI } from '@shared/Array';
import { pipe } from '@shared/Function';
import { count } from '@shared/Number';
import { get } from '@shared/Object';
import { parseLineOfCharacters } from '@shared/ParseInput';
import { Tuple } from '@shared/Types';

type House = Tuple<number, 2>;
type Result1 = { current: House; visited: Set<string> };
type Result2 = {
  santa: House;
  robot: House;
  visited: Set<string>;
  turn: 'santa' | 'robot';
};
type Result = Result1 | Result2;

const getNextHouse = ([x, y]: House, direction: string): House =>
  direction === '^'
    ? [x, y + 1]
    : direction === 'v'
    ? [x, y - 1]
    : direction === '<'
    ? [x - 1, y]
    : [x + 1, y];

const visitHouses1 = reduceI<string, Result1>(
  (acc, cur) => {
    const newPosition = getNextHouse(acc.current, cur);
    acc.visited.add(`${newPosition}`);
    return { ...acc, current: newPosition };
  },
  { current: [0, 0], visited: new Set(['0,0']) }
);

const visitHouses2 = reduceI<string, Result2>(
  (acc, cur) => {
    if (acc.turn === 'santa') {
      const newPosition = getNextHouse(acc.santa, cur);
      acc.visited.add(`${newPosition}`);
      return { ...acc, santa: newPosition, turn: 'robot' };
    } else {
      const newPosition = getNextHouse(acc.robot, cur);
      acc.visited.add(`${newPosition}`);
      return { ...acc, robot: newPosition, turn: 'santa' };
    }
  },
  { santa: [0, 0], robot: [0, 0], visited: new Set(['0,0']), turn: 'santa' }
);

const getVisitedCount = (i: string, visit: (i: string[]) => Result) =>
  pipe(i)._(parseLineOfCharacters)._(visit)._(get('visited'))._(count).$();

export const part1 = (input: string) => getVisitedCount(input, visitHouses1);

export const part2 = (input: string) => getVisitedCount(input, visitHouses2);
