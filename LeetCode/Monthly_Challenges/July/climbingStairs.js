//* July 31: Climbing Stairs

// You are climbing a stair case. It takes n steps to reach to the top.

// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

// Example 1:
// Input: 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps

// Example 2:
// Input: 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
// Math - apparently there's a formula to calculate nth Fibonacci number:
// (1 / sqrt(5)) * [((1 + sqrt(5)) / 2)^(n+1) - ((1 - sqrt(5)) / 2)^(n+1)]
// Time: O(log(n)) - Math.pow is log(n) process, Space: O(1)
    // const sqrt5 = Math.sqrt(5);
    // const fibn1 = Math.pow((1 + sqrt5) / 2, n + 1);
    // const fibn2 = Math.pow((1 - sqrt5) / 2, n + 1); 
    // return Math.floor((fibn1 - fibn2) / sqrt5);
    
// Dynamic Programming - save small cases to build large cases
    // ex. f(1) = 1, f(2) = 2
    //     f(3) = f(3-1) + f(3-2) = f(1) + f(2) = 3
    //     f(4) = f(4-1) + f(4-2) = f(3) + f(2) = 5
// It's pretty much calculating the nth Fibonacci number
// Time: O(n), Space: O(n) - honestly, space complexity can be O(1) if three
// variables were used to save f(n), f(n-1), f(n-2) instead of an array of n
    const dp = [0, 1, 2];
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
    
// Brute force - recursion to add either 1 or 2 until n is reached
// Time: O(2^n), Space: O(n) - depth of recursion tree is n
// Time Limit Exceeded on n = 44
    // if (n === 0) return 1;
    // if (n < 0) return 0;
    // return climbStairs(n - 1) + climbStairs(n - 2);
};