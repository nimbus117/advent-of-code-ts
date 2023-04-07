export type Countable =
  | string
  | Array<unknown>
  | Map<unknown, unknown>
  | Set<unknown>;

export const count = <T extends Countable>(input: T) =>
  typeof input === 'string' || Array.isArray(input) ? input.length : input.size;
