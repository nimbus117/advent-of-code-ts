export type Pipe<Input> = {
  /**
   * Add the next function to the pipeline.
   *
   * @returns a new pipe object.
   */
  _: <Output>(fn: (input: Input) => Output) => Pipe<Output>;

  /**
   * Add a side effect function to the pipeline. The current input is passed to
   * the side effect function and also returned for the next function in the
   * pipeline.
   *
   * @returns a new pipe object.
   */
  __: (fn: (input: Input) => void) => Pipe<Input>;

  /**
   * Log out the input at this stage in the pipeline. The current input is
   * passed to the optional log format function and also returned for the next
   * function in the pipeline.
   *
   * @returns a new pipe object.
   */
  log: (fn?: (input: Input) => unknown) => Pipe<Input>;

  /*
   * Access the result and end the pipeline.
   */
  $: Input;
};

/**
 * Returns a new pipe object {@link Pipe} to start a pipeline of functions.
 *
 * @param input - the initial input for the pipeline.
 * @returns a new pipe object.
 *
 * @example
 * Here's a simple example:
 * ```
 * // Prints "32":
 * const sum = (x: number[]) => x.reduce((a, b) => a + b);
 * const add1 = (x: number) => x + 1;
 * const multiplyBy2 = (x: number) => x * 2;
 *
 * const result = pipe([1, 2, 3, 4, 5])
 *   ._(sum)
 *   ._(add1)
 *   ._(multiplyBy2)
 *   ._((x) => x.toString()).$;
 *
 * console.log(result);
 * ```
 */
export const pipe = <Input>(input: Input): Pipe<Input> => {
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
