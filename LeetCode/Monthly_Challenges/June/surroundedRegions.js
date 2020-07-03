//* June 17: Surrounded Regions

// Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'. A region is captured by flipping all 'O's into 'X's in that surrounded region.

// Example:
// X X X X
// X O O X
// X X O X
// X O X X

// After running your function, the board should be:
// X X X X
// X X X X
// X X X X
// X O X X

// Explanation:
// Surrounded regions shouldn’t be on the border, which means that any 'O' on the border of the board are not flipped to 'X'. Any 'O' that is not on the border and it is not connected to an 'O' on the border will be flipped to 'X'. Two cells are connected if they are adjacent cells connected horizontally or vertically.

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
    if (board.length !== 0) {
        const rows = board.length - 1, cols = board[0].length - 1;
        // If a region is touching the border, then it cannot be surrounded
        // Use depth first search to change all bordered regions to '0'
        const dfsBorder = function(x, y) {
            if (board[x][y] === 'O') {
                board[x][y] = '0';
                if (x > 0) dfsBorder(x - 1, y);
                if (y > 0) dfsBorder(x, y - 1);
                if (x < rows) dfsBorder(x + 1, y);
                if (y < cols) dfsBorder(x, y + 1);
            }
        }
        // Apply the helper function to all four borders
        for (let i = 0; i <= rows; i++) {
            dfsBorder(i, 0);
            dfsBorder(i, cols);
        }
        for (let j = 0; j <= cols; j++) {
            dfsBorder(0, j);
            dfsBorder(rows, j);
        }
        // All O's that were surrounded had become 0's, so all O's that are not
        // 0's will become X's. Transform the 0's back to O's.
        for (let i = 0; i <= rows; i++) {
            for (let j = 0; j <= cols; j++) {
                if (board[i][j] !== 'X') {
                    board[i][j] === 'O' ? 
                    board[i][j] = 'X' : board[i][j] = 'O';
                }
            }
        }
    }
};