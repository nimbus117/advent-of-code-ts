import { omit, pick } from '.';

const obj = { 1: 1, 2: 2, x: 'x', y: 'y', [Symbol()]: 'symbol' };

describe('shared.Object', () => {
  describe('omit', () => {
    it('should omit the given properties', () => {
      expect(omit(obj, ['x', 2])).toEqual({ 1: 1, y: 'y' });
    });
  });

  describe('pick', () => {
    it('should pick the given properties', () => {
      expect(pick(obj, ['x', 2])).toEqual({ 2: 2, x: 'x' });
    });
  });
});
