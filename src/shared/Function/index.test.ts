import { allTrue, anyTrue, repeat } from '.';
import { map } from '../Array';
import { isOdd } from '../Number';
import { isCapitalized, isLengthAtLeast } from '../String';

describe('shared.Function', () => {
  describe('anyPass', () => {
    const isForbidden = anyTrue([(x: number) => x > 10, isOdd]);

    it('returns true if ANY function test returns true', () => {
      expect(isForbidden(5)).toBe(true);
      expect(isForbidden(12)).toBe(true);
    });

    it('returns false if all of the function tests return false', () => {
      expect(isForbidden(6)).toBe(false);
    });
  });

  describe('allPass', () => {
    const isName = allTrue([isCapitalized, isLengthAtLeast(2)]);

    it('returns true if ALL function tests return true', () => {
      expect(isName('Bob')).toBe(true);
    });

    it('returns false if any of the function tests return false', () => {
      expect(isName('bob')).toBe(false);
      expect(isName('J')).toBe(false);
    });

    it('filters out all valid names from an array of strings', () => {
      expect(['James', 'SaM', 'bob', 'Jo', 'A'].filter(isName)).toEqual([
        'James',
        'Jo',
      ]);
    });
  });

  describe('repeat', () => {
    it('repeats the add1 function 100 times', () => {
      const add1 = (x: number) => x + 1;
      expect(repeat(100, add1)(0)).toBe(100);
    });

    it('repeats the add1 function 100 times for each number in the array', () => {
      const doubleChars = map((x: string) => x + x);
      expect(repeat(5, doubleChars)(['a', 'b', 'c'])).toStrictEqual([
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        'cccccccccccccccccccccccccccccccc',
      ]);
    });
  });
});
