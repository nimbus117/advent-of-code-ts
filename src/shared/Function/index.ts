type Pipe<TIn> = {
  $<TOut>(fn: (input: TIn) => TOut): Pipe<TOut>;

  value: () => TIn;
};

export const pipe = <TIn>(input: TIn): Pipe<TIn> => {
  return {
    $: <TOut>(fn: (input: TIn) => TOut): Pipe<TOut> => {
      return pipe(fn(input));
    },

    value: () => input,
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
