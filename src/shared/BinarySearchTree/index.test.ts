import { CompareFn, Node, Tree, basicCompare } from '.';
import { DuplicateFn } from './Types';

/*
 *              10
 *             /  \
 *            6   15
 *          /  \  / \
 *         3   8 11 20
 *        /
 *       0
 */
const basicTree = new Tree<number>({ compareFn: basicCompare });
[10, 6, 15, 3, 8, 11, 20, 0].forEach((x) => basicTree.add(x));

describe('shared.BinarySearchTree', () => {
  describe('Tree', () => {
    it('should return the root node', () => {
      expect(basicTree.root).toBeInstanceOf(Node);
      expect(basicTree.root?.value).toEqual(10);
    });

    it('should not add a duplicate value by default', () => {
      basicTree.add(0);
      expect(basicTree.traverseDepthFirst('in')).toHaveLength(8);
    });

    it('should return the correct order for a breadth first traversal', () => {
      expect(basicTree.traverseBreadthFirst()).toEqual([
        10, 6, 15, 3, 8, 11, 20, 0,
      ]);
    });

    it('should return the correct order for a pre order depth first traversal', () => {
      expect(basicTree.traverseDepthFirst('pre')).toEqual([
        10, 6, 3, 0, 8, 15, 11, 20,
      ]);
    });

    it('should return the correct order for a post order depth first traversal', () => {
      expect(basicTree.traverseDepthFirst('post')).toEqual([
        0, 3, 8, 6, 11, 20, 15, 10,
      ]);
    });

    it('should return the correct order for an in order depth first traversal', () => {
      expect(basicTree.traverseDepthFirst('in')).toEqual([
        0, 3, 6, 8, 10, 11, 15, 20,
      ]);
    });

    it('should return true when checking if the tree contains 8', () => {
      expect(basicTree.contains(8)).toEqual(true);
    });

    it('should return false when checking if the tree contains 5', () => {
      expect(basicTree.contains(5)).toEqual(false);
    });

    it('should find and return the node with the value 3', () => {
      const result = basicTree.find(3);
      expect(result).toBeInstanceOf(Node);
      expect(result?.value).toEqual(3);
    });

    it('should return null when it cannot find a node with the value 30', () => {
      const result = basicTree.find(30);
      expect(result).toEqual(null);
    });

    it('should find and return the node with the value {id:3}', () => {
      const compare: CompareFn<{ id: number }> = (newValue, currentValue) =>
        newValue.id - currentValue.id;

      const tree = new Tree({ compareFn: compare });

      [
        { id: 10 },
        { id: 6 },
        { id: 15 },
        { id: 3 },
        { id: 8 },
        { id: 11 },
        { id: 20 },
        { id: 0 },
      ].forEach((x) => tree.add(x));

      const result = tree.find({ id: 3 });

      expect(result).toBeInstanceOf(Node);
      expect(result?.value).toEqual({ id: 3 });
    });

    it('should set the root node if passed using the constructor', () => {
      const tree = new Tree<number>({
        compareFn: basicCompare,
        rootValue: 10,
      });
      expect(tree.root).toBeInstanceOf(Node);
      expect(tree.root?.value).toBe(10);
    });

    it('should clear the root node on the tree', () => {
      const tree = new Tree<number>({
        compareFn: basicCompare,
        rootValue: 10,
      });
      tree.clear();
      expect(tree.root).toBe(undefined);
    });

    it('should add a duplicate count to a node if a duplicate value is added when using a custom duplicateFn', () => {
      type TestType = { id: number; duplicateCount?: number };

      const compareFn: CompareFn<TestType> = (newValue, currentValue) =>
        newValue.id - currentValue.id;

      const duplicateFn: DuplicateFn<TestType> = (_, node) => {
        node.value.duplicateCount = (node.value.duplicateCount ?? 0) + 1;
      };

      const tree = new Tree({ compareFn, duplicateFn });

      [
        { id: 10 },
        { id: 6 },
        { id: 15 },
        { id: 6 },
        { id: 3 },
        { id: 6 },
        { id: 8 },
        { id: 3 },
      ].forEach((x) => tree.add(x));

      expect(tree.root).toEqual({
        left: {
          left: {
            left: undefined,
            right: undefined,
            value: {
              duplicateCount: 1,
              id: 3,
            },
          },
          right: {
            left: undefined,
            right: undefined,
            value: {
              id: 8,
            },
          },
          value: {
            duplicateCount: 2,
            id: 6,
          },
        },
        right: {
          left: undefined,
          right: undefined,
          value: {
            id: 15,
          },
        },
        value: {
          id: 10,
        },
      });
    });
  });

  describe('compareNumbers', () => {
    it('should return a positive number if the first value is greater than the second', () => {
      expect(basicCompare(5, 1)).toBe(1);
      expect(basicCompare('z', 'm')).toBe(1);
      expect(basicCompare(new Date('2024'), new Date('2022'))).toBe(1);
    });

    it('should return a negative number if the first value is less than the second', () => {
      expect(basicCompare(1, 5)).toBe(-1);
      expect(basicCompare('a', 'c')).toBe(-1);
      expect(basicCompare(new Date('2022'), new Date('2023'))).toBe(-1);
    });

    it('should return 0 if the values are equal', () => {
      expect(basicCompare(5, 5)).toBe(0);
      expect(basicCompare('e', 'e')).toBe(0);
      expect(basicCompare(new Date('2025'), new Date('2025'))).toBe(0);
    });
  });
});
