import { omit, pick, get } from '.';
import { pipe } from '../Function';

const obj = { 1: 1, 2: 2, x: 'x', y: 'y', [Symbol()]: 'symbol' };

describe('shared.Object', () => {
  describe('omit', () => {
    it('should omit the given properties', () => {
      const result = pipe(obj)
        ._(omit(['x', 2]))
        .$();
      expect(result).toEqual({ 1: 1, y: 'y' });
    });
  });

  describe('pick', () => {
    it('should pick the given properties', () => {
      const result = pipe(obj)
        ._(pick(['x', 2]))
        .$();
      expect(result).toEqual({ 2: 2, x: 'x' });
    });
  });

  describe('get', () => {
    it('should return the value of the "test" property', () => {
      const result = pipe({ test: 5 })._(get('test')).$();
      expect(result).toEqual(5);
    });

    it('should return the value of the "1" property', () => {
      const result = pipe({ 1: 5 })._(get(1)).$();
      expect(result).toEqual(5);
    });
  });
});
