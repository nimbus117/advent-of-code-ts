import { pipe } from '../Function';

type Obj = Record<string | number, unknown>;
type ObjEntry = [string, unknown];
type ObjEntries = ObjEntry[];
type ObjKey<T> = Exclude<keyof T, symbol>;
type Mode = 'omit' | 'pick';

const createEntriesFilter =
  (keys: (string | number)[], mode: Mode) => (entries: ObjEntries) => {
    const _keys = keys.map(String);
    return entries.filter(
      mode === 'omit'
        ? ([key]) => !_keys.includes(key)
        : ([key]) => _keys.includes(key)
    );
  };

export const pick =
  <T extends Obj, K extends ObjKey<T>>(keys: K[]) =>
  (object: T): Pick<T, K> =>
    pipe(object)
      ._(Object.entries)
      ._(createEntriesFilter(keys, 'pick'))
      ._(Object.fromEntries)
      .$();

export const omit =
  <T extends Obj, K extends ObjKey<T>>(keys: K[]) =>
  (object: T): Omit<T, K> =>
    pipe(object)
      ._(Object.entries)
      ._(createEntriesFilter(keys, 'omit'))
      ._(Object.fromEntries)
      .$();

export const get =
  <T extends Obj, K extends ObjKey<T>>(key: K) =>
  (object: T) =>
    object[key];
