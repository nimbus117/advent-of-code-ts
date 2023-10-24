import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = `
12
14
1969
100756
`;

describe('2019 01', () => {
  test('part1', () => {
    expect(part1(input)).toBe(34241);
  });

  test('part2', () => {
    expect(part2(input)).toBe(51316);
  });

  test('final', async () => {
    const input = await readFile(`./src/2019/01/input`, 'utf8');

    expect(part1(input)).toBe(3384232);
    expect(part2(input)).toBe(5073456);
  });
});
