//* July 13: Same Tree

// Given two binary trees, write a function to check if they are the same or not.

// Two binary trees are considered the same if they are structurally identical and the nodes have the same value.

// Example 1:
// Input:     1         1
//           / \       / \
//          2   3     2   3
//
//         [1,2,3],   [1,2,3]
//
// Output: true

// Example 2:
// Input:     1         1
//           /           \
//          2             2
//
//         [1,2],     [1,null,2]
//
// Output: false

// Example 3:
// Input:     1         1
//           / \       / \
//          2   1     1   2
//
//         [1,2,1],   [1,1,2]
//
// Output: false

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
// Recursive with DFS
// Time:  O(N) since we may have to check every node
// Space: O(N) if trees are same or similar, recursion stack will approach N
    // if both p and q are null, they have no children to compare
    if (p === null && q === null) return true;
    // at this point, we know p and q are not both null
    if (p === null || q === null) return false;
    // at this point, we know neither p and q is null
    if (p.val !== q.val) return false;
    // since neither p and q is null, compare their children
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    
// Iterative with BFS
// Time:  O(N) since we may have to check every node
// Space: O(N) since we can have at most N/2 nodes in each queue
    // const pQueue = [p], qQueue = [q];
    // while (pQueue.length > 0 || qQueue.length > 0) {
    //     let pCurr = pQueue.shift(), qCurr = qQueue.shift();
    //     // if both null, then move on to next node in both queues
    //     if (pCurr === null && qCurr === null) continue;
    //     // if pCurr is not null, we can push its left and right nodes
    //     if (pCurr !== null && qCurr === null) return false;
    //     pQueue.push(pCurr.left, pCurr.right);
    //     // if qCurr is not null, we can push its left and right nodes 
    //     if (pCurr === null && qCurr !== null) return false;
    //     qQueue.push(qCurr.left, qCurr.right);
    //     // since neither pCurr or qCurr is null, we can compare their vals
    //     if (pCurr.val !== qCurr.val) return false;
    // }
    // return true;
};