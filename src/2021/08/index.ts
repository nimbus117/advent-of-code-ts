import {
  filter,
  map,
  parseLinesOfStrings,
  pipe,
  sort,
  sum,
} from '../../shared';

const parse = (input: string) =>
  parseLinesOfStrings(input).map((line) => {
    const [patterns, output] = line
      .split(' | ')
      .map((x) => x.split(' ').map((y) => y.split('').sort().join('')));
    return { patterns, output };
  });

const filterUnique = filter((x: string) => [2, 3, 4, 7].includes(x.length));

const hasSegments = (a: string, b: string) =>
  a.split('').every((x) => b.includes(x));

const sortByLength = sort((a: string, b: string) => a.length - b.length);

const mapOutput = map(
  ({ patterns, output }: { patterns: string[]; output: string[] }) => {
    const known = pipe(patterns)._(filterUnique)._(sortByLength).$();
    const [one, seven, four, eight] = known;

    const filterKnown = filter((x: string) => !known.includes(x));

    const filterIncludes = (a: string) =>
      patterns.filter((x) => hasSegments(a, x));

    const [nine] = pipe(four)._(filterIncludes)._(filterKnown).$();
    known.push(nine);

    const [three, zero] = pipe(one)
      ._(filterIncludes)
      ._(filterKnown)
      ._(sortByLength)
      .$();
    known.push(three, zero);

    const [six] = pipe(patterns)
      ._(filter((x) => x.length === 6))
      ._(filterKnown)
      .$();
    known.push(six);

    const [five] = pipe(patterns)
      ._(filter((x) => hasSegments(x, six)))
      ._(filterKnown)
      .$();
    known.push(five);

    const [two] = filterKnown(patterns);

    const l = [zero, one, two, three, four, five, six, seven, eight, nine];
    const lookup = new Map(l.map((x, i) => [x, i]));

    return parseInt(output.map((x) => lookup.get(x)).join(''));
  }
);

export const part1 = (input: string) =>
  pipe(input)
    ._(parse)
    ._(map((line) => filterUnique(line.output).length))
    ._(sum)
    .$();

export const part2 = (input: string) =>
  pipe(input)._(parse)._(mapOutput)._(sum).$();
