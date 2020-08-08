//* Zombie in Matrix

// Given a 2D grid, each cell is either a zombie 1 or a human 0. Zombies can turn adjacent (up/down/left/right) human beings into zombies every hour. Find out how many hours does it take to infect all humans?

// Example:

// Input:
// [[0, 1, 1, 0, 1],
//  [0, 1, 0, 1, 0],
//  [0, 0, 0, 0, 1],
//  [0, 1, 0, 0, 0]]

// Output: 2

// Explanation:
// At the end of the 1st hour, the status of the grid:
// [[1, 1, 1, 1, 1],
//  [1, 1, 1, 1, 1],
//  [0, 1, 0, 1, 1],
//  [1, 1, 1, 0, 1]]

// At the end of the 2nd hour, the status of the grid:
// [[1, 1, 1, 1, 1],
//  [1, 1, 1, 1, 1],
//  [1, 1, 1, 1, 1],
//  [1, 1, 1, 1, 1]]

// Time: O(mn) - max number of cycles is number of diagonals of grid
// Space: O(mn) - max number of zombies in queue is length of diagonal of grid
var zombieInfection = function(grid) {
    const numRows = grid.length, numCols = grid[0].length;
    let zombies = [], humans = 0;
    // first count number of humans and push zombies into queue
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (grid[i][j] === 1) zombies.push([i, j]);
            else humans += 1;
        }
    }
    let hours = 0, zombiesAfter = [];
    // while there are still humans that haven't been turned into zombies
    while (zombies.length > 0 && humans > 0) {
        zombies.forEach(zombie => {
            let [i, j] = zombie;
            // check all four directions of each zombie
            // if human is adjacent, he/she becomes zombie next iteration
            if (i > 0 && grid[i-1][j] === 0) {
                grid[i-1][j]++;
                humans -= 1;
                zombiesAfter.push([i-1, j]);
            }
            if (j > 0 && grid[i][j-1] === 0) {
                grid[i][j-1]++;
                humans -= 1;
                zombiesAfter.push([i, j-1]);
            }
            if (i < numRows - 1 && grid[i+1][j] === 0) {
                grid[i+1][j]++;
                humans -= 1;
                zombiesAfter.push([i+1, j]);
            }
            if (j < numCols - 1 && grid[i][j+1] === 0) {
                grid[i][j+1]++;
                humans -= 1;
                zombiesAfter.push([i, j+1]);
            }
        });
        // update the queues for next cycle
        zombies = zombiesAfter;
        zombiesAfter = [];
        hours += 1;
    }
    // edge cases:
    // 1) if grid is all zombies: hours should be 0
    // 2) if grid is all humans: hours should be -1 to show impossible answer
    return humans === 0 ? hours : -1;
}

const grid = [[0, 1, 1, 0, 1],
              [0, 1, 0, 1, 0],
              [0, 0, 0, 0, 1],
              [0, 1, 0, 0, 0]];

console.log(zombieInfection(grid));

const grid2 = [[1, 0, 0, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0]];

console.log(zombieInfection(grid2));

console.log(zombieInfection([[0, 0], [0, 0]]));
console.log(zombieInfection([[1, 1], [1, 1]]));