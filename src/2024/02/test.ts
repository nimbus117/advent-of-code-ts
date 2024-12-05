import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

describe('2024 02', () => {
  test('part1', () => {
    expect(part1(input)).toBe(2);
  });

  test('part2', () => {
    expect(part2(input)).toBe(4);
  });

  test('final', async () => {
    const input = await readFile(`./src/2024/02/input`, 'utf8');

    expect(part1(input)).toBe(334);
    expect(part2(input)).toBe(400);
  });
});
