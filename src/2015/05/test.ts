import { part1, part2 } from './';

describe('2015 05', () => {
  test('part1', () => {
    const input = `
ugknbfddgicrmopn
aaa
jchzalrnumimnmhp
haegwjzuvuyypxyu
dvszwmarrgswjxmb
`;

    expect(part1(input)).toBe(2);
  });

  test('part2', () => {
    const input = `
qjhvhtzxzqqjkmpb
xxyxx
uurcxstgmygtbstg
ieodomkazucvgmuy
    `;

    expect(part2(input)).toBe(2);
  });
});
