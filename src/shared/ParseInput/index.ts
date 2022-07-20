import { first, map } from '../Array';
import { splitAt, trim } from '../String';
import { pipe } from '../Function';

export const parseLinesOfStrings = (input: string): string[] =>
  pipe(input).$(trim).$(splitAt('\n')).value();

export const parseLinesOfNumbers = (input: string): number[] =>
  pipe(input).$(parseLinesOfStrings).$(map(Number)).value();

export const parseArraysOfNumbers = (input: string): number[][] =>
  pipe(input)
    .$(parseLinesOfStrings)
    .$(map((x) => x.split('').map(Number)))
    .value();

export const parseCommaSeparatedLineOfNumbers = (input: string): number[] =>
  pipe(input)
    .$(parseLinesOfStrings)
    .$(first)
    .$(splitAt(','))
    .$(map(Number))
    .value();

export const parseLineOfCharacters = (input: string): string[] =>
  pipe(input).$(parseLinesOfStrings).$(first).$(splitAt('')).value();
