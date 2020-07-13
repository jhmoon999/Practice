//* June 23: Count Complete Tree Nodes

// Given a complete binary tree, count the number of nodes.

// Note: Definition of a complete binary tree from Wikipedia:
// In a complete binary tree every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

// Example:

// Input: 
//     1
//    / \
//   2   3
//  / \  /
// 4  5 6

// Output: 6

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
var countNodes = function(root) {
// Compare depths of left and right subtrees - O(log(n)^2)
// If the left subtree has one layer more than right subtree, then can trim
// the entire right subtree. If left and right subtrees have the same depth,
// then we can trim the entire left subtree. Since we trim half the tree every 
// iteration, there are log(n) iterations. And finding the depth of a subtree
// is a log(n) process. So time complexity is O(log(n) * log(n)) = O(log(n)^2)
    
    const subtreeDepth = function(node, depth = 0) {
        if (node === null) return depth;
        return subtreeDepth(node.left, depth + 1);
    }
    
    let numNodes = 0, currNode = root, leftDepth, rightDepth;
    while (currNode !== null) {
        leftDepth = subtreeDepth(currNode.left); 
        rightDepth = subtreeDepth(currNode.right);
        
        // Suppose the depth of right subtree is 4 and the depth of left is 5.
        // You can infer that the right subtree is complete and can be trimmed
        // from the problem. The number of nodes in a complete subtree is 
        // 2^n - 1, where n is the depth. We also add 1 for the current root
        // of the subtree. So whenever we trim a subtree, we can add 
        // (2^n - 1) + 1 = 2^n to the total number of nodes.
        
        if (leftDepth > rightDepth) {
            numNodes += 2**rightDepth;
            currNode = currNode.left;
        }
        else {
            numNodes += 2**leftDepth;
            currNode = currNode.right;
        }
    }
    return numNodes;
    
// Traverse through all nodes in BST - O(n)
    // let nodes = 0;
    // if (root === null) return nodes;
    // const traverse = function(node) {
    //     nodes += 1;
    //     if (node.left) traverse(node.left);
    //     if (node.right) traverse(node.right);
    // }
    // traverse(root);
    // return nodes;
};