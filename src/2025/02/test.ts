import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

describe('2025 02', () => {
  test('part1', () => {
    expect(part1(input)).toBe(1227775554);
  });

  test('part2', () => {
    expect(part2(input)).toBe(4174379265);
  });

  test('final', async () => {
    const input = await readFile(`./src/2025/02/input`, 'utf8');

    expect(part1(input)).toBe(18952700150);
    // expect(part2(input)).toBe(28858486244);
  });
});
