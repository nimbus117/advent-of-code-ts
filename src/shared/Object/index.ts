export type Obj = Record<PropertyKey, unknown>;

export const pick =
  <T extends Obj, K extends keyof T>(pickKeys: K[]) =>
  <O extends Pick<T, K>>(object: T): O =>
    pickKeys.reduce((acc, cur) => ({ ...acc, [cur]: object[cur] }), {} as O);

export const omit =
  <T extends Obj, K extends keyof T>(omitKeys: K[]) =>
  (object: T): Omit<T, K> => {
    const _object = { ...object };
    omitKeys.forEach((key) => delete _object[key]);
    return _object;
  };

export const get =
  <T extends Obj, K extends keyof T>(key: K) =>
  (object: T) =>
    object[key];

export const isObj = (input: unknown): input is Obj =>
  typeof input === 'object' &&
  !!input &&
  !Array.isArray(input) &&
  !(input instanceof Map) &&
  !(input instanceof Set);
