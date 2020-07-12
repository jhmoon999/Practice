//* July 2: Binary Tree Level Order Traversal II

// Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).

// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its bottom-up level order traversal as:
// [
//   [15,7],
//   [9,20],
//   [3]
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
var levelOrderBottom = function(root) {
    const ans = [];
    if (root === null) return ans;
    let currLvl = [root], nextLvl = [], temp = [];
    while (currLvl.length > 0) {
        // for every node in current level, push its value into
        // temp array and its children into next level array
        currLvl.forEach(node => {
            temp.push(node.val);
            if (node.left !== null) nextLvl.push(node.left);
            if (node.right !== null) nextLvl.push(node.right);
        });
        // unshift for bottom up level order (push for top down)
        ans.unshift(temp);
        // once the current level is depleted, set current level
        // to the next level, and reset next level and temp array
        currLvl = nextLvl;
        nextLvl = [];
        temp = [];
    }
    return ans;
};