import { anyPass, allPass, pipe } from '.';
import { sum, isEven, isOdd } from '../Math';
import { isCapitalized, isLengthAtLeast } from '../String';

describe('shared.Function', () => {
  describe('anyPass', () => {
    const isForbidden = anyPass([(x: number) => x > 10, isOdd]);

    it('returns true if ANY function test returns true', () => {
      expect(isForbidden(5)).toBe(true);
      expect(isForbidden(12)).toBe(true);
    });

    it('returns false if all of the function tests return false', () => {
      expect(isForbidden(6)).toBe(false);
    });
  });

  describe('allPass', () => {
    const isName = allPass([isCapitalized, isLengthAtLeast(2)]);

    it('returns true if ALL function tests return true', () => {
      expect(isName('Bob')).toBe(true);
    });

    it('returns false if any of the function tests return false', () => {
      expect(isName('bob')).toBe(false);
      expect(isName('J')).toBe(false);
    });

    it('filters out all valid names from an array of strings', () => {
      expect(['James', 'SaM', 'bob', 'Jo', 'A'].filter(isName)).toMatchObject([
        'James',
        'Jo',
      ]);
    });
  });

  describe('pipe', () => {
    const add2 = (num: number) => num + 2;
    it('should return true when summing the array, adding 2 and testing if the result is even', () => {
      const result = pipe([1, 2, 3, 4, 5, 6, 7])._(sum)._(add2)._(isEven).$();

      expect(result).toEqual(true);
    });
  });
});
