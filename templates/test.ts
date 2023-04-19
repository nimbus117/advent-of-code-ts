import { readFile } from 'fs/promises';
import { part1, part2 } from './';

const input = ``;

describe('{{year}} {{day}}', () => {
  test('part1', () => {
    expect(part1(input)).toBe('');
  });

  test('part2', () => {
    expect(part2(input)).toBe('');
  });

  test('final', async () => {
    const input = await readFile(`./src/{{year}}/{{day}}/input`, 'utf8');

    expect(part1(input)).toBe('');
    expect(part2(input)).toBe('');
  });
});
