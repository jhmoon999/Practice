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