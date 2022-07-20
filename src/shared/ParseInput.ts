export const parseLinesOfStrings = (input: string): string[] =>
  input.split('\n').slice(0, -1);

export const parseLinesOfNumbers = (input: string): number[] =>
  parseLinesOfStrings(input).map((x) => parseInt(x));

export const parseArraysOfNumbers = (input: string): number[][] =>
  parseLinesOfStrings(input).map((x) => x.split('').map(Number));

export const parseLineOfNumbers = (input: string): number[] =>
  parseLinesOfStrings(input)[0].split(',').map(Number);
