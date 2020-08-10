//* LC 235: Lowest Common Ancestor of a Binary Search Tree

// Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

// Given binary search tree:  root = [6,2,8,0,4,7,9,null,null,3,5]
//           6
//        /     \
//       2       8
//      / \     / \       
//     0   4   7   9
//        / \
//       3   5

// Example 1:
// Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
// Output: 6
// Explanation: The LCA of nodes 2 and 8 is 6.

// Example 2:
// Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
// Output: 2
// Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
 
// Constraints:
// All of the nodes' values will be unique.
// p and q are different and both values will exist in the BST.

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
// Iterative
// Time: Same as recursive - O(log(n)) average, O(n) worse case
// Space: O(1) because iterative doesn't need a recursive stack
    let node = root;
    while (node !== null) {
        if (p.val < node.val && q.val < node.val) node = node.left;
        else if (p.val > node.val && q.val > node.val) node = node.right;
        // at this point, node.val is between p.val and q.val
        else return node;
    }
    return null;

// Recursive
// Time: O(log(n)) if tree is balanced, O(n) if tree is like linked list
// Space: O(n) because recursive stack can reach n nodes
    // if (p.val < root.val && q.val < root.val) 
    //     return lowestCommonAncestor(root.left, p, q);
    // if (p.val > root.val && q.val > root.val) 
    //     return lowestCommonAncestor(root.right, p, q);
    // // at this point, root.val is between p.val and q.val
    // return root;
};