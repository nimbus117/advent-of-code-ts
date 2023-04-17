import { CompareFn } from './Types';

const basicCompare: CompareFn<number | string | Date> = <T>(
  newValue: T,
  currentValue: T
) => (newValue > currentValue ? 1 : newValue < currentValue ? -1 : 0);

export default basicCompare;
