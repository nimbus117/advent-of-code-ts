import { part1, part2 } from './';

describe('2022 day06', () => {
  test('part1', () => {
    expect(part1('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(7);
    expect(part1('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11);
  });

  test('part2', () => {
    expect(part2('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(19);
    expect(part2('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(26);
  });
});
