import {
  parseLinesOfStrings,
  range,
  pipe,
  filter,
  map,
  reduceI,
  length,
  MapWithDefault,
  flat,
  fromIterable,
} from '../../shared';

type Line = [[number, number], [number, number]];

const parseLines = (input: string) =>
  parseLinesOfStrings(input).map((line) =>
    line.split(' -> ').map((point) => point.split(',').map((p) => parseInt(p)))
  ) as Line[];

const isHorizontalOrVertical = ([[x1, y1], [x2, y2]]: Line) =>
  x1 === x2 || y1 === y2;

const mapLinePoints = map(([[x1, y1], [x2, y2]]: Line) => {
  const isHorizontal = x1 === x2;
  const slope = isHorizontal ? 0 : (y2 - y1) / (x2 - x1);
  const [a, b, c, d] = isHorizontal ? [y1, y2, x1, x2] : [x1, x2, y1, y2];
  const increasing = a <= b ? [a, b, c] : [b, a, d];

  return range(increasing[0], increasing[1]).map((r, i) => {
    const point = [increasing[2] + slope * i, r];
    return isHorizontal ? point.reverse() : point;
  });
});

const countIntersections = (lines: Line[]) => {
  const count = (intersections: MapWithDefault<string, number>) =>
    reduceI((acc, cur) => {
      const key = `${cur}`;
      acc.set(key, acc.get(key) + 1);
      return acc;
    }, intersections);

  return pipe(lines)
    ._(mapLinePoints)
    ._(flat())
    ._(count(new MapWithDefault(0)))
    ._(fromIterable)
    ._(filter(([, v]) => v > 1))
    ._(length)
    .$();
};

export const part1 = (input: string) =>
  pipe(input)
    ._(parseLines)
    ._(filter(isHorizontalOrVertical))
    ._(countIntersections)
    .$();

export const part2 = (input: string) =>
  pipe(input)._(parseLines)._(countIntersections).$();
