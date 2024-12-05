import { readFile } from 'fs/promises';
import { part1, part2 } from './';

describe('2024 03', () => {
  test('part1', () => {
    const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
    expect(part1(input)).toBe(161);
  });

  test('part2', () => {
    const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
    expect(part2(input)).toBe(48);
  });

  test('final', async () => {
    const input = await readFile(`./src/2024/03/input`, 'utf8');

    expect(part1(input)).toBe(183669043);
    expect(part2(input)).toBe(59097164);
  });
});
