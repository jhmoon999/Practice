//* July 22: Binary Tree Zigzag Level Order Traversal

// Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).

// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
//
// return its zigzag level order traversal as:
// [
//   [3],
//   [20,9],
//   [15,7]
// ]

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
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
// BFS using a queue - Time: O(n), Space: O(n)
    if (root === null) return [];
    let currLvl = [root], nextLvl = [];
    // reverse boolean will switch every level
    let zigzag = [], temp = [], reverse = false;
    while (currLvl.length > 0) {
        currLvl.forEach(node => {
            if (reverse) temp.unshift(node.val);    // right to left
            else temp.push(node.val);               // left to right
            if (node.left !== null) nextLvl.push(node.left);
            if (node.right !== null) nextLvl.push(node.right);
        });
        zigzag.push(temp);
        // reset for next iteration or level
        temp = [];
        currLvl = nextLvl;
        nextLvl = [];
        reverse = !reverse;
    }
    return zigzag;
};