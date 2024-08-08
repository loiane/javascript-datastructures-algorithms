// https://leetcode.com/problems/binary-tree-inorder-traversal/
// 94. Binary Tree Inorder Traversal

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

function inorderTraversal(root: TreeNode | null): number[] {
  // Recursive
  //if (!root) return [];
  //return [...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)]; 

  // Iterative
  const stack: TreeNode[] = [];
  const result: number[] = [];
  let current = root;
  while (stack.length !== 0 || current !== null) {
    if (current) {
      stack.push(current)
      current = current.left;
    } else {
      current = stack.pop();
      result.push(current.val);
      current = current.right;
    }
  }
  return result;
};

// Time complexity: O(n)
// Space complexity: O(n) (worst case) - O(log n) (average case)
