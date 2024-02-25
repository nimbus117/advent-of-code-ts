import { map, reduce } from '@shared/Array';
import { pipe } from '@shared/Function';
import { get } from '@shared/Object';
import { parseLinesOfStrings } from '@shared/ParseInput';

type Counts = {
  code: number;
  char: number;
  encoded: number;
  p1?: number;
  p2?: number;
};

const countChars = (str: string): Counts => ({
  code: str.length,
  char: str
    .replace(/(^")|("$)/g, '')
    .replace(/\\x[0-9a-f]{2}/g, 'x')
    .replace(/(?:\\(.))/g, '$1').length,
  encoded: JSON.stringify(str).length,
});

const getCounts = (acc: Counts, cur: Counts): Counts => {
  const char = acc.char + cur.char;
  const code = acc.code + cur.code;
  const encoded = acc.encoded + cur.encoded;
  return { char, code, encoded, p1: code - char, p2: encoded - code };
};

const solution = (input: string, part: 'p1' | 'p2') =>
  pipe(input)
    ._(parseLinesOfStrings)
    ._(map(countChars))
    ._(reduce(getCounts))
    ._(get(part)).$;

export const part1 = (input: string) => solution(input, 'p1');

export const part2 = (input: string) => solution(input, 'p2');
