import { filter, map } from '@shared/Array';
import { pipe } from '@shared/Function';
import { multiply, sum } from '@shared/Number';
import { get } from '@shared/Object';
import { parseLinesOfStrings } from '@shared/ParseInput';

type Cubes = Record<string, number>;
type Game = { gameId: number; cubes: Cubes[] };

const parseCubes = (cubes: string): Cubes => {
  const x = cubes.split(', ');
  const y = x.map((a) => {
    const b = a.split(' ');
    return [b[1], Number(b[0])];
  });
  return Object.fromEntries(y);
};

const parseGame = (game: string): Game => {
  const x = game.split(': ');
  return {
    gameId: Number(x[0].split(' ')[1]),
    cubes: x[1].split('; ').map(parseCubes),
  };
};

const isPossible = (x: Cubes) =>
  !Object.entries({ red: 12, green: 13, blue: 14 }).some(([k, v]) => x[k] > v);

const allPossible = (game: Game) => game.cubes.every(isPossible);

const getPower = (game: Game) => {
  const x = game.cubes.reduce((acc, cur) => {
    Object.entries(cur).forEach(([k, v]) => {
      if (!acc[k] || v > acc[k]) acc[k] = v;
    });
    return acc;
  }, {});
  return multiply(Object.values(x));
};

export const part1 = (input: string) =>
  pipe(input)
    ._(parseLinesOfStrings)
    ._(map(parseGame))
    ._(filter(allPossible))
    ._(map(get('gameId')))
    ._(sum).$;

export const part2 = (input: string) =>
  pipe(input)._(parseLinesOfStrings)._(map(parseGame))._(map(getPower))._(sum)
    .$;
