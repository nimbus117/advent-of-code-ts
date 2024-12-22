import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

describe('2024 05', () => {
  test('part1', () => {
    expect(part1(input)).toBe(143);
  });

  test('part2', () => {
    expect(part2(input)).toBe(123);
  });

  test('final', async () => {
    const input = await readFile(`./src/2024/05/input`, 'utf8');

    expect(part1(input)).toBe(5208);
    expect(part2(input)).toBe(6732);
  });
});
