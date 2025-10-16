import { product } from '@shared/Number';
import { parseArraysOfNumbers } from '@shared/ParseInput';

type Set = (n: number) => number;
type Pred = (n: number, a: number[][]) => boolean;
type CB = (i: number, j: number, trees: number[][], result: number) => number;
type CheckResult = { visible: boolean; score: number };
type Check = (x: number, y: number, array: number[][]) => CheckResult;

const check =
  (inc: boolean, vertical: boolean): Check =>
  (x, y, array) => {
    let score = 0;
    const set: Set = inc ? (n) => n + 1 : (n) => n - 1;
    const predicate: Pred = inc ? (n, a) => n < a[0].length : (n) => n >= 0;

    for (let i = set(vertical ? y : x); predicate(i, array); i = set(i)) {
      score++;
      const direction = vertical
        ? array[i][x] >= array[y][x]
        : array[y][i] >= array[y][x];
      if (direction) {
        return { visible: false, score };
      }
    }
    return { visible: true, score };
  };

const checks = [
  check(false, false),
  check(true, false),
  check(false, true),
  check(true, true),
];

export const checkTrees = (input: string, cb: CB) => {
  const trees = parseArraysOfNumbers(input);
  let result = 0;
  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[0].length; j++) {
      result = cb(i, j, trees, result);
    }
  }
  return result;
};

export const part1 = (input: string) =>
  checkTrees(input, (i, j, trees, result) =>
    checks.some((x) => x(i, j, trees).visible) ? result + 1 : result
  );

export const part2 = (input: string) =>
  checkTrees(input, (i, j, trees, result) =>
    Math.max(result, product(checks.map((x) => x(i, j, trees).score)))
  );
