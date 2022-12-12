import { lastN, map, sort } from '@shared/Array';
import { pipe } from '@shared/Function';
import { multiply } from '@shared/Math';
import { parseLinesOfStrings } from '@shared/ParseInput';
import { trim } from '@shared/String';

class Monkey {
  items: number[];
  inspected: number;
  operation: string;
  opValue: string;
  divBy: number;
  target1: number;
  target2: number;

  constructor(input: string) {
    const lines = pipe(input)._(parseLinesOfStrings)._(map(trim)).$();
    this.items = lines[1].split(': ')[1].split(', ').map(Number);
    this.inspected = 0;
    this.operation = lines[2][21];
    this.opValue = lines[2].slice(23);
    this.divBy = parseInt(lines[3].slice(19));
    this.target1 = parseInt(lines[4].split(' ')[5]);
    this.target2 = parseInt(lines[5].split(' ')[5]);
  }

  turn(lcm?: number) {
    const throws = this.items.map((old) => {
      const value = this.opValue === 'old' ? old : parseInt(this.opValue);
      const newWorry = this.operation === '*' ? old * value : old + value;
      const item = lcm ? newWorry % lcm : Math.floor(newWorry / 3);
      return { target: item % this.divBy ? this.target2 : this.target1, item };
    });

    this.inspected += this.items.length;
    this.items = [];
    return throws;
  }
}

class Game {
  monkeys: Monkey[];
  constructor(input: string) {
    this.monkeys = input.split('\n\n').map((x) => new Monkey(x));
  }

  rounds(count: number, useLcm?: boolean) {
    const lcm = useLcm ? multiply(this.monkeys.map((m) => m.divBy)) : undefined;
    for (let i = 0; i < count; i++) {
      this.monkeys.forEach((m) =>
        m.turn(lcm).forEach((t) => this.monkeys[t.target].items.push(t.item))
      );
    }
    return this;
  }

  getMonkeyBusiness = () =>
    pipe(this.monkeys)
      ._(map((x) => x.inspected))
      ._(sort((a, b) => a - b))
      ._(lastN(2))
      ._(multiply)
      .$();
}

export const part1 = (input: string) =>
  new Game(input).rounds(20).getMonkeyBusiness();

export const part2 = (input: string) =>
  new Game(input).rounds(10000, true).getMonkeyBusiness();
