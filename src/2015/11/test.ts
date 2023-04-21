import { readFile } from 'fs/promises';
import { part1, part2 } from './';

describe('2015 11', () => {
  test('final', async () => {
    const input = await readFile(`./src/2015/11/input`, 'utf8');

    expect(part1(input)).toBe('hxbxxyzz');
    expect(part2(input)).toBe('hxcaabcc');
  });
});
