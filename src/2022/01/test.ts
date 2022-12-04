import { part1, part2 } from './';

const input = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

describe('2022 day01', () => {
  test('part1', () => {
    expect(part1(input)).toBe(24000);
  });

  test('part2', () => {
    expect(part2(input)).toBe(45000);
  });
});
