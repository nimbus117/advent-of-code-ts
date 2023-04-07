import { part1, part2 } from './';

const input = `
turn on 0,0 through 999,999
toggle 0,0 through 999,0
turn off 499,499 through 500,500
`;

describe('2015 06', () => {
  test('part1', () => {
    expect(part1(input)).toBe(998996);
  });

  test('part2', () => {
    expect(part2(input)).toBe(1001996);
  });
});
