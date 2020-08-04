//* LC 110: Balanced Binary Tree

// Given a binary tree, determine if it is height-balanced.

// For this problem, a height-balanced binary tree is defined as:
// a binary tree in which the left and right subtrees of every node differ in height by no more than 1.

// Example 1:
// Given the following tree [3,9,20,null,null,15,7]:
//
//     3
//    / \
//   9  20
//     /  \
//    15   7
//
// Return true.

// Example 2:
// Given the following tree [1,2,2,3,3,null,null,4,4]:
//
//        1
//       / \
//      2   2
//     / \
//    3   3
//   / \
//  4   4
//
// Return false.

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
 * @return {boolean}
 */
var isBalanced = function(root) {
// DFS traverse through the binary tree, getting the depth of left subtree and 
// depth of right subtree. If depth = -1 at any node, then the entire tree is 
// not balanced and -1 will be returned back up to the first execution context.
// Time: O(n) - traverse through all nodes if tree is balanced
// Space: O(n) - recursive stack
    
    // helper function that returns the difference in depth between a node's
    // left and right subtrees or -1 if subtree is not balanced
    const depthDiff = function(root) {
        
        // if node is null, then both left and right subtrees have a depth of 0
        if (root === null) return 0;
        
        // if depth of left subtree is -1, then the entire tree is not balanced
        const leftDepth = depthDiff(root.left);
        if (leftDepth === -1) return -1;    // return -1 to previous execution
        
        // if depth of right subtree is -1, then the entire tree is not balanced
        const rightDepth = depthDiff(root.right);
        if (rightDepth === -1) return -1;   // return -1 to previous execution
        
        // if both leftDepth and rightDepth are valid, then check if depths 
        // differ by more than 1. If so, then everything below current node   
        // is not balanced, which means the entire tree is not balanced
        if (Math.abs(leftDepth - rightDepth) > 1) return -1;
        
        // otherwise, return the larger of depths (+ 1 to include current node)
        return Math.max(leftDepth, rightDepth) + 1;
    }
    
    // as long as depthDiff(root) is not -1, then the entire tree is balanced
    return depthDiff(root) !== -1;


// For each node, get the depth of left and right subtree and check if they
// differ by more than 1.
// Time: O(nlog(n)) - for each node, we get the depth of left and right 
// subtree which is O(log(n)) process. The time complexity could reach O(n^2)
// if the tree is very unbalanced and looks like a linked list.
// Space: O(n) - recursive stack
    // const findDepth = function(root) {
    //     if (root === null) return 0;
    //     return Math.max(findDepth(left), findDepth(right)) + 1;
    // }
    // if (root === null) return true;
    // const leftDepth = findDepth(root.left);
    // const rightDepth = findDepth(root.right);
    // return Math.abs(leftDepth - rightDepth) <= 1
    //     && isBalanced(root.left)
    //     && isBalanced(root.right);
};