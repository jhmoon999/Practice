//* June 1: Invert a binary tree

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
 * @return {TreeNode}
 */
var invertTree = function(root) {
// Iterative solution slightly faster than recursive because it
// doesn't require multiple function calls. Both technically
// have O(n) time complexity and O(n) space complexity.
    
// Iterative solution with BFS
    if (root === null) return null;
    const queue = [root];
    let i = 0, node;
    while (i < queue.length) {
        node = queue[i];
        [node.left, node.right] = [node.right, node.left];
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
        i += 1;
    }
    return root;
    
// Recursive solution with DFS
    // if (root === null) return root;
    // if (root.left !== null) invertTree(root.left);
    // if (root.right !== null) invertTree(root.right);
    // [root.left, root.right] = [root.right, root.left];
    // return root;
};