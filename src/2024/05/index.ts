import { reduceI } from '@shared/Array';
import { pipe } from '@shared/Function';
import { keys } from '@shared/Map';
import { parseCommaSeparatedLineOfNumbers } from '@shared/ParseInput';

const parseInput = (input: string) => {
  const [rules, updates] = input.split('\n\n');
  return {
    rules: rules.split('\n').map((x) => x.split('|').map(Number)),
    updates: updates.split('\n').map((x) => {
      const update = parseCommaSeparatedLineOfNumbers(x);
      return new Map(Object.entries(update).map(([a, b]) => [b, a]));
    }),
  };
};

type Input = ReturnType<typeof parseInput>;

const getValidUpdates = ({ updates, rules }: Input) =>
  updates
    .filter((update) =>
      rules.every(([before, after]) => {
        const [b, a] = [update.get(before), update.get(after)];
        return b && a && Number(b) > Number(a) ? false : true;
      })
    )
    .map(keys);

const getInvalidUpdates = ({ updates, rules }: Input) =>
  updates
    .filter((update) =>
      rules.some(([before, after]) => {
        const [b, a] = [update.get(before), update.get(after)];
        return b && a && Number(b) > Number(a);
      })
    )
    .map((update) =>
      keys(update).sort((a, b) => {
        /* istanbul ignore next */
        if (rules.some(([_a, _b]) => _a === a && _b === b)) return -1;
        else if (rules.some(([_a, _b]) => _a === b && _b === a)) return 1;
        else return 0;
      })
    );

const addMiddle = (total: number, update: number[]) =>
  update[Math.floor(update.length / 2)] + total;

export const part1 = (input: string) =>
  pipe(input)._(parseInput)._(getValidUpdates)._(reduceI(addMiddle, 0)).$;

export const part2 = (input: string) =>
  pipe(input)._(parseInput)._(getInvalidUpdates)._(reduceI(addMiddle, 0)).$;
