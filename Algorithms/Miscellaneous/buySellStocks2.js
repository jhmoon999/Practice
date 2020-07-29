// LC 122: Best Time to Buy and Sell Stock II

// Say you have an array prices for which the ith element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).

// Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

// Example 1:
// Input: [7,1,5,3,6,4]
// Output: 7
// Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4. Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.

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
// Every time current day price is greater than previous day price,
// a profit is made. Simply sum up all these profits.
    // ex. [0,1,2,3,2,1,2,3,2] can be plotted as: 
    //
    // Day: 1 2 3 4 5 6 7 8 9    Price:
    //            .       .      3
    //          ./ \.   ./ \.    2
    //        ./     \./         1   
    //      ./                   0
    // In the above example, the total profit is buying on Day 1 and
    // then selling on Day 4 (profit = 3 - 0 = 3), and buying on Day
    // 6 and then selling on Day 8 (profit = 3 - 1 = 2) => 5 total
    // However, this problem can be further simplified: 
    // Total profit = (Day4 - Day1) + (Day8 - Day6) 
    // = (Day4 - Day3) + (Day3 - Day2) + (Day2 - Day1) +
    //   (Day8 - Day7) + (Day7 - Day6) = 1 + 1 + 1 + 1 + 1 = 5 
    
// Summing up consecutive day profits is the same as finding the
// profit between local maxima and local minima.
// Time: O(n), Space: O(1)
    let profit = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) 
            profit += prices[i] - prices[i - 1];
    }
    return profit;
};