import { filter, last, map, reduceI, reverse, sort } from '@shared/Array';
import { pipe } from '@shared/Function';
import { MapWithDefault } from '@shared/Map';
import { parseLinesOfStrings } from '@shared/ParseInput';

const pairs = new Map([
  [')', '('],
  ['}', '{'],
  [']', '['],
  ['>', '<'],
]);

const p1Score = new MapWithDefault(0, [
  [')', 3],
  [']', 57],
  ['}', 1197],
  ['>', 25137],
]);

const p2Score = new MapWithDefault(0, [
  ['(', 1],
  ['{', 3],
  ['[', 2],
  ['<', 4],
]);

const getTotalSyntaxErrorScore = reduceI<string, number>((acc, cur) => {
  const openingChars = [];
  for (const char of cur) {
    const opening = pairs.get(char);
    if (opening) {
      if (last(openingChars) === opening) openingChars.pop();
      else return acc + p1Score.get(char);
    } else openingChars.push(char);
  }
  return acc;
}, 0);

const getCompletionScores = map((line: string) => {
  const openingChars = [];
  for (const char of line.split('')) {
    const opening = pairs.get(char);
    if (opening) {
      if (last(openingChars) === opening) openingChars.pop();
      else {
        return 0;
      }
    } else openingChars.push(char);
  }

  const getScore = reduceI((acc, cur: string) => acc * 5 + p2Score.get(cur), 0);

  return pipe(openingChars)._(reverse)._(getScore).$();
});

export const part1 = (input: string) =>
  pipe(input)._(parseLinesOfStrings)._(getTotalSyntaxErrorScore).$();

export const part2 = (input: string) =>
  pipe(input)
    ._(parseLinesOfStrings)
    ._(getCompletionScores)
    ._(filter((x) => x > 0))
    ._(sort((a, b) => a - b))
    ._((scores) => scores[Math.floor(scores.length / 2)])
    .$();
