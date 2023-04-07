import { map } from '@shared/Array';
import { pipe } from '@shared/Function';
import { sum } from '@shared/Number';
import { parseLinesOfStrings } from '@shared/ParseInput';

const p1Choice = ([char]: string) =>
  char === 'A' ? 'R' : char === 'B' ? 'P' : 'S';

const p2Choice = ([, , char]: string) =>
  char === 'X' ? 'R' : char === 'Y' ? 'P' : 'S';

const shapeScore = (char: string) => (char === 'R' ? 1 : char === 'P' ? 2 : 3);

const win = (char: string) => (char === 'R' ? 'S' : char === 'P' ? 'R' : 'P');

/* istanbul ignore next */
const lose = (char: string) => (char === 'R' ? 'P' : char === 'P' ? 'S' : 'R');

const getGameScore = ({ p1, p2 }: { p1: string; p2: string }) =>
  shapeScore(p2) + (win(p2) === p1 ? 6 : p1 === p2 ? 3 : 0);

const getGameScores1 = map((game: string) =>
  getGameScore({ p1: p1Choice(game), p2: p2Choice(game) })
);

const getGameScores2 = map((game: string) => {
  const p1 = p1Choice(game);
  const p2 = game[2] === 'X' ? win(p1) : game[2] === 'Y' ? p1 : lose(p1);
  return getGameScore({ p1, p2 });
});

export const part1 = (input: string) =>
  pipe(input)._(parseLinesOfStrings)._(getGameScores1)._(sum).$();

export const part2 = (input: string) =>
  pipe(input)._(parseLinesOfStrings)._(getGameScores2)._(sum).$();
