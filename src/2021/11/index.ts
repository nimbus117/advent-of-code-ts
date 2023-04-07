import { range } from '@shared/Array';
import { parseArraysOfNumbers } from '@shared/ParseInput';

const getAdjacent = (grid: number[][], x: number, y: number) => {
  return [
    [x, y + 1],
    [x + 1, y + 1],
    [x + 1, y],
    [x + 1, y - 1],
    [x, y - 1],
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
  ];
};

const flash = (grid: number[][], x: number, y: number) => {
  if (grid[y] && grid[y][x] > 9) {
    grid[y][x] = -1;
    const adjacent = getAdjacent(grid, x, y);
    adjacent.forEach(
      ([x, y]) => grid[y] && grid[y][x] >= 0 && (grid[y][x] += 1)
    );
    adjacent.forEach(([x, y]) => flash(grid, x, y));
  }
};

export const part1 = (input: string) =>
  range(100).reduce(
    (acc) => {
      acc.grid = acc.grid.map((y: number[]) => y.map((x) => x + 1));
      range(0, 9).forEach((y) =>
        range(0, 9).forEach((x) => {
          flash(acc.grid, x, y);
        })
      );
      acc.grid.forEach((y, yI) =>
        y.forEach((_, xI) => {
          if (acc.grid[yI][xI] === -1) {
            acc.flashes += 1;
            acc.grid[yI][xI] = 0;
          }
        })
      );
      return acc;
    },
    { grid: parseArraysOfNumbers(input), flashes: 0 }
  ).flashes;

export const part2 = (input: string) => {
  const octopuses = { grid: parseArraysOfNumbers(input), step: 0, done: false };

  while (!octopuses.done) {
    octopuses.step += 1;
    octopuses.grid = octopuses.grid.map((y: number[]) => y.map((x) => x + 1));
    range(0, 9).forEach((y) =>
      range(0, 9).forEach((x) => {
        flash(octopuses.grid, x, y);
      })
    );
    octopuses.grid.forEach((y, yI) =>
      y.forEach((_, xI) => {
        if (octopuses.grid[yI][xI] === -1) {
          octopuses.grid[yI][xI] = 0;
        }
      })
    );
    if (octopuses.grid.flat().every((o) => o === 0)) octopuses.done = true;
  }

  return octopuses.step;
};
