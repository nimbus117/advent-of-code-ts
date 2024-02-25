import { map, reduceI } from '@shared/Array';
import { pipe } from '@shared/Function';
import { parseLinesOfStrings } from '@shared/ParseInput';

type Command = [string, number];
type Position = { x: number; y: number };
type PositionWithAim = Position & { aim: number };

const mapToCommand = map((x: string): Command => {
  const [direction, distance] = x.split(' ');
  return [direction, parseInt(distance)];
});

const getFinalPosition = reduceI(
  (p: Position, c: Command) => {
    c[0] === 'up'
      ? (p.y -= c[1])
      : c[0] === 'down'
      ? (p.y += c[1])
      : (p.x += c[1]);
    return p;
  },
  { x: 0, y: 0 }
);

const getFinalPositionUsingAim = reduceI(
  (p: PositionWithAim, c: Command) => {
    if (c[0] === 'up') {
      p.aim -= c[1];
    } else if (c[0] === 'down') {
      p.aim += c[1];
    } else {
      p.x += c[1];
      p.y += p.aim * c[1];
    }
    return p;
  },
  { aim: 0, x: 0, y: 0 }
);

const run = (input: string, fn: (i: Command[]) => Position) =>
  pipe(input)
    ._(parseLinesOfStrings)
    ._(mapToCommand)
    ._(fn)
    ._((p) => p.x * p.y).$;

export const part1 = (input: string) => run(input, getFinalPosition);

export const part2 = (input: string) => run(input, getFinalPositionUsingAim);
