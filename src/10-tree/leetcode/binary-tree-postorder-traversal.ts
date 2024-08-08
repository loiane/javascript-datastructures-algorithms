// https://leetcode.com/problems/binary-tree-postorder-traversal/description/
// 145. Binary Tree Postorder Traversal

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

function postorderTraversal(root: TreeNode | null): number[] {
  // Recursive
  //if (!root) return [];
  //return [...postorderTraversal(root.left), ...postorderTraversal(root.right), root.val]; 

  // Iterative
  const stack: TreeNode[] = [];
  const result: number[] = [];
  let current = root;
  let lastVisited: TreeNode | null = null;
  while (stack.length !== 0 || current !== null) {
    if (current) {
      stack.push(current)
      current = current.left;
    } else {
      const peek = stack[stack.length - 1];
      if (peek.right && peek.right !== lastVisited) {
        current = peek.right;
      } else {
        result.push(peek.val);
        lastVisited = stack.pop();
      }
    }
  }
  return result;
};

// Time complexity: O(n)
// Space complexity: O(n) (worst case) - O(log n) (average case)