import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`;

describe('2025 01', () => {
  test('part1', () => {
    expect(part1(input)).toBe(3);
  });

  test('part2', () => {
    expect(part2(input)).toBe(6);
  });

  test('final', async () => {
    const input = await readFile(`./src/2025/01/input`, 'utf8');

    expect(part1(input)).toBe(1092);
    expect(part2(input)).toBe(6616);
  });
});
