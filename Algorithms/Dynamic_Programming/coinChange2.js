//* June 7: Coin Change 2

// You are given coins of different denominations and a total amount of money. Write a function to compute the number of combinations that make up that amount. You may assume that you have infinite number of each kind of coin.

// Example 1:
// Input: amount = 5, coins = [1, 2, 5]
// Output: 4
// Explanation: there are four ways to make up the amount:
// 5=5
// 5=2+2+1
// 5=2+1+1+1
// 5=1+1+1+1+1

// Example 2:
// Input: amount = 3, coins = [2]
// Output: 0
// Explanation: the amount of 3 cannot be made up just with coins of 2.

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
// Dynamic Programming - O(nm) where n = number of coin types, m = amount
    const combinations = new Array(amount).fill(0);
    combinations.unshift(1);
    for (let i = 0; i < coins.length; i++) {
        for (let j = 1; j <= amount; j++) {
            if (j >= coins[i]) combinations[j] += combinations[j - coins[i]];
        }
    }
    return combinations[amount];
    
// Take it or leave it Recursion
// Time Limit Exceeded - 17/27 cases passed
// var change = function(amount, coins, i = 0) {
    // if (amount === 0) return 1;
    // if (amount < 0 || i === coins.length) return 0;
    // return change(amount - coins[i], coins, i) + change(amount, coins, i + 1);
// }
};