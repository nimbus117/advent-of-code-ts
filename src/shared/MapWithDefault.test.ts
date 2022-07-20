import { MapWithDefault } from './';

describe('shared', () => {
  describe('MapWithDefault', () => {
    const testMap = new MapWithDefault(0, [['key1', 1]]);

    it('returns the default value if the given key does not exist', () => {
      expect(testMap.get('blah')).toBe(0);
    });

    it('returns the correct value if the given key does exist', () => {
      expect(testMap.get('key1')).toBe(1);
    });

    it('returns the default value when getDefault is called', () => {
      expect(testMap.getDefault()).toBe(0);
    });

    it('updates the default value when setDefault is called', () => {
      testMap.setDefault(5);
      expect(testMap.getDefault()).toBe(5);
    });
  });
});
