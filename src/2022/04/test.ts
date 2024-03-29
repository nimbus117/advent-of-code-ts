import { part1, part2 } from './';

const input = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;

describe('2022 day04', () => {
  test('part1', () => {
    expect(part1(input)).toBe(2);
  });

  test('part2', () => {
    expect(part2(input)).toBe(4);
  });
});
