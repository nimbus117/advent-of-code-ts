import { chunk, join, map } from '@shared/Array';
import { pipe } from '@shared/Function';
import { sum } from '@shared/Number';
import { parseLinesOfStrings } from '@shared/ParseInput';

type Details<T> = { X: number; cycle: number; out: T[] };
type OnCycle<T> = (details: Details<T>) => Omit<Details<T>, 'cycle'>;

const process =
  <T>(onCycle: OnCycle<T>) =>
  (input: string) => {
    let d: Details<T> = { X: 1, cycle: 1, out: [] };
    const nextCycle = () => (d = { ...onCycle(d), cycle: d.cycle + 1 });

    for (const instruction of parseLinesOfStrings(input)) {
      if (instruction === 'noop') nextCycle();
      else {
        [1, 2].forEach(() => nextCycle());
        d.X = d.X + parseInt(instruction.split(' ')[1]);
      }
    }
    return d.out;
  };

const signalStrength: OnCycle<number> = ({ X, cycle, out }) => ({
  X: X,
  out: (cycle - 20) % 40 ? out : [...out, cycle * X],
});

const screen: OnCycle<string> = ({ X, cycle, out }) => {
  const pixel = [X - 1, X, X + 1].includes(cycle - 1);
  out[cycle - 1] = pixel ? '#' : '.';
  return { X: cycle % 40 ? X : X + 40, out };
};

export const part1 = (input: string) =>
  pipe(input)._(process(signalStrength))._(sum).$;

export const part2 = (input: string) =>
  pipe(input)
    ._(process(screen))
    ._(chunk(40))
    ._(map(join(''))).$;
