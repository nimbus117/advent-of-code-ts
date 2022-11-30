import MapWithDefault from '.';

describe('shared', () => {
  describe('MapWithDefault', () => {
    const testMap = new MapWithDefault(0, [
      ['key1', 1],
      ['key2', 2],
    ]);

    it('returns the default value if the given key DOES NOT exist', () => {
      expect(testMap.get('blah')).toBe(0);
    });

    it('returns the correct value if the given key DOES exist', () => {
      expect(testMap.get('key1')).toBe(1);
    });

    it('returns the default value', () => {
      expect(testMap.defaultValue).toBe(0);
    });

    it('sets the default value', () => {
      testMap.defaultValue = 5;
      expect(testMap.get('test')).toBe(5);
    });

    it('creates an empty map with the default set', () => {
      const emptyMap = new MapWithDefault('default value');
      expect(emptyMap.get('test')).toBe('default value');
    });
  });
});
