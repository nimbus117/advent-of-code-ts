export const parseLineOfCharacters = (input: string): string[] =>
  input.trim().split('');

export const parseLineOfNumbers = (input: string): number[] =>
  parseLineOfCharacters(input).map(Number);

export const parseCommaSeparatedLineOfNumbers = (input: string): number[] =>
  input.trim().split(',').map(Number);

export const parseLinesOfStrings = (input: string): string[] =>
  input.trim().split('\n');

export const parseLinesOfNumbers = (input: string): number[] =>
  parseLinesOfStrings(input).map(Number);

export const parseArraysOfNumbers = (input: string): number[][] =>
  parseLinesOfStrings(input).map(parseLineOfNumbers);

export const parseArraysOfCharacters = (input: string): string[][] =>
  parseLinesOfStrings(input).map(parseLineOfCharacters);
