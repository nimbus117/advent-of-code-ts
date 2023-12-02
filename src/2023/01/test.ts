import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const inputP1 = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

const inputP2 = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`;

describe('2023 01', () => {
  test('part1', () => {
    expect(part1(inputP1)).toBe(142);
  });

  test('part2', () => {
    expect(part2(inputP2)).toBe(281);
  });

  test('final', async () => {
    const input = await readFile(`./src/2023/01/input`, 'utf8');

    expect(part1(input)).toBe(55488);
    expect(part2(input)).toBe(55614);
  });
});
