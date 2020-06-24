//* LC 104: Maximum Depth of Binary Tree

// Given a binary tree, find its maximum depth.
// The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
// Note: A leaf is a node with no children.

// Example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its depth = 3.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
// One liner that does the same thing as below
    return root === null ? 0 :
        Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;

// Using helper function + closure
    // const findMaxDepth = function(root) {
    //     depthMax = Math.max(depthMax, depthCurr);
    //     if (root.left !== null) {
    //         depthCurr += 1;
    //         findMaxDepth(root.left);
    //         depthCurr -= 1;
    //     }
    //     if (root.right !== null) {
    //         depthCurr += 1;
    //         findMaxDepth(root.right);
    //         depthCurr -= 1;
    //     }
    // }
    // if (root === null) return 0;
    // let depthCurr = 1, depthMax = 1;
    // findMaxDepth(root);
    // return depthMax;
};