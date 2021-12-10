import { multiply, parseArraysOfNumbers, sum } from '../../shared';

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

export const part1 = (input: string) => {
  const lowPoints = parseArraysOfNumbers(input).map((y, yI, yA) =>
    y.filter((x, xI) => getAdjacent(yA, xI, yI).every((v) => x < v[2]))
  );
  return sum(lowPoints.flat().map((z) => z + 1));
};

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
