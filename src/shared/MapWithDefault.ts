export class MapWithDefault<K, V> extends Map<K, V> {
  private default: V;

  constructor(defaultValue: V, entries: Iterable<readonly [K, V]>) {
    super(entries);
    this.default = defaultValue;
  }

  get(key: K): V {
    const value = super.get(key);
    return value !== undefined ? value : this.default;
  }

  getDefault(): V {
    return this.default;
  }

  setDefault(defaultValue: V): void {
    this.default = defaultValue;
  }
}
