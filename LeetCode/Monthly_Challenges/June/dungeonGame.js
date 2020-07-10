//* June 21: Dungeon Game

// The demons had captured the princess (P) and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of M x N rooms laid out in a 2D grid. Our valiant knight (K) was initially positioned in the top-left room and must fight his way through the dungeon to rescue the princess.
// The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.
// Some of the rooms are guarded by demons, so the knight loses health (negative integers) upon entering these rooms; other rooms are either empty (0's) or contain magic orbs that increase the knight's health (positive integers).
// In order to reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.

// Write a function to determine the knight's minimum initial health so that he is able to rescue the princess.
// For example, given the dungeon below, the initial health of the knight must be at least 7 if he follows the optimal path RIGHT-> RIGHT -> DOWN -> DOWN.
// -2(K)	-3	    3
// -5	    -10	    1
//  10	     30	   -5(P)
 
// Note:
// The knight's health has no upper bound.
// Any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room where the princess is imprisoned.

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