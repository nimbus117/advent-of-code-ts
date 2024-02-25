import { first, map, reduceI, join } from '@shared/Array';
import { pipe } from '@shared/Function';
import { parseLinesOfStrings } from '@shared/ParseInput';
import { split } from '@shared/String';

type Stacks = string[][];
type Procedure = { count: number; from: number; to: number };
type StackProc = { stacks: Stacks; procedure: Procedure[] };

const parseProcedure = map<string, Procedure>((proc) => {
  const matches = proc.match(
    new RegExp(/^move ([\d]*) from ([\d]) to ([\d])$/)
  );
  /* istanbul ignore next */
  return {
    count: parseInt((matches ?? '0')[1]),
    from: parseInt((matches ?? '0')[2]) - 1,
    to: parseInt((matches ?? '0')[3]) - 1,
  };
});

const parseStacks = reduceI<string, Stacks>((stacks, line) => {
  const _stacks = stacks.slice();
  if (line[1] === '1') return _stacks;
  for (let i = 1, column = 0; i < line.length; i += 4, column++) {
    if (!_stacks[column]) _stacks[column] = [];
    if (line[i] !== ' ') _stacks[column].push(line[i]);
  }
  return _stacks;
}, []);

const parse = (input: string): StackProc => {
  const [s, p] = input.split('\n\n');
  const stacks = pipe(s)._(split('\n'))._(parseStacks).$;
  const procedure = pipe(p)._(parseLinesOfStrings)._(parseProcedure).$;
  return { stacks, procedure };
};

const moveCrates1 = ({ stacks, procedure }: StackProc): Stacks =>
  procedure.reduce((stacks, proc) => {
    for (let i = 0; i < proc.count; i++) {
      const crate = stacks[proc.from].shift();
      if (typeof crate === 'string') stacks[proc.to].unshift(crate);
    }
    return stacks;
  }, stacks.slice());

const moveCrates2 = ({ stacks, procedure }: StackProc): Stacks =>
  procedure.reduce((stacks, proc) => {
    const crates = stacks[proc.from].slice(0, proc.count);
    stacks[proc.from] = stacks[proc.from].slice(proc.count);
    stacks[proc.to].unshift(...crates);
    return stacks;
  }, stacks.slice());

const getTopCrates = (stacks: Stacks) =>
  pipe(stacks)._(map(first))._(join('')).$;

export const part1 = (input: string) =>
  pipe(input)._(parse)._(moveCrates1)._(getTopCrates).$;

export const part2 = (input: string) =>
  pipe(input)._(parse)._(moveCrates2)._(getTopCrates).$;
