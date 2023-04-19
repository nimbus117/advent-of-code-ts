import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = `
London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141
`;

describe('2015 09', () => {
  test('part1', () => {
    expect(part1(input)).toBe(605);
  });

  test('part2', () => {
    expect(part2(input)).toBe(982);
  });

  test('final', async () => {
    const input = await readFile(`./src/2015/09/input`, 'utf8');

    expect(part1(input)).toBe(251);
    expect(part2(input)).toBe(898);
  });
});
