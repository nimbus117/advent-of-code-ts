import { map } from '@shared/Array';
import { pipe } from '@shared/Function';
import { parseLineOfCharacters, parseLinesOfStrings } from '@shared/ParseInput';

export const part1 = (input: string) =>
  pipe(input)._(parseLinesOfStrings)._(map(parseLineOfCharacters)).$;

export const part2 = (input: string) => pipe(input).$;
