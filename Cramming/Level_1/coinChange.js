//* LC 322: Coin Change

// You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// Example 1:
// Input: coins = [1, 2, 5], amount = 11
// Output: 3 
// Explanation: 11 = 5 + 5 + 1

// Example 2:
// Input: coins = [2], amount = 3
// Output: -1

// Note: You may assume that you have an infinite number of each kind of coin.

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
// Dynamic Programming - store minimal number of coins for amount
// starting from 1 and adding a new coin after each iteration
// O(mn) where m is amount, n is number of coins
    const dp = new Array(amount).fill(Infinity);
    // there are 0 coin combinations to reach an amount of 0
    dp.unshift(0);
    for (i = 0; i < coins.length; i++) {
        for (let j = 1; j <= amount; j++) {
            if (j >= coins[i]) {
                dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
            }
        }
    }
    // if dp[amount] is still infinity, no solution has been found
    return dp[amount] === Infinity ? -1 : dp[amount];
    
// Brute-force - go through every possible combination and store
// the fewest coins possible after every correct combination
// O(m^n) where m is amount, n is number of coins
// Time Limit Exceeded - Passed 93/182
    // let fewest = Infinity;
    // // i is the iterator for coins array, j is total number of coins
    // function recursive(amount, i, j) {
    //     if (amount === 0) {
    //         fewest = Math.min(fewest, j);
    //         return;
    //     }
    //     if (amount < 0 || i === coins.length) return;
    //     // Case 1: we pick the coin
    //     recursive(amount - coins[i], i, j + 1);
    //     // Case 2: we don't pick the coin
    //     recursive(amount, i + 1, j);
    // }
    // recursive(amount, 0, 0);
    // // if fewest is still Infinity, no solution has been found
    // return fewest === Infinity ? -1 : fewest;
    
// Brute-force - use cache to store every possible correct combination
// and then choosing the combination with the fewest coins
// Time Limit Exceeded - Passed 11/182
    // function recursive(coinSet, sum) {
    //     if (sum < 0) return 0;
    //     if (sum === 0) {
    //         coinSet = coinSet.split('').sort();
    //         if (cache[coinSet]) return 0;
    //         else {
    //              cache[coinSet] = true;
    //              return 1;
    //         }
    //     }
    //     let temp = 0;
    //     for (let i = coins.length - 1; i >= 0; i--) {
    //         temp += recursive(coinSet + coins[i].toString(), sum - coins[i]);
    //     }
    //     return temp;
    // }
    // const cache = {};
    // const ans = recursive('', amount);
    // if (Object.keys(cache).length === 0) return -1;
    // let min = amount;
    // for (key in cache) {
    //     min = Math.min(min, key.split(',').length);
    // }
    // // console.log(cache);
    // return min;
};