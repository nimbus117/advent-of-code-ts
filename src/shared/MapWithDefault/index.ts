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
