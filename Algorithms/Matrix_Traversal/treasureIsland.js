//* Treasure Island

// You have a map that marks the location of a treasure island. Some of the map area has jagged rocks and dangerous reefs. Other areas are safe to sail in. There are other explorers trying to find the treasure. So you must figure out a shortest route to the treasure island.

// Assume the map area is a two dimensional grid, represented by a matrix of characters. You must start from the top-left corner of the map and can move one block up, down, left or right at a time. The treasure island is marked as X in a block of the matrix. X will not be at the top-left corner. Any block with dangerous rocks or reefs will be marked as D. You must not enter dangerous blocks. You cannot leave the map area. Other areas O are safe to sail in. The top-left corner is always safe. Output the minimum number of steps to get to the treasure.

// Example:
// Input:
// [['O', 'O', 'O', 'O'],
//  ['D', 'O', 'D', 'O'],
//  ['O', 'O', 'O', 'O'],
//  ['X', 'D', 'D', 'O']]

// Output: 5
// Explanation: Route is (0, 0), (0, 1), (1, 1), (2, 1), (2, 0), (3, 0) The minimum route takes 5 steps.

// Time: O(mn) - may navigate through every cell before locating treasure
// Space: O(mn) - the max number of cells in BFS queue is length of diagonal
var minStepsTreasure = function(grid) {
    const numRows = grid.length, numCols = grid[0].length;
    // we must start at the top left corner, so first step is [0, 0]
    let queue = [[0, 0]], steps = 0;
    while (queue.length > 0) {
        let temp = [];
        for (let k = 0; k < queue.length; k++) {
            let [i, j] = queue[k];
            // once we locate the treasure, break the loop and return
            if (grid[i][j] === 'X') return steps;
            // we have encountered this cell, so mark it as 'D' so it cannot
            // be revisited during the BFS traversal
            else grid[i][j] = 'D';

            // if adjacent cells can be navigated, add into queue
            if (i > 0 && grid[i-1][j] !== 'D') temp.push([i-1, j]);
            if (j > 0 && grid[i][j-1] !== 'D') temp.push([i, j-1]);
            if (i < numRows - 1 && grid[i+1][j] !== 'D') temp.push([i+1, j]);
            if (j < numCols - 1 && grid[i][j+1] !== 'D') temp.push([i, j+1]);
        }
        queue = temp;
        steps += 1;     // every cycle of BFS is a step taken on the map
    }
    return -1;  // if no treasure found after every cell has been searched
}

const island = [['O', 'O', 'O', 'O'],
                ['D', 'O', 'D', 'O'],
                ['O', 'O', 'O', 'O'],
                ['X', 'D', 'D', 'O']];

console.log(minStepsTreasure(island));