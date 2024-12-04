import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = `
3   4
4   3
2   5
1   3
3   9
3   3
`;

describe('2024 01', () => {
  test('part1', () => {
    expect(part1(input)).toBe(11);
  });

  test('part2', () => {
    expect(part2(input)).toBe(31);
  });

  test('final', async () => {
    const input = await readFile(`./src/2024/01/input`, 'utf8');

    expect(part1(input)).toBe(2264607);
    expect(part2(input)).toBe(19457120);
  });
});
