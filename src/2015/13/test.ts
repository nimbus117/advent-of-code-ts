import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = `
Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.
`;

describe('2015 13', () => {
  test('part1', () => {
    expect(part1(input)).toBe(330);
  });

  test('part2', () => {
    expect(part2(input)).toBe(286);
  });

  test('final', async () => {
    const input = await readFile(`./src/2015/13/input`, 'utf8');

    expect(part1(input)).toBe(709);
    expect(part2(input)).toBe(668);
  });
});
