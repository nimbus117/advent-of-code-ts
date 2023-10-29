import { readFile } from 'fs/promises';
import { part1, part2 } from './';

describe('2019 04', () => {
  test('final', async () => {
    const input = await readFile(`./src/2019/04/input`, 'utf8');

    expect(part1(input)).toBe(979);
    expect(part2(input)).toBe(635);
  });
});
