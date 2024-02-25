import { pipe } from '.';
import { isEven, sum } from '../Number';
import { map } from '../Array';

describe('shared.Function', () => {
  describe('pipe', () => {
    const add2 = (num: number) => num + 2;

    it('should call each function in turn, passing the output from each as input to the next', () => {
      const result = pipe(['1', '2', '3', '4', '5', '6', '7'])
        ._(map(Number))
        ._(sum)
        ._(add2)
        ._(isEven).$;

      expect(result).toEqual(true);
    });

    it('should call the sideEffect function without effecting the pipeline', () => {
      let value = 0;

      const sideEffect = (num: number) => (value = num);

      const result = pipe([1, 2, 3, 4, 5, 6, 7])
        ._(sum)
        ._(add2)
        .__(sideEffect)
        ._(isEven).$;

      expect(value).toEqual(30);
      expect(result).toEqual(true);
    });

    it('should log out the current value in the pipeline when using the log method', () => {
      const logSpy = jest.spyOn(global.console, 'log');

      const result = pipe(1)._(add2).log()._(add2).$;

      expect(logSpy.mock.calls).toContainEqual([3]);
      expect(result).toEqual(5);

      logSpy.mockRestore();
    });

    it('should log out the transformed value when passing a function', () => {
      const logSpy = jest.spyOn(global.console, 'log');

      const result = pipe(1)
        ._(add2)
        .log((x) => ({ label: x }))
        ._(add2).$;

      expect(logSpy.mock.calls).toContainEqual([{ label: 3 }]);
      expect(result).toEqual(5);

      logSpy.mockRestore();
    });
  });
});
