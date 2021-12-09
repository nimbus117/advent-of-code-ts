import { part1, part2 } from './';

const input = `2199943210
3987894921
9856789892
8767896789
9899965678
`;

describe('2021 day09', () => {
  test('part1', () => {
    expect(part1(input)).toBe(15);
  });

  test('part2', () => {
    expect(part2(input)).toBe(1134);
  });
});
