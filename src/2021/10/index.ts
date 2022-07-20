import { MapWithDefault, last, parseLinesOfStrings } from '../../shared';

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

export const part1 = (input: string) =>
  parseLinesOfStrings(input)
    .reduce<string[]>((acc, cur) => {
      const openingChars = [];
      for (const char of cur) {
        const opening = pairs.get(char);
        if (opening) {
          if (last(openingChars) === opening) openingChars.pop();
          else {
            acc.push(char);
            break;
          }
        } else openingChars.push(char);
      }
      return acc;
    }, [])
    .map((char) => p1Score.get(char))
    .reduce((a, b) => a + b);

export const part2 = (input: string) => {
  const scores = parseLinesOfStrings(input)
    .map((line) => {
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
      return openingChars
        .reverse()
        .reduce((acc, cur) => acc * 5 + p2Score.get(cur), 0);
    }, [])
    .filter(Boolean)
    .sort((a, b) => a - b);

  return scores[Math.floor(scores.length / 2)];
};
