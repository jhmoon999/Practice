//* LC 62: Unique Paths
// A robot is located at the top-left corner of a m x n grid.
// The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid.
// How many possible unique paths are there?
// Input: m = 3, n = 2
// Output: 3
// Explanation:
// From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
// 1. Right -> Right -> Down
// 2. Right -> Down -> Right
// 3. Down -> Right -> Right

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
// Dynamic Programming - O(mn)
    const dp = new Array(m);
    for (let i = 0; i < m; i++) {
        dp[i] = new Array(n).fill(1);
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
    
// Simple recursion - O(2^(mn))
// Time Limit Exceeded - Passed 41/62
    // let paths = 0; 
    // const createPath = function(x, y) {
    //     if (x === m - 1 && y === n - 1) {
    //         paths += 1;
    //         return;
    //     }
    //     if (x < m - 1) createPath(x + 1, y);
    //     if (y < n - 1) createPath(x, y + 1);
    // }
    // createPath(0, 0);
    // return paths;
};