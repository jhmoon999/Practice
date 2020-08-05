// Your quirky boss collects rare, old coins...

// They found out you're a programmer and asked you to solve something they've been wondering for a long time.

// Write a function that, given:

// an amount of money
// an array of coin denominations

// computes the number of ways to make the amount of money with coins of the available denominations.

// Example: for amount=44 (44¢) and denominations=[1,2,3][1,2,3] (11¢, 22¢ and 33¢), your program would output 44—the number of ways to make 44¢ with those denominations:

// 1¢, 1¢, 1¢, 1¢
// 1¢, 1¢, 2¢
// 1¢, 3¢
// 2¢, 2¢

//* My solution - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Time: O(mn) where m is amount and n is number of denominations
// Space: O(m) - array of m is used for dynamic programming
var coinCombosDP = function(amount, coins) {
    // ex. amount = 4, coins = [1, 2, 3] (order of coins doesn't matter)
    //
    // =>     0  1  2  3  4          0  1  2  3  4 
    //     +----------------      +----------------
    //   1 |  1  1  1  1  1     3 |  1  0  0  1  0
    //   2 |  1  1  2  2  3     2 |  1  0  1  0  1
    //   3 |  1  1  2  3  4     1 |  1  1  2  3  4

    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;  // 1 way to reach an amount of 0: no coins

    for (let i = 0; i < coins.length; i++) {
        // second for loop is better approach
        for (let j = 1; j <= amount; j++) {
            if (j >= coins[i]) dp[j] += dp[j - coins[i]]
        }

        //* j can be initialized to be coins[i] to skip unnecessary checks
        //* this allows removal of the conditional (j >= coins[i]) as well
        // for (let j = coins[i]; j <= amount; j++) {
        //     dp[j] += dp[j - coins[i]]
        // }
    }
    return dp[amount];
}

// Time: O(2^mn), Space: O(2^mn)
// DFS recursion yields 2^mn paths
var coinCombosRecursive = function(amount, coins) {

    const dfsCoins = function(amount, i) {
        // base cases: 
        if (amount === 0) return 1;         // combination found
        if (amount < 0) return 0;           // incorrect combination
        if (i >= coins.length) return 0;    // ran out of denominations

        // take it or leave it
        return dfsCoins(amount - coins[i], i) + dfsCoins(amount, i + 1);
    }
    return dfsCoins(amount, 0);
}

var amount1 = 4;
var coins1 = [1, 2, 3];

console.log(coinCombosDP(amount1, coins1));
console.log(coinCombosRecursive(amount1, coins1));

var amount2 = 10;
var coins2 = [1, 2, 5];

console.log(coinCombosDP(amount2, coins2));
console.log(coinCombosRecursive(amount2, coins2));

