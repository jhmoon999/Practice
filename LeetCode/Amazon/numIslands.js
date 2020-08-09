// LC 200: Number of Islands

// Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

// Example 1:
// Input: grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// Output: 1

// Example 2:
// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
// DFS traverse to locate islands
// Time: O(mn) - there are 4 directions every cell and m*n cells
// Space: O(mn) - recursive stack

    // helper function that labels each island with a number
    const labelIsland = function(x, y, grid, label) {
        // if part of current island, label cell
        if (grid[x][y] === '1') grid[x][y] = label;

        // move down
        if (x + 1 < grid.length && grid[x + 1][y] === '1') 
            labelIsland(x + 1, y, grid, label);
        // move right
        if (y + 1 < grid[0].length && grid[x][y + 1] === '1') 
            labelIsland(x, y + 1, grid, label);
        // move up
        if (x - 1 >= 0 && grid[x - 1][y] === '1') 
            labelIsland(x - 1, y, grid, label);
        // move left
        if (y - 1 >= 0 && grid[x][y - 1] === '1') 
            labelIsland(x, y - 1, grid, label);
    }
    
    let count = 0;
    // check all cells if part of island
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {           
            if (grid[i][j] === '1') {
                // increment count once DFS on one island is complete
                count += 1;
                labelIsland(i, j, grid, count);
            }
        }
    }
    return count;
};