import { omit, pick, get, isObject } from '.';
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

  describe('isObject', () => {
    it('should return true if the input is an object', () => {
      expect(isObject({ 1: 1, test: 'test' })).toEqual(true);
    });

    it('should return true if the input is an empty object', () => {
      expect(isObject({})).toEqual(true);
    });

    it('should return false if the input is an array', () => {
      expect(isObject([])).toEqual(false);
    });

    it('should return false if the input is a Map', () => {
      expect(isObject(new Map())).toEqual(false);
    });

    it('should return false if the input is a Set', () => {
      expect(isObject(new Set())).toEqual(false);
    });
  });
});
