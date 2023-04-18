import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = `
123 -> a
456 -> y
a AND y -> d
a OR y -> e
a LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT a -> h
NOT y -> i
`;

describe('2015 07', () => {
  test('part1', () => {
    expect(part1(input)).toBe(123);
  });

  test('part2', () => {
    expect(part2(input)).toBe(123);
  });

  test('final', async () => {
    const input = await readFile(`./src/2015/07/input`, 'utf8');

    expect(part1(input)).toBe(3176);
    expect(part2(input)).toBe(14710);
  });
});
