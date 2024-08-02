export type Obj = Record<PropertyKey, unknown>;

export const pick =
  <T extends Obj, K extends keyof T>(keys: K[]) =>
  <O extends Pick<T, K>>(object: T): O =>
    keys.reduce(
      (newObject, key) => ({ ...newObject, [key]: object[key] }),
      {} as O
    );

export const omit =
  <T extends Obj, K extends keyof T>(keys: K[]) =>
  (object: T): Omit<T, K> => {
    const newObject = { ...object };
    keys.forEach((key) => delete newObject[key]);
    return newObject;
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
