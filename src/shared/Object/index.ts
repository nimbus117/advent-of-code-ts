import { pipe } from '../Function';

type Obj = Record<string, unknown>;
type ObjEntry = [string, unknown];
type ObjEntries = ObjEntry[];
type ObjKey<T> = Exclude<keyof T, symbol>;
type Mode = 'omit' | 'pick';

const createEntriesFilter =
  (keys: (string | number)[], mode: Mode) => (entries: ObjEntries) => {
    const keysSet = new Set(keys.map(String));
    return entries.filter(([key]) =>
      mode === 'omit' ? !keysSet.has(key) : keysSet.has(key)
    );
  };

export const pick = <T extends Obj, K extends ObjKey<T>>(
  object: T,
  keys: K[]
): Pick<T, K> =>
  pipe(object)
    .$(Object.entries)
    .$(createEntriesFilter(keys, 'pick'))
    .$(Object.fromEntries)
    .value();

export const omit = <T extends Obj, K extends ObjKey<T>>(
  object: T,
  keys: K[]
): Omit<T, K> =>
  pipe(object)
    .$(Object.entries)
    .$(createEntriesFilter(keys, 'omit'))
    .$(Object.fromEntries)
    .value();
