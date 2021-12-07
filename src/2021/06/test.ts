import { part1, part2 } from './';

const input = `3,4,3,1,2
`;

describe('2021 day06', () => {
  test('part1', () => {
    expect(part1(input)).toBe(5934);
  });

  test('part2', () => {
    expect(part2(input)).toBe(26984457539);
  });
});
