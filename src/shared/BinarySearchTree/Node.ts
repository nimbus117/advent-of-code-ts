export default class Node<T> {
  value;
  left;
  right;

  constructor(value: T, left?: Node<T>, right?: Node<T>) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}
