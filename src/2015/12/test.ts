import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = `
{
    "arr": [
        1,
        2,
        3
    ],
    "obj": {
        "a": -2,
        "b": 4,
        "c": "red"
    }
}
`;

describe('2015 12', () => {
  test('part1', () => {
    expect(part1(input)).toBe(8);
    expect(part1('')).toBe(0);
  });

  test('part2', () => {
    expect(part2(input)).toBe(6);
  });

  test('final', async () => {
    const input = await readFile(`./src/2015/12/input`, 'utf8');

    expect(part1(input)).toBe(191164);
    expect(part2(input)).toBe(87842);
  });
});
