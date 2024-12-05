import { pipe } from '../Function';
import { MapWithDefault } from '../Map';
import { isEven } from '../Number';
import {
  every,
  some,
  chunk,
  filter,
  find,
  first,
  flat,
  flatMap,
  fromIterable,
  groupBy,
  includes,
  join,
  last,
  map,
  range,
  reduce,
  reduceI,
  reverse,
  slice,
  sort,
  transpose,
} from '.';

describe('shared.Array', () => {
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

  describe('first', () => {
    it('should return the first item in an array', () => {
      expect(first([1, 2, 3, 4, 5])).toEqual(1);
      expect(first(['a', 'b', 'c', 'd', 'e'])).toEqual('a');
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

    it('should return an array of ascending numbers from 1 to the given number', () => {
      expect(range(5)).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('map', () => {
    it('should double each number in the array', () => {
      const double = map((x: number) => x * 2);
      expect(double([1, 2, 3, 4])).toEqual([2, 4, 6, 8]);
    });

    it('should replace values in the array by doing a lookup against the Map', () => {
      const replaceMap = new MapWithDefault('z', [
        ['a', 'x'],
        ['b', 'y'],
      ]);
      const replace = map(replaceMap.get, replaceMap);
      expect(replace(['a', 'b', 'c'])).toEqual(['x', 'y', 'z']);
    });
  });

  describe('filter', () => {
    it('should filter out all odd numbers', () => {
      const filterEven = filter(isEven);
      expect(filterEven([1, 2, 3, 4])).toEqual([2, 4]);
    });

    it('should filter values in the array that are in the Set', () => {
      const letters = new Set(['a', 'b']);
      const filterLetters = filter(letters.has, letters);
      expect(filterLetters(['a', 'b', 'c'])).toEqual(['a', 'b']);
    });
  });

  describe('reduce', () => {
    it('should concatenate the characters in the array into a single string', () => {
      const concat = reduce<string>((a, b) => a + b);
      expect(concat(['a', 'b', 'c'])).toEqual('abc');
    });
  });

  describe('reduceWithInitialValue', () => {
    it('should return a count of the number of "z" characters in the array', () => {
      const countZ = reduceI((a, b) => (b === 'z' ? a + 1 : a), 0);
      expect(countZ(['a', 'z', 'b', 'z', 'c', 'z'])).toEqual(3);
    });
  });

  describe('any', () => {
    it('should return true if any values in the array are even', () => {
      const areAnyEven = some(isEven);
      expect(areAnyEven([1, 2, 3, 4])).toEqual(true);
    });

    it('should return false if none of the values in the array are even', () => {
      const areAnyEven = some(isEven);
      expect(areAnyEven([1, 3, 5])).toEqual(false);
    });

    it('should return true if any values in the array can be found in the set', () => {
      const letters = new Set(['a', 'b']);
      const hasAnyLetters = some(letters.has, letters);
      expect(hasAnyLetters(['a', 'b', 'c'])).toEqual(true);
    });
  });

  describe('all', () => {
    it('should return true if all values in the array are even', () => {
      const areAllEven = every(isEven);
      expect(areAllEven([2, 4, 6, 8])).toEqual(true);
    });

    it('should return false if any of the values in the array are NOT even', () => {
      const areAllEven = every(isEven);
      expect(areAllEven([2, 4, 5, 8])).toEqual(false);
    });

    it('should return true if all values in the array can be found in the set', () => {
      const letters = new Set(['a', 'b', 'c']);
      const hasAllLetters = every(letters.has, letters);
      expect(hasAllLetters(['a', 'b', 'c'])).toEqual(true);
    });
  });

  describe('flat', () => {
    it('should flatten the array', () => {
      expect(flat()([[1], [2], [3], [4], [5]])).toEqual([1, 2, 3, 4, 5]);
    });

    it('should flatten the array up to the specified depth', () => {
      expect(flat(2)([[[1]], [[2]], [[3]], [[4]], [[5]]])).toEqual([
        1, 2, 3, 4, 5,
      ]);
    });
  });

  describe('flatMap', () => {
    it('should double the number in each sub array and then flatten the array', () => {
      const double = flatMap((x: number[]) => [x[0] * 2]);
      expect(double([[1], [2], [3], [4]])).toEqual([2, 4, 6, 8]);
    });

    it('should replace values in the array by doing a lookup against the Map and then flatten the array', () => {
      const replaceMap = new MapWithDefault('z', [
        ['a', 'x'],
        ['b', 'y'],
      ]);
      const replace = flatMap(
        (x: string[]) => [replaceMap.get(x[0])],
        replaceMap
      );
      expect(replace([['a'], ['b'], ['c']])).toEqual(['x', 'y', 'z']);
    });
  });

  describe('join', () => {
    it('adds all of the elements in the array into a string sperated by commas', () => {
      expect(join()([1, 2, 3, 4, 5])).toEqual('1,2,3,4,5');
    });

    it('adds all of the elements in the array into a string', () => {
      expect(join('')([1, 2, 3, 4, 5])).toEqual('12345');
    });

    it('adds all of the elements in the array into a string sperated by "->"', () => {
      expect(join('->')([1, 2, 3, 4, 5])).toEqual('1->2->3->4->5');
    });
  });

  describe('fromIterable', () => {
    it('takes a Map and returns an array of key value pairs', () => {
      const map = new Map([
        [1, 'a'],
        [2, 'b'],
      ]);
      expect(fromIterable(map)).toEqual([
        [1, 'a'],
        [2, 'b'],
      ]);
    });

    it('takes a Set and returns an array of values', () => {
      const set = new Set([1, 2, 3, 4]);
      expect(fromIterable(set)).toEqual([1, 2, 3, 4]);
    });

    it('takes a string and returns an array of characters', () => {
      expect(fromIterable('abcd')).toEqual(['a', 'b', 'c', 'd']);
    });
  });

  describe('sort', () => {
    it('sorts the array using the default method', () => {
      expect(sort()([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    it('sorts the array using the given sort function', () => {
      expect(
        sort((a: number, b: number) => (a < b ? 1 : -1))([1, 2, 3, 4, 5])
      ).toEqual([5, 4, 3, 2, 1]);
    });

    it('does not mutate the original array when sorting', () => {
      const arr = [5, 4, 3, 2, 1];

      expect(sort()(arr)).toEqual([1, 2, 3, 4, 5]);
      expect(arr).toEqual([5, 4, 3, 2, 1]);
    });
  });

  describe('reverse', () => {
    it('reverses the array', () => {
      expect(reverse([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    it('does not mutate the original array when reversing', () => {
      const arr = [5, 4, 3, 2, 1];

      expect(reverse(arr)).toEqual([1, 2, 3, 4, 5]);
      expect(arr).toEqual([5, 4, 3, 2, 1]);
    });
  });

  describe('slice', () => {
    it('returns a copy of the array', () => {
      expect(slice()([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    it('returns a copy of the section of the array from index 2', () => {
      expect(slice(2)([1, 2, 3, 4, 5])).toEqual([3, 4, 5]);
    });

    it('returns a copy of the section of the array from index 2 to index 4 (exclusive)', () => {
      expect(slice(2, 4)([1, 2, 3, 4, 5])).toEqual([3, 4]);
    });
  });

  describe('includes', () => {
    it('should return true', () => {
      expect(includes(5)([5, 4, 3, 2, 1])).toBe(true);
    });

    it('should return false', () => {
      expect(includes(6)([5, 4, 3, 2, 1])).toBe(false);
    });
  });

  describe('find', () => {
    it('should find the first even number', () => {
      const findFirstEven = find(isEven);
      expect(findFirstEven([1, 2, 3, 4])).toEqual(2);
    });

    it('should return undefined when no element can be found that matches the predicate', () => {
      const findFirstEven = find(isEven);
      expect(findFirstEven([1, 3, 5, 7])).toEqual(undefined);
    });

    it('should return the first element in the array that is in the set', () => {
      const letters = new Set(['b', 'c']);
      const findFirstLetter = find(letters.has, letters);
      expect(findFirstLetter(['a', 'b', 'c'])).toEqual('b');
    });
  });

  describe('chunk', () => {
    it('should chunk the array into sub-arrays of length 2', () => {
      expect(chunk(2)([5, 4, 3, 2, 1, 0])).toEqual([
        [5, 4],
        [3, 2],
        [1, 0],
      ]);
    });

    it('should chunk the array into 5 arrays of 20', () => {
      const chunks = chunk(20)(range(100));
      expect(chunks).toHaveLength(5);
      chunks.forEach((chunk) => expect(chunk).toHaveLength(20));
    });

    it('should chunk the array into sub-arrays of length 3 with the last array only containing 2 numbers', () => {
      expect(chunk(3)([5, 4, 3, 2, 1])).toEqual([
        [5, 4, 3],
        [2, 1],
      ]);
    });
  });

  describe('groupBy', () => {
    it('should group the people by age', () => {
      const people = [
        { name: 'Kevin R', age: 25 },
        { name: 'Susan S', age: 18 },
        { name: 'Julia J', age: 18 },
        { name: 'Sarah C', age: 25 },
      ];

      const grouped = pipe(people)._(groupBy((i) => i.age)).$;

      expect(grouped).toEqual({
        '18': [
          { age: 18, name: 'Susan S' },
          { age: 18, name: 'Julia J' },
        ],
        '25': [
          { age: 25, name: 'Kevin R' },
          { age: 25, name: 'Sarah C' },
        ],
      });
    });
  });
});
