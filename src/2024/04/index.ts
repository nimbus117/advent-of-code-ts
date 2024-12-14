import { map } from '@shared/Array';
import { pipe } from '@shared/Function';
import { parseLineOfCharacters, parseLinesOfStrings } from '@shared/ParseInput';

const getFrom2dArray = (array: string[][]) => (x: number, y: number) =>
  array[x] && array[x][y];

const countXmas = (ws: string[][]) => {
  let count = 0;
  const get = getFrom2dArray(ws);

  ws.forEach((row, x) =>
    row.forEach((char, y) => {
      if (char === 'X')
        [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1],
        ].forEach(([_x, _y]) => {
          const [aX, aY] = [x + _x, y + _y];
          const [bX, bY] = [aX + _x, aY + _y];
          const [cX, cY] = [bX + _x, bY + _y];
          if (get(aX, aY) === 'M' && get(bX, bY) === 'A' && get(cX, cY) === 'S')
            count++;
        });
    })
  );

  return count;
};

const countX_mas = (ws: string[][]) => {
  let count = 0;
  const get = getFrom2dArray(ws);

  ws.forEach((row, x) =>
    row.forEach((char, y) => {
      if (char === 'A') {
        const tl = get(x - 1, y - 1);
        const tr = get(x + 1, y - 1);
        const bl = get(x - 1, y + 1);
        const br = get(x + 1, y + 1);

        ((tl === 'M' && br === 'S') || (tl === 'S' && br === 'M')) &&
          ((tr === 'M' && bl === 'S') || (tr === 'S' && bl === 'M')) &&
          count++;
      }
    })
  );

  return count;
};

export const part1 = (input: string) =>
  pipe(input)._(parseLinesOfStrings)._(map(parseLineOfCharacters))._(countXmas)
    .$;

export const part2 = (input: string) =>
  pipe(input)._(parseLinesOfStrings)._(map(parseLineOfCharacters))._(countX_mas)
    .$;
