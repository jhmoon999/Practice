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
// Dynamic Programming - O(M*N)
// Work backwards starting from the princess cell to the knight cell
    const rows = dungeon.length, cols = dungeon[0].length;
    // Create an extra dummy row and column 
    const dp = new Array(rows + 1);
    for (let i = 0; i < rows + 1; i++) {
        dp[i] = new Array(cols + 1).fill(Infinity);
    }
    // Remember: dungeon[rows-1][cols-1] is where the princess is held
    // Setting the two cells to the right and down of it to 1 is important
    // for the nested for loop later
    dp[rows-1][cols] = 1;
    dp[rows][cols-1] = 1;

    for (let i = rows - 1; i >= 0; i--) {
        for (let j = cols - 1; j >= 0; j--) {
            // Remember: 1 is the minimum health you need. So if the latter
            // value is 0 or less, then it's game over for the knight. 
            dp[i][j] = Math.max(1, 
                // Choose the smaller of the cell to the right or down of 
                // current cell because we want the minimum health needed.
                // Then deduct the current cell value for the minimum
                // health needed to survive encountering this cell.
                Math.min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j]);
        }
    }
    return dp[0][0];    // knight cell
    
// Recursion - O(2^(M*N))
// Knight travels every path to princess and we update the minHealth needed
// Time Limit Exceeded - Passed 41/45 cases
    // const traverseDungeon = function(x, y, currDmg, maxDmg) {
    //     currDmg += dungeon[x][y];
    //     maxDmg = Math.min(maxDmg, currDmg);
    //     // if (maxDmg >= -minHealth) return;    
    //     if (x === rows && y === cols) {
    //         minHealth = Math.max(minHealth, maxDmg);
    //         return;
    //     }
    //     if (x < rows) traverseDungeon(x + 1, y, currDmg, maxDmg);
    //     if (y < cols) traverseDungeon(x, y + 1, currDmg, maxDmg);
    // }
    // const rows = dungeon.length - 1, cols = dungeon[0].length - 1;
    // let minHealth = -Infinity;
    // traverseDungeon(0, 0, 0, 0);
    // return -minHealth + 1;
};