// https://leetcode.com/problems/validate-binary-search-tree/description/
// 98. Validate Binary Search Tree

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

function isValidBST(root: TreeNode | null): boolean {
  return isValid(root, null, null);
}

function isValid(node: TreeNode | null, min: number | null, max: number | null): boolean {
  if (!node) return true;
  if (min !== null && node.val <= min) return false;
  if (max !== null && node.val >= max) return false;
  return isValid(node.left, min, node.val) && isValid(node.right, node.val, max);
}

