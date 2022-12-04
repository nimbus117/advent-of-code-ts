type Pipe<TIn> = {
  _<TOut>(fn: (input: TIn) => TOut): Pipe<TOut>;

  __: (fn: (input: TIn) => void) => Pipe<TIn>;

  $: () => TIn;
};

export const pipe = <TIn>(input: TIn): Pipe<TIn> => {
  return {
    _: <TOut>(fn: (input: TIn) => TOut): Pipe<TOut> => {
      return pipe(fn(input));
    },

    __: (fn: (input: TIn) => void): Pipe<TIn> => {
      fn(input);
      return pipe(input);
    },

    $: () => input,
  };
};

export const allPass =
  <T>(rules: ((x: T) => boolean)[]) =>
  (x: T): boolean =>
    rules.every((rule) => rule(x));

export const anyPass =
  <T>(rules: ((x: T) => boolean)[]) =>
  (x: T): boolean =>
    rules.some((rule) => rule(x));
