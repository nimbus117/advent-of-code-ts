import { parseLinesOfStrings, map, pipe, reduceI } from '../../shared';

type Command = [string, number];
type Position = { x: number; y: number };
type PositionWithAim = Position & { aim: number };

const toCommand = (x: string): Command => {
  const [direction, distance] = x.split(' ');
  return [direction, parseInt(distance)];
};

const nextPosition1 = (p: Position, c: Command) => {
  c[0] === 'up'
    ? (p.y -= c[1])
    : c[0] === 'down'
    ? (p.y += c[1])
    : (p.x += c[1]);
  return p;
};

const nextPosition2 = (p: PositionWithAim, c: Command) => {
  if (c[0] === 'up') {
    p.aim -= c[1];
  } else if (c[0] === 'down') {
    p.aim += c[1];
  } else {
    p.x += c[1];
    p.y += p.aim * c[1];
  }
  return p;
};

export const part1 = (input: string) =>
  pipe(input)
    ._(parseLinesOfStrings)
    ._(map(toCommand))
    ._(reduceI(nextPosition1, { x: 0, y: 0 }))
    ._((position) => position.x * position.y)
    .$();

export const part2 = (input: string) =>
  pipe(input)
    ._(parseLinesOfStrings)
    ._(map(toCommand))
    ._(reduceI(nextPosition2, { aim: 0, x: 0, y: 0 }))
    ._((p) => p.x * p.y)
    .$();
