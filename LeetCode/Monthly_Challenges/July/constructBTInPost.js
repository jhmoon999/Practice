//* July 27: Construct Binary Tree from Inorder and Postorder Traversal

// Given inorder and postorder traversal of a tree, construct the binary tree.

// Note:
// You may assume that duplicates do not exist in the tree.

// For example, given
// inorder = [9,3,15,20,7]
// postorder = [9,15,7,20,3]
// Return the following binary tree:

//     3
//    / \
//   9  20
//     /  \
//    15   7

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    const nodeOrder = {};
    for (let i = 0; i < inorder.length; i++) {
        nodeOrder[inorder[i]] = i;
    }
    const recursive = function(start, end) {
        if (start > end) return null;
        let currVal = postorder.pop();
        let currNode = new TreeNode(currVal);
        currNode.right = recursive(nodeOrder[currVal] + 1, end);
        currNode.left = recursive(start, nodeOrder[currVal] - 1);
        return currNode;
    }
    return recursive(0, postorder.length - 1);
};