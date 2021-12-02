import { parseStrings, multiply } from '../../shared';

type Command = [string, number];
type Position = { x: number; y: number };
type PositionWithAim = Position & { aim: number };

const parse = (input: string) =>
  parseStrings(input).map((x): Command => {
    const [direction, distance] = x.split(' ');
    return [direction, parseInt(distance)];
  });

const newPosition1 = (p: Position, c: Command) => {
  c[0] === 'up'
    ? (p.y -= c[1])
    : c[0] === 'down'
    ? (p.y += c[1])
    : (p.x += c[1]);
  return p;
};

const newPosition2 = (p: PositionWithAim, c: Command) => {
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
  multiply(parse(input).reduce(newPosition1, { x: 0, y: 0 }));

export const part2 = (input: string) => {
  const result = parse(input).reduce(newPosition2, { aim: 0, x: 0, y: 0 });
  return multiply([result.x, result.y]);
};
