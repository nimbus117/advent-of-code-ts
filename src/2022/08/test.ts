import { part1, part2 } from './';

const input = `
30373
25512
65332
33549
35390
`;

describe('2022 08', () => {
  test('part1', () => {
    expect(part1(input)).toBe(21);
  });

  test('part2', () => {
    expect(part2(input)).toBe(8);
  });
});
