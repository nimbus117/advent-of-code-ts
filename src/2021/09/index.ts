import { filter, flatMap, map } from '@shared/Array';
import { pipe } from '@shared/Function';
import { multiply, sum } from '@shared/Number';
import { parseArraysOfNumbers } from '@shared/ParseInput';

const getAdjacent = (grid: number[][], x: number, y: number) => {
  const g = (x: number, y: number) =>
    grid[y] && grid[y][x] >= 0 ? grid[y][x] : 10;

  return [
    [x, y - 1, g(x, y - 1)],
    [x, y + 1, g(x, y + 1)],
    [x - 1, y, g(x - 1, y)],
    [x + 1, y, g(x + 1, y)],
  ];
};

const getRiskLevels = flatMap((y: number[], yI: number, yA: number[][]) => {
  const isLowpoint = (x: number, xI: number) =>
    getAdjacent(yA, xI, yI).every((v) => x < v[2]);

  return pipe(y)
    ._(filter(isLowpoint))
    ._(map((x) => x + 1))
    .$();
});

export const part1 = (input: string) =>
  pipe(input)._(parseArraysOfNumbers)._(getRiskLevels)._(sum).$();

export const part2 = (input: string) => {
  const heightMap = parseArraysOfNumbers(input);
  const checked = new Set();
  const basinSizes: number[] = [];

  const basinSize = (x: number, y: number, height: number, first = true) => {
    if (height < 9 && !checked.has(`${x}-${y}`)) {
      if (first) basinSizes.push(0);
      basinSizes[basinSizes.length - 1] += 1;
      checked.add(`${x}-${y}`);
      getAdjacent(heightMap, x, y).forEach(([x, y, d]) =>
        basinSize(x, y, d, false)
      );
    }
  };

  heightMap.forEach((y, yI) => y.forEach((x, xI) => basinSize(xI, yI, x)));

  return multiply(basinSizes.sort((a, b) => b - a).slice(0, 3));
};
