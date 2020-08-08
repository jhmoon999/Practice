// LC 994: Rotten Oranges

// In a given grid, each cell can have one of three values:
// the value 0 representing an empty cell;
// the value 1 representing a fresh orange;
// the value 2 representing a rotten orange.

// Every minute, any fresh orange that is adjacent (4-directionally) to a rotten orange becomes rotten.

// Return the minimum number of minutes that must elapse until no cell has a fresh orange.  If this is impossible, return -1 instead.

// Example 1:
// Input: [[2,1,1],[1,1,0],[0,1,1]]
// Output: 4
// Explanation:
// 2 1 1       2 2 1   2 2 2   2 2 2   2 2 2
// 1 1 0   =>  2 1 0   2 2 0   2 2 0   2 2 0
// 0 1 1       0 1 1   0 1 1   0 2 1   0 2 2 

// Example 2:
// Input: [[2,1,1],[0,1,1],[1,0,1]]
// Output: -1
// Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.

// Example 3:
// Input: [[0,2]]
// Output: 0
// Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
 
// Note:
// 1 <= grid.length <= 10
// 1 <= grid[0].length <= 10
// grid[i][j] is only 0, 1, or 2.

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
// Use BFS and a queue for converting fresh oranges to rotten instead of checking 
// all m*n cells every cycle. Stop when queue of rotten oranges is empty.
// Time: O(mn) - number of oranges that transform is never larger than m*n
// Space: O(mn) - queue that is never larger than m*n
    const numRows = grid.length, numCols = grid[0].length;
    let rotten = [], fresh = 0;
    // first count fresh oranges while populating the rotten oranges in queue
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (grid[i][j] === 2) rotten.push([i, j]);
            else if (grid[i][j] === 1) fresh += 1;
        }
    }
    // if there are no fresh oranges to begin with, 0 minutes have elapsed
    // otherwise, start the cycle of infecting the fresh oranges
    let minutes = 0, rottenAfter = [];
    while (rotten.length > 0 && fresh > 0) {
        rotten.forEach(orange => {
            let [i, j] = orange;
            //* This amazes me: grid[i][j]++ will increase grid[i][j] after
            //* this iteration is complete so it won't interfere with the
            //* other conditionals in the same iteration. This means there is
            //* no longer a need to create a deep copy of grid to update.
            if (i > 0 && grid[i - 1][j] === 1) {
                grid[i - 1][j]++;
                fresh -= 1;
                rottenAfter.push([i - 1, j]);
            }
            if (j > 0 && grid[i][j - 1] === 1) {
                grid[i][j - 1]++;
                fresh -= 1;
                rottenAfter.push([i, j - 1]);
            }
            if (i < numRows - 1 && grid[i + 1][j] === 1) {
                grid[i + 1][j]++;
                fresh -= 1;
                rottenAfter.push([i + 1, j]);
            }
            if (j < numCols - 1 && grid[i][j + 1] === 1) {
                grid[i][j + 1]++;
                fresh -= 1;
                rottenAfter.push([i, j + 1]);
            }
        });
        rotten = rottenAfter;   // update the queue for next cycle's BFS
        rottenAfter = [];       // reset the queue to be filled next cycle
        minutes += 1;
    }
    // if there are 0 fresh oranges, return minutes to reach this point
    // if the number of fresh oranges is not 0, then at least one must
    // not be adjacent to a rotten orange, meaning impossible solution.
    return fresh === 0 ? minutes : -1;
    
    
// Count the number of fresh oranges after each minute until the number either
// drops to 0 (all are rotten) or stays the same (impossible to become rotten)
// Time: O((mn)^2) - each cycle of turning fresh to rotten requires going through
// all m*n cells, and there could be a factor of m*n cycles 
// Space: O(mn) - to update the grid, a copy of grid is created and changed
    // const numRows = grid.length, numCols = grid[0].length;
    // // helper function that both updates the grid of oranges after one minute
    // // and returns the number of fresh oranges remaining after that minute
    // const countOranges = function() {
    //     // parse and stringify to create a deep copy of array of arrays
    //     let gridAfter = JSON.parse(JSON.stringify(grid)), fresh = 0;
    //     for (let i = 0; i < numRows; i++) {
    //         for (let j = 0; j < numCols; j++) {
    //             if (grid[i][j] === 1) {
    //                 // if fresh orange is adjacent to rotten orange
    //                 if (i > 0 && grid[i - 1][j] === 2 ||
    //                     j > 0 && grid[i][j - 1] === 2 ||
    //                     i < numRows - 1 && grid[i + 1][j] === 2 ||
    //                     j < numCols - 1 && grid[i][j + 1] === 2) 
    //                     // fresh orange becomes rotten
    //                     gridAfter[i][j] = 2;
    //                 // otherwise, it stays fresh and increase the count
    //                 else fresh += 1;
    //             }
    //         }
    //     }
    //     grid = gridAfter;   // update grid
    //     return fresh;
    // }
    // // count the number of fresh oranges in starting grid
    // let fresh = 0;
    // for (let i = 0; i < numRows; i++) {
    //     for (let j = 0; j < numCols; j++) {
    //         if (grid[i][j] === 1) fresh += 1;
    //     }
    // }
    // // if there were no fresh oranges to begin with, 0 minutes elapsed
    // if (fresh === 0) return 0;
    // // otherwise, keep counting the minutes until the number of fresh
    // // oranges doesn't change anymore or there are 0 fresh oranges
    // let minutes = 1, freshAfter = countOranges();
    // while (fresh !== freshAfter && freshAfter !== 0) {
    //     fresh = freshAfter;
    //     freshAfter = countOranges();
    //     minutes += 1;
    // }
    // // if there are 0 fresh oranges, return minutes to reach this point
    // // if the number of fresh oranges is not 0, then at least one must
    // // not be adjacent to a rotten orange, meaning impossible solution.
    // return freshAfter === 0 ? minutes : -1;
};