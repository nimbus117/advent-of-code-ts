import { part1, part2 } from './';

const input = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

describe('2022 day03', () => {
  test('part1', () => {
    expect(part1(input)).toBe(157);
  });

  test('part2', () => {
    expect(part2(input)).toBe(70);
  });
});
