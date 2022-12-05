import { first, map, reduceI, join } from '@shared/Array';
import { pipe } from '@shared/Function';
import { parseLinesOfStrings } from '@shared/ParseInput';
import { split } from '@shared/String';

type Stacks = string[][];
type Procedure = { count: number; from: number; to: number };
type StackProc = { stacks: Stacks; procedure: Procedure[] };

const parseProcedure = (proc: string) => {
  const matches = proc.match(
    new RegExp(/^move ([\d]*) from ([\d]) to ([\d])$/)
  );
  /* istanbul ignore next */
  return {
    count: parseInt((matches ?? '0')[1]),
    from: parseInt((matches ?? '0')[2]) - 1,
    to: parseInt((matches ?? '0')[3]) - 1,
  };
};

const parseStacks = (stacks: Stacks, line: string) => {
  if (line[1] === '1') return stacks;
  for (let i = 1, column = 0; i < line.length; i += 4, column++) {
    if (!stacks[column]) stacks[column] = [];
    if (line[i] !== ' ') stacks[column].push(line[i]);
  }
  return stacks;
};

const parse = (input: string) => {
  const stacksAndProcedure = input.split('\n\n');
  const stacks = pipe(stacksAndProcedure[0])
    ._(split('\n'))
    ._(reduceI(parseStacks, []))
    .$();
  const procedure = pipe(stacksAndProcedure[1])
    ._(parseLinesOfStrings)
    ._(map(parseProcedure))
    .$();
  return { stacks, procedure };
};

const moveCrates1 = ({ stacks, procedure }: StackProc) =>
  procedure.reduce((stacks, proc) => {
    for (let i = 0; i < proc.count; i++) {
      const crate = stacks[proc.from].shift();
      if (typeof crate === 'string') stacks[proc.to].unshift(crate);
    }
    return stacks;
  }, stacks);

const moveCrates2 = ({ stacks, procedure }: StackProc) =>
  procedure.reduce((stacks, proc) => {
    const crates = stacks[proc.from].slice(0, proc.count);
    stacks[proc.from] = stacks[proc.from].slice(proc.count);
    stacks[proc.to].unshift(...crates);
    return stacks;
  }, stacks);

const getTopCrates = (stacks: Stacks) =>
  pipe(stacks)._(map(first))._(join('')).$();

export const part1 = (input: string) =>
  pipe(input)._(parse)._(moveCrates1)._(getTopCrates).$();

export const part2 = (input: string) =>
  pipe(input)._(parse)._(moveCrates2)._(getTopCrates).$();
