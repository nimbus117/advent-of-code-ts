import { count, sum, multiply, isEven, isOdd, factorial, max, min } from '.';
import MapWithDefault from '../MapWithDefault';

describe('shared.Math', () => {
  describe('isEven', () => {
    it('returns true when the number is even', () => {
      expect(isEven(0)).toEqual(true);
      expect(isEven(2)).toEqual(true);
      expect(isEven(26)).toEqual(true);
      expect(isEven(5554)).toEqual(true);
    });

    it('returns false when the number is odd', () => {
      expect(isEven(1)).toEqual(false);
      expect(isEven(7.5)).toEqual(false);
      expect(isEven(27)).toEqual(false);
      expect(isEven(5555)).toEqual(false);
    });
  });

  describe('isOdd', () => {
    it('returns true when the number is odd', () => {
      expect(isOdd(1)).toEqual(true);
      expect(isOdd(7.5)).toEqual(true);
      expect(isOdd(27)).toEqual(true);
      expect(isOdd(5555)).toEqual(true);
    });

    it('returns false when the number is even', () => {
      expect(isOdd(0)).toEqual(false);
      expect(isOdd(2)).toEqual(false);
      expect(isOdd(26)).toEqual(false);
      expect(isOdd(5554)).toEqual(false);
    });
  });

  describe('sum', () => {
    it('should sum all the numbers in an array', () => {
      expect(sum([1, 2, 3, 4, 5])).toEqual(15);
    });
  });

  describe('multiply', () => {
    it('should multiply all the numbers in an array', () => {
      expect(multiply([1, 2, 3, 4, 5])).toEqual(120);
    });
  });

  describe('factorial', () => {
    it('should return the factorial of 7', () => {
      expect(factorial(7n)).toEqual(5040n);
    });

    it('should throw an error if the number is not an integer', () => {
      expect(() => factorial(BigInt(7.5))).toThrow(
        'The number 7.5 cannot be converted to a BigInt because it is not an integer'
      );
    });

    it('should throw an error if the number is not positive', () => {
      expect(() => factorial(-7n)).toThrow('Number must be positive');
    });

    it('should return 1 for factorial 0', () => {
      expect(factorial(0n)).toEqual(1n);
    });
  });

  describe('count', () => {
    it('should return the length of the array', () => {
      expect(count([1, 2, 3, 4, 5])).toEqual(5);
    });

    it('should return the length of the string', () => {
      expect(count('abcde')).toEqual(5);
    });

    it('should return the size of the Set', () => {
      expect(count(new Set([1, 2, 3, 4, 5]))).toEqual(5);
    });

    it('should return the size of the Map', () => {
      const map = new Map([
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
      ]);
      expect(count(map)).toEqual(5);
    });

    it('should return the size of the MapWithDefault', () => {
      const map = new MapWithDefault(0, [
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
      ]);
      expect(count(map)).toEqual(5);
    });
  });

  describe('max', () => {
    it('should return the largest number in the array', () => {
      expect(max([1, 2, 5, 4, 3])).toEqual(5);
    });
  });

  describe('min', () => {
    it('should return the smallest number in the array', () => {
      expect(min([1, 2, 5, 4, 3])).toEqual(1);
    });
  });
});
