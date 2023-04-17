import Node from './Node';
import {
  CompareFn,
  ConstructorArgs,
  DepthFirstOrder,
  Direction,
  DuplicateFn,
} from './Types';

export default class Tree<T> {
  private _compareFn: CompareFn<T>;
  private _duplicateFn: DuplicateFn<T> = () => false;
  private _root?: Node<T>;

  constructor(args: ConstructorArgs<T>) {
    this._compareFn = args.compareFn;
    if (args.rootValue) this._root = new Node(args.rootValue);
    if (args.duplicateFn) this._duplicateFn = args.duplicateFn;
  }

  public get root() {
    return this._root;
  }

  public clear() {
    this._root = undefined;
  }

  public add(value: T) {
    if (!this._root) {
      this._root = new Node(value);
    } else {
      const stack: Node<T>[] = [this._root];

      while (stack.length > 0) {
        const currentNode = stack[0];
        stack.pop();

        const { gt, lt } = this.compare(value, currentNode.value);
        const addToNode = (direction: Direction) => {
          const newNode = currentNode[direction];
          if (newNode) stack.push(newNode);
          else currentNode[direction] = new Node(value);
        };

        if (gt) addToNode('right');
        else if (lt) addToNode('left');
        else this._duplicateFn(value, currentNode, addToNode);
      }
    }
  }

  public traverseBreadthFirst() {
    const visited: T[] = [];

    if (this._root) {
      const queue: Node<T>[] = [this._root];

      while (queue.length > 0) {
        const current = queue[0];
        queue.shift();
        visited.push(current.value);

        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }

    return visited;
  }

  public traverseDepthFirst(order: DepthFirstOrder) {
    const visited: T[] = [];

    const traverseFn = {
      pre: (node: Node<T>) => {
        visited.push(node.value);
        if (node.left) traverseFn(node.left);
        if (node.right) traverseFn(node.right);
      },
      post: (node: Node<T>) => {
        if (node.left) traverseFn(node.left);
        if (node.right) traverseFn(node.right);
        visited.push(node.value);
      },
      in: (node: Node<T>) => {
        if (node.left) traverseFn(node.left);
        visited.push(node.value);
        if (node.right) traverseFn(node.right);
      },
    }[order];

    if (this._root) traverseFn(this._root);

    return visited;
  }

  public find(value: T): Node<T> | null {
    if (this._root) {
      const stack: Node<T>[] = [this._root];

      while (stack.length > 0) {
        const currentNode = stack[0];
        stack.pop();

        const { gt, lt } = this.compare(value, currentNode.value);
        const look = (direction: Direction) => {
          const newNode = currentNode[direction];
          if (newNode) stack.push(newNode);
        };

        if (gt) look('right');
        else if (lt) look('left');
        else return currentNode;
      }
    }

    return null;
  }

  public contains(value: T): boolean {
    return !!this.find(value);
  }

  private compare(valueA: T, valueB: T) {
    const comparison = this._compareFn(valueA, valueB);

    return {
      eq: comparison === 0,
      gt: comparison > 0,
      lt: comparison < 0,
    };
  }
}
