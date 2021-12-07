import { part1, part2 } from './';

const input = `199
200
208
210
200
207
240
269
260
263
`;

describe('2021 day01', () => {
  test('part1', () => {
    expect(part1(input)).toBe(7);
  });

  test('part2', () => {
    expect(part2(input)).toBe(5);
  });
});
