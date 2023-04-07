import { part1, part2 } from './';

describe('2015 04', () => {
  test('part1', () => {
    expect(part1('abcdef')).toBe(609043);
    expect(part1('pqrstuv')).toBe(1048970);
  });

  test('part2', () => {
    expect(part2('bgvyzdsv')).toBe(1038736);
  });
});
