export const parseLineOfCharacters = (input: string) => input.trim().split('');

export const parseLineOfNumbers = (input: string) =>
  parseLineOfCharacters(input).map(Number);

export const parseCommaSeparatedLineOfNumbers = (input: string) =>
  input.trim().split(',').map(Number);

export const parseLinesOfStrings = (input: string) => input.trim().split('\n');

export const parseLinesOfNumbers = (input: string) =>
  parseLinesOfStrings(input).map(Number);

export const parseArraysOfCharacters = (input: string) =>
  parseLinesOfStrings(input).map(parseLineOfCharacters);

export const parseArraysOfNumbers = (input: string) =>
  parseLinesOfStrings(input).map(parseLineOfNumbers);
