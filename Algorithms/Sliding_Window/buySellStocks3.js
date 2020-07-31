//* LC 123: Best Time to Buy and Sell Stocks III

// Say you have an array for which the ith element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. You may complete at most two transactions.

// Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

// Example 1:
// Input: [3,3,5,0,0,3,1,4]
// Output: 6
// Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3. Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.

// Example 2:
// Input: [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4. Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.

// Example 3:
// Input: [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transaction is done, i.e. max profit = 0.

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
// Dynamic Programming, but using only four variables instead of array
// On each day, we can buy or sell. We always want to buy at minimum 
// stock price and the sell at maximum. Create two variables to imitate
// what happens if we did buy and sell on that day, and then two
// more variables for if this is the second buy and sell.
// Time: O(n), Space: O(1)
    // let buy1 = Infinity, buy2 = Infinity, sell1 = 0, sell2 = 0;
    // for (let i = 0; i < prices.length; i++) {
    //     // buy1 should be the minimum price of all days up to i
    //     buy1 = Math.min(buy1, prices[i]);
    //     // sell1 represents the profit after selling on maximum price
    //     // of all days up to i 
    //     sell1 = Math.max(sell1, prices[i] - buy1);
    //     // buy2 is still the minimum price of all days up to i, but we
    //     // subtract the profit from first transaction for net change
    //     buy2 = Math.min(buy2, prices[i] - sell1);
    //     // sell2 represents the profit after two transactions
    //     sell2 = Math.max(sell2, prices[i] - buy2)
    // }
    // return sell2;

    
// For each index, find the max profit of the array to the left of index
// and the max profit of the array to the right of index. The greatest
// sum is the max profit over two transactions.
// Time: O(3n) = O(n), Space: O(n)
    
    // leftProfit is array of max profit from day 0 to day i
    const leftProfit = new Array(prices.length).fill(0);
    let min = prices[0];   // min is the minimum stock price for buying
    // profit is calculated from left to right, keeping track of min
    // stock price so that we can find the maximum prices[i] for selling
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < min) min = prices[i];
        leftProfit[i] = Math.max(leftProfit[i - 1], prices[i] - min);
    }
    
    // rightProfit is array of max profit from day i to last day
    const rightProfit = new Array(prices.length).fill(0);
    let max = prices[prices.length - 1];  // max is max price for selling
    // profit is calculated from right to left, keeping track of max 
    // stock price so that we can find the minimum prices[i] for buying
    for (let i = prices.length - 2; i >= 0; i--) {
        if (prices[i] > max) max = prices[i];
        rightProfit[i] = Math.max(rightProfit[i + 1], max - prices[i]);
    }
    
    // leftProfit[i] + rightProfit[i] is the max profit if one transaction
    // was on or before day i and the other transaction is after day i
    let profitMax = 0;
    for (let i = 0; i < prices.length; i++) {
        profitMax = Math.max(profitMax, leftProfit[i] + rightProfit[i]);
    }
    return profitMax;
};