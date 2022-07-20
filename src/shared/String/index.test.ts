import {
  isCapitalized,
  isLowerCase,
  isUpperCase,
  lengthAtLeast,
  splitAt,
  trim,
  trimEnd,
  trimStart,
} from '.';

describe('shared', () => {
  describe('isCapitalized', () => {
    it('returns true when only the first character in the string is capitalized', () => {
      expect(isCapitalized('Bob')).toBe(true);
    });

    it('returns false when the first character in the string is NOT capitalized', () => {
      expect(isCapitalized('bob')).toBe(false);
    });

    it('returns false when the first character in the string is not the only capitalized letter', () => {
      expect(isCapitalized('BoB')).toBe(false);
    });
  });

  describe('isLowerCase', () => {
    it('returns true when all letters are lower case', () => {
      expect(isLowerCase('bob')).toBe(true);
    });

    it('returns false if any letter is NOT lower case', () => {
      expect(isLowerCase('bOb')).toBe(false);
    });
  });

  describe('isUpperCase', () => {
    it('returns true when all letters are upper case', () => {
      expect(isUpperCase('BOB')).toBe(true);
    });

    it('returns false if any letter is NOT lower case', () => {
      expect(isLowerCase('BoB')).toBe(false);
    });
  });

  describe('lengthAtLeast', () => {
    it('returns a function that itself will return true if the string given is at least 5 characters long', () => {
      const isLengthAtLeast5 = lengthAtLeast(5);
      expect(isLengthAtLeast5('xxxxx')).toBe(true);
      expect(isLengthAtLeast5('xxxxxx')).toBe(true);
    });

    it('returns a function that itself will return false if the string given is less than 5 characters long', () => {
      const isLengthAtLeast5 = lengthAtLeast(5);
      expect(isLengthAtLeast5('xxxx')).toBe(false);
    });
  });

  describe('splitAt', () => {
    it('returns a function that splits a string at the c character', () => {
      const splitAtC = splitAt('c');
      expect(splitAtC('abcabcab')).toEqual(['ab', 'ab', 'ab']);
    });
  });

  describe('trim', () => {
    it('removes the leading and trailing white space and line terminator characters from a string', () => {
      expect(trim(' abc ')).toEqual('abc');
    });
  });

  describe('trimStart', () => {
    it('removes the leading white space and line terminator characters from a string', () => {
      expect(trimStart(' abc')).toEqual('abc');
    });
  });

  describe('trimEnd', () => {
    it('removes the trailing white space and line terminator characters from a string', () => {
      expect(trimEnd('abc ')).toEqual('abc');
    });
  });
});
