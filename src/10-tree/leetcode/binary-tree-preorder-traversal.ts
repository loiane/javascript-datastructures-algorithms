// https://leetcode.com/problems/binary-tree-preorder-traversal/
// 144. Binary Tree Preorder Traversal

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

function preorderTraversal(root: TreeNode | null): number[] {
  // Recursive
  //if (!root) return [];
  //return [root.val, ...preorderTraversal(root.left), ...preorderTraversal(root.right)];

  // Iterative
  const stack: TreeNode[] = [];
  const result: number[] = [];
  let current = root;
  while (stack.length !== 0 || current !== null) {
    if (current) {
      result.push(current.val);
      if (current.right) stack.push(current.right);
      current = current.left;
    } else {
      current = stack.pop();
    }
  }
  return result;
};

// Time complexity: O(n)
// Space complexity: O(n) (worst case) - O(log n) (average case)