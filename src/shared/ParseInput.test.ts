import {
  parseLinesOfStrings,
  parseLinesOfNumbers,
  parseArraysOfNumbers,
  parseLineOfNumbers,
} from './';

describe('shared', () => {
  describe('parseLinesOfStrings', () => {
    it('splits the input string at each newline character and returns an array of strings', () => {
      const input = 'blah\nblah\nblah\n';
      expect(parseLinesOfStrings(input)).toEqual(['blah', 'blah', 'blah']);
    });

    it('handles input with only one newline character', () => {
      const input = 'blah\n';
      expect(parseLinesOfStrings(input)).toEqual(['blah']);
    });

    it('removes the last new line in the array', () => {
      const input = 'blah\nblah\nblah';
      expect(parseLinesOfStrings(input)).toEqual(['blah', 'blah']);
    });
  });

  describe('parseLinesOfNumbers', () => {
    it('splits the input string at each newline character and returns an array of numbers', () => {
      const input = '1\n2\n3\n';
      expect(parseLinesOfNumbers(input)).toEqual([1, 2, 3]);
    });

    it('handles input with only one newline character', () => {
      const input = '1\n';
      expect(parseLinesOfNumbers(input)).toEqual([1]);
    });
  });

  describe('parseArraysOfNumbers', () => {
    it('splits the input string at each newline character and between every character returning a 2 dimensional array of numbers', () => {
      const input = '123\n456\n789\n';
      expect(parseArraysOfNumbers(input)).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    });

    it('handles input with only one newline character', () => {
      const input = '123\n';
      expect(parseArraysOfNumbers(input)).toEqual([[1, 2, 3]]);
    });
  });

  describe('parseLineOfNumbers', () => {
    it('splits the input string at each "," character and returns an array of numbers', () => {
      const input = '1,2,3,4,5,6\n';
      expect(parseLineOfNumbers(input)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
