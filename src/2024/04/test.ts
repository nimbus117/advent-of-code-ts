import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

describe('2024 04', () => {
  test('part1', () => {
    expect(part1(input)).toBe(18);
  });

  test('part2', () => {
    expect(part2(input)).toBe('');
  });

  test('final', async () => {
    const input = await readFile(`./src/2024/04/input`, 'utf8');

    expect(part1(input)).toBe('');
    expect(part2(input)).toBe('');
  });
});
