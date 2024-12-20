import { map, reduceI, sort } from '@shared/Array';
import { pipe } from '@shared/Function';
import { sum } from '@shared/Number';
import { parseLinesOfStrings } from '@shared/ParseInput';

const parseIds = ([l, r]: number[][], cur: string) => {
  const [lId, rId] = cur.split('   ');
  l.push(parseInt(lId));
  r.push(parseInt(rId));
  return [l, r];
};

const getDifferences = ([l, r]: number[][]) =>
  l.map((id, i) => Math.abs(id - r[i]));

const getSimilarities = ([l, r]: number[][]) =>
  l.map((lId) => lId * r.filter((rId) => lId === rId).length);

export const part1 = (input: string) =>
  pipe(input)
    ._(parseLinesOfStrings)
    ._(reduceI(parseIds, [[], []]))
    ._(map(sort()))
    ._(getDifferences)
    ._(sum).$;

export const part2 = (input: string) =>
  pipe(input)
    ._(parseLinesOfStrings)
    ._(reduceI(parseIds, [[], []]))
    ._(getSimilarities)
    ._(sum).$;
