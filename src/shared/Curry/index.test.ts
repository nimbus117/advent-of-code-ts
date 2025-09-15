import { curry } from '.';

describe('shared.Curry', () => {
  const add = (a: number, b: number): number => a + b;

  const curriedAdd = curry(add);

  const addThree = (a: number, b: number, c: number): number => a + b + c;

  const curriedAddThree = curry(addThree);

  it('should correctly add two numbers when called directly', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should correctly add two numbers when curried', () => {
    expect(curriedAdd(1)(2)).toBe(3);
  });

  it('should correctly add three numbers when curried with separate arguments', () => {
    expect(curriedAddThree(1)(2)(3)).toBe(6);
  });

  it('should correctly add three numbers when curried with mixed arguments', () => {
    expect(curriedAddThree(1, 2)(3)).toBe(6);
  });

  it('should correctly add three numbers when curried with all arguments at once', () => {
    expect(curriedAddThree(1, 2, 3)).toBe(6);
  });
});
