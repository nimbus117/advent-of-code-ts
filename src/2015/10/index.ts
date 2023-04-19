import { join, map, reduceI } from '@shared/Array';
import { pipe, repeat } from '@shared/Function';
import { parseLineOfCharacters } from '@shared/ParseInput';

const lookAndSay = (acc: { digit: string; count: number }[], cur: string) => {
  const current = acc[acc.length - 1]?.digit;
  if (current === cur) acc[acc.length - 1].count++;
  else acc.push({ digit: cur, count: 1 });
  return acc;
};

const cycle = (input: string) => {
  return pipe(input)
    ._(parseLineOfCharacters)
    ._(reduceI(lookAndSay, []))
    ._(map((x) => `${x.count}${x.digit}`))
    ._(join(''))
    .$();
};

export const part1 = (input: string) => repeat(40, cycle)(input).length;

export const part2 = (input: string) => repeat(50, cycle)(input).length;
