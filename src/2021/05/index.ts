import { filter, flatMap, fromIterable, range, reduceI } from '@shared/Array';
import { pipe } from '@shared/Function';
import { MapWithDefault } from '@shared/Map';
import { count } from '@shared/Number';
import { parseLinesOfStrings } from '@shared/ParseInput';
import { TupleMut } from '@shared/Types';

type Line = TupleMut<TupleMut<number, 2>, 2>;

const parseLines = (input: string) =>
  parseLinesOfStrings(input).map((line) =>
    line.split(' -> ').map((point) => point.split(',').map((p) => parseInt(p)))
  ) as Line[];

const isHorizontalOrVertical = ([[x1, y1], [x2, y2]]: Line) =>
  x1 === x2 || y1 === y2;

const mapLinePoints = flatMap(([[x1, y1], [x2, y2]]: Line) => {
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
  const getIntersectionCounts = (
    intersections: MapWithDefault<string, number>
  ) =>
    reduceI((acc, cur) => {
      const key = `${cur}`;
      acc.set(key, acc.get(key) + 1);
      return acc;
    }, intersections);

  return pipe(lines)
    ._(mapLinePoints)
    ._(getIntersectionCounts(new MapWithDefault(0)))
    ._(fromIterable)
    ._(filter(([, v]) => v > 1))
    ._(count).$;
};
export const part1 = (input: string) =>
  pipe(input)
    ._(parseLines)
    ._(filter(isHorizontalOrVertical))
    ._(countIntersections).$;

export const part2 = (input: string) =>
  pipe(input)._(parseLines)._(countIntersections).$;
