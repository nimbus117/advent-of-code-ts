/* eslint-disable @typescript-eslint/no-explicit-any */

type FunctionWithArgs = (...args: any[]) => any;

type Curried<T extends FunctionWithArgs> = <P extends any[]>(
  ...args: P
) => Parameters<T> extends [...P, ...infer S]
  ? S extends []
    ? ReturnType<T>
    : Curried<(...args: S) => ReturnType<T>>
  : never;

export function curry<T extends FunctionWithArgs>(fn: T): Curried<T> {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...args2: any[]) => curried(...args, ...args2);
  };
}
