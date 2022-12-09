import { parseArraysOfNumbers } from '@shared/ParseInput';

function checkLeft(x: number, y: number, array: number[][]) {
  let score = 0;
  for (let i = x - 1; i >= 0; i--) {
    score++;
    if (array[y][i] >= array[y][x]) {
      return { visible: false, score };
    }
  }
  return { visible: true, score };
}

function checkRight(x: number, y: number, array: number[][]) {
  let score = 0;
  for (let i = x + 1; i < array[0].length; i++) {
    score++;
    if (array[y][i] >= array[y][x]) {
      return { visible: false, score };
    }
  }
  return { visible: true, score };
}

function checkUp(x: number, y: number, array: number[][]) {
  let score = 0;
  for (let i = y - 1; i >= 0; i--) {
    score++;
    if (array[i][x] >= array[y][x]) {
      return { visible: false, score };
    }
  }
  return { visible: true, score };
}

function checkDown(x: number, y: number, array: number[][]) {
  let score = 0;
  for (let i = y + 1; i < array.length; i++) {
    score++;
    if (array[i][x] >= array[y][x]) {
      return { visible: false, score };
    }
  }
  return { visible: true, score };
}

export const part1 = (input: string) => {
  const trees = parseArraysOfNumbers(input);
  let visibleCount = 0;
  visibleCount += trees.length * 2;
  visibleCount += (trees[0].length - 2) * 2;

  for (let i = 1; i < trees.length - 1; i++) {
    for (let j = 1; j < trees.length - 1; j++) {
      const checks = [checkDown, checkUp, checkRight, checkLeft].some(
        (x) => x(i, j, trees).visible
      );
      if (checks) visibleCount++;
    }
  }
  return visibleCount;
};

export const part2 = (input: string) => {
  const trees = parseArraysOfNumbers(input);
  let highest = 0;

  for (let i = 1; i < trees.length - 1; i++) {
    for (let j = 1; j < trees.length - 1; j++) {
      const totalScore = [checkDown, checkUp, checkRight, checkLeft]
        .map((x) => x(i, j, trees).score)
        .reduce((acc, cur) => acc * cur);
      highest = Math.max(highest, totalScore);
    }
  }
  return highest;
};
