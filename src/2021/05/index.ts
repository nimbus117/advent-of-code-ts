import { parseStrings, range } from '../../shared';

type Line = [[number, number], [number, number]];

const parseLines = (input: string) =>
  parseStrings(input).map((line) =>
    line.split(' -> ').map((point) => point.split(',').map((p) => parseInt(p)))
  ) as Line[];

const getLinePoints = ([[x1, y1], [x2, y2]]: Line) => {
  const isHorizontal = x1 === x2;
  const slope = isHorizontal ? 0 : (y2 - y1) / (x2 - x1);
  const [a, b, c, d] = isHorizontal ? [y1, y2, x1, x2] : [x1, x2, y1, y2];
  const increasing = a <= b ? [a, b, c] : [b, a, d];

  return range(increasing[0], increasing[1]).map((r, i) => {
    const point = [increasing[2] + slope * i, r];
    return isHorizontal ? point.reverse() : point;
  });
};

const countIntersections = (lines: Line[]) =>
  [
    ...lines
      .map(getLinePoints)
      .flat()
      .reduce((acc, cur) => {
        const key = `${cur}`;
        acc.has(key) ? acc.set(key, acc.get(key) + 1) : acc.set(key, 1);
        return acc;
      }, new Map()),
  ].filter(([, v]) => v > 1).length;

export const part1 = (input: string) =>
  countIntersections(
    parseLines(input).filter(([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2)
  );

export const part2 = (input: string) => countIntersections(parseLines(input));
