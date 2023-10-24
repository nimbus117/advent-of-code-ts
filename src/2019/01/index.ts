import { map } from '@shared/Array';
import { pipe } from '@shared/Function';
import { sum } from '@shared/Number';
import { parseLinesOfNumbers } from '@shared/ParseInput';

const calculateFuel = (mass: number) => Math.floor(mass / 3) - 2;

const calculateTotalFuel = (mass: number): number => {
  const fuel = calculateFuel(mass);
  return fuel > 0 ? fuel + calculateTotalFuel(fuel) : 0;
};

export const part1 = (input: string) =>
  pipe(input)._(parseLinesOfNumbers)._(map(calculateFuel))._(sum).$();

export const part2 = (input: string) =>
  pipe(input)._(parseLinesOfNumbers)._(map(calculateTotalFuel))._(sum).$();
