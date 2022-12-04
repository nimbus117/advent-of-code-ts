import { part1, part2 } from './';

const input = `
A Y
B X
C Z
`;

describe('2021 day02', () => {
  test('part1', () => {
    expect(part1(input)).toBe(15);
  });

  test('part2', () => {
    expect(part2(input)).toBe(12);
  });
});
