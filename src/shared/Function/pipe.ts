export type Pipe<TIn> = {
  _: <TOut>(fn: (input: TIn) => TOut) => Pipe<TOut>;

  __: (fn: (input: TIn) => void) => Pipe<TIn>;

  log: (fn?: (input: TIn) => unknown) => Pipe<TIn>;

  $: TIn;
};

export const pipe = <TIn>(input: TIn): Pipe<TIn> => {
  return {
    _: (fn) => pipe(fn(input)),

    __: (fn) => {
      fn(structuredClone(input));
      return pipe(input);
    },

    log: (fn) => {
      console.log(fn ? fn(structuredClone(input)) : input);
      return pipe(input);
    },

    $: input,
  };
};
