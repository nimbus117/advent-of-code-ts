import { part1 } from './';

const input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;

describe('2021 day12', () => {
  test('part1', () => {
    expect(part1(input)).toBe(10);
  });

  // test('part2', () => {
  //   expect(part2(input)).toBe(36);
  // });
});
