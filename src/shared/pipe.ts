export type Pipe<TInput> = {
  $<TOut>(fn: (input: TInput) => TOut): Pipe<TOut>;

  value: () => TInput;
};

export const pipe = <TInput>(input: TInput): Pipe<TInput> => {
  return {
    $: <TOut>(fn: (input: TInput) => TOut): Pipe<TOut> => {
      return pipe(fn(input));
    },

    value: () => input,
  };
};
