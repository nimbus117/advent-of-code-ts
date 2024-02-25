import { get, isObj, omit, pick } from '.';
import { pipe } from '../Function';

const sy = Symbol();

const obj = { 1: 1, 2: 2, x: 'x', y: 'y', [sy]: 'symbol' };

describe('shared.Object', () => {
  describe('omit', () => {
    it('should omit the given properties', () => {
      const result = pipe(obj)._(omit(['x', 2])).$;
      expect(result).toEqual({ 1: 1, y: 'y', [sy]: 'symbol' });
    });
    it('should omit the symbol', () => {
      const result = pipe(obj)._(omit([sy])).$;
      expect(result).toEqual({ '1': 1, '2': 2, x: 'x', y: 'y' });
    });
  });

  describe('pick', () => {
    it('should pick the given properties', () => {
      const result = pipe(obj)._(pick(['x', 2])).$;
      expect(result).toEqual({ 2: 2, x: 'x' });
    });

    it('should pick the symbol', () => {
      const result = pipe(obj)._(pick([sy])).$;
      expect(result).toEqual({ [sy]: 'symbol' });
    });
  });

  describe('get', () => {
    it('should return the value of the "test" property', () => {
      const result = pipe(obj)._(get('x')).$;
      expect(result).toEqual('x');
    });

    it('should return the value of the "1" property', () => {
      const result = pipe(obj)._(get(1)).$;
      expect(result).toEqual(1);
    });

    it('should return the value of the symbol property', () => {
      expect(get(sy)(obj)).toEqual('symbol');
    });
  });

  describe('isObj', () => {
    it('should return true if the input is an object', () => {
      expect(isObj(obj)).toEqual(true);
    });

    it('should return true if the input is an empty object', () => {
      expect(isObj({})).toEqual(true);
    });

    it('should return true for a Date object', () => {
      expect(isObj(new Date())).toEqual(true);
    });

    it('should return false if the input is an array', () => {
      expect(isObj([])).toEqual(false);
    });

    it('should return false if the input is a Map', () => {
      expect(isObj(new Map())).toEqual(false);
    });

    it('should return false if the input is a Set', () => {
      expect(isObj(new Set())).toEqual(false);
    });

    it('should return false if the input is a string', () => {
      expect(isObj('string')).toEqual(false);
    });

    it('should return false if the input is a number', () => {
      expect(isObj(5)).toEqual(false);
    });

    it('should return false if the input is a symbol', () => {
      expect(isObj(Symbol())).toEqual(false);
    });
  });
});
