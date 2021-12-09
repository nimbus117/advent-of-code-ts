import { parseLinesOfStrings, sum } from '../../shared';

const parse = (input: string) =>
  parseLinesOfStrings(input).map((line) => {
    const [patterns, output] = line
      .split(' | ')
      .map((x) => x.split(' ').map((y) => y.split('').sort().join('')));
    return { patterns, output };
  });

const uniqueNumbers = (a: string[]) =>
  a.filter((x) => [2, 3, 4, 7].includes(x.length));

const hasSegments = (a: string, b: string) =>
  a.split('').every((x) => b.includes(x));

const sortByLength = (a: string, b: string) => a.length - b.length;

export const part1 = (input: string) =>
  sum(parse(input).map((line) => uniqueNumbers(line.output).length));

export const part2 = (input: string) =>
  sum(
    parse(input).map(({ patterns, output }) => {
      const known = uniqueNumbers(patterns).sort(sortByLength);
      const [one, seven, four, eight] = known;

      const filterKnown = (a: string[]) => a.filter((x) => !known.includes(x));

      const filterIncludes = (a: string) =>
        patterns.filter((x) => hasSegments(a, x));

      const [nine] = filterKnown(filterIncludes(four));
      known.push(nine);

      const [three, zero] = filterKnown(filterIncludes(one)).sort(sortByLength);
      known.push(three, zero);

      const [six] = filterKnown(patterns.filter((x) => x.length === 6));
      known.push(six);

      const [five] = filterKnown(patterns.filter((x) => hasSegments(x, six)));
      known.push(five);

      const [two] = filterKnown(patterns);

      const l = [zero, one, two, three, four, five, six, seven, eight, nine];
      const lookup = new Map(l.map((x, i) => [x, i]));

      return parseInt(output.map((x) => lookup.get(x)).join(''));
    })
  );
