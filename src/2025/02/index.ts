import { chunk, filter, range } from '@shared/Array';
import { pipe } from '@shared/Function';
import { sum } from '@shared/Number';
import { parseCommaSeparatedLine } from '@shared/ParseInput';

const parse = (input: string) =>
  parseCommaSeparatedLine(input).flatMap((x) => {
    const [start, end] = x.split('-');
    return range(Number(start), Number(end));
  });

const isInvalidId1 = (id: number) => {
  const stringId = id.toString();
  const halfLength = stringId.length / 2;
  return stringId.slice(0, halfLength) === stringId.slice(halfLength);
};

const isInvalidId2 = (id: number) => {
  const idChars = id.toString().split('');
  const halfLength = idChars.length / 2;

  for (let i = 1; i <= halfLength; i++) {
    const allChunksMatch = chunk(i)(idChars)
      .map((x) => x.join(''))
      .every((x, _, a) => x === a[0]);

    if (allChunksMatch) return true;
  }

  return false;
};

export const part1 = (input: string) =>
  pipe(input)._(parse)._(filter(isInvalidId1))._(sum).$;

export const part2 = (input: string) =>
  pipe(input)._(parse)._(filter(isInvalidId2))._(sum).$;
