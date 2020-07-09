/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function(dungeon) {
// DP - O(M*N)
    // const rows = dungeon.length, cols = dungeon[0].length;
    // const dp = new Array(rows);
    // for (let i = 0; i < rows; i++) {
    //     dp[i] = new Array(cols);
    //     for (let j = 0; j < cols; j++) {
    //         dp[i][j] = [];
    //     }
    // }
    // dp[0][0] = [dungeon[0][0], Math.min(dungeon[0][0], 0)];
    // for (let i = 1; i < rows; i++) {
    //     dp[i][0][0] = dp[i-1][0][0] + dungeon[i][0];
    //     dp[i][0][1] = Math.min(dp[i][0][0], dp[i-1][0][1]);
    // }
    // for (let j = 1; j < cols; j++) {
    //     dp[0][j][0] = dp[0][j-1][0] + dungeon[0][j];
    //     dp[0][j][1] = Math.min(dp[0][j][0], dp[0][j-1][1]);
    // }
    // for (let i = 1; i < rows; i++) {
    //     for (let j = 1; j < cols; j++) {
    //         if (dp[i-1][j][1] > dp[i][j-1][1]) {
    //             dp[i][j][0] = dp[i-1][j][0] + dungeon[i][j];
    //             dp[i][j][1] = Math.min(dp[i][j][0], dp[i-1][j][1]);
    //         }
    //         else {
    //             dp[i][j][0] = dp[i][j-1][0] + dungeon[i][j];
    //             dp[i][j][1] = Math.min(dp[i][j][0], dp[i][j-1][1]);
    //         }
    //     }
    // }
    // return -dp[rows-1][cols-1][1] + 1;
    
    
// Recursion - O(2^(M+N))
// Time Limit Exceeded - Passed 41/45 cases
    // const recursive = function(x, y, currDmg, maxDmg) {
    //     currDmg += dungeon[x][y];
    //     maxDmg = Math.min(maxDmg, currDmg);
    //     // if (maxDmg >= -minHealth) return;    
    //     if (x === rows && y === cols) {
    //         minHealth = Math.max(minHealth, maxDmg);
    //         return;
    //     }
    //     if (x < rows) recursive(x + 1, y, currDmg, maxDmg);
    //     if (y < cols) recursive(x, y + 1, currDmg, maxDmg);
    // }
    // const rows = dungeon.length - 1; cols = dungeon[0].length - 1;
    // let minHealth = -Infinity;
    // recursive(0, 0, 0, 0);
    // return -minHealth + 1;
};