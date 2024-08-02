type Entries<K, V> = Iterable<readonly [K, V]> | null;

export class MapWithDefault<K, V> extends Map<K, V> {
  defaultValue;

  constructor(defaultValue: V, entries?: Entries<K, V>) {
    super(entries);
    this.defaultValue = defaultValue;
  }

  get(key: K) {
    const value = super.get(key);
    return value === undefined ? this.defaultValue : value;
  }
}

export class MapWithError<K, V> extends Map<K, V> {
  constructor(entries?: Entries<K, V>) {
    super(entries);
  }

  get(key: K) {
    const value = super.get(key);
    if (value === undefined) throw new Error(`Could not find key: ${key}`);
    return value;
  }
}

export const keys = <K, V>(input: Map<K, V>) => [...input.keys()];

export const values = <K, V>(input: Map<K, V>) => [...input.values()];

export const entries = <K, V>(input: Map<K, V>) => [...input.entries()];
