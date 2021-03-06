import { parseArraysOfNumbers, range } from '../../shared';

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
  range(1, 100).reduce(
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
  const blah = { grid: parseArraysOfNumbers(input), step: 0, done: false };

  while (!blah.done) {
    blah.step += 1;
    blah.grid = blah.grid.map((y: number[]) => y.map((x) => x + 1));
    range(0, 9).forEach((y) =>
      range(0, 9).forEach((x) => {
        flash(blah.grid, x, y);
      })
    );
    blah.grid.forEach((y, yI) =>
      y.forEach((_, xI) => {
        if (blah.grid[yI][xI] === -1) {
          blah.grid[yI][xI] = 0;
        }
      })
    );
    if (blah.grid.flat().every((o) => o === 0)) blah.done = true;
  }

  return blah.step;
};
