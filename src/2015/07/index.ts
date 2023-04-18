import { parseLinesOfStrings } from '@shared/ParseInput';

type Signals = Record<string, number>;

const applyInstructions = (input: string, signals: Signals = {}) => {
  const instructions = parseLinesOfStrings(input).map((x) => x.split(' -> '));

  while (instructions.length) {
    const instruction = instructions[0];
    const [_source, wire] = instruction;
    const source = _source.split(' ');
    instructions.shift();

    if (signals[wire]) continue;

    if (source.length === 1) {
      if (Number.isInteger(parseInt(source[0]))) {
        signals[wire] = parseInt(source[0]);
        continue;
      } else if (source[0] in signals) {
        signals[wire] = signals[source[0]];
        continue;
      }
    } else if (source.length === 2 && source[1] in signals) {
      signals[wire] = ~signals[source[1]];
      continue;
    } else if (
      source.length === 3 &&
      [source[0], source[2]].every((x: string) => x in signals || /\d+/.test(x))
    ) {
      const [a, b] = [source[0], source[2]].map(
        (x) => signals[x] ?? parseInt(x)
      );
      if (source[1] === 'AND') signals[wire] = a & b;
      else if (source[1] === 'OR') signals[wire] = a | b;
      else if (source[1] === 'LSHIFT') signals[wire] = a << b;
      else signals[wire] = a >> b;
      continue;
    }

    instructions.push(instruction);
  }

  return signals.a;
};

export const part1 = (input: string) => applyInstructions(input, {});

export const part2 = (input: string) => {
  const part1Result = applyInstructions(input);
  return applyInstructions(input, { b: part1Result });
};
