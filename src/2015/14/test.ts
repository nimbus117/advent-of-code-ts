import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = `
Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds
`;

describe('2015 14', () => {
  test('part1', () => {
    expect(part1(input)).toBe(2660);
  });

  test('part2', () => {
    expect(part2(input)).toBe(1564);
  });

  test('final', async () => {
    const input = await readFile(`./src/2015/14/input`, 'utf8');

    expect(part1(input)).toBe(2660);
    expect(part2(input)).toBe(1256);
  });
});
