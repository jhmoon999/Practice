//* June 27: Perfect Squares

// Given a positive integer n, find the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) which sum to n.

// Example 1:
// Input: n = 12
// Output: 3 
// Explanation: 12 = 4 + 4 + 4.

// Example 2:
// Input: n = 13
// Output: 2
// Explanation: 13 = 4 + 9.

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
// Dynamic programming - O(n^2)
    const dp = [];
    // for each number, the most squares it can be composed of is itself * 1
    // ex. 5 => 1 + 1 + 1 + 1 + 1 (5 squares) > 1 + 4 (2 squares)
    for (let i = 0; i <= n; i++) {
        dp[i] = i;
    }
    for (let i = 1; i <= n; i++) {
        // for each number, subtract a square from it and compare the number
        // of squares its difference has; if fewer, update the cell
        for (let j = 1; i - j*j >= 0; j++) {
            dp[i] = Math.min(dp[i], dp[i - j*j] + 1);
        }
    }
    return dp[n];
};