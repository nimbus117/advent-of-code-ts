import { filter, first, last, sort } from '@shared/Array';
import { pipe } from '@shared/Function';
import { MapWithDefault, values } from '@shared/Map';
import { sum } from '@shared/Number';
import { parseLinesOfStrings } from '@shared/ParseInput';

function getFolderSizes(input: string) {
  const dirs: string[] = [];
  const dirMap = new MapWithDefault(0);

  for (const line of parseLinesOfStrings(input)) {
    if (line.startsWith('$ cd')) {
      if (line.startsWith('$ cd ..')) dirs.pop();
      else dirs.push(line.split(' ')[2]);
    }

    if (line.match(/^\d/)) {
      const [size] = line.split(' ');
      dirs.forEach((x, i) => {
        const key = dirs.slice(0, i + 1).join('/');
        dirMap.set(key, parseInt(size) + dirMap.get(key));
      });
    }
  }

  return values(dirMap);
}

export const part1 = (input: string) =>
  pipe(input)
    ._(getFolderSizes)
    ._(filter((x) => x <= 100000))
    ._(sum).$;

export const part2 = (input: string) =>
  pipe(input)
    ._(getFolderSizes)
    ._(sort((a, b) => a - b))
    ._(filter((x, _, a) => x > 30000000 - (70000000 - last(a))))
    ._(first).$;
