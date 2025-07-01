export type Primitive = string | number | symbol;

export type TupleMut<
  T,
  N extends number,
  R extends unknown[] = []
> = R['length'] extends N ? R : TupleMut<T, N, [T, ...R]>;

export type Tuple<
  T,
  N extends number,
  R extends unknown[] = []
> = R['length'] extends N ? R : Readonly<Tuple<T, N, [T, ...R]>>;