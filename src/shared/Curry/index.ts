/* eslint-disable @typescript-eslint/no-explicit-any */
type Curried<T extends (...args: any[]) => any> = <P extends any[]>(
  ...args: P
) => Parameters<T> extends [...P, ...infer S]
  ? S extends []
    ? ReturnType<T>
    : Curried<(...args: S) => ReturnType<T>>
  : never;

export function curry<T extends (...args: any[]) => any>(fn: T): Curried<T> {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...args2: any[]) => curried(...args, ...args2);
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
