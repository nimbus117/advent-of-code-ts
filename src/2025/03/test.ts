import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = `
987654321111111
811111111111119
234234234234278
818181911112111
`;

describe('2025 03', () => {
  test('part1', () => {
    expect(part1(input)).toBe(357);
  });

  test('part2', () => {
    expect(part2(input)).toBe(3121910778619);
  });

  test('final', async () => {
    const input = await readFile(`./src/2025/03/input`, 'utf8');

    expect(part1(input)).toBe(17263);
    expect(part2(input)).toBe(170731717900423);
  });
});
