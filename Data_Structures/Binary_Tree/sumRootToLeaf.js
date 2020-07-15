//* June 26: Sum Root to Leaf Numbers

// Given a binary tree containing digits from 0-9 only, each root-to-leaf path could represent a number.
// An example is the root-to-leaf path 1->2->3 which represents the number 123.
// Find the total sum of all root-to-leaf numbers.
// Note: A leaf is a node with no children.

// Example 1:
// Input: [1,2,3]
//     1
//    / \
//   2   3
// Output: 25
// Explanation:
// The root-to-leaf path 1->2 represents the number 12.
// The root-to-leaf path 1->3 represents the number 13.
// Therefore, sum = 12 + 13 = 25.

// Example 2:
// Input: [4,9,0,5,1]
//     4
//    / \
//   9   0
//  / \
// 5   1
// Output: 1026
// Explanation:
// The root-to-leaf path 4->9->5 represents the number 495.
// The root-to-leaf path 4->9->1 represents the number 491.
// The root-to-leaf path 4->0 represents the number 40.
// Therefore, sum = 495 + 491 + 40 = 1026.

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
var sumNumbers = function(root) {
// BFS using a queue to store both current node and current number
// Time:  O(n) since we traverse entire tree for all root-to-leaf numbers
// Space: O(nlog(n)) since at most, queue will store the widest layer of
// leaves which is n/2 and each element can be a number of length log(n).
    // if (root === null) return 0;
    // // elements of the queue will be the node and current number combined
    // const queue = [[root, root.val]];
    // let sum = 0;
    // while (queue.length > 0) {
    //     let [currNode, currNum] = queue.shift();
    //     // at an end leaf, currNum has become a root-to-leaf number
    //     if (currNode.left === null && currNode.right === null) {
    //         sum += currNum;
    //     }
    //     // if left child exists, append its digit to currNum
    //     if (currNode.left !== null) {
    //         queue.push([currNode.left, currNum*10 + currNode.left.val]);
    //     }
    //     // if right child exists, append its digit to currNum
    //     if (currNode.right !== null) {
    //         queue.push([currNode.right, currNum*10 + currNode.right.val]);
    //     }
    // }
    // return sum;

// DFS using a stack to store digits encountered on one root-to-leaf path
// Time:  O(n) since we traverse entire tree for all root-to-leaf numbers
// Space: O(log(n)) since stack will contain all digits of only one path.
// Could be O(n) space if tree is arranged similar to linked list
    if (root === null) return 0;
    const stack = [];
    let sum = 0;

    const dfsTraverse = function(node) {
        stack.push(node.val);
        // at an end leaf, combine digits in queue and add to sum
        if (node.left === null && node.right === null) {
            sum += parseInt(stack.join(''));
        }
        if (node.left !== null) dfsTraverse(node.left);
        if (node.right !== null) dfsTraverse(node.right);
        // once we backtrack from this leaf, pop the last digit
        stack.pop();
    }

    dfsTraverse(root);
    return sum;
};