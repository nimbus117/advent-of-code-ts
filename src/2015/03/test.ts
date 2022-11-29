import { part1, part2 } from './';

describe('2015 day03', () => {
  test('part1', () => {
    expect(part1('^>v<')).toBe(4);
  });

  test('part2', () => {
    expect(part2('^v^v^v^v^v')).toBe(11);
  });
});
