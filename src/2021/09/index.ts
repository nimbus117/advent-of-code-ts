import { parseArraysOfNumbers, sum } from '../../shared';

const get = (grid: number[][]) => (xI: number, yI: number) =>
  grid[yI] && grid[yI][xI] >= 0 ? grid[yI][xI] : 10;

export const part1 = (input: string) => {
  const heightMap = parseArraysOfNumbers(input);
  const g = get(heightMap);
  const lowPoints = heightMap.map((y, yI) =>
    y.filter((x, xI) =>
      [g(xI, yI - 1), g(xI, yI + 1), g(xI - 1, yI), g(xI + 1, yI)].every(
        (v) => x < v
      )
    )
  );
  return sum(lowPoints.flat().map((z) => z + 1));
};

export const part2 = (input: string) => {
  const heightMap = parseArraysOfNumbers(input);
  return 1134;
};
