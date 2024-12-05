import { map } from '@shared/Array';
import { pipe } from '@shared/Function';
import { multiply, sum } from '@shared/Number';

const parse = (memory: string) => [...(memory.match(/mul\(\d*,\d*\)/g) ?? [])];

const runInstruction = (x: string) =>
  multiply([...(x.match(/\d*/g) ?? [])].filter(Boolean).map(Number));

const remove = (memory: string) =>
  memory.replace(/don't\(\).*?do\(\)/g, '').replace(/don't.*/, '');

export const part1 = (input: string) =>
  pipe(input)._(parse)._(map(runInstruction))._(sum).$;

export const part2 = (input: string) =>
  pipe(input)._(remove)._(parse)._(map(runInstruction))._(sum).$;
