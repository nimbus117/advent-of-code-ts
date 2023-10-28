import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = `1,9,10,3,2,3,11,0,99,30,40,50`;

describe('2019 02', () => {
  test('part1', () => {
    expect(part1(input)).toBe(3500);
  });

  test('final', async () => {
    const input = await readFile(`./src/2019/02/input`, 'utf8');

    expect(part1(input)).toBe(5482655);
    expect(part2(input)).toBe(4967);
  });
});
