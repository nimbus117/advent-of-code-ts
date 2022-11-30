import { part1, part2 } from './';

describe('2015 day01', () => {
  test('part1', () => {
    expect(part1('))(((((')).toBe(3);
  });

  test('part2', () => {
    expect(part2('()())')).toBe(5);
  });
});
