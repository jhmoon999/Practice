//* July 21: Word Search

// Given a 2D board and a word, find if the word exists in the grid.
// The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

// Example:
// board =
// [
//   ['A','B','C','E'],
//   ['S','F','C','S'],
//   ['A','D','E','E']
// ]
// Given word = "ABCCED", return true.
// Given word = "SEE", return true.
// Given word = "ABCB", return false.

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    
    let found = false;  // when word is found, bool will switch
    
    const search = function(x, y, index) {
        // if word has been found, then search is over
        if (found) return;
        // if index reaches full word length, then we have 
        // found the entire word within the board
        if (index === word.length) found = true;
        
        // base cases for out-of-bounds or unmatching char
        if (x < 0 || x >= board.length) return;
        if (y < 0 || y >= board[0].length) return;
        if (board[x][y] !== word[index]) return;
        
        // if in-bounds and char matches, move on to check neighbors
        let temp = board[x][y];
        board[x][y] = '-';
        search(x - 1, y, index + 1);
        search(x, y - 1, index + 1);
        search(x + 1, y, index + 1);
        search(x, y + 1, index + 1);
        board[x][y] = temp;
    }
    
    // apply the DFS search function to every char on board
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            search(i, j, 0);
        }
    }
    return found;
};