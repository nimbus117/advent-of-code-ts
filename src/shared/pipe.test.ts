import { pipe, sum, isEven } from '.';

const add2 = (num: number) => num + 2;

describe('shared', () => {
  describe('pipe', () => {
    it('should return the result of summing the array, adding 2 and testing if the result is even', () => {
      const result = pipe([1, 2, 3, 4, 5, 6, 7])
        .$(sum)
        .$(add2)
        .$(isEven)
        .value();

      expect(result).toEqual(true);
    });
  });
});
