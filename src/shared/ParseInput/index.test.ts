import {
  parseLinesOfStrings,
  parseLinesOfNumbers,
  parseArraysOfNumbers,
  parseCommaSeparatedLineOfNumbers,
  parseLineOfCharacters,
  parseLineOfNumbers,
  parseArraysOfCharacters,
} from '.';

describe('shared.ParseInput', () => {
  describe('parseLinesOfStrings', () => {
    it('splits the input string at each newline character and returns an array of strings', () => {
      const input = 'blah\nblah\nblah\n';
      expect(parseLinesOfStrings(input)).toEqual(['blah', 'blah', 'blah']);
    });

    it('handles input with only one newline character', () => {
      const input = 'blah\n';
      expect(parseLinesOfStrings(input)).toEqual(['blah']);
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

  describe('parseArraysOfCharacters', () => {
    it('splits the input string at each newline character and between every character returning a 2 dimensional array of characters', () => {
      const input = 'abc\ndef\nghi\n';
      expect(parseArraysOfCharacters(input)).toEqual([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ]);
    });

    it('handles input with only one newline character', () => {
      const input = '123\n';
      expect(parseArraysOfNumbers(input)).toEqual([[1, 2, 3]]);
    });
  });

  describe('parseCommaSeparatedLineOfNumbers', () => {
    it('splits the input string at each "," character and returns an array of numbers', () => {
      const input = '1,2,3,4,5,6\n';
      expect(parseCommaSeparatedLineOfNumbers(input)).toEqual([
        1, 2, 3, 4, 5, 6,
      ]);
    });
  });

  describe('parseLineOfCharacters', () => {
    it('splits the input string at each character and returns an array of characters', () => {
      const input = 'abcdef\n';
      expect(parseLineOfCharacters(input)).toEqual([
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
      ]);
    });
  });

  describe('parseLineOfNumbers', () => {
    it('splits the input string at each character and returns an array of numbers', () => {
      const input = '12345\n';
      expect(parseLineOfNumbers(input)).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
