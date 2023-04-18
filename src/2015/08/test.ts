import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = '""\n"abc"\n"aaa\\"aaa"\n"\\x27"' // prettier-ignore

describe('2015 08', () => {
  test('part1', () => {
    expect(part1(input)).toBe(12);
  });

  test('part2', () => {
    expect(part2(input)).toBe(19);
  });

  test('final', async () => {
    const input = await readFile(`./src/2015/08/input`, 'utf8');

    expect(part1(input)).toBe(1350);
    expect(part2(input)).toBe(2085);
  });
});
