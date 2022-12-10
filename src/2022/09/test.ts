import { part1, part2 } from './';

describe('2022 09', () => {
  test('part1', () => {
    const input = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;
    expect(part1(input)).toBe(13);
  });

  test('part2', () => {
    const input = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`;
    expect(part2(input)).toBe(36);
  });
});
