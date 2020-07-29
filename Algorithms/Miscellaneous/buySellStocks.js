//* LC 121: Best Time to Buy and Sell Stock

// Say you have an array for which the ith element is the price of a given stock on day i.

// If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

// Note that you cannot sell a stock before you buy one.

// Example 1:
// Input: [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. Not 7-1 = 6, as selling price needs to be larger than buying price.

// Example 2:
// Input: [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transaction is done, i.e. max profit = 0.

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
// Keep track of the min stock price while iterating through array.
// If a higher stock price appears after min, then update the profit.
// Time: O(n), Space: O(1)
    let profitMax = 0, min = prices[0];
    for (let i = 1; i < prices.length; i++) {
        // if current stock price is lower than min, update min
        if (prices[i] < min) min = prices[i];
        // otherwise, current price must be greater than or equal to min
        // if current profit is greater than profitMax, update profitMax
        else if (prices[i] - min > profitMax) {
            profitMax = prices[i] - min;
        }
    }
    return profitMax;
    
// Brute force - buy the stock on each day and sell on a subsequent day
// while keeping track of the max profit
// Time: O(n^2), Space: O(1)
    // let profitMax = 0;
    // for (let i = 0; i < prices.length; i++) {
    //     for (let j = i + 1; j < prices.length; j++) {
    //         profitMax = Math.max(profitMax, prices[j] - prices[i]);
    //     }
    // }
    // return profitMax;
};