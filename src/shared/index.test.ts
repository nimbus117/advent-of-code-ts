import {
  reducer,
  sum,
  multiply,
  transpose,
  last,
  range,
  isEven,
  isOdd,
} from './';

describe('shared', () => {
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

  describe('reducer', () => {
    it('returns a new function that concatenates strings', () => {
      expect(reducer<string>((a, b) => a + b)(['a', 'b', 'c'])).toEqual('abc');
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

  describe('transpose', () => {
    it('should flip the matrix over its diagonal', () => {
      expect(
        transpose([
          [1, 2, 3],
          [1, 2, 3],
          [1, 2, 3],
        ])
      ).toEqual([
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
      ]);
    });
  });

  describe('last', () => {
    it('should return the last item in an array', () => {
      expect(last([1, 2, 3, 4, 5])).toEqual(5);
      expect(last(['a', 'b', 'c', 'd', 'e'])).toEqual('e');
    });
  });

  describe('range', () => {
    it('should return an array of ascending numbers from the first to second argument', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return an array of descending numbers from the first to second argument', () => {
      expect(range(5, 1)).toEqual([5, 4, 3, 2, 1]);
    });
  });
});
