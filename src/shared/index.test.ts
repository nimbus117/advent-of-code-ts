import { length } from '.';

describe('shared', () => {
  describe('length', () => {
    it('should return the length of the array', () => {
      expect(length([1, 2, 3, 4, 5])).toEqual(5);
    });

    it('should return the length of the string', () => {
      expect(length('abcde')).toEqual(5);
    });
  });
});
