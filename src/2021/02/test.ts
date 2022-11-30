import { part1, part2 } from './';

const input = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`;

describe('2021 day02', () => {
  test('part1', () => {
    expect(part1(input)).toBe(150);
  });

  test('part2', () => {
    expect(part2(input)).toBe(900);
  });
});
