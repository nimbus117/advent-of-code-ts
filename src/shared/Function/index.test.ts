import { allTrue, anyTrue } from '.';
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
      expect(['James', 'SaM', 'bob', 'Jo', 'A'].filter(isName)).toMatchObject([
        'James',
        'Jo',
      ]);
    });
  });
});
