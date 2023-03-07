type Pipe<TIn> = {
  _<TOut>(fn: (input: TIn) => TOut): Pipe<TOut>;

  __: (fn: (input: TIn) => void) => Pipe<TIn>;

  log: () => Pipe<TIn>;

  $: () => TIn;
};

export const pipe = <TIn>(input: TIn): Pipe<TIn> => {
  return {
    _: <TOut>(fn: (input: TIn) => TOut) => {
      return pipe(fn(input));
    },

    __: (fn): Pipe<TIn> => {
      fn(input);
      return pipe(input);
    },

    log: () => {
      console.log(input);
      return pipe(input);
    },

    $: () => input,
  };
};
