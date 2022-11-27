import { first, map } from '../Array';
import { split, trim } from '../String';
import { pipe } from '../Function';

export const parseLinesOfStrings = (input: string): string[] =>
  pipe(input)._(trim)._(split('\n')).$();

export const parseLinesOfNumbers = (input: string): number[] =>
  pipe(input)._(parseLinesOfStrings)._(map(Number)).$();

export const parseLineOfCharacters = (input: string): string[] =>
  pipe(input)._(parseLinesOfStrings)._(first)._(split('')).$();

export const parseLineOfNumbers = (input: string): number[] =>
  pipe(input)._(parseLineOfCharacters)._(map(Number)).$();

export const parseArraysOfNumbers = (input: string): number[][] =>
  pipe(input)._(parseLinesOfStrings)._(map(parseLineOfNumbers)).$();

export const parseCommaSeparatedLineOfNumbers = (input: string): number[] =>
  pipe(input)._(parseLinesOfStrings)._(first)._(split(','))._(map(Number)).$();
