import Node from './Node';

export type AddToNode = (direction: Direction) => void;

export type CompareFn<T> = (valueA: T, valueB: T) => number;

export type ConstructorArgs<T> = {
  compareFn: CompareFn<T>;
  rootValue?: T;
  duplicateFn?: DuplicateFn<T>;
};

export type DepthFirstOrder = 'pre' | 'post' | 'in';

export type Direction = 'left' | 'right';

export type DuplicateFn<T> = (
  value: T,
  node: Node<T>,
  addToNode: AddToNode
) => void;
