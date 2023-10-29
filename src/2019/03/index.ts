import { join } from '@shared/Array';
import { sum } from '@shared/Number';
import { parseLinesOfStrings } from '@shared/ParseInput';

const lineCoords = (start: number[], line: string) => {
  const direction = line[0];
  const distance = Number(line.slice(1));
  const coords = [];

  switch (direction) {
    case 'R':
      for (let i = start[0] + 1; i <= start[0] + distance; i++)
        coords.push([i, start[1]]);
      break;
    case 'L':
      for (let i = start[0] - 1; i >= start[0] - distance; i--)
        coords.push([i, start[1]]);
      break;
    case 'U':
      for (let i = start[1] + 1; i <= start[1] + distance; i++)
        coords.push([start[0], i]);
      break;
    case 'D':
      for (let i = start[1] - 1; i >= start[1] - distance; i--)
        coords.push([start[0], i]);
      break;
  }
  return coords;
};

const pathCoords = (wireLines: string) =>
  wireLines
    .split(',')
    .reduce((x, y) => x.concat(lineCoords(x[x.length - 1], y)), [[0, 0]])
    .map(join(','));

export const part1 = (input: string) => {
  const paths = parseLinesOfStrings(input);
  const wire1 = pathCoords(paths[0]);
  const wire2 = new Set(pathCoords(paths[1]));

  const getDistance = (coord: string) =>
    sum(coord.split(',').map((x) => Math.abs(Number(x))));

  return wire1.filter(wire2.has, wire2).map(getDistance).sort()[1];
};

export const part2 = (input: string) => {
  const paths = parseLinesOfStrings(input);
  const wire1 = pathCoords(paths[0]);
  const wire2 = pathCoords(paths[1]);
  const wire2Set = new Set(wire2);

  return wire1
    .filter(wire2Set.has, wire2Set)
    .map((coord) => wire1.indexOf(coord) + wire2.indexOf(coord))
    .sort()[1];
};
