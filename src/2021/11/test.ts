import { part1, part2 } from './';

const input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`;

describe('2021 day11', () => {
  test('part1', () => {
    expect(part1(input)).toBe(1656);
  });

  test('part2', () => {
    expect(part2(input)).toBe(195);
  });
});
