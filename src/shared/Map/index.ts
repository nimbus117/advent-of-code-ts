export class MapWithDefault<K, V> extends Map<K, V> {
  defaultValue;

  constructor(defaultValue: V, entries?: Iterable<readonly [K, V]>) {
    super(entries);
    this.defaultValue = defaultValue;
  }

  get(key: K) {
    return super.get(key) ?? this.defaultValue;
  }
}

export class MapWithError<K, V> extends Map<K, V> {
  constructor(entries?: Iterable<readonly [K, V]>) {
    super(entries);
  }

  get(key: K) {
    const _key = super.get(key);
    if (_key !== undefined) return _key;
    throw new Error(`Could not find key: ${key}`);
  }
}

export const keys = <K, V>(input: Map<K, V>) => [...input.keys()];

export const values = <K, V>(input: Map<K, V>) => [...input.values()];

export const entries = <K, V>(input: Map<K, V>) => [...input.entries()];
