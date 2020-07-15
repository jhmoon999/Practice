//* June 24: Unique Binary Search Trees

// Given n, how many structurally unique BST's (binary search trees) that store values 1 ... n?

// Example:

// Input: 3
// Output: 5
// Explanation:
// Given n = 3, there are a total of 5 unique BST's:

//    1         3     3      2      1
//     \       /     /      / \      \
//      3     2     1      1   3      2
//     /     /       \                 \
//    2     1         2                 3

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
// If we draw out the first few cases:
    //
    // n = 0: 1
    //
    // n = 1: 1     1
    //
    // n = 2: 2     1        2
    //               \      /
    //                2    1
    // 
    // n = 3: 5       1         3     3      2      1
    //                 \       /     /      / \      \
    //                  3     2     1      1   3      2
    //                 /     /       \                 \
    //                2     1         2                 3
    //

// For n = 3, we can separate the problem into subproblems by assigning
// the root node. If 1 is the root node, then there are zero nodes on its 
// left and two nodes on its right. We can treat this as the n = 0 case
// on the left and the n = 2 case on its right, and multiply the two
// together for total number of combinations where 1 is the root node. If
// 3 is the root node, then there are two nodes on its left and zero nodes
// on its right, which is similar to the previous case. If 2 is root node,
// then one node is on the left and one node is on the right, which can be
// seen as n = 1 on the left and n = 1 on the right. Altogether, that's:
    // 1 is root: (n = 2) * (n = 0) = 2 * 1 = 2
    // 2 is root: (n = 1) * (n = 1) = 1 * 1 = 1
    // 3 is root: (n = 0) * (n = 2) = 1 * 2 = 2
    // n = 3 => 5 combinations
    
    // n = 4: ?
    
// For n = 4, if 1 is the root node, then there are zero nodes on its left
// and three nodes on its right. If 2 is the root node, there is one node (1) 
// on its left and two nodes (3, 4) on its right. If 3 is the root node,
// there are two nodes on its left (1, 2) and one node on its right (4).
// 4 being the root node is similar to 1 being root node.
    // 1 is root: (n = 0) * (n = 3) = 1 * 5 = 5
    // 2 is root: (n = 1) * (n = 2) = 1 * 2 = 2
    // 3 is root: (n = 2) * (n = 1) = 2 * 1 = 2
    // 4 is root: (n = 3) * (n = 0) = 5 * 1 = 5
    // n = 4 => 14 combinations
    
// If we apply this logic to any n, then we can solve the problem using
// bottom up dynamic programming. Time: O(n^2), Space: O(n)
    const bstCount = new Array(n+1).fill(0);
    bstCount[0] = 1;
    bstCount[1] = 1;
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            bstCount[i] += bstCount[j-1] * bstCount[i-j]; 
        }
    }
    return bstCount[n];
};